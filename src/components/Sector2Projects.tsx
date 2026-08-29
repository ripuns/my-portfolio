"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { GithubIcon } from "@/components/Icons";
import { ExternalLink, Award, CheckCircle, Layers, Activity, ChevronRight, Sparkles } from "lucide-react";

export const Sector2Projects: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("spineguard");

  const selectedProject =
    PORTFOLIO_DATA.projects.find((p) => p.id === selectedProjectId) || PORTFOLIO_DATA.projects[0];

  return (
    <section id="sector2" className="py-24 bg-[#08090E] border-t border-[#1F2130] relative">
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 p-8 opacity-5 font-racing text-9xl font-black text-white pointer-events-none select-none">
        S2
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#1E2030] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-telemetry text-[#00F5D4] uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
              <span>SECTOR 2 // THE CONSTRUCTORS&apos; FLEET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-racing font-extrabold text-white uppercase tracking-tight">
              FEATURED <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00F5D4] to-cyan-400">PROJECTS</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm font-telemetry text-zinc-400 max-w-md">
            Production-grade systems, patented biomedical IoT wearables, and high-concurrency cloud applications.
          </p>
        </div>

        {/* Project Selector Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PORTFOLIO_DATA.projects.map((project: Project) => {
            const isSelected = project.id === selectedProjectId;

            return (
              <button
                key={project.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedProjectId(project.id);
                }}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#161827] border-[#00F5D4] shadow-xl shadow-cyan-950/30"
                    : "bg-[#10111B] border-[#222436] hover:border-zinc-700 hover:bg-[#131422]"
                }`}
              >
                {/* Accent Top Border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
                    isSelected ? "bg-linear-to-r from-[#00F5D4] to-[#E10600]" : "bg-transparent group-hover:bg-zinc-700"
                  }`}
                />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#E10600] text-white px-2 py-0.5 rounded skew-f1 text-xs font-racing font-black">
                      <span className="unskew">CAR #{project.carNumber}</span>
                    </span>
                    <span className="font-telemetry text-[11px] text-zinc-400">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-telemetry text-[10px] text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/20">
                    {project.status}
                  </span>
                </div>

                <h3 className="font-racing font-bold text-lg text-white group-hover:text-[#00F5D4] transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Badges preview */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.badges.slice(0, 2).map((b, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-telemetry bg-[#1E2133] text-zinc-300 px-2 py-0.5 rounded border border-[#2B2F48]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Full Telemetry Spec Sheet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#121422] border border-[#262A42] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top Badge Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#21243A]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#E10600] text-white px-3 py-1 rounded skew-f1 font-racing font-extrabold text-sm">
                  <span className="unskew">CAR #{selectedProject.carNumber}</span>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="font-telemetry text-xs text-zinc-300 font-semibold uppercase">
                  {selectedProject.category}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="font-telemetry text-xs text-zinc-400">
                  {selectedProject.period}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playClick()}
                    className="bg-[#1B1D2F] hover:bg-[#252840] border border-[#2F3352] text-white px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider flex items-center space-x-2 transition-all hover:border-[#00F5D4] hover:text-[#00F5D4]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>TELEMETRY (CODE)</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playDRSChime()}
                    className="bg-[#00F5D4] hover:bg-[#00DABF] text-black px-4 py-2 rounded-xl text-xs font-racing font-extrabold tracking-wider flex items-center space-x-1.5 transition-transform active:scale-95 shadow-md shadow-cyan-900/30"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>RACE DEMO</span>
                  </a>
                )}
              </div>
            </div>

            {/* Main Project Header */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-4xl font-racing font-black text-white uppercase tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base font-racing text-[#00F5D4] mt-2">
                {selectedProject.tagline}
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4">
                {selectedProject.description}
              </p>
            </div>

            {/* Live Telemetry Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {selectedProject.telemetryStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#181A2D] border border-[#2A2E4B] p-3.5 rounded-xl flex flex-col justify-between"
                >
                  <span className="text-[11px] font-telemetry text-zinc-400 uppercase">
                    {stat.label}
                  </span>
                  <span className="text-lg sm:text-xl font-racing font-extrabold text-white mt-1 text-[#00F5D4]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Deep Highlights & Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              
              {/* Left 7 cols: Key Engineering Highlights */}
              <div className="lg:col-span-7 space-y-3">
                <h4 className="font-racing font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2 mb-3">
                  <Activity className="w-4 h-4 text-[#E10600]" />
                  <span>RACE SPECIFICATIONS & IMPACT</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="bg-[#161829] border border-[#252840] p-3.5 rounded-xl flex items-start space-x-3 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 cols: Architecture Blueprint */}
              <div className="lg:col-span-5 space-y-4">
                <h4 className="font-racing font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2 mb-3">
                  <Layers className="w-4 h-4 text-[#00F5D4]" />
                  <span>SYSTEM BLUEPRINT</span>
                </h4>
                <div className="bg-[#0D0E19] border border-[#212338] p-4 rounded-xl space-y-3">
                  {selectedProject.architectureDetails.map((arch, aIdx) => (
                    <div key={aIdx} className="flex items-start space-x-2 text-xs font-telemetry text-zinc-300">
                      <ChevronRight className="w-3.5 h-3.5 text-[#00F5D4] shrink-0 mt-0.5" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h5 className="font-racing font-semibold text-xs text-zinc-400 uppercase tracking-wider mb-2">
                    COMPONENT STACK
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#1A1D30] border border-[#2C3150] text-zinc-200 text-xs font-telemetry px-2.5 py-1 rounded-lg"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

