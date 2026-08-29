"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Flag, Users, Zap, CheckCircle2, Clock, MapPin, Briefcase } from "lucide-react";

export const Sector3Experience: React.FC = () => {
  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <section id="sector3" className="py-24 bg-[#0A0B12] border-t border-[#1F2130] relative">
      {/* Watermark */}
      <div className="absolute top-0 right-0 p-8 opacity-5 font-racing text-9xl font-black text-white pointer-events-none select-none">
        S3
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#1E2030] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-telemetry text-[#E10600] uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span>SECTOR 3 // RACE HISTORY & PADDOCK CREW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-racing font-extrabold text-white uppercase tracking-tight">
              WORK <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E10600] to-amber-500">EXPERIENCE</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm font-telemetry text-zinc-400 max-w-md">
            Leading engineering squads, optimizing high-load databases, and delivering mission-critical web platforms.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#121422] border-2 border-[#25283E] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Header Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#21243A] gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#E10600] text-white px-2.5 py-0.5 rounded skew-f1 text-xs font-racing font-bold">
                  <span className="unskew">LEADERSHIP ROLE</span>
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[11px] font-telemetry">
                  {exp.statusBadge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-racing font-extrabold text-white mt-2">
                {exp.role}
              </h3>
              <p className="text-sm font-racing text-[#00F5D4] mt-0.5">
                {exp.team} — {exp.organization}
              </p>
            </div>

            <div className="flex flex-col md:items-end text-xs font-telemetry text-zinc-400 space-y-1">
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
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
            {exp.summary}
          </p>

          {/* Pit Stop Telemetry Performance Logs */}
          <h4 className="font-racing font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>PIT STOP TELEMETRY & QUANTIFIABLE IMPACT</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {exp.pitStopLogs.map((log, idx) => (
              <div
                key={idx}
                className="bg-[#17192A] border border-[#272B44] p-5 rounded-2xl flex flex-col justify-between hover:border-[#E10600]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-telemetry bg-[#0E0F1A] text-zinc-400 px-2 py-0.5 rounded border border-[#22253A] uppercase">
                      LOG #{idx + 1}: {log.category}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-racing font-black text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-300">
                    {log.metric}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-3">
                    {log.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#23263E] flex items-center justify-between text-[10px] font-telemetry text-zinc-500">
                  <span>DEPLOYED TO PRODUCTION</span>
                  <span className="text-emerald-400">PASSED QA</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies Used in Paddock */}
          <div className="pt-6 border-t border-[#21243A] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-racing text-zinc-400">
              <Briefcase className="w-4 h-4 text-zinc-500" />
              <span>STACK IN PRODUCTION:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="bg-[#1C1F33] text-zinc-200 text-xs font-telemetry px-3 py-1 rounded-lg border border-[#2C3150]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
