# `src/components/` Directory Documentation

## 1. What
This directory contains modular React client components powering the interactive F1 racing portfolio experience for Ripun Sethia.

## 2. Why
Separating UI components into isolated units ensures high maintainability, explicit component boundaries, clean reusability across views, and strict adherence to the project's incremental architecture.

## 3. How
Components collaborate with `src/data/portfolioData.ts` for domain content and `src/lib/audio.ts` for Web Audio API feedback, managed through state machines in `src/app/page.tsx`.

## 4. File Responsibilities
- `CockpitPOV.tsx`: Driver seat perspective inside the garage looking forward, featuring the centerpiece curved holographic navigation HUD with driver profile, education, and 6 primary destination triggers.
- `RacingTrackView.tsx`: 2D high-speed racing track perspective with moving road stripes and curbs. Presents Projects, Achievements, and Certifications as interactive track flashcards. Clicking a card pauses the car (0 KM/H) and displays full technical specifications on the front HUD, with a Return to Garage button.
- `PitwallView.tsx`: Telemetry workstation interface presenting Skills (ICE, Aero, Backend, DevOps gauges) and Work Experience (E-Cell VIT pit stop performance logs, mentorship, +35% query speedup) in a high-density F1 timing data style, with a Return to Garage button.
- `ContactModal.tsx`: Accessible popup modal encapsulating the team radio message transmitter form, direct email/phone copy widgets, and LinkedIn/GitHub channels.
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
