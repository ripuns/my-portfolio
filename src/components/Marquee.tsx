import { ticker } from "../data/portfolio";

export default function Marquee() {
  const row = [...ticker, ...ticker];
  return (
    <div className="border-y border-line bg-panel/60">
      <div className="marquee-wrap relative overflow-hidden py-3">
        <div className="marquee-track items-center gap-0">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center font-mono text-[12px] text-mute"
            >
              <span className="px-4">{t}</span>
              <span className="font-pixel text-[6px] text-ink/40">◆</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-base to-transparent" />
      </div>
    </div>
  );
}
