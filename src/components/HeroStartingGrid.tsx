"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { Download, Radio, ChevronDown, Award, Zap, ShieldCheck, Trophy, Sparkles } from "lucide-react";

export const HeroStartingGrid: React.FC = () => {
  const [lightsCount, setLightsCount] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);

  // 5 Red Lights Sequence
  useEffect(() => {
    const timer1 = setTimeout(() => { setLightsCount(1); sfx.playLightBeep(false); }, 400);
    const timer2 = setTimeout(() => { setLightsCount(2); sfx.playLightBeep(false); }, 800);
    const timer3 = setTimeout(() => { setLightsCount(3); sfx.playLightBeep(false); }, 1200);
    const timer4 = setTimeout(() => { setLightsCount(4); sfx.playLightBeep(false); }, 1600);
    const timer5 = setTimeout(() => { setLightsCount(5); sfx.playLightBeep(false); }, 2000);
    const timerOut = setTimeout(() => {
      setLightsOut(true);
      sfx.playLightBeep(true);
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timerOut);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center bg-carbon overflow-hidden">
      {/* Background Neon Track Grid Lines */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-40"></div>
      
      {/* Decorative Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-linear-to-r from-[#E10600]/15 via-[#00F5D4]/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* 5 RED LIGHTS GANTRY */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#12131C] border border-[#2B2D3F] px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 sm:space-x-5">
            {[1, 2, 3, 4, 5].map((light) => {
              const isLit = lightsCount >= light && !lightsOut;
              const isGreenGo = lightsOut;

              return (
                <div key={light} className="flex flex-col items-center space-y-1.5">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-150 flex items-center justify-center ${
                      isGreenGo
                        ? "bg-[#00F5D4] border-[#00F5D4] shadow-[0_0_15px_#00F5D4]"
                        : isLit
                        ? "bg-[#E10600] border-[#FF1801] shadow-[0_0_15px_#E10600]"
                        : "bg-[#1E202C] border-zinc-700"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                        isGreenGo ? "bg-white" : isLit ? "bg-white/80" : "bg-zinc-800"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2 font-telemetry text-xs tracking-widest uppercase">
            {lightsOut ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[#00F5D4] font-bold flex items-center space-x-1"
              >
                <span>🏁 IT&apos;S LIGHTS OUT AND AWAY WE GO!</span>
              </motion.span>
            ) : (
              <span className="text-zinc-400">FORMATION LAP // STARTING GRID</span>
            )}
          </div>
        </div>

        {/* HERO MAIN COCKPIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Driver Bio & Headline (Left 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Super-tag */}
            <div className="inline-flex items-center space-x-2 bg-[#1A1B28] border border-[#2C2E42] px-3.5 py-1.5 rounded-full text-xs font-telemetry text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
              <span className="text-[#00F5D4] font-semibold">POLE POSITION</span>
              <span className="text-zinc-500">•</span>
              <span>SCUDERIA RIPUN #27</span>
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-racing font-black tracking-tight text-white uppercase leading-none">
                RIPUN <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E10600] via-[#FF3B30] to-amber-500">SETHIA</span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-racing text-zinc-300 tracking-wide font-medium">
                {PORTFOLIO_DATA.driver.role}
              </p>
            </div>

            {/* Bio Narrative */}
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {PORTFOLIO_DATA.driver.shortBio}
            </p>

            {/* Academic Track Callout */}
            <div className="flex items-center space-x-3 text-xs sm:text-sm font-telemetry bg-[#141522] border border-[#232536] p-3 rounded-lg text-zinc-300">
              <ShieldCheck className="w-5 h-5 text-[#00F5D4] shrink-0" />
              <div>
                <span className="text-white font-semibold">{PORTFOLIO_DATA.driver.education.institution}</span>
                <span className="text-zinc-500 mx-2">•</span>
                <span className="text-amber-400 font-bold">CGPA: {PORTFOLIO_DATA.driver.education.cgpa}</span>
                <span className="text-zinc-500 mx-2">•</span>
                <span className="text-zinc-400">Class of 2027</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <a
                href={PORTFOLIO_DATA.driver.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playDRSChime()}
                className="bg-[#E10600] hover:bg-[#FF1801] text-white px-6 py-3 rounded-xl font-racing font-bold text-sm tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-red-900/40 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>

              <a
                href="#pitwall"
                onClick={() => sfx.playRadioStatic()}
                className="bg-[#191A27] hover:bg-[#232538] border border-[#2F3249] text-white px-6 py-3 rounded-xl font-racing font-bold text-sm tracking-wider flex items-center space-x-2 transition-all hover:border-[#00F5D4] hover:text-[#00F5D4]"
              >
                <Radio className="w-4 h-4 text-[#00F5D4]" />
                <span>TEAM RADIO (CONTACT)</span>
              </a>

              <a
                href="#sector2"
                onClick={() => sfx.playClick()}
                className="bg-transparent hover:bg-zinc-800/40 border border-zinc-700/60 text-zinc-300 px-5 py-3 rounded-xl font-racing font-medium text-sm tracking-wider flex items-center space-x-2 transition-all hover:text-white"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>PROJECTS</span>
              </a>
            </div>
          </motion.div>

          {/* Telemetry Dashboard Card (Right 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#12131D] border-2 border-[#25283C] rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-[#E10600]/60 transition-colors">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#23263B]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-sm bg-[#E10600]" />
                  <span className="font-racing font-bold text-xs tracking-widest text-white uppercase">
                    LIVE TELEMETRY HUD
                  </span>
                </div>
                <span className="font-telemetry text-[11px] text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/20">
                  SENSORS ACTIVE
                </span>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {PORTFOLIO_DATA.quickMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className={`bg-[#171926] border border-[#26283C] p-3 rounded-xl flex flex-col justify-between ${
                      idx === 0 ? "col-span-2 bg-linear-to-r from-amber-950/20 to-[#171926] border-amber-500/30" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-telemetry text-zinc-400">
                      <span>{metric.label}</span>
                      {idx === 0 && <Award className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-racing font-black ${metric.color}`}>
                        {metric.value}
                      </span>
                      <p className="text-[11px] font-telemetry text-zinc-400 truncate">{metric.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Race Engineer Radio Callout */}
              <div className="bg-[#0B0C13] border border-[#212335] p-3 rounded-xl flex items-start space-x-3">
                <div className="p-1.5 rounded-lg bg-[#E10600]/20 text-[#E10600] shrink-0 mt-0.5">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div className="text-xs font-telemetry">
                  <div className="text-[#00F5D4] font-semibold flex items-center space-x-1">
                    <span>PIT WALL RADIO</span>
                    <span className="text-[10px] text-zinc-500">• 104.2 MHz</span>
                  </div>
                  <p className="text-zinc-300 mt-1 italic">
                    &ldquo;{PORTFOLIO_DATA.pitRadioMessages[0].message}&rdquo;
                  </p>
                </div>
              </div>

              {/* Decorative Curbs Strip */}
              <div className="h-1.5 curb-pattern rounded-full mt-4" />
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#sector1"
            onClick={() => sfx.playClick()}
            className="flex flex-col items-center space-y-1 text-zinc-500 hover:text-[#E10600] transition-colors group"
          >
            <span className="font-telemetry text-[11px] tracking-widest">DRIVE INTO SECTOR 1</span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#E10600]" />
          </a>
        </div>

      </div>
    </section>
  );
};
