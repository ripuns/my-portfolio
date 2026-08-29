"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, SkillCategory } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import {
  ArrowLeft,
  Cpu,
  Briefcase,
  Activity,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Layers,
} from "lucide-react";

interface PitwallViewProps {
  initialTab: "skills" | "experience";
  onReturnToGarage: () => void;
}

export const PitwallView: React.FC<PitwallViewProps> = ({
  initialTab,
  onReturnToGarage,
}) => {
  const [activeTab, setActiveTab] = useState<"skills" | "experience">(initialTab);
  const [activeSkillSector, setActiveSkillSector] = useState<number>(0);

  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <div className="relative w-full min-h-screen bg-[#07080D] flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. PITWALL TELEMETRY STATION BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Multi-Screen Data Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080911] via-[#0D101C] to-[#040509]" />
        
        {/* Scanlines & Telemetry Grid Lines */}
        <div className="absolute inset-0 scanline opacity-30" />
        <div className="absolute inset-0 bg-carbon opacity-40" />

        {/* Ambient Telemetry Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#E10600]/10 via-[#00F5D4]/10 to-transparent blur-[140px]" />
      </div>

      {/* 2. TOP PITWALL HUD & NAVIGATION */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between">
        
        {/* Return to Garage Action */}
        <button
          onClick={() => {
            sfx.playClick();
            onReturnToGarage();
          }}
          className="bg-[#111320]/90 hover:bg-[#1A1E33] border border-[#23273E] hover:border-[#E10600] text-white px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider flex items-center space-x-2 transition-all shadow-lg group"
        >
          <ArrowLeft className="w-4 h-4 text-[#E10600] group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO GARAGE</span>
        </button>

        {/* View Toggle Tabs: Skills vs Experience */}
        <div className="flex items-center space-x-2 bg-[#10121F] border border-[#23273E] p-1 rounded-2xl">
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab("skills");
            }}
            className={`px-4 py-1.5 rounded-xl font-racing text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "skills"
                ? "bg-[#E10600] text-white shadow-md shadow-red-950/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>SKILLS TELEMETRY</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab("experience");
            }}
            className={`px-4 py-1.5 rounded-xl font-racing text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === "experience"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-950/40 font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>WORK EXPERIENCE LOGS</span>
          </button>
        </div>

        {/* Status Pill */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#111320]/90 border border-[#23273E] px-3.5 py-2 rounded-xl font-telemetry text-xs text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
          <span className="text-[#00F5D4] font-semibold">PITWALL DATA LINK LIVE</span>
        </div>
      </header>

      {/* 3. MAIN PITWALL TELEMETRY DISPLAY */}
      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 my-auto py-6">
        
        {/* VIEW 1: SKILLS TELEMETRY */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-[#0C0E1A]/95 backdrop-blur-xl border-2 border-[#242944] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#1E233B] gap-2">
              <div>
                <span className="text-[10px] font-telemetry text-[#00F5D4] uppercase tracking-widest block">
                  TELEMETRY BENCHMARK // POWERTRAIN & CHASSIS
                </span>
                <h2 className="text-2xl sm:text-3xl font-racing font-extrabold text-white uppercase mt-0.5">
                  TECHNICAL <span className="text-[#E10600]">SYSTEMS SPECS</span>
                </h2>
              </div>

              {/* Sub-sector tabs */}
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skillSectors.map((sector: SkillCategory, idx: number) => (
                  <button
                    key={sector.sector}
                    onClick={() => {
                      sfx.playClick();
                      setActiveSkillSector(idx);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-racing transition-all ${
                      activeSkillSector === idx
                        ? "bg-[#E10600] text-white font-bold"
                        : "bg-[#141829] text-zinc-400 hover:text-white border border-[#232945]"
                    }`}
                  >
                    {sector.systemName.split("(")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active System Description */}
            <div className="bg-[#121626] border border-[#202744] p-3.5 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-telemetry">
              <span className="text-white font-bold">
                {PORTFOLIO_DATA.skillSectors[activeSkillSector].systemName}
              </span>
              <span className="text-[#00F5D4]">
                F1 Mapping: {PORTFOLIO_DATA.skillSectors[activeSkillSector].f1Analogy}
              </span>
            </div>

            {/* Skills Gauges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.skillSectors[activeSkillSector].skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-[#141728] border border-[#232944] p-3.5 rounded-2xl flex flex-col justify-between hover:border-[#00F5D4]/50 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-racing font-bold text-sm text-white group-hover:text-[#00F5D4] transition-colors">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/40 text-[9px] font-telemetry px-1.5 py-0.2 rounded">
                          REDLINE
                        </span>
                      )}
                    </div>
                    <span className="font-telemetry text-xs font-bold text-zinc-300">
                      {skill.level}% EFFICIENCY
                    </span>
                  </div>

                  {/* Telemetry Gauge Bar */}
                  <div className="w-full h-2 bg-[#090A12] rounded-full overflow-hidden p-0.5 border border-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.6, delay: sIdx * 0.04 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#E10600] via-[#FF3B30] to-[#00F5D4]"
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
          </motion.div>
        )}

        {/* VIEW 2: WORK EXPERIENCE TELEMETRY */}
        {activeTab === "experience" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-[#0C0E1A]/95 backdrop-blur-xl border-2 border-[#242944] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 mb-6 border-b border-[#1E233B] gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-[#E10600] text-white px-2.5 py-0.5 rounded skew-f1 text-xs font-racing font-bold">
                    <span className="unskew">PADDOCK CREW LEAD</span>
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px] font-telemetry">
                    {exp.statusBadge}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-racing font-extrabold text-white uppercase mt-2">
                  {exp.role}
                </h2>
                <p className="text-xs sm:text-sm font-racing text-[#00F5D4] mt-0.5">
                  {exp.team} — {exp.organization}
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs font-telemetry text-zinc-400 space-y-1">
                <span className="flex items-center space-x-1.5 text-zinc-200">
                  <Clock className="w-3.5 h-3.5 text-[#E10600]" />
                  <span className="font-semibold">{exp.period}</span>
                </span>
                <span className="flex items-center space-x-1.5 text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              {exp.summary}
            </p>

            {/* Pit Stop Telemetry Performance Logs */}
            <h4 className="font-racing font-bold text-xs text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>QUANTIFIABLE PIT STOP PERFORMANCE LOGS</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
              {exp.pitStopLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="bg-[#141728] border border-[#232944] p-4 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-telemetry bg-[#090A12] text-zinc-400 px-2 py-0.5 rounded uppercase">
                        LOG #{idx + 1}: {log.category}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5D4]" />
                    </div>
                    <div className="text-lg sm:text-xl font-racing font-black text-white">
                      {log.metric}
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-2">
                      {log.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#1E233B] text-[10px] font-telemetry text-emerald-400">
                    STATUS: PASSED BENCHMARK
                  </div>
                </div>
              ))}
            </div>

            {/* Tech in Production */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#1E233B]">
              <span className="text-xs font-racing text-zinc-400">PADDOCK TECH STACK:</span>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-[#161B30] text-zinc-200 text-xs font-telemetry px-2.5 py-0.5 rounded-lg border border-[#2B345C]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* 4. PITWALL DESK FOOTER */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-6 flex items-center justify-between text-xs font-telemetry text-zinc-500">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>DATA TELEMETRY REFRESH: 100HZ REAL-TIME</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-zinc-400">DRIVER #27 • VIT VELLORE</span>
        </div>
      </footer>

    </div>
  );
};

