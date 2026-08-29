"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { Volume2, VolumeX, FileText, Gauge, Flag, Radio, Trophy, Cpu, FolderGit2 } from "lucide-react";

interface NavbarProps {
  viewMode: "f1" | "recruiter";
  setViewMode: (mode: "f1" | "recruiter") => void;
  activeSector: string;
}

export const Navbar: React.FC<NavbarProps> = ({ viewMode, setViewMode, activeSector }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lapTime, setLapTime] = useState("1:18.420");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      const ms = Math.floor(Math.random() * 900) + 100;
      setLapTime(`1:18.${ms}`);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleSoundToggle = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = () => {
    sfx.playClick();
  };

  const toggleMode = () => {
    sfx.playDRSChime();
    setViewMode(viewMode === "f1" ? "recruiter" : "f1");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090C]/90 backdrop-blur-md border-b border-[#232536] py-2.5 shadow-2xl"
          : "bg-linear-to-b from-[#08090C] to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Driver Tag & Status */}
        <div className="flex items-center space-x-3">
          <a
            href="#hero"
            onClick={handleNavClick}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            {/* F1 Car Badge #27 */}
            <div className="bg-[#E10600] text-white px-2.5 py-1 rounded skew-f1 font-racing font-extrabold text-sm tracking-wider flex items-center space-x-1 group-hover:scale-105 transition-transform shadow-lg shadow-red-900/30">
              <span className="unskew">#27</span>
            </div>
            <div className="flex flex-col">
              <span className="font-racing font-bold text-sm tracking-wider text-white group-hover:text-[#E10600] transition-colors uppercase">
                {PORTFOLIO_DATA.driver.name}
              </span>
              <span className="font-telemetry text-[10px] text-zinc-400 flex items-center space-x-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>TRACK: GREEN FLAG</span>
              </span>
            </div>
          </a>

          {/* Pit Telemetry Pill (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2 pl-4 border-l border-zinc-800 font-telemetry text-xs text-zinc-400">
            <span className="text-zinc-500">SECTOR PACE:</span>
            <span className="text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/20 font-semibold">
              PURPLE ({lapTime})
            </span>
          </div>
        </div>

        {/* Center: Sector Navigation (F1 Mode) */}
        {viewMode === "f1" && (
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-racing text-xs tracking-wider">
            <a
              href="#sector1"
              onClick={handleNavClick}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeSector === "sector1"
                  ? "bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/40 shadow-inner"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>S1: TECH STACK</span>
            </a>

            <a
              href="#sector2"
              onClick={handleNavClick}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeSector === "sector2"
                  ? "bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/40 shadow-inner"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>S2: PROJECTS</span>
            </a>

            <a
              href="#sector3"
              onClick={handleNavClick}
              className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                activeSector === "sector3"
                  ? "bg-[#E10600]/20 text-[#E10600] border border-[#E10600]/40 shadow-inner"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>S3: EXPERIENCE</span>
            </a>

            <a
              href="#podium"
              onClick={handleNavClick}
              className={`px-3 py-1.5 rounded-all flex items-center space-x-1.5 ${
                activeSector === "podium"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>PODIUM</span>
            </a>

            <a
              href="#pitwall"
              onClick={handleNavClick}
              className={`px-3 py-1.5 rounded-all flex items-center space-x-1.5 ${
                activeSector === "pitwall"
                  ? "bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>PIT RADIO</span>
            </a>
          </nav>
        )}

        {/* Right: Actions & Switches */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio FX Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute F1 Sound Effects" : "Mute Sound Effects"}
            className={`p-2 rounded-lg border transition-all ${
              !isMuted
                ? "bg-[#E10600]/20 border-[#E10600] text-[#E10600] shadow-sm shadow-red-500/30"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mode Switcher: Race vs Recruiter */}
          <button
            onClick={toggleMode}
            className={`px-3 py-1.5 rounded-lg border text-xs font-racing font-semibold flex items-center space-x-2 transition-all ${
              viewMode === "f1"
                ? "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-[#00F5D4] hover:text-[#00F5D4]"
                : "bg-[#E10600] border-[#E10600] text-white shadow-lg shadow-red-600/30"
            }`}
          >
            {viewMode === "f1" ? (
              <>
                <FileText className="w-3.5 h-3.5 text-[#00F5D4]" />
                <span className="hidden sm:inline">RECRUITER VIEW</span>
                <span className="sm:hidden">DOC</span>
              </>
            ) : (
              <>
                <Gauge className="w-3.5 h-3.5 text-white" />
                <span>RACE MODE</span>
              </>
            )}
          </button>

          {/* Resume PDF Download */}
          <a
            href={PORTFOLIO_DATA.driver.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playDRSChime()}
            className="hidden sm:inline-flex items-center space-x-1.5 bg-[#E10600] hover:bg-[#FF1801] text-white px-3.5 py-1.5 rounded-lg text-xs font-racing font-bold tracking-wider transition-transform active:scale-95 shadow-md shadow-red-900/40"
          >
            <span>TELEMETRY (CV)</span>
          </a>
        </div>
      </div>
    </header>
  );
};
