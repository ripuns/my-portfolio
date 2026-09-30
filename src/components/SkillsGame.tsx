import { useEffect, useRef, useState } from "react";
import { skillGroups } from "../data/portfolio";

/* ------------------------------------------------------------------ */
/* Tuning                                                              */
/* ------------------------------------------------------------------ */

const STEP = 1 / 120; // fixed physics step → identical jump at any refresh rate
const LIFE = 10; // seconds the skills stay out after a bump
const FLICKER = 1.3; // blink warning before they vanish
const STAGGER = 0.12; // gap between each skill dropping out of the block
const N = skillGroups.length;
const FAMILY = '"VT323", monospace';

type Theme = { ink: string; base: string; panel: string; panel2: string; line: string; mute: string };
type Keys = "left" | "right" | "jump";
type Api = { setKey: (k: Keys, down: boolean) => void; pointer: (x: number) => void };

/* ------------------------------------------------------------------ */
/* Pixel art (K = ink, W = base, M = mute)                             */
/* ------------------------------------------------------------------ */

const SW = 12;
const SH = 16;

const HEAD = [
  "...KKKKKK...",
  "..KKKKKKKK..",
  "..KKKKKKKKKK",
  "..KWWWWWWK..",
  "..KWWWWKWK..",
  "..KWWWWWWK..",
  "...KWWWMMK..",
  "...KKKKKK...",
];
const ARMS_DOWN = ["..KKKMMKKK..", ".KKKKMMKKKK.", ".KWKKKKKKWK.", ".KWKKKKKKWK."];
const ARMS_UP = ["K.KKKMMKKK.K", "KWKKKMMKKKWK", ".KKKKKKKKKK.", "..KKKKKKKK.."];
const LEGS_IDLE = ["...KKMMKK...", "...KK..KK...", "...KK..KK...", "..KKK..KKK.."];
const LEGS_A = ["...KKMMKK...", "..KKK..KKK..", ".KKK....KK..", ".KK......KK."];
const LEGS_B = ["...KKMMKK...", "...KKKKKK...", "...KKKKKK...", "..KKKKKKKK.."];
const LEGS_JUMP = ["...KKMMKK...", "..KKK..KKK..", ".KKK....KKK.", ".KK......KK."];

/** 0 idle · 1 run A · 2 run B · 3 jump */
const FRAMES: string[][] = [
  [...HEAD, ...ARMS_DOWN, ...LEGS_IDLE],
  [...HEAD, ...ARMS_DOWN, ...LEGS_A],
  [...HEAD, ...ARMS_DOWN, ...LEGS_B],
  [...HEAD, ...ARMS_UP, ...LEGS_JUMP],
];

const CLOUD = ["....XXXX....", "..XXXXXXXX..", ".XXXXXXXXXX.", "XXXXXXXXXXXX"];

/* ------------------------------------------------------------------ */
/* Layout — every size derives from one integer pixel scale            */
/* ------------------------------------------------------------------ */

type Layout = {
  W: number;
  H: number;
  dpr: number;
  P: number; // device pixels per sprite pixel (integer → no seams)
  Sc: number; // same thing in CSS px
  groundH: number;
  groundY: number;
  ph: number; // player height
  pw: number; // player width
  head: number; // half-width of the "headbutt" area
  g: number;
  gFall: number;
  chipG: number;
  v0: number;
  vmax: number;
  accel: number;
  fric: number;
  bh: number;
  boxW: number;
  boxY: number;
  boxBottom: number;
  boxX: number[];
  chipH: number;
  chipGap: number;
  padX: number;
  chipFont: string;
  labelFont: string;
  labelSize: number;
  labelLines: string[][];
  hudFont: string;
};

