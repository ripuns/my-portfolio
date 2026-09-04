"use client";

import { TelemetryParticles } from "@/components/TelemetryParticles";

/**
 * Full-screen ambient background: static grid lines plus the canvas layer
 * (see TelemetryParticles) which owns both the colliding "atom" particles
 * and the F1 exhaust-style fluid trail that follows the cursor.
 */
export const TelemetryBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="bg-telemetry-grid" />
      <TelemetryParticles />
    </div>
  );
};
