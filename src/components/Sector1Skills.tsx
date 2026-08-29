"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, SkillCategory } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { Cpu, Wind, Zap, Wrench, CheckCircle2, Sparkles } from "lucide-react";

export const Sector1Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const icons = [
    <Cpu key="ice" className="w-4 h-4 text-[#E10600]" />,
    <Wind key="aero" className="w-4 h-4 text-[#00F5D4]" />,
    <Zap key="pwr" className="w-4 h-4 text-amber-400" />,
    <Wrench key="pit" className="w-4 h-4 text-purple-400" />,
  ];

  return (
    <section id="sector1" className="py-20 bg-[#0A0B10] border-t border-[#1F2130] relative">
      {/* Decorative Track Watermark */}
      <div className="absolute top-0 right-0 p-8 opacity-5 font-racing text-9xl font-black text-white pointer-events-none select-none">
        S1
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#1E2030] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-telemetry text-[#E10600] uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span>SECTOR 1 // POWERTRAIN & AERODYNAMICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-racing font-extrabold text-white uppercase tracking-tight">
              TECHNICAL <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E10600] to-amber-500">SPECIFICATIONS</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm font-telemetry text-zinc-400 max-w-md">
            Engineered for high throughput, sub-second latency, and fault-tolerant full-stack operations.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {PORTFOLIO_DATA.skillSectors.map((sector: SkillCategory, index: number) => (
            <button
              key={sector.sector}
              onClick={() => {
                sfx.playClick();
                setActiveTab(index);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                activeTab === index
                  ? "bg-[#161826] border-[#E10600] shadow-lg shadow-red-950/40"
                  : "bg-[#11121B] border-[#222436] hover:border-zinc-700 hover:bg-[#141522]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-telemetry text-zinc-500 uppercase">{sector.sector}</span>
                {icons[index]}
              </div>
              <h3 className="font-racing font-bold text-xs sm:text-sm text-white truncate">
                {sector.systemName.split("(")[0]}
              </h3>
              <p className="text-[10px] font-telemetry text-zinc-400 mt-1 truncate">
                {sector.f1Analogy}
              </p>
            </button>
          ))}
        </div>

        {/* Active Tab System Specs Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[#12131F] border border-[#26283C] rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#202235] gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#E10600] text-white px-2 py-0.5 rounded text-[10px] font-racing font-bold">
                  {PORTFOLIO_DATA.skillSectors[activeTab].sector}
                </span>
                <h3 className="text-xl sm:text-2xl font-racing font-bold text-white">
                  {PORTFOLIO_DATA.skillSectors[activeTab].systemName}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-telemetry text-[#00F5D4] mt-1">
                F1 Architecture Mapping: {PORTFOLIO_DATA.skillSectors[activeTab].f1Analogy}
              </p>
            </div>
            <p className="text-xs font-telemetry text-zinc-400 max-w-lg bg-[#0C0D15] p-3 rounded-lg border border-[#1C1E2D]">
              {PORTFOLIO_DATA.skillSectors[activeTab].description}
            </p>
          </div>

          {/* Skills Gauges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PORTFOLIO_DATA.skillSectors[activeTab].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="bg-[#171928] border border-[#27293E] p-4 rounded-xl hover:border-[#E10600]/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-racing font-bold text-sm text-white group-hover:text-[#00F5D4] transition-colors">
                      {skill.name}
                    </span>
                    {skill.highlight && (
                      <span className="bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/30 text-[9px] font-telemetry px-1.5 py-0.2 rounded">
                        TOP RPM
                      </span>
                    )}
                  </div>
                  <span className="font-telemetry text-xs font-bold text-zinc-300">
                    {skill.level}% EFFICIENCY
                  </span>
                </div>

                {/* Animated Telemetry Bar */}
                <div className="w-full h-2 bg-[#0E0F18] rounded-full overflow-hidden p-0.5 border border-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                    className="h-full rounded-full bg-linear-to-r from-[#E10600] via-[#FF3B30] to-[#00F5D4]"
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[10px] font-telemetry text-zinc-400">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00F5D4]" />
                    <span>{skill.telemetryTag}</span>
                  </span>
                  <span className="text-zinc-500">MAX REDLINE</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="mt-8 pt-6 border-t border-[#202235] flex flex-wrap items-center justify-between gap-4 text-xs font-telemetry text-zinc-400">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tested in High-Concurrency Environments & Hackathons</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-emerald-400">● 100% Type-Safe</span>
              <span className="text-[#00F5D4]">● Zero Memory Leaks</span>
              <span className="text-amber-400">● Production Ready</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
