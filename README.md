# Ripun Sethia — F1 Cockpit & Telemetry Portfolio

An interactive, high-performance **2D F1 Driver POV Racing & Telemetry Web Experience** showcasing the software engineering portfolio, patented biomedical IoT systems, and academic accomplishments of **Ripun Sethia** (Car #27).

---

## 1. What
This repository contains the complete production-grade source code for Ripun Sethia's personal portfolio website. It features an immersive Formula 1 driver cockpit POV, an interactive 2D racing track with project flashcards, a high-density pitwall telemetry workstation for technical skills and work experience, and a full executive ATS resume mode.

---

## 2. Why
Modern engineering portfolios frequently suffer from two extremes: either generic static text documents with zero personal brand recall, or cumbersome 3D WebGL experiences that take 15 seconds to load and consume excessive battery. 

This project was built to deliver the best of both worlds:
- **Zero 3D Engine Overhead**: Fast, sub-second load times using pure 2D SVG, Tailwind CSS, and GPU-accelerated Framer Motion.
- **Memorable Storytelling**: High-tech telemetry data visualization mapped directly to real-world engineering concepts (concurrency controls, API latency, ML pipelines, patent publications).
- **Recruiter Convenience**: Instant toggle to an ATS-optimized, high-density printable resume view.

---

## 3. How & Architecture Overview

```text
[Website Entry]
       │
       ▼
[RacingLightsOverlay] (5 Red Lights + Speed Wipe + 2.5s Dissolve)
       │
       ▼
[Garage / Driver POV] (Cockpit framing, Steering wheel, Garage environment)
       │
       ▼
[Central Curved Holographic Display]
       │
       ├── Projects / Achievements / Certifications ──▶ [RacingTrackView]
       │                                                      │
       │                                                (Car in Motion)
       │                                                      │
       │                                                [Track Flashcards]
       │                                                      │
       │                                                (Card Selected)
       │                                                      │
       │                                                (Car Stops + Spec Details)
       │                                                      │
       │                                                [Return to Garage]
       │
       ├── Skills / Work Experience ──────────────────▶ [PitwallView]
       │                                                      │
       │                                                (Telemetry / Data UI)
       │                                                      │
       │                                                [Return to Garage]
       │
       └── Contact ───────────────────────────────────▶ [ContactModal]
                                                              │
                                                        (Existing Form Reused)
```

---

## 4. Technology Stack Rationale

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **Next.js 15 (App Router)** | Framework & SSR | Delivers optimal SEO, fast server-side page compilation, and clean route structuring. |
| **TypeScript** | Language & Type Safety | Eliminates runtime bugs across data models and component props. |
| **Tailwind CSS (v4)** | Utility Styling & Theme | Zero runtime CSS overhead, built-in dark mode, and responsive layout classes. |
| **Framer Motion** | 2D Kinetic Animations | Smooth 60fps animations for speed streaks, tachometers, and holographic transitions. |
| **Web Audio API** | Audio FX Synthesizer | Synthesizes realistic 5-lights beeps, DRS chimes, and radio clicks with zero external mp3 files. |
| **Canvas Confetti** | Celebration Feedback | Triggers festive particle confetti when interacting with podium trophies and awards. |

---

## 5. Directory Structure & Documentation

- `src/` — Main application source code.
  - `app/` — Next.js App Router root layout, metadata, and core page orchestrator.
  - `components/` — Modular React UI components (Cockpit POV, Racing Track, Pitwall, Overlays, Modals).
  - `data/` — Static domain data model holding all resume metrics, projects, and achievements.
  - `lib/` — Shared Web Audio API synthesizers and utility helpers.

---

## 6. Running Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```
