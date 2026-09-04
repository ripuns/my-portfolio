"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Cpu, FolderGit2, Mail } from "lucide-react";

export type TabId = "about" | "skills" | "projects" | "contact";

interface PillNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "about",    label: "About",    icon: <User className="w-3.5 h-3.5" /> },
  { id: "skills",   label: "Skills",   icon: <Cpu className="w-3.5 h-3.5" /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
  { id: "contact",  label: "Contact",  icon: <Mail className="w-3.5 h-3.5" /> },
];

export const PillNav: React.FC<PillNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      role="tablist"
      aria-label="Portfolio sections"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full
        bg-[#0a0c10]/80 backdrop-blur-xl border border-white/[0.06]
        shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold
              tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2
              focus-visible:ring-[#E10600]/60 cursor-pointer select-none"
          >
            {/* Animated active pill background */}
            {isActive && (
              <motion.span
                layoutId="pill-active"
                className="absolute inset-0 rounded-full bg-[#E10600]/15 border border-[#E10600]/30"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
              />
            )}

            {/* Icon */}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                isActive ? "text-[#E10600]" : "text-slate-500"
              }`}
            >
              {tab.icon}
            </span>

            {/* Label */}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                isActive ? "text-[#E10600]" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
