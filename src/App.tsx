import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Backdrop from "./components/Backdrop";
import TvFrame from "./components/TvFrame";
import { TvRigBack, TvRigFront, TvRoom, useTvLayout, type TvPhase } from "./components/TvIntro";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Playground from "./components/Playground";
import Journey from "./components/Journey";
import Guestbook from "./components/Guestbook";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import Terminal from "./components/Terminal";
import OrbGallery from "./components/OrbGallery";
import { useActiveSection, useKonami, useTheme } from "./hooks";

const SECTIONS = ["hero", "about", "skills", "projects", "lab", "journey", "guestbook"];

const SEEN_KEY = "ripun-tv-seen";
const CRT_KEY = "ripun-crt";
const SCROLL_KEY = "ripun-scroll";
const PREVIEW_SECS = 5;
const ZOOM_MS = 1900;
const ZOOM_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

function readLS(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function SiteApp() {
  // returning visitors skip straight to the framed site
  const [phase, setPhase] = useState<TvPhase>(() => (readLS(SEEN_KEY) === "1" ? "done" : "preview"));
  const [count, setCount] = useState(PREVIEW_SECS);
  const [palette, setPalette] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [project, setProject] = useState<string | null>(null);
  const [crt, setCrt] = useState(() => readLS(CRT_KEY) !== "0");
  const [burst, setBurst] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const { theme, setTheme, themes } = useTheme();
  const active = useActiveSection(SECTIONS);
  const toastTimer = useRef(0);

  const intro = phase !== "done";
  const layout = useTvLayout(intro);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  /* ---------------- intro timeline ---------------- */

  // 5-second preview countdown → zoom
  useEffect(() => {
    if (phase !== "preview") return;
    if (count <= 0) {
      const t = window.setTimeout(() => setPhase("zoom"), 250);
      return () => clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, count]);

  // zoom → done (and remember the visit)
  useEffect(() => {
    if (phase !== "zoom") return;
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setPhase("done"), ZOOM_MS + 60);
    return () => clearTimeout(t);
  }, [phase]);

  const skip = useCallback(() => {
    setPhase((p) => (p === "preview" ? "zoom" : p));
  }, []);

  const replay = useCallback(() => {
    setPalette(false);
    setTerminal(false);
    setProject(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setCount(PREVIEW_SECS);
    setPhase("preview");
  }, []);

  /* ---------------- persistence ---------------- */

  useEffect(() => {
    try {
      localStorage.setItem(CRT_KEY, crt ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [crt]);

  // restore scroll on reload (same tab) and keep saving it
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (phaseRef.current === "done") {
      let y = 0;
      try {
        y = Number(sessionStorage.getItem(SCROLL_KEY) ?? 0);
      } catch {
        /* ignore */
      }
      if (y > 0) {
        requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior }));
      }
    }
    let t = 0;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        try {
          sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
        } catch {
          /* ignore */
        }
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  /* ---------------- effects & shortcuts ---------------- */

  const flash = useCallback((msg?: string) => {
    setBurst((b) => b + 1);
    if (msg) {
      setToast(msg);
      window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2600);
    }
  }, []);

  const firstTheme = useRef(true);
  useEffect(() => {
    if (firstTheme.current) {
      firstTheme.current = false;
      return;
    }
    flash();
  }, [theme, flash]);

  useKonami(
    useCallback(() => {
      if (phaseRef.current !== "done") return;
      flash("+30 PTS · CHEAT ACCEPTED");
    }, [flash])
  );

  const goto = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current !== "done") {
        if (phaseRef.current === "preview" && !["Shift", "Control", "Alt", "Meta"].includes(e.key)) {
          setPhase("zoom");
        }
        return;
      }
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
        return;
      }
      const inField =
        (e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA";
      if (inField || e.metaKey || e.ctrlKey || e.altKey) return;
      const map: Record<string, string> = {
        "1": "hero",
        "2": "about",
        "3": "skills",
        "4": "projects",
        "5": "lab",
        "6": "journey",
        "7": "guestbook",
      };
      if (map[e.key]) goto(map[e.key]);
      if (e.key.toLowerCase() === "t") setTerminal((t) => !t);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto]);

  /* ---------------- camera transform ---------------- */

  // One transform drives both the TV casing and the live site inside it,
  // so the zoom is a single continuous move with nothing to fall out of sync.
  const camera: CSSProperties | undefined = intro
    ? {
        transformOrigin: "0 0",
        transform:
          phase === "preview"
            ? `translate(${layout.tx}px, ${layout.ty}px) scale(${layout.s})`
            : "translate(0px, 0px) scale(1)",
        transition: phase === "zoom" ? `transform ${ZOOM_MS}ms ${ZOOM_EASE}` : "none",
        // promote to its own GPU layer for the big continuous zoom
        willChange: "transform",
        backfaceVisibility: "hidden",
      }
    : undefined;

  return (
    <>
      {intro && <TvRoom l={layout} phase={phase} />}

      <div className={intro ? "fixed inset-0 z-[1]" : undefined} style={camera}>
        {intro && <TvRigBack l={layout} />}

        <div
          className={`isolate min-h-screen bg-base text-ink antialiased ${
            intro ? "pointer-events-none absolute inset-0 overflow-hidden rounded-[14px]" : ""
          }`}
          style={
            intro
              ? {
                  // The preview stays self-contained. The actual front page
                  // only fades in after the TV begins its camera zoom.
                  opacity: phase === "zoom" ? 1 : 0,
                  transition: "opacity 1.3s ease-out",
                }
              : undefined
          }
          inert={intro}
        >
          <Backdrop crt={crt} paused={intro} />

          <Nav
            active={active}
            onGoto={goto}
            onPalette={() => setPalette(true)}
            theme={theme}
            themes={themes}
            setTheme={setTheme}
            crt={crt}
            onCrt={() => {
              setCrt((c) => !c);
              flash();
            }}
            framed={phase === "done" || phase === "zoom"}
          />

          <main>
            <Hero onGoto={goto} onTerminal={() => setTerminal(true)} onPalette={() => setPalette(true)} />
            <Marquee />
            <About onTerminal={() => setTerminal(true)} />
            <Skills />
            <Projects openId={project} setOpenId={setProject} />
            <Playground />
            <Journey />
            <Guestbook />
            <Footer onGoto={goto} onTerminal={() => setTerminal(true)} onReplay={replay} />
          </main>

          <CommandPalette
            open={palette}
            onClose={() => setPalette(false)}
            onGoto={goto}
            onTheme={(t) => setTheme(t as any)}
            onProject={(id) => {
              goto("projects");
              window.setTimeout(() => setProject(id), 450);
            }}
            onTerminal={() => setTerminal(true)}
            onReplay={replay}
          />

          <Terminal
            open={terminal}
            onClose={() => setTerminal(false)}
            onGoto={goto}
            onTheme={(t) => setTheme(t as any)}
          />

          {burst > 0 && <StaticBurst key={burst} />}

          {toast && (
            <div className="fixed left-1/2 z-[85] -translate-x-1/2" style={{ bottom: 62 }}>
              <div className="hard-sm border border-ink bg-panel px-4 py-2.5 font-pixel text-[8px] text-ink">
                {toast}
              </div>
            </div>
          )}
        </div>

        {intro && (
          <TvRigFront
            l={layout}
            phase={phase}
            count={count}
            total={PREVIEW_SECS}
            onReplay={replay}
            onGoto={goto}
          />
        )}
      </div>

      {!intro && <TvFrame onReplay={replay} onGoto={goto} />}

      {phase === "preview" && (
        <button
          type="button"
          onClick={skip}
          aria-label="Skip intro"
          className="fixed inset-0 z-[120] cursor-pointer bg-transparent"
        />
      )}
    </>
  );
}

/**
 * Routes between the real site and the standalone orb design gallery.
 * Open the gallery with `#orbs` in the URL, or via ⌘K → "Preview orb designs".
 */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (hash === "#orbs") {
    return (
      <OrbGallery
        onBack={() => {
          history.replaceState(null, "", window.location.pathname + window.location.search);
          setHash("");
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }}
      />
    );
  }

  return <SiteApp />;
}

function StaticBurst() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setOn(false), 380);
    return () => clearTimeout(t);
  }, []);
  if (!on) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[84]">
      <div
        className="static-tile absolute inset-0 opacity-40"
        style={{ animation: "staticShift 0.12s steps(2) infinite" }}
      />
      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-x-0 top-1/3 h-8 bg-ink/10" />
    </div>
  );
}
