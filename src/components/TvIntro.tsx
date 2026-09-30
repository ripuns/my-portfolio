import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Bezel } from "./TvFrame";
import { ORB_CSS, PlasmaOrbArt } from "./orbs/designs";

export type TvPhase = "preview" | "zoom" | "done";

/**
 * All geometry lives in "full-scale" coordinates where the viewport is
 * (0,0)–(W,H) and the TV screen opening is exactly the viewport minus the
 * bezel. The casing extends *beyond* the viewport, so when the rig is scaled
 * down you see a whole TV, and at scale 1 the extra casing sits off-screen.
 */
export type TvLayout = {
  W: number;
  H: number;
  PL: number;
  PR: number;
  PT: number;
  PB: number;
  A: number;
  F: number;
  s: number;
  tx: number;
  ty: number;
  narrow: boolean;
};

export function computeTvLayout(W: number, H: number): TvLayout {
  const narrow = W < 700;
  const PL = narrow ? 22 : Math.max(40, W * 0.045);
  const PR = narrow ? 22 : Math.max(120, W * 0.13);
  const PT = Math.max(28, H * 0.05);
  const PB = narrow ? Math.max(64, H * 0.08) : Math.max(76, H * 0.11);
  const A = Math.min(140, H * 0.16);
  const F = 22;
  const M = narrow ? 14 : 28;
  const hint = 40;

  const bw = W + PL + PR;
  const bh = H + PT + PB + A + F;
  const availW = W - 2 * M;
  const availH = H - 2 * M - hint;
  const s = Math.min(availW / bw, availH / bh, narrow ? 0.9 : 0.66);

  const tx = (W - s * bw) / 2 + s * PL;
  const ty = M + (availH - s * bh) / 2 + s * (PT + A);

  return { W, H, PL, PR, PT, PB, A, F, s, tx, ty, narrow };
}

function measure() {
  return computeTvLayout(document.documentElement.clientWidth || window.innerWidth, window.innerHeight);
}

