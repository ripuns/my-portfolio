import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; s: number };

/** Minimal retro backdrop: faint dots + slow pixel drift + CRT dressing. */
export default function Backdrop({ crt, paused = false }: { crt: boolean; paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let parts: P[] = [];
    let raf = 0;

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.round((w * h) / 26000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        s: Math.random() > 0.85 ? 3 : 2,
      }));
    };

    build();
    const onResize = () => build();
    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });

    const ink = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1a1a18";

    const draw = () => {
      // Skip all work while the canvas is hidden (TV preview) or the tab is in
      // the background — this is the biggest source of preview jank.
      if (pausedRef.current || document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      const c = ink();
      for (const p of parts) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 20000 && d2 > 1) {
          const d = Math.sqrt(d2);
          p.vx += (dx / d) * 0.02;
          p.vy += (dy / d) * 0.02;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = c;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="dots-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_25%,transparent_100%)]" />
      {/* very faint, always-on TV static */}
      <div
        className="static-tile absolute -inset-[15%] opacity-[0.045]"
        style={{ animation: "staticShift 0.5s steps(3) infinite" }}
      />
      <canvas ref={canvasRef} className="pixelated absolute inset-0 h-full w-full" />
      {crt && (
        <>
          <div className="scanlines absolute inset-0 opacity-70" />
          <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--ink)_7%,transparent)] to-transparent vhs-line" />
          <div className="absolute inset-0 crt-flicker bg-[radial-gradient(ellipse_at_center,transparent_62%,rgb(0_0_0/0.10)_100%)]" />
        </>
      )}
    </div>
  );
}
