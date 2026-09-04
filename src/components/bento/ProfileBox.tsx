"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Download } from "lucide-react";

export const ProfileBox = () => {
  const { driver } = PORTFOLIO_DATA;
  const [text, setText] = useState("");
  const fullText = `> INITIALIZING: ${driver.name.toUpperCase()}...`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [fullText]);

  const [firstName, ...rest] = driver.name.split(" ");

  return (
    <div className="bento-panel flex flex-col justify-between h-full p-6 relative scanline group">
      <div className="flex justify-between items-start">
        <span className="font-telemetry text-xs text-emerald-400 opacity-80">
          SYS: STABLE
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>

      <div className="mt-8 mb-4">
        <span className="font-telemetry text-sm text-slate-400 h-6 block">
          {text}<span className="animate-ping">_</span>
        </span>
        <h1 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mt-2 group-hover:boil-text text-white">
          {firstName}<br/>{rest.join(" ")}
        </h1>
      </div>

      <div className="mt-auto border-t border-slate-800/50 pt-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-telemetry text-sm text-slate-400">
            {driver.role}
          </p>
          <p className="font-telemetry text-xs text-slate-500 mt-1">
            {driver.education.institution.replace(/^Vellore Institute of Technology \(VIT\), /, "VIT ")} · {driver.education.degree.replace("Bachelor of Technology", "B.Tech")} ({driver.education.cgpa.split(" /")[0]} CGPA)
          </p>
        </div>
        <a
          href={driver.resumePdfUrl}
          download
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-telemetry bg-[#E10600]/10 hover:bg-[#E10600] hover:text-black text-[#E10600] border border-[#E10600]/30 transition-all rounded"
        >
          <Download className="w-3.5 h-3.5" />
          RESUME
        </a>
      </div>
    </div>
  );
};

