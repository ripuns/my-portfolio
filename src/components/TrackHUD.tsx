"use client";

import React, { useEffect, useState } from "react";
import { sfx } from "@/lib/audio";

interface TrackHUDProps {
  activeSector: string;
}

export const TrackHUD: React.FC<TrackHUDProps> = ({ activeSector }) => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpTo = (id: string) => {
    sfx.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside aria-label="Race Track Navigation" className="fixed bottom-6 right-6 z-40 hidden xl:flex flex-col items-end">
      <div className="bg-[#10121C]/90 backdrop-blur-md border border-[#25283E] p-3.5 rounded-2xl shadow-2xl flex flex-col items-center">
        {/* Header Tag */}
        <div className="flex items-center justify-between w-full mb-2 font-telemetry text-[10px] text-zinc-400">
          <span className="text-[#00F5D4] font-semibold">TRACK HUD</span>
          <span>{Math.round(scrollPercent)}% LAP</span>
        </div>

        {/* 2D SVG Circuit Map (Monza / Silverstone inspired hybrid loop) */}
        <svg
          viewBox="0 0 160 120"
          className="w-32 h-24 stroke-zinc-700 fill-none stroke-3 rounded-lg"
        >
          {/* Background Track Trace */}
          <path
            d="M 30,100 L 130,100 C 150,100 155,80 140,65 L 105,40 C 95,30 95,20 110,15 C 125,10 110,5 85,15 L 40,30 C 20,40 10,60 20,80 Z"
            className="stroke-[#222538] stroke-4"
          />

          {/* Sector 1 highlight */}
          <path
            d="M 30,100 L 130,100"
            onClick={() => jumpTo("sector1")}
            className={`cursor-pointer transition-all stroke-4 ${
              activeSector === "sector1" ? "stroke-[#E10600]" : "stroke-zinc-700 hover:stroke-white"
            }`}
          />

          {/* Sector 2 highlight */}
          <path
            d="M 130,100 C 150,100 155,80 140,65 L 105,40"
            onClick={() => jumpTo("sector2")}
            className={`cursor-pointer transition-all stroke-4 ${
              activeSector === "sector2" ? "stroke-[#00F5D4]" : "stroke-zinc-700 hover:stroke-white"
            }`}
          />

          {/* Sector 3 highlight */}
          <path
            d="M 105,40 C 95,30 95,20 110,15 C 125,10 110,5 85,15 L 40,30"
            onClick={() => jumpTo("sector3")}
            className={`cursor-pointer transition-all stroke-4 ${
              activeSector === "sector3" ? "stroke-amber-400" : "stroke-zinc-700 hover:stroke-white"
            }`}
          />

          {/* Pit Entry / Finish Straight */}
          <path
            d="M 40,30 C 20,40 10,60 20,80 Z"
            onClick={() => jumpTo("podium")}
            className={`cursor-pointer transition-all stroke-4 ${
              activeSector === "podium" || activeSector === "pitwall"
                ? "stroke-purple-400"
                : "stroke-zinc-700 hover:stroke-white"
            }`}
          />

          {/* Car Position Marker #27 */}
          <circle
            cx={30 + (scrollPercent / 100) * 90}
            cy={100 - Math.sin((scrollPercent / 100) * Math.PI) * 60}
            r="4"
            className="fill-[#E10600] stroke-white stroke-1 animate-pulse"
          />
        </svg>

        {/* Mini Sector Quick Links */}
        <div className="grid grid-cols-4 gap-1 w-full mt-2 font-racing text-[9px] text-center">
          <button
            onClick={() => jumpTo("sector1")}
            className={`py-1 rounded ${
              activeSector === "sector1" ? "bg-[#E10600] text-white font-bold" : "bg-[#161828] text-zinc-400"
            }`}
          >
            S1
          </button>
          <button
            onClick={() => jumpTo("sector2")}
            className={`py-1 rounded ${
              activeSector === "sector2" ? "bg-[#00F5D4] text-black font-bold" : "bg-[#161828] text-zinc-400"
            }`}
          >
            S2
          </button>
          <button
            onClick={() => jumpTo("sector3")}
            className={`py-1 rounded ${
              activeSector === "sector3" ? "bg-amber-400 text-black font-bold" : "bg-[#161828] text-zinc-400"
            }`}
          >
            S3
          </button>
          <button
            onClick={() => jumpTo("pitwall")}
            className={`py-1 rounded ${
              activeSector === "pitwall" ? "bg-purple-400 text-black font-bold" : "bg-[#161828] text-zinc-400"
            }`}
          >
            PIT
          </button>
        </div>
      </div>
    </aside>
  );
};
