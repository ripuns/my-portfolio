# `src/components/` Directory Documentation

## 1. What
This directory contains modular React client components powering Ripun Sethia's F1-telemetry-themed portfolio.

## 2. Why
Separating UI components into isolated units ensures high maintainability, explicit component boundaries, and clean reusability across the single-page tab layout.

## 3. How
Components collaborate with `src/data/portfolioData.ts` for domain content and `src/lib/audio.ts` for optional Web Audio API feedback. `src/app/page.tsx` drives which `bento/` panel is visible via `PillNav`'s active-tab state.

## 4. File Responsibilities
- `PillNav.tsx`: Floating pill-shaped tab bar (About / Skills / Projects / Contact) with animated active-tab indicator.
- `bento/ProfileBox.tsx`: Identity card — name, role, education, typewriter intro, resume download CTA.
- `bento/ExperienceBox.tsx`: Most recent role with real pit-stop-log bullets and tech stack chips.
- `bento/SkillsBox.tsx`: Tech stack grouped by sector, highlighting core skills.
- `bento/ProjectsBox.tsx`: Project list with hover-revealed telemetry stats and outbound links.
- `bento/ContactBox.tsx`: Contact card with email/LinkedIn/GitHub links.
