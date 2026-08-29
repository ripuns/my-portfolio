# `src/components/` Directory Documentation

## 1. What
This directory contains modular React client components powering the interactive F1 racing portfolio experience for Ripun Sethia.

## 2. Why
Separating UI components into isolated units ensures high maintainability, explicit component boundaries, clean reusability across views, and strict adherence to the project's incremental architecture.

## 3. How
Components collaborate with `src/data/portfolioData.ts` for domain content and `src/lib/audio.ts` for Web Audio API feedback, managed through state machines in `src/app/page.tsx`.

## 4. File Responsibilities
- `RacingLightsOverlay.tsx`: Full-screen 2D entry animation with sequential 5-red-lights countdown, speed-wipe streak effects, and smooth dissolve transition into the driver cockpit.
- `Navbar.tsx`: Telemetry header with driver status, live sector indicators, audio toggle, and fast sector jumps.
- `Icons.tsx`: Lightweight, custom SVG icons for GitHub, LinkedIn, and motorsport symbols.
- `HeroStartingGrid.tsx`: Driver profile cockpit banner and live telemetry HUD.
- `Sector1Skills.tsx`: F1 Powertrain, Aerodynamics, Backend, and DevOps interactive telemetry meters.
- `Sector2Projects.tsx`: The Constructors' Fleet with detailed engineering specs for SpineGuard, Medibook, and Esummit25.
- `Sector3Experience.tsx`: Senior Technical Executive experience timeline and pit stop performance metrics.
- `PodiumAchievements.tsx`: Patent publication, HackBattle podium, IBM Watsonx cert, and VIT academic honors with celebratory confetti.
- `PitWallContact.tsx`: Pit-to-car radio transmitter message form with simulated live waveform visualizer.
- `TrackHUD.tsx`: Pinned 2D SVG race track map with real-time lap tracker.
- `ExecutiveView.tsx`: Clean, high-density ATS-optimized printable resume layout.
- `Footer.tsx`: Chequered flag finish banner and back-to-grid navigation.

