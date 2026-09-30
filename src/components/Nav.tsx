import { useEffect, useState } from "react";
import { useScrollProgress } from "../hooks";

const LINKS = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "journey", label: "Journey" },
  { id: "guestbook", label: "Guestbook" },
];

export default function Nav({
  active,
  onGoto,
  onPalette,
  theme,
  themes,
  setTheme,
  crt,
  onCrt,
  framed,
}: {
  active: string;
  onGoto: (id: string) => void;
  onPalette: () => void;
  theme: string;
  themes: readonly string[];
  setTheme: (t: any) => void;
  crt: boolean;
  onCrt: () => void;
  framed: boolean;
}) {
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const next = themes[(themes.indexOf(theme) + 1) % themes.length];
  const top = framed ? 34 : 0;

  return (
    <>
      <div
        className="fixed left-0 z-[65] h-[2px] w-full transition-[top] duration-700 ease-out"
        style={{ top }}
      >
        <div className="h-full bg-ink" style={{ width: `${progress * 100}%` }} />
      </div>

      <header
        className={`fixed left-0 right-0 z-[62] transition-all duration-700 ${
          scrolled ? "border-b border-line bg-base/85 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ top }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button onClick={() => onGoto("hero")} className="group flex items-center gap-2.5">
            <span className="grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden="true">
              <span className="bg-ink" />
              <span className="bg-ink/25" />
              <span className="bg-ink/25" />
              <span className="bg-ink transition-opacity group-hover:opacity-70" />
            </span>
            <span
              className="font-display text-[22px] leading-none tracking-wide text-ink"
              aria-label="Ripun Sethia"
            >
              RS
              <span className="blink-hard ml-1.5 inline-block h-3.5 w-[8px] translate-y-[2px] bg-ink" />
            </span>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.slice(1).map((l) => (
              <button
                key={l.id}
                onClick={() => onGoto(l.id)}
                className={`font-mono text-[13px] transition-colors ${
                  active === l.id ? "font-bold text-ink" : "text-mute hover:text-ink"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onCrt}
              title="Toggle CRT effect"
              className={`hidden rounded-md border px-2.5 py-1.5 font-pixel text-[8px] transition-colors sm:block ${
                crt ? "border-ink bg-ink text-base" : "border-line text-mute hover:text-ink"
              }`}
            >
              CRT {crt ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => setTheme(next)}
              className="rounded-md border border-line px-3 py-1.5 font-mono text-[12px] text-mute transition-colors hover:text-ink"
              aria-label="Toggle theme"
            >
              {theme === "paper" ? "Dark" : "Light"}
            </button>
            <button
              onClick={onPalette}
              className="hidden rounded-md border border-line px-3 py-1.5 font-mono text-[12px] text-mute transition-colors hover:text-ink sm:block"
            >
              ⌘K
            </button>
            <button
              onClick={() => setMenu((m) => !m)}
              className="rounded-md border border-line px-3 py-1.5 font-mono text-[12px] text-mute md:hidden"
              aria-label="Menu"
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menu && (
          <nav className="border-t border-line bg-base px-5 py-3 md:hidden">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  onGoto(l.id);
                  setMenu(false);
                }}
                className={`block w-full py-2 text-left font-mono text-[13px] ${
                  active === l.id ? "font-bold text-ink" : "text-mute"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={onCrt}
              className="block w-full py-2 text-left font-pixel text-[8px] text-mute"
            >
              CRT {crt ? "ON" : "OFF"}
            </button>
          </nav>
        )}
      </header>

      {/* mobile bottom dock sits above the TV bottom bezel */}
      <nav
        className="fixed left-1/2 z-[62] flex -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-md border border-line bg-panel/90 px-1.5 py-1.5 backdrop-blur md:hidden"
        style={{ bottom: framed ? 54 : 12 }}
      >
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => onGoto(l.id)}
            className={`rounded px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
              active === l.id ? "bg-ink text-base" : "text-mute"
            }`}
          >
            {l.label.slice(0, 4)}
          </button>
        ))}
      </nav>
    </>
  );
}
