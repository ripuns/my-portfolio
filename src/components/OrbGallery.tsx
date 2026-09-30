import { useState } from "react";
import { ORBS, ORB_CSS } from "./orbs/designs";
import { useTheme } from "../hooks";

function Screen({ children, rounded = "rounded-lg" }: { children: React.ReactNode; rounded?: string }) {
  return (
    <div className={`relative aspect-square w-full overflow-hidden border border-line bg-base ${rounded}`}>
      <div className="absolute inset-0 p-[7%]">{children}</div>
      <div className="static-tile pointer-events-none absolute -inset-[10%] opacity-[0.05]" style={{ animation: "staticShift 0.5s steps(3) infinite" }} />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 70px rgba(0,0,0,0.22)" }} />
    </div>
  );
}

export default function OrbGallery({ onBack }: { onBack: () => void }) {
  const { theme, setTheme, themes } = useTheme();
  const [sel, setSel] = useState(0);
  const current = ORBS[sel];
  const next = themes[(themes.indexOf(theme) + 1) % themes.length];

  return (
    <div className="min-h-screen bg-base text-ink antialiased">
      <style>{ORB_CSS}</style>

      <header className="sticky top-0 z-20 border-b border-line bg-base/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="rounded-md border border-line px-3 py-1.5 font-mono text-[12px] text-mute transition-colors hover:text-ink"
            >
              ← Back to site
            </button>
            <span className="hidden font-pixel text-[8px] text-mute sm:inline">ORB DESIGN LAB</span>
          </div>
          <button
            onClick={() => setTheme(next)}
            className="rounded-md border border-line px-3 py-1.5 font-mono text-[12px] text-mute transition-colors hover:text-ink"
          >
            Preview in {theme === "ink" ? "light" : "dark"} mode
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-pixel text-[8px] text-mute">SIX CONCEPTS · PICK ONE</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] text-ink">
          Choose the orb for your TV preview
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-[14px] leading-relaxed text-mute">
          Every design is live-animated, built only from SVG, and reads your site's current theme. Click any card to
          inspect it large, then tell me the number you want — for example, “use orb 03”.
        </p>

        {/* stage */}
        <section className="mt-10 grid grid-cols-1 items-center gap-8 rounded-lg border border-line bg-panel p-5 hard sm:p-7 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div className="mx-auto w-full max-w-[26rem]">
            <Screen rounded="rounded-2xl">
              <current.Art key={current.id} />
            </Screen>
          </div>
          <div>
            <p className="font-pixel text-[9px] text-mute">
              ORB {current.id} / {String(ORBS.length).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-none text-ink">{current.name}</h2>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.2em] text-mute">{current.tag}</p>
            <p className="mt-5 max-w-lg font-mono text-[14px] leading-relaxed text-ink/85">{current.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {current.traits.map((t) => (
                <span key={t} className="border border-line px-2.5 py-1 font-mono text-[11px] text-mute">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-2">
              <button
                onClick={() => setSel((s) => (s + ORBS.length - 1) % ORBS.length)}
                className="border border-line px-3.5 py-2 font-mono text-[12px] text-mute transition-colors hover:border-ink hover:text-ink"
              >
                ◀ Prev
              </button>
              <button
                onClick={() => setSel((s) => (s + 1) % ORBS.length)}
                className="border border-line px-3.5 py-2 font-mono text-[12px] text-mute transition-colors hover:border-ink hover:text-ink"
              >
                Next ▶
              </button>
            </div>
          </div>
        </section>

        {/* all concepts */}
        <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ORBS.map((o, i) => {
            const active = i === sel;
            return (
              <button
                key={o.id}
                onClick={() => {
                  setSel(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`group flex flex-col rounded-lg border bg-panel p-4 text-left transition-all hover:-translate-y-0.5 ${
                  active ? "border-ink hard-sm" : "border-line hover:border-mute"
                }`}
              >
                <Screen>
                  <o.Art />
                </Screen>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-display text-[1.6rem] leading-none text-ink">{o.name}</span>
                  <span className="font-pixel text-[9px] text-mute">{o.id}</span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{o.tag}</p>
                <p className="mt-3 font-mono text-[12.5px] leading-relaxed text-mute">{o.traits.join(" · ")}</p>
                <p className="mt-4 font-pixel text-[7px] text-mute transition-colors group-hover:text-ink">
                  {active ? "● VIEWING" : "▶ INSPECT LARGE"}
                </p>
              </button>
            );
          })}
        </section>

        <p className="mt-10 font-mono text-[12px] leading-relaxed text-mute">
          Nothing on your live site has changed. Once you pick a number I'll swap it into the TV preview, where it
          replaces the current orb after the RS spiral.
        </p>
      </main>
    </div>
  );
}
