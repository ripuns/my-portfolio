"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const SkillsBox = () => {
  const sectors = PORTFOLIO_DATA.skillSectors;

  return (
    <div className="bento-panel p-6 flex flex-col h-full bg-gradient-to-br from-[#0A0C10] to-[#050505] gap-5 overflow-y-auto">
      <div className="flex items-center space-x-2">
        <span className="text-[#E10600] font-telemetry">{"{}"}</span>
        <h2 className="font-telemetry text-sm text-slate-300 uppercase tracking-widest">Core Tech Stack</h2>
      </div>

      <motion.div variants={listVariants} initial="initial" animate="animate" className="flex flex-col gap-5">
        {sectors.map((sector) => (
          <motion.div key={sector.sector} variants={itemVariants}>
            <p className="font-telemetry text-[10px] text-slate-500 uppercase tracking-widest mb-2">
              {sector.f1Analogy}
            </p>
            <div className="flex flex-wrap gap-2">
              {sector.skills.map((skill) => (
                <span
                  key={skill.name}
                  title={skill.telemetryTag}
                  className={`px-3 py-1 text-xs font-telemetry rounded border transition-colors ${
                    skill.highlight
                      ? "text-[#E10600] border-[#E10600]/30 bg-[#E10600]/10"
                      : "text-slate-400 border-slate-800 bg-slate-900/50 hover:border-[#E10600]/30 hover:text-[#E10600]"
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-auto pt-4 border-t border-slate-800/50">
        <p className="font-telemetry text-[10px] text-slate-600 uppercase tracking-widest">
          FOCUS: Edge AI, Systems, Web Arch
        </p>
      </div>
    </div>
  );
};