export function useTvLayout(active: boolean) {
  const [layout, setLayout] = useState<TvLayout>(measure);
  useEffect(() => {
    if (!active) return;
    const on = () => setLayout(measure());
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [active]);
  return layout;
}

/* ------------------------------------------------------------------ */
/* Room — the ambient space the TV sits in (rendered beneath the rig)  */
/* ------------------------------------------------------------------ */

export function TvRoom({ l, phase }: { l: TvLayout; phase: TvPhase }) {
  const bottom = l.ty + l.s * (l.H + l.PB + l.F);
  const cx = l.tx + l.s * ((l.W + l.PR - l.PL) / 2);
  const width = l.s * (l.W + l.PL + l.PR);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000"
      style={{
        opacity: phase === "zoom" ? 0 : 1,
        background:
          "radial-gradient(ellipse at 50% 30%, var(--panel) 0%, var(--panel2) 55%, var(--base) 100%)",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(color-mix(in oklab, var(--ink) 8%, transparent) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 100%)",
        }}
      />
      <div
        className="static-tile absolute -inset-[15%] opacity-[0.05]"
        style={{ animation: "staticShift 0.5s steps(3) infinite" }}
      />
      {/* floor plane + contact shadow */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ top: bottom - 2, background: "linear-gradient(180deg, color-mix(in oklab, var(--ink) 6%, transparent), transparent)" }}
      />
      <div
        className="absolute rounded-[50%]"
        style={{
          left: cx - width * 0.46,
          top: bottom - 14,
          width: width * 0.92,
          height: 28,
          background: "color-mix(in oklab, var(--ink) 28%, transparent)",
          filter: "blur(14px)",
        }}
      />
      <p className="blink-hard absolute inset-x-0 bottom-4 text-center font-mono text-[12px] tracking-[0.25em] text-[var(--tv-text-mute)]">
        CLICK ANYWHERE TO SKIP ▸
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rig back — casing, antenna, feet, knobs (behind the live site)      */
/* ------------------------------------------------------------------ */

export function TvRigBack({ l }: { l: TvLayout }) {
  const { W, H, PL, PR, PT, PB, A, F, narrow } = l;
  const bw = W + PL + PR;
  const bh = H + PT + PB;
  const R = narrow ? 30 : 48;
  const rod = Math.max(48, (A - 30) / Math.cos((28 * Math.PI) / 180));
  const box: CSSProperties = { left: -PL, top: -PT, width: bw, height: bh, borderRadius: R };
  const knob = Math.min(84, PR * 0.56);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* antenna rods */}
      {[-28, 28].map((deg) => (
        <div
          key={deg}
          className="absolute"
          style={{
            left: W / 2 - 3,
            top: -PT - 28 - rod,
            width: 6,
            height: rod,
            borderRadius: 3,
            transformOrigin: "50% 100%",
            transform: `rotate(${deg}deg)`,
            background: "linear-gradient(90deg, #8f8a7e, #e2ddd1, #8f8a7e)",
          }}
        >
          <span
            className="absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle at 35% 30%, #f4f0e7, #8f8a7e)" }}
          />
        </div>
      ))}
      {/* antenna base */}
      <div
        className="tv-plastic absolute"
        style={{
          left: W / 2 - 80,
          top: -PT - 34,
          width: 160,
          height: 42,
          borderRadius: "80px 80px 8px 8px",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.75)",
        }}
      />

      {/* feet */}
      {[0.12, 0.88].map((f) => (
        <div
          key={f}
          className="tv-plastic absolute"
          style={{
            left: -PL + bw * f - 60,
            top: H + PB - 8,
            width: 120,
            height: F + 8,
            borderRadius: "0 0 14px 14px",
          }}
        />
      ))}

      {/* drop shadow (outer only) + casing */}
      <div
        className="absolute"
        style={{
          ...box,
          boxShadow: "0 60px 100px -40px rgba(0,0,0,0.5), 0 18px 30px -12px rgba(0,0,0,0.3)",
        }}
      />
      <div
        className="tv-plastic absolute"
        style={{
          ...box,
          border: "1px solid var(--tv-border)",
        }}
      />

      {/* recessed screen tray */}
      <div
        className="absolute"
        style={{
          left: -16,
          top: -16,
          width: W + 32,
          height: H + 32,
          borderRadius: 22,
          background: "var(--panel2)",
          boxShadow: "inset 0 4px 10px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.2)",
        }}
      />

      {/* right control panel */}
      {!narrow && (
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: W + 20,
            top: 0,
            width: PR - 20 - 14,
            height: H,
            paddingTop: H * 0.05,
            paddingBottom: H * 0.04,
            gap: H * 0.035,
          }}
        >
          <span className="font-pixel text-[12px] tracking-wider text-[var(--tv-text-mute)]">RS-27</span>
          <Knob size={knob} label="CHANNEL" deg={40} />
          <Knob size={knob * 0.8} label="VOLUME" deg={-35} />
          <div className="tv-speaker w-[62%] flex-1 rounded-md" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-3 w-6 rounded-sm"
                style={{ background: "var(--tv-border)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* bottom strip */}
      <div
        className="absolute flex items-center justify-between"
        style={{
          left: -PL,
          top: H + 16,
          width: bw,
          height: PB - 16,
          padding: `0 ${Math.max(PL, 30)}px`,
        }}
      >
        <span className="flex items-center gap-3">
          <span
            className="block rounded-md"
            style={{
              width: narrow ? 34 : 54,
              height: narrow ? 18 : 26,
              background: "var(--tv-border)",
              boxShadow: "inset 0 2px 3px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.4)",
            }}
          />
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_3px_rgba(239,68,68,0.7)]" />
          {!narrow && (
            <span className="font-mono text-[13px] tracking-[0.2em] text-[var(--tv-text-mute)]">POWER</span>
          )}
        </span>
        <span
          className="font-pixel tracking-wider text-[var(--tv-text)]"
          style={{ fontSize: narrow ? 12 : 18 }}
        >
          SONY TRINITRON 3000
        </span>
        {!narrow ? (
          <span className="font-mono text-[13px] tracking-[0.2em] text-[var(--tv-text-mute)]">MODEL RS-27 • B/W TV</span>
        ) : (
          <span className="w-10" />
        )}
      </div>
    </div>
  );
}

