import { useState } from "react";
import { profile } from "../data/portfolio";
import { useCountUp, useReveal } from "../hooks";

const NOW = [
  { label: "Reading", value: "Designing Data-Intensive Applications" },
  { label: "Building", value: "ReplayDB event replay" },
  { label: "Learning", value: "Bedrock + LLM evals" },
];

const ASK_ABOUT = [
  "NestJS at scale",
  "ReplayDB",
  "SpineGuard patent",
  "LLM evals",
  "E-Cell",
  "DSA prep",
];

const ANSWERS: Record<string, string> = {
  "NestJS at scale":
    "Modular monolith first, microservices when the pain is real. ReplayDB runs NestJS + BullMQ + Postgres with OpenTelemetry tracing — the trick was making replay deterministic, not just fast.",
  ReplayDB:
    "It records application events and rebuilds exact past states so you can rewind production. Think git reflog, but for your running backend.",
  "SpineGuard patent":
    "Arduino sensors → Python Random Forest → voice alerts when you slouch. Filed and published as a patent application.",
  "LLM evals":
    "175 hand-labelled examples, 72.6% intent accuracy. The unglamorous secret of LLM apps: the eval harness matters more than the prompt.",
  "E-Cell":
    "5,000+ users hit our event platform at once. Indexing + caching held the line at 99.9% availability — and taught me strong opinions about connection pools.",
  "DSA prep":
    "C++ for contests, Python for interviews. The second solution is always cleaner than the first.",
};

export default function About({ onTerminal }: { onTerminal: () => void }) {
  const head = useReveal<HTMLDivElement>(0.4);
  const stats = useReveal<HTMLDivElement>(0.3);
  const [ask, setAsk] = useState<string | null>(null);

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div ref={head.ref} className={`reveal ${head.shown ? "in" : ""}`}>
        <SectionHead
          index="01"
          kicker="About"
          title="Backend engineer in training,"
          accent="shipped work"
          tail="to show for it."
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <p className="text-[17px] leading-relaxed text-ink">{profile.bio[0]}</p>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-mute">
            {profile.bio.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="font-pixel text-[8px] text-mute">ASK ME ABOUT ↓</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ASK_ABOUT.map((a) => (
                <button
                  key={a}
                  onClick={() => setAsk(ask === a ? null : a)}
                  className={`rounded-md border px-3 py-1.5 text-[13px] transition-all ${
                    ask === a
                      ? "border-ink bg-ink text-base"
                      : "border-line text-mute hover:-translate-y-px hover:border-mute hover:text-ink"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            {ask && (
              <div className="hard-sm mt-4 rounded-md border border-ink/20 bg-panel p-4 text-[14px] leading-relaxed text-mute">
                <span className="font-medium text-ink">{ask}. </span>
                {ANSWERS[ask]}{" "}
                <button onClick={onTerminal} className="link-under text-ink">
                  More in the terminal →
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div ref={stats.ref} className={`reveal ${stats.shown ? "in" : ""} grid grid-cols-2 gap-x-6 gap-y-8`}>
            {profile.stats.map((s) => (
              <StatCell key={s.label} {...s} run={stats.shown} />
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-line bg-panel p-5">
            <p className="flex items-center justify-between font-pixel text-[8px] text-mute">
              <span>NOW PLAYING</span>
              <span className="blink-hard">●</span>
            </p>
            <div className="mt-2">
              {NOW.map((n) => (
                <div
                  key={n.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0 last:pb-0"
                >
                  <span className="shrink-0 font-mono text-[12px] text-mute">{n.label}</span>
                  <span className="text-right text-[13.5px] text-ink">{n.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({
  label,
  value,
  suffix,
  run,
}: {
  label: string;
  value: number;
  suffix: string;
  run: boolean;
}) {
  const n = useCountUp(value, run, 1500);
  return (
    <div className="border-t-2 border-ink pt-3">
      <div className="text-[28px] font-semibold tabular-nums tracking-tight text-ink">
        {n.toLocaleString()}
        <span className="text-mute">{suffix}</span>
      </div>
      <div className="mt-1 font-mono text-[11px] leading-snug text-mute">{label}</div>
    </div>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  accent,
  tail,
}: {
  index: string;
  kicker: string;
  title: string;
  accent: string;
  tail: string;
}) {
  const r = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={r.ref} className={`reveal ${r.shown ? "in" : ""}`}>
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
        <span className="font-pixel text-[8px] text-ink">{index}</span>
        <span className="h-px w-8 bg-line" />
        {kicker}
      </p>
      <h2 className="mt-3 max-w-2xl text-[clamp(1.7rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
        {title} <span className="font-serif font-normal italic">{accent}</span> {tail}
      </h2>
    </div>
  );
}
