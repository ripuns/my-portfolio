"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/audio";

interface RacingLightsOverlayProps {
  onComplete: () => void;
}

export const RacingLightsOverlay: React.FC<RacingLightsOverlayProps> = ({ onComplete }) => {
  const [lightsCount, setLightsCount] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);

  useEffect(() => {
    // 5 Red Lights Sequence Timing (Total sequence ~ 2.5 seconds)
    const t1 = setTimeout(() => {
      setLightsCount(1);
      sfx.playLightBeep(false);
    }, 300);

    const t2 = setTimeout(() => {
      setLightsCount(2);
      sfx.playLightBeep(false);
    }, 600);

    const t3 = setTimeout(() => {
      setLightsCount(3);
      sfx.playLightBeep(false);
    }, 900);

    const t4 = setTimeout(() => {
      setLightsCount(4);
      sfx.playLightBeep(false);
    }, 1200);

    const t5 = setTimeout(() => {
      setLightsCount(5);
      sfx.playLightBeep(false);
    }, 1500);

    // Lights Out + Speed Wipe initiation
    const tGo = setTimeout(() => {
      setLightsCount(0); // Lights go out
      setIsWiping(true);
      sfx.playLightBeep(true);
    }, 2000);

    // Dissolve into garage
    const tDissolve = setTimeout(() => {
      setIsDissolving(true);
    }, 2400);

    // Completion callback
    const tEnd = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tGo);
      clearTimeout(tDissolve);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDissolving && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060A] overflow-hidden select-none"
        >
          {/* Carbon Grid Background */}
          <div className="absolute inset-0 bg-carbon opacity-60" />
          <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

          {/* 5-Red-Lights Gantry Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Top Gantry Frame */}
            <div className="bg-[#0E1018] border-2 border-[#24273C] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center space-x-3 sm:space-x-6">
              {[1, 2, 3, 4, 5].map((lightIndex) => {
                const isLit = lightsCount >= lightIndex;

                return (
                  <div
                    key={lightIndex}
                    className="flex flex-col items-center space-y-2 bg-[#08090E] p-2 sm:p-3 rounded-xl border border-zinc-800"
                  >
                    {/* Upper Red Bulb */}
                    <div
                      className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-100 flex items-center justify-center ${
                        isLit
                          ? "bg-[#E10600] border-[#FF1801] shadow-[0_0_30px_#E10600]"
                          : "bg-[#141622] border-zinc-800"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                          isLit ? "bg-white/90" : "bg-zinc-900"
                        }`}
                      />
                    </div>

                    {/* Lower Sub-Bulb */}
                    <div
                      className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-100 flex items-center justify-center ${
                        isLit
                          ? "bg-[#E10600] border-[#FF1801] shadow-[0_0_30px_#E10600]"
                          : "bg-[#141622] border-zinc-800"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                          isLit ? "bg-white/90" : "bg-zinc-900"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status Telemetry Text */}
            <div className="mt-6 font-telemetry text-xs sm:text-sm tracking-widest uppercase text-center">
              {isWiping ? (
                <span className="text-[#00F5D4] font-bold animate-pulse flex items-center justify-center space-x-2">
                  <span>🏁 LIGHTS OUT AND AWAY WE GO!</span>
                </span>
              ) : (
                <span className="text-zinc-400">
                  SYSTEM STARTUP SEQUENCE // CAR #27
                </span>
              )}
            </div>
          </motion.div>

          {/* 2D Speed-Wipe Effect */}
          {isWiping && (
            <>
              {/* Horizontal Speed Streaks */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-around opacity-75"
              >
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-gradient-to-r from-transparent via-[#00F5D4] to-transparent"
                    style={{
                      width: `${60 + (i % 5) * 10}%`,
                      marginLeft: `${(i % 3) * 15}%`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Radial Flash Wipe */}
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00F5D4]/40 via-[#E10600]/30 to-transparent blur-3xl z-15 pointer-events-none"
              />
            </>
          )}

          {/* Skip Button for convenience */}
          <button
            onClick={() => {
              sfx.playClick();
              onComplete();
            }}
            className="absolute bottom-6 right-6 z-30 font-racing text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider bg-[#10121C] px-3 py-1.5 rounded-lg border border-zinc-800"
          >
            Skip Intro ➔
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

