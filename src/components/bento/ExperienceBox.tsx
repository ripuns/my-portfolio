"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const ExperienceBox = () => {
  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <div className="bento-panel p-6 flex flex-col h-full relative group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
         <span className="font-primary text-6xl font-bold">EX</span>
      </div>

      <div className="flex justify-between items-start mb-6">
        <h2 className="font-telemetry text-sm text-slate-300 uppercase tracking-widest">
          Recent Experience
        </h2>
        <span className="font-telemetry text-xs text-[#E10600] px-2 py-1 bg-[#E10600]/10 rounded">
          {exp.period}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-primary text-xl font-bold text-white mb-1">
          {exp.role}
        </h3>
        <p className="font-telemetry text-xs text-[#E10600] mb-4">
          @ {exp.team}, {exp.organization}
        </p>

        <div className="space-y-3 font-telemetry text-xs text-slate-400">
          {exp.pitStopLogs.map((log) => (
            <div key={log.metric} className="flex items-start">
              <span className="text-slate-600 mr-2">{">"}</span>
              <p>
                <span className="text-slate-200 font-semibold">{log.metric}</span> — {log.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-wrap gap-1.5">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[10px] font-telemetry text-slate-500 border border-slate-800 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
