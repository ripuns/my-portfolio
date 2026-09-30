import { useState } from "react";
import { skillGroups } from "../data/portfolio";
import { useReveal } from "../hooks";
import { SectionHead } from "./About";

const SEGS = 16;

export default function Skills() {
  const panel = useReveal<HTMLDivElement>(0.1);
  const [cat, setCat] = useState(0);
  const group = skillGroups[cat];
  const avg = Math.round(group.skills.reduce((a, s) => a + s.level, 0) / group.skills.length);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        index="02"
        kicker="Skills"
        title="A focused toolbox,"
        accent="no filler."
        tail=""
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {skillGroups.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setCat(i)}
            className={`rounded-md border px-3.5 py-2 font-mono text-[12px] transition-all ${
              i === cat
                ? "border-ink bg-ink text-base"
                : "border-line text-mute hover:-translate-y-px hover:border-mute hover:text-ink"
            }`}
          >
            <span className="mr-1.5 opacity-60">{g.icon}</span>
            {g.name}
          </button>
        ))}
      </div>

      <div
        ref={panel.ref}
        className={`reveal ${panel.shown ? "in" : ""} hard-sm mt-4 rounded-lg border border-ink/15 bg-panel p-5 sm:p-6`}
      >
        <div className="flex items-center justify-between font-pixel text-[8px] text-mute">
          <span>
            {group.name.toUpperCase()} · {group.skills.length} SKILLS
          </span>
          <span>
            AVG <span className="text-ink">{avg}</span>
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          {group.skills.map((s, i) => {
            const on = Math.round((s.level / 100) * SEGS);
            return (
              <div key={s.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[14.5px] font-medium text-ink">{s.name}</span>
                  <span className="font-mono text-[12px] tabular-nums text-mute">
                    LV <span className="text-ink">{s.level}</span>
                  </span>
                </div>
                <div className="mt-2 flex gap-[3px]">
                  {Array.from({ length: SEGS }).map((_, k) => (
                    <span
                      key={k}
                      className="seg border border-ink/15 transition-colors duration-200"
                      style={{
                        background: panel.shown && k < on ? "var(--ink)" : "transparent",
                        transitionDelay: panel.shown ? `${i * 70 + k * 22}ms` : "0ms",
                        opacity: panel.shown && k < on ? 1 : 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 border-t border-line pt-3 font-mono text-[11px] text-mute">
          self-assessed, ± honest · hover the lab below for proof of DSA
        </p>
      </div>
    </section>
  );
}
