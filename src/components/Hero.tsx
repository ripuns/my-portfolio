import { useEffect, useRef } from "react";
import { profile } from "../data/portfolio";
import { useClock, useHiScore, useMouseTilt, useRotatingText } from "../hooks";

const WORDS = [
  "built with care.",
  "measured and observed.",
  "made easier to maintain.",
  "reviewed, tested, and shipped.",
];

const INVADER_A = [
  "  X     X  ",
  "   X   X   ",
  "  XXXXXXX  ",
  " XX XXXXX  ",
  "XXXXXXXXXXX",
  "X XXXXXXX X",
  "X X     X X",
  "   XX XX   ",
];

const INVADER_B = [
  "  X     X  ",
  "X  X   X  X",
  "X XXXXXXX X",
  "XXX XXXXX X",
  "XXXXXXXXXXX",
  "  XXXXXXX  ",
  "   X   X   ",
  "  XX   XX  ",
];

export default function Hero({
  onGoto,
  onTerminal,
  onPalette,
}: {
  onGoto: (id: string) => void;
  onTerminal: () => void;
  onPalette: () => void;
}) {
  const rotating = useRotatingText(WORDS);
  const clock = useClock();
  const { score, hi, add } = useHiScore();
  const { ref, style, onMove, onLeave } = useMouseTilt(5);

  return (
    <section id="hero" className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* left */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse bg-ink align-middle" />
            Available for internships · Class of 2027
          </p>

          <h1 className="mt-6 text-[clamp(2.9rem,7vw,4.9rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-ink">
            Ripun Sethia
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-mute sm:text-lg">
            I build backend systems{" "}
            <span className="font-serif italic text-ink">{rotating}</span>
            <span className="caret ml-0.5 text-ink">|</span>
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mute">
            BTech IT at VIT Vellore (CGPA 8.58). I work with NestJS, PostgreSQL,
            and LLM evaluation, and previously supported an event platform used by
            more than 5,000 participants.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onGoto("projects")}
              className="pixel-btn rounded-md bg-ink px-6 py-3 text-[14px] font-medium text-base"
            >
              View selected work
            </button>
            <button
              onClick={onTerminal}
              className="rounded-md border border-ink/25 px-5 py-3 font-mono text-[13px] text-ink transition-colors hover:border-ink"
            >
              <span className="mr-1.5 text-mute">$</span>terminal
            </button>
            <button
              onClick={onPalette}
              className="hidden px-2 py-3 font-mono text-[12px] text-mute transition-colors hover:text-ink sm:block"
            >
              or <kbd className="rounded border border-line px-1.5 py-0.5">⌘K</kbd>
            </button>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-3">
            {[
              { k: "Education", v: "VIT Vellore · BTech IT '27" },
              { k: "Location", v: `${profile.location}, India` },
              { k: "Contact", v: profile.email },
            ].map((m) => (
              <div key={m.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{m.k}</dt>
                <dd className="mt-1.5 break-words text-[13.5px] leading-snug text-ink">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right : arcade cabinet */}
        <div style={{ perspective: "1100px" }}>
          <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ ...style, transition: "transform 200ms ease-out" }}
          >
            <div className="hard overflow-hidden rounded-lg border border-ink/20 bg-panel">
              <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 bg-ink/80" />
                <span className="h-2.5 w-2.5 bg-ink/30" />
                <span className="h-2.5 w-2.5 bg-ink/30" />
                <span className="ml-2 truncate font-pixel text-[8px] text-mute">RS-27.PAK</span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tabular-nums text-mute">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                  {clock}
                </span>
              </div>

              <InvaderGame onHit={() => add(1)} />

              <div className="flex items-center justify-between border-t border-line px-3.5 py-2.5 font-pixel text-[8px]">
                <span className="text-mute">
                  SCORE <span className="text-ink">{String(score).padStart(4, "0")}</span>
                </span>
                <span className="text-mute">
                  HI <span className="text-ink">{String(hi).padStart(4, "0")}</span>
                </span>
                <span className={`text-mute ${score === 0 ? "blink-hard" : ""}`}>
                  {score === 0 ? "CLICK TO SHOOT" : "NICE SHOT"}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[11px] text-mute">
            a tiny playable — the invader drifts, you shoot. hi-score persists.
          </p>
        </div>
      </div>
    </section>
  );
}

function InvaderGame({ onHit }: { onHit: () => void }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const hitRef = useRef(onHit);
  hitRef.current = onHit;
  const flash = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 232;
    const H = 168;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;

    const stars = Array.from({ length: 46 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      t: Math.random() * Math.PI * 2,
    }));

    let ix = W / 2;
    let dir = 1;
    let frame = 0;
    let frameT = 0;
    let bullets: { x: number; y: number }[] = [];
    let last = performance.now();
    let raf = 0;
    let dead = false;

    const css = (n: string, f = "#1a1a18") =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;

    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const bx = ((e.clientX - r.left) / r.width) * W;
      bullets.push({ x: bx, y: H - 14 });
    };
    canvas.addEventListener("pointerdown", onDown);

    const drawSprite = (rows: string[], ox: number, oy: number, s: number, color: string) => {
      ctx.fillStyle = color;
      for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
          if (rows[y][x] === "X") ctx.fillRect(Math.round(ox + x * s), Math.round(oy + y * s), s, s);
        }
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      frameT += dt;
      if (frameT > 0.42) {
        frameT = 0;
        frame = 1 - frame;
      }

      const ink = css("--ink");
      const mute = css("--mute", "#73736d");
      const line = css("--line", "#e3e1d8");

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = line;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      // stars
      for (const s of stars) {
        s.t += dt * 2;
        ctx.globalAlpha = 0.35 + Math.abs(Math.sin(s.t)) * 0.5;
        ctx.fillStyle = mute;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1);
      }
      ctx.globalAlpha = 1;

      // invader drift
      if (!dead) {
        ix += dir * dt * 26;
        if (ix > W - 40) dir = -1;
        if (ix < 8) dir = 1;
      }
      const iy = 44 + Math.sin(t / 700) * 6;
      const sprite = frame === 0 ? INVADER_A : INVADER_B;
      if (flash.current > 0) {
        flash.current -= dt;
        ctx.globalAlpha = Math.sin(t / 40) > 0 ? 1 : 0.25;
      }
      drawSprite(sprite, ix, iy, 3, ink);
      ctx.globalAlpha = 1;

      // cannon
      const cx = W / 2;
      drawSprite(["X", "X", "XXX", "XXXXX"], cx - 7, H - 22, 3, ink);

      // bullets
      bullets = bullets.filter((b) => b.y > -8);
      for (const b of bullets) {
        b.y -= dt * 190;
        ctx.fillStyle = ink;
        ctx.fillRect(Math.round(b.x), Math.round(b.y), 2, 6);
        // hit test vs sprite box
        if (!dead && b.x > ix && b.x < ix + 33 && b.y > iy && b.y < iy + 24) {
          dead = true;
          flash.current = 0.5;
          b.y = -20;
          hitRef.current();
          window.setTimeout(() => {
            dead = false;
            ix = 12 + Math.random() * (W - 60);
          }, 450);
        }
      }

      // ground line
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(8, H - 8, W - 16, 1);
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div className="relative bg-base">
      <canvas
        ref={ref}
        className="pixelated block h-44 w-full cursor-crosshair select-none sm:h-52"
        style={{ width: "100%" }}
      />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-60" />
    </div>
  );
}
