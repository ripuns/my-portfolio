"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-driven telemetry field with two interacting systems:
 *
 * 1. "Atoms" — cyan particles that drift, collide elastically, and on
 *    collision either merge (combine mass/radius) or split (spawn an extra
 *    smaller particle), so population count drifts organically instead of
 *    holding a fixed steady state. A hard ceiling exists purely as a perf
 *    safety valve, not a target count.
 * 2. An F1 exhaust-style fluid trail that follows the cursor (soft additive
 *    red/orange blobs that fade over ~0.5s) and pushes nearby atoms away as
 *    it passes through them.
 *
 * Everything runs in one rAF loop writing directly to canvas — no React
 * state/re-renders per frame. Pauses when the tab is hidden.
 */
const INITIAL_COUNT_DESKTOP = 70;
const INITIAL_COUNT_MOBILE = 28;
const MAX_PARTICLES = 220; // hard safety ceiling only
const MIN_RADIUS = 1.4;
const MAX_RADIUS = 5;
const LINK_DIST = 110;
const ATOM_COLOR = "56, 214, 255"; // cyan — distinct from the red/orange fluid trail

const TRAIL_MAX_POINTS = 26;
const TRAIL_LIFE_MS = 520;
const TRAIL_RADIUS = 34;
const TRAIL_PUSH_RADIUS = 70;

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  mass: number;
  cooldown: number; // frames until this atom can split/merge again
}

interface TrailPoint {
  x: number;
  y: number;
  born: number;
  speed: number;
}

const massOf = (r: number) => r * r;
const radiusFromMass = (m: number) => Math.sqrt(m);

