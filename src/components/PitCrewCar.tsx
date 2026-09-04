"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { sfx } from "@/lib/audio";

/**
 * Small interactive F1 car that patrols the bottom edge of the viewport.
 * Idle patrol runs on a timed loop (not mousemove) to stay cheap on low-end laptops.
 * Click triggers a boost (speed line burst + horn beep) and a one-off quip.
 */
const QUIPS = [
  "BOX BOX BOX 🏁",
  "DRS ACTIVATED",
  "PUSHING NOW",
  "P1. GAP: +0.0s",
  "TYRES: OPTIMAL",
];

export const PitCrewCar = () => {
  const controls = useAnimationControls();
  const [facingLeft, setFacingLeft] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);
  const quipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boosting = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const patrol = async () => {
      while (!cancelled) {
        const goLeft = Math.random() > 0.5;
        const targetX = goLeft ? 24 : (typeof window !== "undefined" ? window.innerWidth - 72 : 300);
        setFacingLeft(goLeft);

        if (!boosting.current) {
          await controls.start({
            x: targetX,
            transition: { duration: 6 + Math.random() * 4, ease: "linear" },
          });
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000));
      }
    };

    patrol();
    return () => {
      cancelled = true;
    };
  }, [controls]);

  const handleClick = async () => {
    sfx.playDRSChime();
    boosting.current = true;

    if (quipTimer.current) clearTimeout(quipTimer.current);
    setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
    quipTimer.current = setTimeout(() => setQuip(null), 1600);

    await controls.start({
      scale: [1, 1.15, 1],
      rotate: facingLeft ? [0, -6, 0] : [0, 6, 0],
      transition: { duration: 0.4 },
    });
    boosting.current = false;
  };

  return (
    <motion.button
      type="button"
      aria-label="Toggle F1 car boost"
      onClick={handleClick}
      onMouseEnter={() => sfx.playClick()}
      initial={{ x: 24, y: 0 }}
      animate={controls}
      className="fixed bottom-24 left-0 z-40 cursor-pointer select-none touch-none"
      style={{ willChange: "transform" }}
    >
      {quip && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#0a0c10] border border-[#E10600]/40 font-telemetry text-[9px] text-[#E10600] shadow-lg"
        >
          {quip}
        </motion.span>
      )}

      <svg
        width="44"
        height="24"
        viewBox="0 0 44 24"
        className={`drop-shadow-[0_0_6px_rgba(225,6,0,0.5)] transition-transform ${facingLeft ? "-scale-x-100" : ""}`}
      >
        <rect x="6" y="10" width="28" height="7" rx="2" fill="#E10600" />
        <rect x="14" y="5" width="14" height="7" rx="2" fill="#0a0c10" stroke="#E10600" strokeWidth="1" />
        <rect x="2" y="14" width="10" height="4" rx="1.5" fill="#111" />
        <circle cx="11" cy="20" r="4" fill="#111" stroke="#333" strokeWidth="1.5" />
        <circle cx="33" cy="20" r="4" fill="#111" stroke="#333" strokeWidth="1.5" />
        <rect x="34" y="11" width="3" height="5" rx="1" fill="#fff" opacity="0.85" />
      </svg>
    </motion.button>
  );
};