function computeLayout(W: number, dpr: number, ctx: CanvasRenderingContext2D): Layout {
  const narrow = W < 520;
  const P = Math.max(2, Math.round((narrow ? 2 : 3) * dpr));
  const Sc = P / dpr;

  // Jump apex A, chosen so a full jump pushes the head ~10px into a block.
  const A = (narrow ? 30 : 26) * Sc;
  const ph = SH * Sc;
  const groundH = Math.round(11 * Sc);
  const under = Math.round(ph + A - 10);
  const bh = narrow ? 44 : 54;
  const topRoom = narrow ? 36 : 44;
  const H = groundH + under + bh + topRoom;
  const groundY = H - groundH;
  const boxBottom = groundY - under;

  const pad = narrow ? 6 : 18;
  const gap = narrow ? 4 : 16;
  const boxW = (W - pad * 2 - gap * (N - 1)) / N;
  const boxX: number[] = [];
  for (let i = 0; i < N; i++) boxX.push(pad + i * (boxW + gap));

  // Gravity scales with the jump so it "feels" the same at every size.
  const g = A * 23;
  const vmax = 62 * Sc;

  // Labels: one line when there is room, otherwise split at the "&".
  const wide = boxW >= 160;
  const labelLines = skillGroups.map((gr) => {
    if (wide || !gr.name.includes(" & ")) return [gr.name];
    const [a, b] = gr.name.split(" & ");
    return [`${a} &`, b];
  });
  let labelSize = wide ? 25 : narrow ? 16 : 22;
  for (; labelSize > 11; labelSize--) {
    ctx.font = `${labelSize}px ${FAMILY}`;
    let widest = 0;
    for (const ls of labelLines) for (const l of ls) widest = Math.max(widest, ctx.measureText(l).width);
    if (widest <= boxW - 10) break;
  }

  return {
    W,
    H,
    dpr,
    P,
    Sc,
    groundH,
    groundY,
    ph,
    pw: SW * Sc,
    head: 3.5 * Sc,
    g,
    gFall: g * 1.55,
    chipG: g * 1.15,
    v0: Math.sqrt(2 * g * A),
    vmax,
    accel: vmax * 12,
    fric: vmax * 14,
    bh,
    boxW,
    boxY: boxBottom - bh,
    boxBottom,
    boxX,
    chipH: narrow ? 15 : 19,
    chipGap: narrow ? 1 : 2,
    padX: narrow ? 5 : 8,
    chipFont: `${narrow ? 15 : 18}px ${FAMILY}`,
    labelFont: `${labelSize}px ${FAMILY}`,
    labelSize,
    labelLines,
    hudFont: `${narrow ? 15 : 19}px ${FAMILY}`,
  };
}

/* ------------------------------------------------------------------ */
/* Pre-rendered layers (rebuilt only on resize / theme change)         */
/* ------------------------------------------------------------------ */

function readTheme(): Theme {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string, f: string) => cs.getPropertyValue(n).trim() || f;
  return {
    ink: v("--ink", "#1a1a18"),
    base: v("--base", "#fafaf8"),
    panel: v("--panel", "#ffffff"),
    panel2: v("--panel2", "#f1f0ea"),
    line: v("--line", "#e3e1d8"),
    mute: v("--mute", "#73736d"),
  };
}

function hill(g: CanvasRenderingContext2D, cx: number, baseY: number, halfW: number, step: number) {
  for (let r = 0; ; r++) {
    const w = halfW * 2 - r * step * 2;
    if (w < step * 2) break;
    g.fillRect(Math.round(cx - w / 2), Math.round(baseY - (r + 1) * step), Math.round(w), Math.ceil(step));
  }
}

function buildBg(L: Layout, th: Theme): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.round(L.W * L.dpr);
  c.height = Math.round(L.H * L.dpr);
  const g = c.getContext("2d")!;
  g.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
  const s = L.Sc;

  // hills
  g.fillStyle = th.panel2;
  hill(g, L.W * 0.13, L.groundY, 22 * s, 3 * s);
  hill(g, L.W * 0.87, L.groundY, 26 * s, 3 * s);

  // clouds
  g.fillStyle = th.line;
  const cell = Math.max(3, Math.round(s * 1.5));
  const spots = [
    [0.1, 0.3],
    [0.46, 0.18],
    [0.76, 0.34],
  ];
  for (const [fx, fy] of spots) {
    const x0 = Math.round(L.W * fx - (SW * cell) / 2);
    const y0 = Math.round(L.H * fy);
    for (let r = 0; r < CLOUD.length; r++) {
      const row = CLOUD[r];
      const first = row.indexOf("X");
      const len = row.lastIndexOf("X") - first + 1;
      g.fillRect(x0 + first * cell, y0 + r * cell, len * cell, cell);
    }
  }

  // ground: ink cap + two rows of bricks
  g.fillStyle = th.panel2;
  g.fillRect(0, L.groundY, L.W, L.groundH);
  g.fillStyle = th.ink;
  g.fillRect(0, L.groundY, L.W, 2);
  const rowH = (L.groundH - 2) / 2;
  const brickW = 12 * s;
  g.fillStyle = th.line;
  for (let r = 0; r < 2; r++) {
    const y = L.groundY + 2 + r * rowH;
    g.fillRect(0, Math.round(y + rowH - 1.5), L.W, 2);
    for (let x = (r % 2) * (brickW / 2); x < L.W; x += brickW) g.fillRect(Math.round(x), Math.round(y), 2, Math.round(rowH));
  }
  return c;
}