export const TelemetryParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999 };
    let atoms: Atom[] = [];
    let trail: TrailPoint[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnAtom = (x?: number, y?: number, r?: number): Atom => {
      const radius = r ?? Math.random() * 2 + MIN_RADIUS;
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: radius,
        mass: massOf(radius),
        cooldown: 0,
      };
    };

    const spawnAll = () => {
      const count = width < 768 ? INITIAL_COUNT_MOBILE : INITIAL_COUNT_DESKTOP;
      atoms = Array.from({ length: count }, () => spawnAtom());
    };

    resize();
    spawnAll();

    const handleResize = () => {
      resize();
      spawnAll();
    };
    const handlePointerMove = (e: PointerEvent) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const speed = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
      trail.push({ x: mouse.x, y: mouse.y, born: performance.now(), speed: Math.min(speed, 60) });
      if (trail.length > TRAIL_MAX_POINTS) trail.shift();
    };
    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    let raf: number | null = null;
    let running = true;

    const stepAtoms = () => {
      for (const a of atoms) {
        a.vx *= 0.995;
        a.vy *= 0.995;
        a.x += a.vx;
        a.y += a.vy;
        if (a.cooldown > 0) a.cooldown--;

        if (a.x < 0) { a.x = 0; a.vx *= -1; }
        if (a.x > width) { a.x = width; a.vx *= -1; }
        if (a.y < 0) { a.y = 0; a.vy *= -1; }
        if (a.y > height) { a.y = height; a.vy *= -1; }
      }

      // fluid trail pushes atoms
      const now = performance.now();
      for (const t of trail) {
        const age = now - t.born;
        if (age > TRAIL_LIFE_MS) continue;
        const strength = (1 - age / TRAIL_LIFE_MS) * (0.4 + t.speed / 60);
        for (const a of atoms) {
          const dx = a.x - t.x;
          const dy = a.y - t.y;
          const dist = Math.hypot(dx, dy);
          if (dist < TRAIL_PUSH_RADIUS && dist > 0.01) {
            const force = (1 - dist / TRAIL_PUSH_RADIUS) * strength * 0.9;
            a.vx += (dx / dist) * force;
            a.vy += (dy / dist) * force;
          }
        }
      }

      // atom-atom elastic collisions + split/merge
      const next: Atom[] = [];
      const consumed = new Set<number>();

      for (let i = 0; i < atoms.length; i++) {
        if (consumed.has(i)) continue;
        const a = atoms[i];
        let merged = false;

        for (let j = i + 1; j < atoms.length; j++) {
          if (consumed.has(j)) continue;
          const b = atoms[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.r + b.r;
          if (dist >= minDist || dist === 0) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const relVx = a.vx - b.vx;
          const relVy = a.vy - b.vy;
          const impactSpeed = Math.abs(relVx * nx + relVy * ny);

          const canReact = a.cooldown === 0 && b.cooldown === 0 && atoms.length < MAX_PARTICLES;

          if (canReact && impactSpeed > 1.4 && Math.random() < 0.5) {
            // MERGE: combine mass/momentum into one atom, conserve momentum
            const totalMass = a.mass + b.mass;
            const vx = (a.vx * a.mass + b.vx * b.mass) / totalMass;
            const vy = (a.vy * a.mass + b.vy * b.mass) / totalMass;
            const r = Math.min(radiusFromMass(totalMass), MAX_RADIUS * 1.4);
            next.push({
              x: (a.x + b.x) / 2,
              y: (a.y + b.y) / 2,
              vx, vy,
              r,
              mass: massOf(r),
              cooldown: 40,
            });
            consumed.add(i);
            consumed.add(j);
            merged = true;
            break;
          } else if (canReact && impactSpeed > 0.6 && a.r > MIN_RADIUS * 1.6 && Math.random() < 0.15) {
            // SPLIT: this atom fractures into two smaller ones, pushed apart along collision normal
            const childR = Math.max(a.r / 1.5, MIN_RADIUS);
            const speed = Math.max(impactSpeed * 0.5, 0.6);
            next.push({
              x: a.x - nx * 2, y: a.y - ny * 2,
              vx: a.vx - nx * speed, vy: a.vy - ny * speed,
              r: childR, mass: massOf(childR), cooldown: 40,
            });
            next.push({
              x: a.x + nx * 2, y: a.y + ny * 2,
              vx: a.vx + nx * speed * 0.6, vy: a.vy + ny * speed * 0.6,
              r: childR * 0.85, mass: massOf(childR * 0.85), cooldown: 40,
            });
            consumed.add(i);
            merged = true;

            // still bounce b normally since it wasn't consumed
            b.vx += nx * impactSpeed * 0.5;
            b.vy += ny * impactSpeed * 0.5;
            break;
          } else {
            // ELASTIC BOUNCE (equal-mass approximation along normal)
            const p = 2 * (relVx * nx + relVy * ny) / (a.mass + b.mass);
            a.vx -= p * b.mass * nx;
            a.vy -= p * b.mass * ny;
            b.vx += p * a.mass * nx;
            b.vy += p * a.mass * ny;

            const overlap = minDist - dist;
            a.x -= (nx * overlap) / 2;
            a.y -= (ny * overlap) / 2;
            b.x += (nx * overlap) / 2;
            b.y += (ny * overlap) / 2;
          }
        }

        if (!merged) next.push(a);
      }

      atoms = next.length > 0 ? next : atoms;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. F1 exhaust fluid trail (additive blending, fades over TRAIL_LIFE_MS)
      const now = performance.now();
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const t of trail) {
        const age = now - t.born;
        if (age > TRAIL_LIFE_MS) continue;
        const lifeFrac = 1 - age / TRAIL_LIFE_MS;
        const radius = TRAIL_RADIUS * (0.5 + t.speed / 60) * (0.4 + lifeFrac * 0.6);
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, radius);
        grad.addColorStop(0, `rgba(255, 120, 40, ${0.32 * lifeFrac})`);
        grad.addColorStop(0.5, `rgba(225, 6, 0, ${0.18 * lifeFrac})`);
        grad.addColorStop(1, "rgba(225, 6, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. connecting lines between nearby atoms
      ctx.lineWidth = 1;
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a = atoms[i];
          const b = atoms[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${ATOM_COLOR}, ${(1 - d / LINK_DIST) * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 3. atoms
      for (const a of atoms) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ATOM_COLOR}, 0.75)`;
        ctx.shadowColor = `rgba(${ATOM_COLOR}, 0.8)`;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduceMotion) stepAtoms();
      trail = trail.filter((t) => now - t.born <= TRAIL_LIFE_MS);

      if (running) raf = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (!reduceMotion) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      running = false;
    }

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
