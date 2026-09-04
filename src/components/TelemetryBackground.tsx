"use client";

import { useEffect, useRef } from "react";
import { TelemetryParticles } from "@/components/TelemetryParticles";

/**
 * Full-screen ambient background: grid lines, a cursor-following red glow,
 * and a canvas particle field (see TelemetryParticles). The glow position is
 * written directly to CSS custom properties inside a rAF loop (no React
 * state/re-render per mousemove), so it stays cheap on low-end laptops.
 */
export const TelemetryBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.3 });
  const current = useRef({ x: 0.5, y: 0.3 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.35;
      current.current.y += (target.current.y - current.current.y) * 0.35;
      const el = glowRef.current;
      if (el) {
        el.style.setProperty("--glow-x", `${current.current.x * 100}%`);
        el.style.setProperty("--glow-y", `${current.current.y * 100}%`);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="bg-telemetry-grid" />
      <div ref={glowRef} className="bg-telemetry-glow bg-telemetry-glow--cursor" />
      <TelemetryParticles />
    </div>
  );
};
