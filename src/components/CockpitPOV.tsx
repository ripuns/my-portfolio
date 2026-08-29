"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import {
  FolderGit2,
  Trophy,
  Award,
  Cpu,
  Briefcase,
  Radio,
  FileText,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface CockpitPOVProps {
  onNavigate: (view: "track" | "pitwall", section: string) => void;
  onOpenContact: () => void;
  onToggleExecutive: () => void;
}

export const CockpitPOV: React.FC<CockpitPOVProps> = ({
  onNavigate,
  onOpenContact,
  onToggleExecutive,
}) => {
  const [isMuted, setIsMuted] = React.useState(sfx.getMuted());

  const handleSoundToggle = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07080D] flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. GARAGE ENVIRONMENT BACKGROUND (2D Depth) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Garage Floor Perspective Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A14] via-[#0E101D] to-[#05060A]" />
        
        {/* Overhead Garage Fluorescent Light Bars */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-between px-12 opacity-60">
          <div className="w-1/3 h-1 bg-white shadow-[0_0_20px_#FFFFFF]" />
          <div className="w-1/3 h-1 bg-white shadow-[0_0_20px_#FFFFFF]" />
        </div>

        {/* Garage Pit Gantry Lights & Tool Racks (2D Silhouette) */}
        <div className="absolute top-12 left-8 w-24 h-48 border-l border-t border-[#1C1F33] opacity-40 hidden md:block" />
        <div className="absolute top-12 right-8 w-24 h-48 border-r border-t border-[#1C1F33] opacity-40 hidden md:block" />

        {/* Ambient Neon Atmosphere */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00F5D4]/10 via-[#E10600]/5 to-transparent blur-[140px]" />
      </div>

      {/* 2. TOP TELEMETRY HUD STRIP */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between">
        {/* Driver Badge */}
        <div className="flex items-center space-x-3 bg-[#111320]/80 backdrop-blur-md border border-[#23273E] px-4 py-2 rounded-xl shadow-lg">
          <div className="bg-[#E10600] text-white px-2 py-0.5 rounded skew-f1 font-racing font-black text-xs">
            <span className="unskew">#27</span>
          </div>
          <div>
            <span className="font-racing font-bold text-xs tracking-wider text-white uppercase block">
              {PORTFOLIO_DATA.driver.name}
            </span>
            <span className="font-telemetry text-[10px] text-[#00F5D4] flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>GARAGE POV // ENGINE READY</span>
            </span>
          </div>
        </div>

        {/* Right Tools: Sound FX & Recruiter View */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="p-2 rounded-xl bg-[#111320] border border-[#23273E] text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00F5D4]" />}
          </button>

          <button
            onClick={() => {
              sfx.playDRSChime();
              onToggleExecutive();
            }}
            className="px-3.5 py-2 rounded-xl bg-[#111320] border border-[#23273E] text-xs font-racing font-semibold text-zinc-300 hover:text-[#00F5D4] hover:border-[#00F5D4] transition-all flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#00F5D4]" />
            <span className="hidden sm:inline">EXECUTIVE RESUME</span>
            <span className="sm:hidden">CV</span>
          </button>
        </div>
      </header>

      {/* 3. CENTER: CURVED HOLOGRAPHIC NAVIGATION DISPLAY */}
      <main className="relative z-20 w-full max-w-4xl mx-auto px-4 my-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full relative"
        >
          {/* Holographic Projection Emitter Ring Effect */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-[#00F5D4]/40 to-transparent blur-sm pointer-events-none" />

          {/* Curved Holo HUD Panel */}
          <div className="relative bg-[#0E111C]/85 backdrop-blur-xl border-2 border-[#00F5D4]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,245,212,0.15)] overflow-hidden">
            
            {/* Ambient Cyan Hologram Scanline */}
            <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
            
            {/* Top Curved Accent Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#1E243D] gap-3">
              <div>
                <div className="inline-flex items-center space-x-2 text-[11px] font-telemetry text-[#00F5D4] uppercase tracking-widest mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PRIMARY COCKPIT TELEMETRY INTERFACE</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-racing font-black text-white uppercase tracking-tight">
                  {PORTFOLIO_DATA.driver.name}
                </h1>
                <p className="text-xs sm:text-sm font-racing text-zinc-300 mt-1">
                  {PORTFOLIO_DATA.driver.role}
                </p>
              </div>

              {/* Education Hologram Badge */}
              <div className="bg-[#141829] border border-[#273050] p-3 rounded-2xl flex items-center space-x-3 text-left">
                <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    VIT Vellore (IT &apos;27)
                  </span>
                  <span className="text-[10px] font-telemetry text-amber-400 font-bold">
                    CGPA: 8.58 / 10 • Class of 2027
                  </span>
                </div>
              </div>
            </div>

            {/* 6 MAIN POV NAVIGATION BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              
              {/* 1. PROJECTS (Tracks) */}
              <button
                onClick={() => {
                  sfx.playDRSChime();
                  onNavigate("track", "projects");
                }}
                className="group relative bg-[#131728] hover:bg-[#1A2038] border border-[#242C4C] hover:border-[#00F5D4] p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-cyan-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-telemetry text-[#00F5D4] uppercase">
                    SECTOR 2 // TRACK
                  </span>
                  <FolderGit2 className="w-5 h-5 text-[#00F5D4] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-racing font-bold text-base text-white group-hover:text-[#00F5D4] transition-colors">
                  PROJECTS
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  SpineGuard, Medibook, Esummit25 Flashcards
                </p>
              </button>

              {/* 2. ACHIEVEMENTS (Tracks) */}
              <button
                onClick={() => {
                  sfx.playDRSChime();
                  onNavigate("track", "achievements");
                }}
                className="group relative bg-[#131728] hover:bg-[#1A2038] border border-[#242C4C] hover:border-amber-400 p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-amber-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-telemetry text-amber-400 uppercase">
                    PODIUM // TRACK
                  </span>
                  <Trophy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-racing font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  ACHIEVEMENTS
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Patent Published & HackBattle 2nd Place
                </p>
              </button>

              {/* 3. CERTIFICATIONS (Tracks) */}
              <button
                onClick={() => {
                  sfx.playDRSChime();
                  onNavigate("track", "certifications");
                }}
                className="group relative bg-[#131728] hover:bg-[#1A2038] border border-[#242C4C] hover:border-cyan-300 p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-cyan-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-telemetry text-cyan-300 uppercase">
                    CREDENTIALS // TRACK
                  </span>
                  <Award className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-racing font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  CERTIFICATIONS
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Generative AI Using IBM Watsonx
                </p>
              </button>

              {/* 4. SKILLS (Pitwall) */}
              <button
                onClick={() => {
                  sfx.playClick();
                  onNavigate("pitwall", "skills");
                }}
                className="group relative bg-[#131728] hover:bg-[#1A2038] border border-[#242C4C] hover:border-[#E10600] p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-red-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-telemetry text-[#E10600] uppercase">
                    SECTOR 1 // PITWALL
                  </span>
                  <Cpu className="w-5 h-5 text-[#E10600] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-racing font-bold text-base text-white group-hover:text-[#E10600] transition-colors">
                  SKILLS
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  ICE, Aero, Backend, Cloud & DevOps Gauges
                </p>
              </button>

              {/* 5. WORK EXPERIENCE (Pitwall) */}
              <button
                onClick={() => {
                  sfx.playClick();
                  onNavigate("pitwall", "experience");
                }}
                className="group relative bg-[#131728] hover:bg-[#1A2038] border border-[#242C4C] hover:border-emerald-400 p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-emerald-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-telemetry text-emerald-400 uppercase">
                    SECTOR 3 // PITWALL
                  </span>
                  <Briefcase className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-racing font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                  EXPERIENCE
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  E-Cell VIT (+35% DB Speed, Mentorship)
                </p>
              </button>

              {/* 6. CONTACT (Popup Modal) */}
              <button
                onClick={() => {
                  sfx.playRadioStatic();
                  onOpenContact();
                }}
                className="group relative bg-gradient-to-br from-[#1E1420] to-[#141728] hover:from-[#2B182E] hover:to-[#1B2038] border border-[#3E2548] hover:border-[#00F5D4] p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-cyan-950/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-telemetry text-[#00F5D4] uppercase">
                    TEAM RADIO // MODAL
                  </span>
                  <Radio className="w-5 h-5 text-[#00F5D4] animate-pulse" />
                </div>
                <h3 className="font-racing font-bold text-base text-white group-hover:text-[#00F5D4] transition-colors">
                  CONTACT
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Transmit Message & Comms Channels
                </p>
              </button>

            </div>

            {/* Bottom Telemetry Status Bar */}
            <div className="mt-6 pt-4 border-t border-[#1C2238] flex flex-wrap items-center justify-between text-[11px] font-telemetry text-zinc-400 gap-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>SELECT A SYSTEM TO LAUNCH ONTO TRACK OR PITWALL</span>
              </div>
              <span className="text-emerald-400 font-semibold">STATUS: READY TO DEPLOY</span>
            </div>

          </div>
        </motion.div>
      </main>

      {/* 4. DRIVER COCKPIT 2D FOREGROUND (Halo Pillar, Steering Wheel, Carbon Framing) */}
      <footer className="relative z-30 w-full pointer-events-none flex flex-col items-center">
        
        {/* Cockpit Halo Pillar (Top-down 2D Silhouette) */}
        <div className="w-4 sm:w-6 h-12 sm:h-20 bg-gradient-to-b from-transparent via-[#141624] to-[#0C0D17] border-x border-[#23273D] shadow-2xl" />

        {/* F1 Steering Wheel & Carbon Dash Housing */}
        <div className="relative w-full max-w-xl sm:max-w-2xl bg-gradient-to-t from-[#040508] via-[#0B0C14] to-[#121422] border-t-2 border-[#242940] rounded-t-3xl sm:rounded-t-[3rem] px-6 pt-4 pb-3 shadow-[0_-15px_40px_rgba(0,0,0,0.9)] flex flex-col items-center">
          
          {/* Wheel RPM LED Shift Lights Strip */}
          <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
            {[...Array(15)].map((_, idx) => {
              const isGreen = idx < 5;
              const isRed = idx >= 5 && idx < 10;
              const isBlue = idx >= 10;

              return (
                <div
                  key={idx}
                  className={`w-2 sm:w-3 h-1.5 sm:h-2 rounded-sm ${
                    isGreen
                      ? "bg-emerald-500 shadow-[0_0_8px_#10B981]"
                      : isRed
                      ? "bg-[#E10600] shadow-[0_0_8px_#E10600]"
                      : "bg-blue-500 shadow-[0_0_8px_#3B82F6]"
                  }`}
                />
              );
            })}
          </div>

          {/* Steering Wheel Central Display Telemetry */}
          <div className="w-full max-w-xs bg-[#06070B] border border-[#1F2338] px-4 py-1.5 rounded-xl flex items-center justify-between text-center font-telemetry">
            <div>
              <span className="text-[9px] text-zinc-500 block">GEAR</span>
              <span className="text-sm font-bold text-amber-400">N</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 block">SPEED</span>
              <span className="text-sm font-bold text-white">0 KM/H</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 block">DRS</span>
              <span className="text-sm font-bold text-[#00F5D4]">AVAIL</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 block">BRAKE BAL</span>
              <span className="text-sm font-bold text-zinc-300">54%</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