/** frames[frame][0 = facing right, 1 = facing left] */
function buildSprites(L: Layout, th: Theme): HTMLCanvasElement[][] {
  const map: Record<string, string> = { K: th.ink, W: th.base, M: th.mute };
  return FRAMES.map((rows) =>
    [false, true].map((flip) => {
      const c = document.createElement("canvas");
      c.width = SW * L.P;
      c.height = SH * L.P;
      const g = c.getContext("2d")!;
      for (let y = 0; y < SH; y++) {
        for (let x = 0; x < SW; x++) {
          const col = map[rows[y][flip ? SW - 1 - x : x]];
          if (!col) continue;
          g.fillStyle = col;
          g.fillRect(x * L.P, y * L.P, L.P, L.P);
        }
      }
      return c;
    })
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function SkillsGame() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const apiRef = useRef<Api | null>(null);
  const [touch, setTouch] = useState(false);
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    let visible = false;
    let raf = 0;
    let last = 0;
    let acc = 0;

    let th = readTheme();
    let lay: Layout | null = null;
    let bg: HTMLCanvasElement | null = null;
    let spr: HTMLCanvasElement[][] | null = null;

    /* ---------------- simulation state (nothing allocates in the loop) ---------------- */

    let simT = 0;
    let pX = 0;
    let pY = 0;
    let pVX = 0;
    let pVY = 0;
    let facing = 1;
    let onGround = true;
    let runPhase = 0;
    let coyote = 0;
    let jumpBuf = 0;
    let aiHold = 0;
    let aiX = -1; // tap-to-walk target, -1 = none
    let aiBox = -1; // block to headbutt on arrival
    let jumpEdge = false;
    const keys = { left: false, right: false, jump: false };

    const bump = new Float32Array(N);
    const expireAt = new Float32Array(N);
    const active: boolean[] = new Array(N).fill(false);
    const everHit: boolean[] = new Array(N).fill(false);
    let hits = 0;
    let hud = `BLOCKS 0/${N}`;

    type Chip = {
      on: boolean;
      released: boolean;
      landed: boolean;
      g: number;
      i: number;
      label: string;
      w: number;
      x: number;
      y: number;
      vy: number;
      restY: number;
      spawnAt: number;
    };
    const chips: Chip[] = [];
    skillGroups.forEach((grp, g) =>
      grp.skills.forEach((label, i) =>
        chips.push({ on: false, released: false, landed: true, g, i, label, w: 0, x: 0, y: 0, vy: 0, restY: 0, spawnAt: 0 })
      )
    );

    const PN = 48;
    const prx = new Float32Array(PN);
    const pry = new Float32Array(PN);
    const pvx = new Float32Array(PN);
    const pvy = new Float32Array(PN);
    const plf = new Float32Array(PN);
    let pHead = 0;
    let pLive = 0;

    function burst(x: number, y: number, n: number, spread: number, vy: number, life: number) {
      if (reduce) return;
      for (let k = 0; k < n; k++) {
        const j = pHead;
        pHead = (pHead + 1) % PN;
        prx[j] = x;
        pry[j] = y;
        pvx[j] = (Math.random() - 0.5) * spread;
        pvy[j] = vy * (0.5 + Math.random() * 0.8);
        plf[j] = life * (0.7 + Math.random() * 0.5);
      }
      pLive = PN;
    }

    /* ---------------- loop control: sleeps whenever nothing is moving ---------------- */

    const kick = () => {
      if (raf || !visible || document.hidden || disposed) return;
      last = performance.now();
      acc = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    function busy() {
      if (keys.left || keys.right || keys.jump || aiX >= 0 || aiHold > 0) return true;
      if (!onGround || pVX !== 0 || pLive > 0) return true;
      for (let g = 0; g < N; g++) if (active[g] || bump[g] > 0) return true;
      return false;
    }

    function frame(now: number) {
      raf = 0;
      if (disposed || !lay) return;
      acc += Math.min(0.05, (now - last) / 1000);
      last = now;
      let n = 0;
      while (acc >= STEP && n < 6) {
        step(STEP);
        acc -= STEP;
        n++;
      }
      if (n === 6) acc = 0;
      draw();
      if (busy()) raf = requestAnimationFrame(frame);
    }

    /* ---------------- gameplay ---------------- */

    function bumpBox(g: number) {
      const L = lay!;
      bump[g] = 1;
      if (!everHit[g]) {
        everHit[g] = true;
        hits++;
        hud = `BLOCKS ${hits}/${N}`;
      }
      burst(L.boxX[g] + L.boxW / 2, L.boxBottom, 6, L.vmax * 1.1, 70, 0.45);
      expireAt[g] = simT + LIFE;

      if (active[g]) {
        // Already out: refresh the timer and make the skills hop in place.
        for (let k = 0; k < chips.length; k++) {
          const c = chips[k];
          if (c.g === g && c.on && c.released) {
            c.landed = false;
            c.vy = -(150 + c.i * 14) * (L.Sc / 3);
          }
        }
        return;
      }

      active[g] = true;
      const cx = L.boxX[g] + L.boxW / 2;
      for (let k = 0; k < chips.length; k++) {
        const c = chips[k];
        if (c.g !== g) continue;
        c.on = true;
        c.released = false;
        c.landed = false;
        c.vy = 0;
        c.spawnAt = simT + 0.06 + c.i * STAGGER;
        // Rest in a neat tower: skill 0 on the ground, each next one on top.
        c.restY = L.groundY - (c.i + 1) * L.chipH - c.i * L.chipGap;
        c.x = Math.max(3, Math.min(L.W - 3 - c.w, cx - c.w / 2));
        c.y = L.boxBottom - L.chipH - 2;
      }
      setAnnounce(`${skillGroups[g].name}: ${skillGroups[g].skills.join(", ")}`);
    }

    function vanish(g: number) {
      const L = lay!;
      active[g] = false;
      for (let k = 0; k < chips.length; k++) {
        const c = chips[k];
        if (c.g === g && c.on) {
          burst(c.x + c.w / 2, c.y + L.chipH / 2, 3, 140, -70, 0.5);
          c.on = false;
        }
      }
    }

    function step(dt: number) {
      const L = lay!;
      simT += dt;

      /* ---- input ---- */
      let dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      if (dir !== 0 || jumpEdge) aiX = -1;
      if (aiX >= 0) {
        const dx = aiX - pX;
        if (Math.abs(dx) < 4) {
          if (aiBox >= 0) {
            jumpBuf = 0.14;
            aiHold = 0.5;
          }
          aiX = -1;
        } else dir = dx > 0 ? 1 : -1;
      }
      if (jumpEdge) {
        jumpBuf = 0.14;
        jumpEdge = false;
      }
      const holdJump = keys.jump || aiHold > 0;
      if (aiHold > 0) aiHold -= dt;

      /* ---- horizontal: acceleration + friction ---- */
      if (dir !== 0) {
        const a = (onGround ? L.accel : L.accel * 0.7) * dt;
        const t = dir * L.vmax;
        if (pVX < t) pVX = Math.min(t, pVX + a);
        else if (pVX > t) pVX = Math.max(t, pVX - a);
        facing = dir;
      } else {
        const f = (onGround ? L.fric : L.fric * 0.25) * dt;
        pVX = Math.abs(pVX) <= f ? 0 : pVX - Math.sign(pVX) * f;
      }
      pX += pVX * dt;
      const half = L.pw / 2 + 2;
      if (pX < half) {
        pX = half;
        pVX = 0;
      } else if (pX > L.W - half) {
        pX = L.W - half;
        pVX = 0;
      }
      runPhase += Math.abs(pVX) * dt;

      /* ---- jump: coyote time + input buffer + variable height ---- */
      coyote = onGround ? 0.09 : coyote - dt;
      jumpBuf -= dt;
      if (jumpBuf > 0 && coyote > 0) {
        pVY = -L.v0;
        onGround = false;
        coyote = 0;
        jumpBuf = 0;
        burst(pX, L.groundY, 3, L.vmax * 0.8, -30, 0.3);
      }
      if (!holdJump && pVY < -L.v0 * 0.45) pVY = -L.v0 * 0.45; // released early → short hop

      /* ---- vertical: lighter going up, heavier coming down ---- */
      const prevHead = pY - L.ph;
      pVY += (pVY < 0 ? L.g : L.gFall) * dt;
      pY += pVY * dt;
      const wasGround = onGround;
      if (pY >= L.groundY) {
        if (!wasGround && pVY > L.v0 * 0.35) burst(pX, L.groundY, 4, L.vmax, -40, 0.35);
        pY = L.groundY;
        pVY = 0;
        onGround = true;
      } else onGround = false;

      /* ---- headbutt: only when rising into the underside of a block ---- */
      if (pVY < 0) {
        const head = pY - L.ph;
        for (let g = 0; g < N; g++) {
          const bx = L.boxX[g];
          if (pX + L.head > bx && pX - L.head < bx + L.boxW && prevHead >= L.boxBottom && head < L.boxBottom) {
            pY = L.boxBottom + L.ph;
            pVY = L.v0 * 0.18;
            bumpBox(g);
            break;
          }
        }
      }

      /* ---- blocks, skills, particles ---- */
      for (let g = 0; g < N; g++) if (bump[g] > 0) bump[g] = Math.max(0, bump[g] - dt * 5);

      for (let k = 0; k < chips.length; k++) {
        const c = chips[k];
        if (!c.on) continue;
        if (!c.released) {
          if (simT < c.spawnAt) continue;
          c.released = true;
          c.vy = 40 * (L.Sc / 3);
        }
        if (!c.landed) {
          c.vy += L.chipG * dt;
          c.y += c.vy * dt;
          if (c.y >= c.restY) {
            c.y = c.restY;
            if (c.vy > 160 * (L.Sc / 3)) c.vy *= -0.22; // one small bounce
            else {
              c.vy = 0;
              c.landed = true;
            }
          }
        }
      }

      for (let g = 0; g < N; g++) if (active[g] && simT >= expireAt[g]) vanish(g);

      let live = 0;
      for (let j = 0; j < PN; j++) {
        if (plf[j] <= 0) continue;
        plf[j] -= dt;
        prx[j] += pvx[j] * dt;
        pry[j] += pvy[j] * dt;
        pvy[j] += 700 * dt;
        live++;
      }
      pLive = live;
    }

    /* ---------------- rendering ---------------- */

    function draw() {
      const L = lay;
      if (!L || !bg || !spr) return;
      const dpr = L.dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.imageSmoothingEnabled = false;
      ctx!.clearRect(0, 0, L.W, L.H);
      ctx!.drawImage(bg, 0, 0, L.W, L.H);

      ctx!.textAlign = "left";
      ctx!.textBaseline = "top";
      ctx!.font = L.hudFont;
      ctx!.fillStyle = th.mute;
      ctx!.fillText("WORLD 1-2 · SKILLS", 12, 10);
      ctx!.textAlign = "right";
      ctx!.fillText(hud, L.W - 12, 10);

      // little ▲ hints under blocks nobody has bumped yet
      ctx!.fillStyle = th.ink;
      ctx!.globalAlpha = 0.5;
      for (let g = 0; g < N; g++) {
        if (everHit[g] || active[g]) continue;
        const cx = Math.round(L.boxX[g] + L.boxW / 2);
        const y0 = Math.round(L.boxBottom + 9);
        for (let r = 0; r < 4; r++) {
          const w = 2 + r * 4;
          ctx!.fillRect(cx - w / 2, y0 + r * 2, w, 2);
        }
      }
      ctx!.globalAlpha = 1;

      // skills (behind the blocks so they drop out from underneath)
      ctx!.font = L.chipFont;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (let k = 0; k < chips.length; k++) {
        const c = chips[k];
        if (!c.on || !c.released) continue;
        if (!reduce && expireAt[c.g] - simT < FLICKER && (Math.floor(simT * 12) & 1) === 0) continue;
        const x = Math.round(c.x);
        const y = Math.round(c.y);
        ctx!.globalAlpha = 0.2;
        ctx!.fillStyle = th.ink;
        ctx!.fillRect(x + 2, y + 2, c.w, L.chipH);
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = th.panel;
        ctx!.fillRect(x, y, c.w, L.chipH);
        ctx!.strokeStyle = th.ink;
        ctx!.lineWidth = 2;
        ctx!.strokeRect(x + 1, y + 1, c.w - 2, L.chipH - 2);
        ctx!.fillStyle = th.ink;
        ctx!.fillText(c.label, x + c.w / 2, y + L.chipH / 2 + 1);
      }

      // category blocks
      ctx!.font = L.labelFont;
      const lh = Math.round(L.labelSize * 0.82);
      const w = Math.round(L.boxW);
      for (let g = 0; g < N; g++) {
        const bx = Math.round(L.boxX[g]);
        const off = bump[g] > 0 ? Math.round(-Math.sin((1 - bump[g]) * Math.PI) * 9) : 0;
        const by = L.boxY + off;

        ctx!.globalAlpha = 0.2;
        ctx!.fillStyle = th.ink;
        ctx!.fillRect(bx + 3, by + 3, w, L.bh);
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = active[g] ? th.panel2 : th.panel;
        ctx!.fillRect(bx, by, w, L.bh);
        ctx!.strokeStyle = th.ink;
        ctx!.lineWidth = 3;
        ctx!.strokeRect(bx + 1.5, by + 1.5, w - 3, L.bh - 3);
        ctx!.fillStyle = th.ink;
        ctx!.fillRect(bx + 6, by + 6, 3, 3);
        ctx!.fillRect(bx + w - 9, by + 6, 3, 3);

        const ls = L.labelLines[g];
        const cy = by + (L.bh - 12) / 2 + 1;
        const top = cy - ((ls.length - 1) * lh) / 2;
        for (let i = 0; i < ls.length; i++) ctx!.fillText(ls[i], bx + w / 2, Math.round(top + i * lh));

        if (active[g]) {
          // countdown meter: how long the skills will stay out
          const frac = Math.max(0, Math.min(1, (expireAt[g] - simT) / LIFE));
          ctx!.fillStyle = th.line;
          ctx!.fillRect(bx + 8, by + L.bh - 10, w - 16, 3);
          ctx!.fillStyle = th.ink;
          ctx!.fillRect(bx + 8, by + L.bh - 10, Math.round((w - 16) * frac), 3);
        }
      }

      // player
      const frameIdx = !onGround ? 3 : Math.abs(pVX) > 8 ? ((Math.floor(runPhase / (L.Sc * 6)) & 1) === 0 ? 1 : 2) : 0;
      const pw = SW * L.Sc;
      const ph = SH * L.Sc;
      ctx!.drawImage(
        spr[frameIdx][facing < 0 ? 1 : 0],
        Math.round((pX - pw / 2) * dpr) / dpr,
        Math.round((pY - ph) * dpr) / dpr,
        pw,
        ph
      );

      // particles
      if (pLive > 0) {
        ctx!.fillStyle = th.ink;
        for (let j = 0; j < PN; j++) {
          if (plf[j] <= 0) continue;
          ctx!.globalAlpha = Math.min(1, plf[j] * 3);
          ctx!.fillRect(Math.round(prx[j]), Math.round(pry[j]), 3, 3);
        }
        ctx!.globalAlpha = 1;
      }
    }

    /* ---------------- sizing / theme ---------------- */

    function rebuildArt() {
      if (!lay) return;
      bg = buildBg(lay, th);
      spr = buildSprites(lay, th);
    }

    function relayout(force = false) {
      const W = Math.floor(wrap!.clientWidth);
      if (W < 50) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (!force && lay && lay.W === W && lay.dpr === dpr) return;

      const oldW = lay ? lay.W : 0;
      const L = computeLayout(W, dpr, ctx!);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(L.H * dpr);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${L.H}px`;
      lay = L;

      ctx!.font = L.chipFont;
      for (let k = 0; k < chips.length; k++) {
        chips[k].w = Math.ceil(ctx!.measureText(chips[k].label).width) + L.padX * 2;
        chips[k].on = false;
      }
      active.fill(false);
      bump.fill(0);
      plf.fill(0);
      pLive = 0;

      pX = oldW ? Math.min(W - L.pw, Math.max(L.pw, (pX / oldW) * W)) : W * 0.1;
      pY = L.groundY;
      pVX = 0;
      pVY = 0;
      onGround = true;
      aiX = -1;

      rebuildArt();
      kick();
    }

    /* ---------------- public input api (used by React handlers) ---------------- */

    apiRef.current = {
      setKey(k, down) {
        if (k === "jump" && down && !keys.jump) jumpEdge = true;
        keys[k] = down;
        kick();
      },
      pointer(x) {
        const L = lay;
        if (!L) return;
        let target = x;
        let box = -1;
        for (let g = 0; g < N; g++) {
          const bx = L.boxX[g];
          if (x >= bx - 6 && x <= bx + L.boxW + 6) {
            box = g;
            target = bx + L.boxW / 2;
            break;
          }
        }
        aiX = target;
        aiBox = box;
        kick();
      },
    };

    /* ---------------- observers ---------------- */

    let rz = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rz);
      rz = requestAnimationFrame(() => relayout());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) kick();
        else stop();
      },
      { rootMargin: "120px" }
    );
    io.observe(wrap);

    const mo = new MutationObserver(() => {
      th = readTheme();
      rebuildArt();
      kick();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onVis = () => {
      if (document.hidden) stop();
      else kick();
    };
    document.addEventListener("visibilitychange", onVis);

    // Re-measure once the pixel font is ready so block labels and skill chips fit exactly.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.load) {
      Promise.all([fonts.load(`18px ${FAMILY}`), fonts.load(`14px ${FAMILY}`)])
        .then(() => {
          if (!disposed) relayout(true);
        })
        .catch(() => undefined);
    }

    relayout(true);

    return () => {
      disposed = true;
      stop();
      cancelAnimationFrame(rz);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      apiRef.current = null;
    };
  }, []);

  /* ---------------- React-side input plumbing ---------------- */

  const releaseAll = () => {
    const a = apiRef.current;
    a?.setKey("left", false);
    a?.setKey("right", false);
    a?.setKey("jump", false);
  };

  const keyMap = (k: string): Keys | null => {
    if (k === "ArrowLeft" || k === "a" || k === "A") return "left";
    if (k === "ArrowRight" || k === "d" || k === "D") return "right";
    if (k === "ArrowUp" || k === "w" || k === "W" || k === " ") return "jump";
    return null;
  };

  const hold = (k: Keys) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      apiRef.current?.setKey(k, true);
    },
    onPointerUp: () => apiRef.current?.setKey(k, false),
    onPointerLeave: () => apiRef.current?.setKey(k, false),
    onPointerCancel: () => apiRef.current?.setKey(k, false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  const btn =
    "select-none touch-none border-2 border-ink/40 bg-panel px-5 py-3 font-pixel text-[9px] text-ink active:translate-y-px active:bg-panel2";

  return (
    <div>
      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-label="Skills platformer. Focus this area, then use the arrow keys or A and D to move and Space to jump. Bump a block from below to drop its skills. The full list is also in the skill scroll."
        onKeyDown={(e) => {
          const k = keyMap(e.key);
          if (!k) return;
          e.preventDefault();
          apiRef.current?.setKey(k, true);
        }}
        onKeyUp={(e) => {
          const k = keyMap(e.key);
          if (k) apiRef.current?.setKey(k, false);
        }}
        onBlur={releaseAll}
        className="hard-sm relative overflow-hidden rounded-lg border border-ink/20 bg-panel"
      >
        <canvas
          ref={canvasRef}
          className="block touch-manipulation select-none"
          onPointerDown={(e) => {
            wrapRef.current?.focus({ preventScroll: true });
            const r = e.currentTarget.getBoundingClientRect();
            apiRef.current?.pointer(e.clientX - r.left);
          }}
        />
      </div>

      <p className="mt-2.5 font-mono text-[11px] leading-relaxed text-mute">
        <span className="text-ink">← → / A D</span> move · <span className="text-ink">↑ / W / Space</span> jump ·
        or click a block to walk there and bump it. Jump into a block from below and its skills fall out.
      </p>

      {touch && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button type="button" aria-label="Move left" className={btn} {...hold("left")}>
              ◀
            </button>
            <button type="button" aria-label="Move right" className={btn} {...hold("right")}>
              ▶
            </button>
          </div>
          <button type="button" aria-label="Jump" className={`${btn} px-7`} {...hold("jump")}>
            JUMP
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
