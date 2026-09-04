"use client";

import { TelemetryParticles } from "@/components/TelemetryParticles";

/**
 * Full-screen ambient background: F1 timing-screen style grid (minor + major
 * lines, sector-boundary accents, corner telemetry readouts) plus the canvas
 * layer (see TelemetryParticles) which owns both the colliding "atom"
 * particles and the F1 exhaust-style fluid trail that follows the cursor.
 */
export const TelemetryBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="bg-telemetry-grid" />
      <div className="bg-telemetry-sectors" />
      <TelemetryParticles />

      <span className="telemetry-corner telemetry-corner--tl">SEC.1 // GRID</span>
      <span className="telemetry-corner telemetry-corner--tr">TELEMETRY LIVE</span>
      <span className="telemetry-corner telemetry-corner--bl">CAR #27</span>
      <span className="telemetry-corner telemetry-corner--br">SYS: NOMINAL</span>
    </div>
  );
};