function Knob({ size, label, deg }: { size: number; label: string; deg: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="tv-knob relative block" style={{ width: size, height: size }}>
        <span className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
          <span className="absolute left-1/2 top-[8%] h-[24%] w-[4px] -translate-x-1/2 rounded bg-[var(--tv-text)]" />
        </span>
      </span>
      <span className="font-mono text-[13px] tracking-[0.2em] text-[var(--tv-text-mute)]">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rig front — bezel + screen overlays (above the live site)           */
/* ------------------------------------------------------------------ */

export function TvRigFront({
  l,
  phase,
  count,
  total,
  onReplay,
  onGoto,
}: {
  l: TvLayout;
  phase: TvPhase;
  count: number;
  total: number;
  onReplay?: () => void;
  onGoto?: (id: string) => void;
}) {
  const elapsed = total - count;
  const big = l.narrow ? 28 : 38;
  // Keep every preview state inside a responsive CRT-safe area. The top and
  // bottom reserve space for the VCR OSD, while the side inset clears the
  // curved screen edge on both wide and narrow TV sets.
  const marginX = Math.max(l.narrow ? 18 : 30, Math.round(l.W * 0.045));
  const marginY = Math.max(l.narrow ? 16 : 24, Math.round(l.H * 0.035));
  const stageTop = marginY + big * 1.55;
  const stageBottom = marginY + big * 1.35;
  const stageWidth = l.W - marginX * 2;
  const stageHeight = l.H - stageTop - stageBottom;
  // The orb first appears comfortably inside the CRT-safe stage...
  const orbSize = Math.max(140, Math.min(stageWidth, stageHeight) * 1.08);
  // ...then zooms until its circle (radius ≈ 36% of the SVG) covers the whole
  // screen, corners included, with a little headroom for its "breathing".
  const orbZoom = (Math.hypot(l.W, l.H) / 2 / (orbSize * 0.36)) * 1.1;
  // Big RS wordmark, fitted to the screen so nothing is ever clipped.
  const rsSize = Math.max(44, Math.min(stageWidth / 3.5, stageHeight * 0.4));
  // Individual letters give us real gaps without CSS letter-spacing's trailing
  // space, which previously made the centered word appear shifted left.
  const welcomeSize = Math.min(stageWidth / 8.3, l.H * 0.4);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/*
        Single TV Frame Fix: the persistent viewport Bezel fades in ONLY when zooming in,
        so in the initial preview mode there is strictly ONE TV casing visible!
      */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: phase === "zoom" ? 1 : 0 }}
      >
        <Bezel onReplay={onReplay} onGoto={onGoto} />
      </div>

      <style>{ORB_CSS}</style>

      {/* Welcome sequence — power-on → WELCOME → RS → plasma orb; live page appears on zoom */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[14px] transition-opacity duration-500 ease-out"
        style={{ opacity: phase === "preview" ? 1 : 0 }}
      >
        {/* Preview stays isolated from the live page until the camera zoom begins. */}
        <div className="absolute inset-0 bg-base" />

        {/* CRT power-on line */}
        <div
          className="absolute inset-x-0 h-[3px] bg-white shadow-[0_0_24px_6px_rgba(255,255,255,0.8)]"
          style={{ top: "calc(50% - 1.5px)", animation: "lineOn 0.9s ease-out 0.1s both" }}
        />

        {/* tuning static — only during the brief power-on burst, then it fully
            stops animating (tuneStaticOff ends at opacity:0), so nothing keeps
            repainting a full-screen noise texture behind the zooming orb */}
        <div
          className="static-tile absolute -inset-[10%]"
          style={{ animation: "staticShift 0.28s steps(2) 8, tuneStaticOff 2.4s ease-out forwards" }}
        />
        <div className="scanlines absolute inset-0 opacity-70" />
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 160px rgba(0,0,0,0.18)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 32%)" }}
        />

        {/* 1 · welcome screen — fills the responsive CRT-safe stage */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: marginX, right: marginX, top: marginY, bottom: marginY }}
        >
          <p
            aria-label="Welcome"
            className="flex items-center justify-center whitespace-nowrap font-display font-bold leading-none text-ink"
            style={{
              fontSize: welcomeSize,
              gap: `${welcomeSize * 0.68}px`,
              animation: "welcomeIn 1.2s ease-out 0.75s both",
            }}
          >
            {"WELCOME".split("").map((letter, index) => (
              <span aria-hidden="true" key={index}>{letter}</span>
            ))}
          </p>
        </div>

        {/* 2 · plasma orb — blooms in, then zooms until it fills the entire screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            style={{
              width: orbSize,
              height: orbSize,
              flex: "none",
              ["--ping-end" as string]: 1.12,
              ["--orb-zoom" as string]: orbZoom,
              animation: "orbJourney 3.4s linear 1.7s both",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <PlasmaOrbArt perf />
          </svg>
        </div>

        {/* 3 · the RS logo lands on top of the zoomed-in orb layer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 52% at 50% 50%, color-mix(in oklab, var(--base) 84%, transparent) 0%, color-mix(in oklab, var(--base) 50%, transparent) 58%, transparent 100%)",
            animation: "orbScrim 0.9s ease-out 3.85s both",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            aria-label="RS"
            className="flex font-pixel leading-none text-ink"
            style={{
              fontSize: rsSize,
              gap: `${rsSize * 0.14}px`,
              textShadow:
                "0.05em 0.05em 0 var(--base), 0 0 0.25em var(--base), 0 0 0.6em var(--base)",
            }}
          >
            {["R", "S"].map((ch, i) => (
              <span
                key={ch}
                aria-hidden="true"
                style={{ animation: `rsLetter 0.8s cubic-bezier(0.22,1,0.36,1) ${4.0 + i * 0.22}s both` }}
              >
                {ch}
              </span>
            ))}
          </p>
          {/* <div
            aria-hidden="true"
            style={{
              width: rsSize * 2.14,
              height: Math.max(3, rsSize * 0.05),
              marginTop: rsSize * 0.14,
              background: "var(--ink)",
              boxShadow: "0 0 0.6em var(--base)",
              transformOrigin: "left center",
              animation: "rsBar 0.7s cubic-bezier(0.22,1,0.36,1) 4.4s both",
            }}
          />
          <p
            className="font-mono font-bold uppercase text-ink"
            style={{
              marginTop: rsSize * 0.16,
              fontSize: Math.max(11, rsSize * 0.085),
              letterSpacing: "0.42em",
              paddingLeft: "0.42em",
              textShadow: "0 0 0.6em var(--base), 0 0 1.2em var(--base)",
              animation: "rsSub 0.7s cubic-bezier(0.22,1,0.36,1) 4.55s both",
            }}
          >
            Ripun Sethia
          </p>*/}
        </div>

        {/* VCR on-screen display */}
        <Osd size={big} style={{ left: marginX, top: marginY }}>
          CH 03
        </Osd>
        <Osd size={big} className="blink-hard" style={{ right: marginX, top: marginY }}>
          ▶ PLAY
        </Osd>
        <Osd size={big * 0.8} style={{ left: marginX, bottom: marginY }}>
          SP 0:00:0{elapsed}
        </Osd>
      </div>
    </div>
  );
}

function Osd({
  children,
  size,
  style,
  className = "",
}: {
  children: ReactNode;
  size: number;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <span
      className={`absolute bg-black/75 font-display leading-none text-white ${className}`}
      style={{ ...style, fontSize: size, padding: `${size * 0.12}px ${size * 0.3}px` }}
    >
      {children}
    </span>
  );
}
