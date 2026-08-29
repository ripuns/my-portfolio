"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { TrackHUD } from "@/components/TrackHUD";
import { HeroStartingGrid } from "@/components/HeroStartingGrid";
import { Sector1Skills } from "@/components/Sector1Skills";
import { Sector2Projects } from "@/components/Sector2Projects";
import { Sector3Experience } from "@/components/Sector3Experience";
import { PodiumAchievements } from "@/components/PodiumAchievements";
import { PitWallContact } from "@/components/PitWallContact";
import { ExecutiveView } from "@/components/ExecutiveView";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [viewMode, setViewMode] = useState<"f1" | "recruiter">("f1");
  const [activeSector, setActiveSector] = useState<string>("hero");

  useEffect(() => {
    if (viewMode !== "f1") return;

    const sections = ["hero", "sector1", "sector2", "sector3", "podium", "pitwall"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSector(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewMode]);

  return (
    <main className="relative min-h-screen bg-[#08090C] text-slate-100 selection:bg-[#E10600] selection:text-white">
      {/* Top Telemetry Header */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeSector={activeSector}
      />

      {viewMode === "f1" ? (
        <>
          {/* Right Pinned 2D Race Circuit Scroll-Tracker */}
          <TrackHUD activeSector={activeSector} />

          {/* Main Race Telemetry Sections */}
          <HeroStartingGrid />
          <Sector1Skills />
          <Sector2Projects />
          <Sector3Experience />
          <PodiumAchievements />
          <PitWallContact />
          <Footer />
        </>
      ) : (
        <>
          {/* Executive ATS-Optimized Clean View */}
          <ExecutiveView />
          <Footer />
        </>
      )}
    </main>
  );
}
