"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileBox } from "@/components/bento/ProfileBox";
import { SkillsBox } from "@/components/bento/SkillsBox";
import { ExperienceBox } from "@/components/bento/ExperienceBox";
import { ProjectsBox } from "@/components/bento/ProjectsBox";
import { ContactBox } from "@/components/bento/ContactBox";
import { PillNav, TabId } from "@/components/PillNav";
import { PitCrewCar } from "@/components/PitCrewCar";
import { TelemetryBackground } from "@/components/TelemetryBackground";

/** Shared enter/exit motion props — inline to avoid framer-motion v13 Variants type issues */
const enter = { opacity: 1, y: 0, scale: 1 };
const fromBelow = { opacity: 0, y: 12, scale: 0.99 };
const toAbove = { opacity: 0, y: -8, scale: 0.99 };
const tEnter = { duration: 0.28 };
const tExit  = { duration: 0.18 };

/** Stagger wrapper for reveal-on-tab-switch animation of child panels */
const staggerParent = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};
const staggerChild = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("about");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 pb-28 relative overflow-hidden flex items-center justify-center">
      {/* Full-screen interactive telemetry background */}
      <TelemetryBackground />
      {/* Global Noise Overlay */}
      <div className="bg-noise" />

      {/* Tab Content */}
      <div className="w-full max-w-5xl mx-auto z-10">
        <AnimatePresence mode="wait">

          {activeTab === "about" && (
            <motion.div
              key="about"
              variants={staggerParent}
              initial="initial"
              animate="animate"
              exit={toAbove}
              transition={tEnter}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(300px,auto)]"
            >
              <motion.div variants={staggerChild}><ProfileBox /></motion.div>
              <motion.div variants={staggerChild}><ExperienceBox /></motion.div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={fromBelow}
              animate={enter}
              exit={toAbove}
              transition={tEnter}
              className="max-w-xl mx-auto min-h-[400px]"
            >
              <SkillsBox />
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={fromBelow}
              animate={enter}
              exit={toAbove}
              transition={tEnter}
              className="min-h-[400px]"
            >
              <ProjectsBox />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={fromBelow}
              animate={enter}
              exit={toAbove}
              transition={tExit}
              className="max-w-sm mx-auto min-h-[400px]"
            >
              <ContactBox />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Floating Pill Navbar */}
      <PillNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Interactive pit-crew car */}
      <PitCrewCar />
    </main>
  );
}
