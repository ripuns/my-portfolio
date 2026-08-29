"use client";

import React from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA, Achievement } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { Trophy, Award, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export const PodiumAchievements: React.FC = () => {
  const triggerPodiumConfetti = () => {
    sfx.playDRSChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E10600", "#FFD166", "#00F5D4", "#FFFFFF"],
    });
  };

  const getIcon = (type: Achievement["type"]) => {
    switch (type) {
      case "PATENT":
        return <Award className="w-6 h-6 text-amber-400" />;
      case "HACKATHON PODIUM":
        return <Trophy className="w-6 h-6 text-emerald-400" />;
      case "CERTIFICATION":
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
      case "ACADEMIC":
        return <BookOpen className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="podium" className="py-24 bg-[#08090E] border-t border-[#1F2130] relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#1E2030] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-telemetry text-amber-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>THE PODIUM // TROPHY ROOM & ACCOLADES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-racing font-extrabold text-white uppercase tracking-tight">
              PATENTS & <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-yellow-300 to-amber-500">ACHIEVEMENTS</span>
            </h2>
          </div>
          
          {/* Confetti Trigger Button */}
          <button
            onClick={triggerPodiumConfetti}
            className="mt-4 sm:mt-0 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-racing font-black text-xs tracking-wider px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-amber-950/40 transition-transform active:scale-95"
          >
            <Trophy className="w-4 h-4" />
            <span>CELEBRATE PODIUM 🍾</span>
          </button>
        </div>

        {/* Podium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.achievements.map((item: Achievement, index: number) => {
            const isPatent = item.type === "PATENT";
            const isHackathon = item.type === "HACKATHON PODIUM";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all relative overflow-hidden group ${
                  isPatent
                    ? "bg-linear-to-br from-[#1C1810] to-[#12131F] border-amber-500/40 shadow-xl shadow-amber-950/20"
                    : isHackathon
                    ? "bg-linear-to-br from-[#101C17] to-[#12131F] border-emerald-500/40 shadow-xl shadow-emerald-950/20"
                    : "bg-[#121422] border-[#25283E] hover:border-zinc-700"
                }`}
              >
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-[#0D0E17] border border-[#212338]">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <span className="text-[10px] font-telemetry text-zinc-400 uppercase">
                        {item.issuer}
                      </span>
                      <div className="font-racing font-extrabold text-xs text-white">
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-racing font-bold text-[10px] px-2.5 py-1 rounded-full border ${
                      isPatent
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : isHackathon
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-purple-500/20 text-purple-300 border-purple-500/40"
                    }`}
                  >
                    {item.rankBadge}
                  </span>
                </div>

                {/* Main Title */}
                <h3 className="text-xl font-racing font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-2 border-t border-[#23263E] pt-4">
                  {item.keyTakeaways.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2 text-xs font-telemetry text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Trophy Laurel Wreath Watermark */}
                <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
                  <Trophy className="w-36 h-36 text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
