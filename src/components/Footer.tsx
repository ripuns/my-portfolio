"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { ChevronUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05060A] border-t border-[#181A26] py-12 text-xs font-telemetry text-zinc-500 relative overflow-hidden">
      {/* Top Curbs Accent Line */}
      <div className="h-1 curb-pattern mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Driver Team & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-racing font-bold text-white tracking-wider">
              {PORTFOLIO_DATA.driver.name.toUpperCase()} // CAR #{PORTFOLIO_DATA.driver.carNumber}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-semibold">CHEQUERED FLAG 🏁</span>
          </div>
          <p className="text-zinc-500">
            Engineered with Next.js 15, Tailwind CSS, TypeScript & Framer Motion.
          </p>
        </div>

        {/* Center: Pit Wall Telemetry Tag */}
        <div className="flex items-center space-x-2 bg-[#0E0F18] border border-[#212338] px-4 py-2 rounded-xl text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-[#E10600]" />
          <span>RACE STATUS: COMPLETED LAP</span>
        </div>

        {/* Right: Scroll to Starting Grid */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 bg-[#141624] hover:bg-[#1E2135] text-zinc-300 hover:text-white px-4 py-2 rounded-xl border border-[#272B44] transition-colors group font-racing text-xs"
        >
          <span>BACK TO GRID</span>
          <ChevronUp className="w-4 h-4 text-[#E10600] group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
