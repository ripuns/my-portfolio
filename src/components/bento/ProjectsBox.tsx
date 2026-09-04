"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09 } },
};
const rowVariants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.32 } },
};

export const ProjectsBox = () => {
  const [hoveredProj, setHoveredProj] = useState<string | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  return (
    <div className="bento-panel p-6 flex flex-col h-full col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden">

      {/* Background Tech Overlay */}
      <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-9xl font-telemetry">
        {"</>"}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-telemetry text-sm text-slate-300 uppercase tracking-widest">
          Primary Payloads (Projects)
        </h2>
        <span className="font-telemetry text-xs text-slate-500">
          COUNT: {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <motion.div
        variants={listVariants}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col justify-center space-y-3"
      >
        {projects.map((proj) => {
          const href = proj.liveUrl ?? proj.githubUrl;
          return (
            <motion.div
              key={proj.id}
              variants={rowVariants}
              onMouseEnter={() => setHoveredProj(proj.id)}
              onMouseLeave={() => setHoveredProj(null)}
              className="group relative flex items-center justify-between border-b border-slate-800/50 pb-3"
            >
              <div className="flex flex-col z-10">
                <span className="font-primary text-2xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {proj.title}
                </span>
                <span className="font-telemetry text-xs text-slate-500 mt-1">
                  {proj.techStack.slice(0, 3).map((t) => t.name).join(" / ")}
                </span>
              </div>

              {/* Telemetry Data (Visible on Hover) */}
              <AnimatePresence>
                {hoveredProj === proj.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 bg-[#050505] border border-slate-800 px-3 py-2 rounded shadow-2xl z-20 font-telemetry text-[10px] text-[#E10600]"
                  >
                    <pre>
                      {proj.telemetryStats.map((s) => `${s.label}: ${s.value}`).join("\n")}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>

              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${proj.title}`}
                  className="text-slate-700 group-hover:text-[#E10600] transition-colors z-10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              ) : (
                <span className="text-slate-800 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
