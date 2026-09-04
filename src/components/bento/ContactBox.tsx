"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const ContactBox = () => {
  const { driver } = PORTFOLIO_DATA;
  const initials = driver.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bento-panel p-6 flex flex-col justify-center h-full text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[#E10600] opacity-20 animate-pulse" />
        <span className="font-telemetry text-sm text-[#E10600] z-10">{initials}</span>
      </div>

      <h3 className="font-display text-xl font-semibold text-white mb-2">
        Let&apos;s Connect
      </h3>

      <p className="font-telemetry text-xs text-slate-400 mb-6 px-4">
        {driver.currentStatus}
      </p>

      <div className="flex flex-col space-y-2 w-full max-w-[200px] mx-auto">
        <a
          href={`mailto:${driver.email}`}
          className="px-4 py-2 text-xs font-telemetry bg-slate-800 hover:bg-[#E10600] hover:text-black transition-all rounded text-slate-300"
        >
          EMAIL
        </a>
        <a
          href={driver.linkedin}
          target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-telemetry bg-slate-800 hover:bg-[#E10600] hover:text-black transition-all rounded text-slate-300"
        >
          LINKEDIN
        </a>
        <a
          href={driver.github}
          target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-telemetry bg-slate-800 hover:bg-[#E10600] hover:text-black transition-all rounded text-slate-300"
        >
          GITHUB
        </a>
      </div>
    </div>
  );
};
