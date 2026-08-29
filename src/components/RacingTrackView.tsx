"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, Project, Achievement } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { GithubIcon } from "@/components/Icons";
import {
  ArrowLeft,
  ExternalLink,
  Award,
  Trophy,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronRight,
  Activity,
  Zap,
} from "lucide-react";

interface RacingTrackViewProps {
  category: "projects" | "achievements" | "certifications";
  onReturnToGarage: () => void;
}

export const RacingTrackView: React.FC<RacingTrackViewProps> = ({
  category,
  onReturnToGarage,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Projects data
  const projects = PORTFOLIO_DATA.projects;

  // Achievements data (filter out certs)
  const achievements = PORTFOLIO_DATA.achievements.filter(
    (a) => a.type === "PATENT" || a.type === "HACKATHON PODIUM" || a.type === "ACADEMIC"
  );

  // Certifications data
  const certifications = PORTFOLIO_DATA.achievements.filter(
    (a) => a.type === "CERTIFICATION"
  );

  const isCarStopped = selectedItemId !== null;

  // Find currently selected project or achievement
  const selectedProject = projects.find((p) => p.id === selectedItemId);
  const selectedAchievement = PORTFOLIO_DATA.achievements.find((a) => a.id === selectedItemId);

  const getCategoryTitle = () => {
    switch (category) {
      case "projects":
        return "CONSTRUCTORS' FLEET // PROJECTS";
      case "achievements":
        return "PODIUM & PATENTS // ACHIEVEMENTS";
      case "certifications":
        return "ENGINEERING CREDENTIALS // CERTIFICATIONS";
    }
  };

  const handleSelectCard = (id: string) => {
    sfx.playDRSChime();
    setSelectedItemId(id);
  };

  const handleResumeRacing = () => {
    sfx.playClick();
    setSelectedItemId(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#07080D] flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. 2D RACING TRACK ENVIRONMENT & SPEED ILLUSION */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Track Horizon & Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A14] via-[#0D0F1C] to-[#040509]" />

        {/* 2D Perspective Road Lines */}
        <div className="absolute inset-0 flex justify-center items-end">
          
          {/* Main Asphalt Polygon */}
          <div
            className="w-full h-3/4 bg-[#0A0C14] border-x-4 border-zinc-800"
            style={{
              clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Left & Right F1 Curbs */}
          <div
            className={`absolute bottom-0 left-0 w-1/4 h-3/4 curb-pattern opacity-60 ${
              !isCarStopped ? "animate-pulse" : ""
            }`}
            style={{
              clipPath: "polygon(100% 0%, 100% 0%, 35% 100%, 0% 100%)",
            }}
          />
          <div
            className={`absolute bottom-0 right-0 w-1/4 h-3/4 curb-pattern opacity-60 ${
              !isCarStopped ? "animate-pulse" : ""
            }`}
            style={{
              clipPath: "polygon(0% 0%, 0% 0%, 100% 100%, 65% 100%)",
            }}
          />

          {/* Moving Road Center Dashes */}
          {!isCarStopped && (
            <div className="absolute bottom-0 w-2 h-3/4 flex flex-col justify-between py-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 80], opacity: [0.2, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: "linear",
                  }}
                  className="w-2 h-12 bg-white rounded-full mx-auto"
                />
              ))}
            </div>
          )}

          {/* Lateral Speed Streaks (Active when Racing) */}
          {!isCarStopped && (
            <div className="absolute inset-0 scanline opacity-40" />
          )}
        </div>
      </div>

      {/* 2. TOP RACE HUD & RETURN BUTTON */}
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

        {/* Center Live Category Title */}
        <div className="hidden md:flex items-center space-x-2 bg-[#111320]/80 backdrop-blur-md border border-[#23273E] px-4 py-2 rounded-xl text-xs font-telemetry text-zinc-300">
          <span className={`w-2 h-2 rounded-full ${!isCarStopped ? "bg-[#00F5D4] animate-ping" : "bg-amber-400"}`} />
          <span className="font-racing font-bold text-white uppercase">{getCategoryTitle()}</span>
        </div>

        {/* Live Race Telemetry Tag */}
        <div className="bg-[#111320]/90 border border-[#23273E] px-3.5 py-2 rounded-xl font-telemetry text-xs text-zinc-300">
          <span className="text-zinc-500 mr-2">TRACK STATUS:</span>
          {isCarStopped ? (
            <span className="text-amber-400 font-bold">CAR STOPPED (INSPECTING)</span>
          ) : (
            <span className="text-[#00F5D4] font-bold">RACING (CLICK CARD TO BRAKE)</span>
          )}
        </div>
      </header>

      {/* 3. MAIN TRACK CONTENT: FLASHCARDS (Car Racing) OR DETAIL MODAL (Car Stopped) */}
      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 my-auto flex flex-col items-center justify-center">
        
        {/* CASE A: CAR IS RACING -> DISPLAY FLASHCARDS ALONG THE TRACK */}
        {!isCarStopped && (
          <div className="w-full flex flex-col items-center">
            
            <div className="text-center mb-6">
              <span className="bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/30 px-3 py-1 rounded-full text-xs font-telemetry uppercase tracking-wider">
                ⚡ HIGH-SPEED TRACK PASS // SELECT FLASHCARD TO INSPECT
              </span>
            </div>

            {/* PROJECTS FLASHCARDS */}
            {category === "projects" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {projects.map((proj: Project) => (
                  <motion.div
                    key={proj.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCard(proj.id)}
                    className="cursor-pointer bg-[#101322]/90 backdrop-blur-md border-2 border-[#242944] hover:border-[#00F5D4] p-6 rounded-3xl shadow-2xl transition-all relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#E10600] text-white px-2.5 py-0.5 rounded skew-f1 text-xs font-racing font-black">
                        <span className="unskew">CAR #{proj.carNumber}</span>
                      </span>
                      <span className="font-telemetry text-[10px] text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/20">
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="font-racing font-bold text-xl text-white group-hover:text-[#00F5D4] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-telemetry text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {proj.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {proj.badges.slice(0, 2).map((b, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-telemetry bg-[#191D32] text-zinc-300 px-2 py-0.5 rounded border border-[#2B3152]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#1F243C] flex items-center justify-between text-xs font-racing text-[#00F5D4]">
                      <span>BRAKE & INSPECT</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ACHIEVEMENTS FLASHCARDS */}
            {category === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {achievements.map((item: Achievement) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCard(item.id)}
                    className="cursor-pointer bg-[#101322]/90 backdrop-blur-md border-2 border-[#242944] hover:border-amber-400 p-6 rounded-3xl shadow-2xl transition-all relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-[#191D32] text-amber-400">
                        {item.type === "PATENT" ? <Award className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                      </div>
                      <span className="font-racing text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {item.rankBadge}
                      </span>
                    </div>

                    <h3 className="font-racing font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-5 pt-3 border-t border-[#1F243C] flex items-center justify-between text-xs font-racing text-amber-400">
                      <span>INSPECT PODIUM INFO</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CERTIFICATIONS FLASHCARDS */}
            {category === "certifications" && (
              <div className="max-w-xl w-full">
                {certifications.map((item: Achievement) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCard(item.id)}
                    className="cursor-pointer bg-[#101322]/90 backdrop-blur-md border-2 border-[#242944] hover:border-cyan-300 p-8 rounded-3xl shadow-2xl transition-all relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-[#191D32] text-cyan-300">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <span className="font-racing text-xs text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                        {item.rankBadge}
                      </span>
                    </div>

                    <h3 className="font-racing font-bold text-2xl text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-telemetry text-zinc-400 mt-1">
                      {item.issuer} • {item.date}
                    </p>
                    <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#1F243C] flex items-center justify-between text-xs font-racing text-cyan-300">
                      <span>VIEW FULL CREDENTIAL SPEC</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* CASE B: CAR IS STOPPED -> DISPLAY FULL DETAILED HUD ON FRONT DISPLAY */}
        {isCarStopped && (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full bg-[#0D101C]/95 backdrop-blur-xl border-2 border-[#00F5D4]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,245,212,0.2)] relative overflow-hidden"
            >
              {/* Scanline HUD Overlay */}
              <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

              {/* Stop Indicator Pill */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1F253F]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E10600] animate-pulse" />
                  <span className="font-telemetry text-xs font-bold text-amber-400 uppercase tracking-widest">
                    TELEMETRY PAUSED // BRAKE LOCK ENGAGED
                  </span>
                </div>

                <button
                  onClick={handleResumeRacing}
                  className="bg-[#191E33] hover:bg-[#252C4C] text-white border border-[#2F375E] text-xs font-racing px-4 py-1.5 rounded-xl transition-colors"
                >
                  RESUME RACING (TRACK) ➔
                </button>
              </div>

              {/* PROJECT SPEC SHEET */}
              {selectedProject && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="bg-[#E10600] text-white px-2.5 py-0.5 rounded skew-f1 text-xs font-racing font-black">
                        <span className="unskew">CAR #{selectedProject.carNumber}</span>
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-racing font-black text-white uppercase mt-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-sm font-racing text-[#00F5D4] mt-1">
                        {selectedProject.tagline}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playClick()}
                          className="bg-[#181C30] hover:bg-[#222844] border border-[#2B3354] text-white px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider flex items-center space-x-2"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>CODE REPO</span>
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sfx.playDRSChime()}
                          className="bg-[#00F5D4] hover:bg-[#00DABF] text-black px-4 py-2 rounded-xl text-xs font-racing font-extrabold flex items-center space-x-1.5 shadow-md shadow-cyan-900/40"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>LIVE DEMO</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Telemetry Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {selectedProject.telemetryStats.map((stat, i) => (
                      <div key={i} className="bg-[#141829] border border-[#242B48] p-3 rounded-xl">
                        <span className="text-[10px] font-telemetry text-zinc-400 uppercase block">
                          {stat.label}
                        </span>
                        <span className="text-base sm:text-lg font-racing font-extrabold text-[#00F5D4]">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights & Architecture */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-racing font-bold text-xs text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#E10600]" />
                        <span>RACE HIGHLIGHTS & METRICS</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedProject.highlights.map((h, hi) => (
                          <div key={hi} className="bg-[#131728] border border-[#212740] p-2.5 rounded-xl flex items-start space-x-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-racing font-bold text-xs text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#00F5D4]" />
                        <span>SYSTEM BLUEPRINT</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedProject.architectureDetails.map((a, ai) => (
                          <div key={ai} className="bg-[#131728] border border-[#212740] p-2.5 rounded-xl flex items-start space-x-2 text-xs font-telemetry text-zinc-300">
                            <ChevronRight className="w-3.5 h-3.5 text-[#00F5D4] shrink-0 mt-0.5" />
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACHIEVEMENT / CERTIFICATION SPEC SHEET */}
              {selectedAchievement && (
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="font-racing text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      {selectedAchievement.rankBadge}
                    </span>
                    <span className="font-telemetry text-xs text-zinc-400">
                      {selectedAchievement.issuer} • {selectedAchievement.date}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-racing font-extrabold text-white uppercase mb-3">
                    {selectedAchievement.title}
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {selectedAchievement.description}
                  </p>

                  <h4 className="font-racing font-bold text-xs text-white uppercase tracking-wider mb-3">
                    KEY TAKEAWAYS & VERIFICATION:
                  </h4>
                  <div className="space-y-2.5">
                    {selectedAchievement.keyTakeaways.map((pt, pi) => (
                      <div key={pi} className="bg-[#141829] border border-[#242B48] p-3 rounded-xl flex items-start space-x-2.5 text-xs text-zinc-300 font-telemetry">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}

      </main>

      {/* 4. DRIVER COCKPIT FOREGROUND (Active Racing Wheel HUD) */}
      <footer className="relative z-30 w-full pointer-events-none flex flex-col items-center">
        
        {/* Cockpit Halo Pillar */}
        <div className="w-4 sm:w-6 h-10 sm:h-16 bg-gradient-to-b from-transparent via-[#141624] to-[#0C0D17] border-x border-[#23273D] shadow-2xl" />

        {/* F1 Steering Wheel & Racing Telemetry */}
        <div className="relative w-full max-w-xl sm:max-w-2xl bg-gradient-to-t from-[#040508] via-[#0B0C14] to-[#121422] border-t-2 border-[#242940] rounded-t-3xl sm:rounded-t-[3rem] px-6 pt-4 pb-3 shadow-[0_-15px_40px_rgba(0,0,0,0.9)] flex flex-col items-center">
          
          {/* Wheel Shift Lights Strip */}
          <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
            {[...Array(15)].map((_, idx) => {
              const isLit = !isCarStopped ? idx <= 12 : idx === 0;
              return (
                <div
                  key={idx}
                  className={`w-2 sm:w-3 h-1.5 sm:h-2 rounded-sm transition-all ${
                    isLit
                      ? idx < 5
                        ? "bg-emerald-500 shadow-[0_0_8px_#10B981]"
                        : idx < 10
                        ? "bg-[#E10600] shadow-[0_0_8px_#E10600]"
                        : "bg-blue-500 shadow-[0_0_8px_#3B82F6]"
                      : "bg-zinc-800"
                  }`}
                />
              );
            })}
          </div>

          {/* Steering Wheel Central Display Telemetry */}
          <div className="w-full max-w-xs bg-[#06070B] border border-[#1F2338] px-4 py-1.5 rounded-xl flex items-center justify-between text-center font-telemetry">
            <div>
              <span className="text-[9px] text-zinc-500 block">GEAR</span>
              <span className={`text-sm font-bold ${!isCarStopped ? "text-emerald-400" : "text-amber-400"}`}>
                {!isCarStopped ? "7" : "N"}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 block">SPEED</span>
              <span className="text-sm font-bold text-white">
                {!isCarStopped ? "312 KM/H" : "0 KM/H"}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 block">DRS</span>
              <span className={`text-sm font-bold ${!isCarStopped ? "text-[#00F5D4]" : "text-zinc-500"}`}>
                {!isCarStopped ? "OPEN" : "OFF"}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 block">THROTTLE</span>
              <span className="text-sm font-bold text-zinc-300">
                {!isCarStopped ? "100%" : "0%"}
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

