"use client";

import React, { useState } from "react";
import { RacingLightsOverlay } from "@/components/RacingLightsOverlay";
import { CockpitPOV } from "@/components/CockpitPOV";
import { RacingTrackView } from "@/components/RacingTrackView";
import { PitwallView } from "@/components/PitwallView";
import { ContactModal } from "@/components/ContactModal";
import { ExecutiveView } from "@/components/ExecutiveView";

export default function Home() {
  // Application POV View State Machine
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<"garage" | "track" | "pitwall" | "executive">("garage");
  const [trackCategory, setTrackCategory] = useState<"projects" | "achievements" | "certifications">("projects");
  const [pitwallTab, setPitwallTab] = useState<"skills" | "experience">("skills");
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Navigation handlers
  const handleNavigate = (view: "track" | "pitwall", section: string) => {
    if (view === "track") {
      setTrackCategory(section as "projects" | "achievements" | "certifications");
      setCurrentView("track");
    } else if (view === "pitwall") {
      setPitwallTab(section as "skills" | "experience");
      setCurrentView("pitwall");
    }
  };

  const handleReturnToGarage = () => {
    setCurrentView("garage");
  };

  const handleToggleExecutive = () => {
    setCurrentView(currentView === "executive" ? "garage" : "executive");
  };

  return (
    <main className="relative min-h-screen bg-[#08090C] text-slate-100 selection:bg-[#E10600] selection:text-white overflow-x-hidden">
      
      {/* 1. Full-Screen 5-Red-Lights Overlay on Initial Entry */}
      {showIntro && (
        <RacingLightsOverlay onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Main View State Switching */}
      {currentView === "garage" && (
        <CockpitPOV
          onNavigate={handleNavigate}
          onOpenContact={() => setIsContactOpen(true)}
          onToggleExecutive={handleToggleExecutive}
        />
      )}

      {currentView === "track" && (
        <RacingTrackView
          category={trackCategory}
          onReturnToGarage={handleReturnToGarage}
        />
      )}

      {currentView === "pitwall" && (
        <PitwallView
          initialTab={pitwallTab}
          onReturnToGarage={handleReturnToGarage}
        />
      )}

      {currentView === "executive" && (
        <div className="relative">
          {/* Top Bar for Executive View with Return to Cockpit button */}
          <div className="fixed top-4 left-4 z-50">
            <button
              onClick={handleReturnToGarage}
              className="bg-[#E10600] hover:bg-[#FF1801] text-white px-4 py-2 rounded-xl text-xs font-racing font-bold tracking-wider shadow-xl transition-transform active:scale-95"
            >
              ➔ RETURN TO COCKPIT POV
            </button>
          </div>
          <ExecutiveView />
        </div>
      )}

      {/* 3. Global Accessible Contact Popup Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </main>
  );
}
