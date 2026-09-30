import { useClock } from "../hooks";

export const TV_TOP = 34;
export const TV_BOTTOM = 46;
export const TV_SIDE = 12;

const CHANNELS: { ch: string; label: string; id: string }[] = [
  { ch: "1", label: "HERO", id: "hero" },
  { ch: "2", label: "ABOUT", id: "about" },
  { ch: "3", label: "SKILLS", id: "skills" },
  { ch: "4", label: "WORK", id: "projects" },
  { ch: "5", label: "LAB", id: "lab" },
  { ch: "6", label: "JOURNEY", id: "journey" },
  { ch: "7", label: "LOG", id: "guestbook" },
];

/**
 * The inner TV bezel. Rendered both inside the zooming intro rig and as the
 * persistent frame — identical markup means the hand-off is pixel-perfect.
 */
export function Bezel({
  onReplay,
  onGoto,
}: {
  onReplay?: () => void;
  onGoto?: (id: string) => void;
}) {
  const clock = useClock();

  return (
    <>
      {/* top bezel */}
      <div
        className="tv-plastic absolute inset-x-0 top-0 flex items-center justify-between px-3 sm:px-5"
        style={{ height: TV_TOP }}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
          <span className="font-pixel text-[7px] tracking-wider text-[var(--tv-text)] sm:text-[8px]">
            RIPUN-TRON 3000
          </span>
          <span className="hidden font-mono text-[9px] tracking-widest text-[var(--tv-text-mute)] sm:inline">
            • SOLID STATE
          </span>
        </div>

        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-[var(--tv-text-mute)] md:block">
          CH-03 • NTSC • AUTO TRACKING
        </span>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tabular-nums text-[var(--tv-text)]">{clock}</span>
        </div>
      </div>

      {/* bottom bezel */}
      <div
        className="tv-plastic absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-2.5 sm:gap-3 sm:px-4"
        style={{ height: TV_BOTTOM }}
      >
        {/* Left: hardware accents + REPLAY button */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="tv-knob h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          {onReplay && (
            <button
              onClick={onReplay}
              title="Replay TV Intro & Zoom"
              className="tv-btn pointer-events-auto flex items-center gap-1.5 rounded border border-[var(--tv-border)] px-2 py-1 font-pixel text-[7px] tracking-wider shadow-sm sm:text-[7.5px]"
            >
              <span className="text-red-500">▶</span>
              <span className="hidden xs:inline">REPLAY</span>
              <span>PREVIEW</span>
            </button>
          )}
        </div>

        {/* Center: Small Channel Instructions & Quick Keys */}
        <div className="flex min-w-0 items-center justify-center gap-1 overflow-hidden font-mono text-[9px] sm:gap-1.5 sm:text-[10px]">
          <span className="hidden font-pixel text-[6.5px] tracking-wider text-[var(--tv-text-mute)] lg:inline">
            CHANNELS:
          </span>
          <div className="flex items-center gap-1">
            {CHANNELS.map((c) => (
              <button
                key={c.ch}
                onClick={() => onGoto?.(c.id)}
                title={`Jump to ${c.label} (Key ${c.ch})`}
                className="tv-btn pointer-events-auto rounded border border-[var(--tv-border)] px-1.5 py-0.5 text-[9px] leading-tight text-[var(--tv-text)] hover:border-[var(--tv-text)]"
              >
                <span className="font-bold text-[var(--tv-text)]">[{c.ch}]</span>
                <span className="hidden text-[var(--tv-text-mute)] xl:inline"> {c.label}</span>
              </button>
            ))}
          </div>
          <span className="hidden text-[var(--tv-text-mute)] lg:inline">·</span>
          <span className="hidden font-mono text-[9px] text-[var(--tv-text-mute)] lg:inline">
            [T] TERM · [⌘K] CMD
          </span>
        </div>

        {/* Right: Speaker + RS-27 Model badge */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="tv-speaker hidden h-4 w-12 opacity-80 sm:block sm:w-20" />
          <span className="rounded border border-[var(--tv-border)] px-1.5 py-0.5 font-pixel text-[6.5px] tracking-wider text-[var(--tv-text-mute)] sm:text-[7px]">
            RS-27
          </span>
        </div>
      </div>

      {/* side rails */}
      <div className="tv-plastic absolute inset-y-0 left-0" style={{ width: TV_SIDE }} />
      <div className="tv-plastic absolute inset-y-0 right-0" style={{ width: TV_SIDE }} />

      {/* corner screws */}
      <span className="tv-screw absolute left-[3px] top-[9px] h-1.5 w-1.5 rounded-full" />
      <span className="tv-screw absolute right-[3px] top-[9px] h-1.5 w-1.5 rounded-full" />
      <span className="tv-screw absolute bottom-[13px] left-[3px] h-1.5 w-1.5 rounded-full" />
      <span className="tv-screw absolute bottom-[13px] right-[3px] h-1.5 w-1.5 rounded-full" />

      {/* inner edge of the screen opening */}
      <div
        className="pointer-events-none absolute rounded-[2px]"
        style={{
          inset: `${TV_TOP}px ${TV_SIDE}px ${TV_BOTTOM}px ${TV_SIDE}px`,
          boxShadow: "var(--tv-screen-bevel)",
        }}
      />
    </>
  );
}

/** Persistent TV frame shown over the site once the intro has finished. */
export default function TvFrame({
  onReplay,
  onGoto,
}: {
  onReplay?: () => void;
  onGoto?: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      <Bezel onReplay={onReplay} onGoto={onGoto} />
    </div>
  );
}
