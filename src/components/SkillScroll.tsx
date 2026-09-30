import { useId, useState } from "react";
import { skillGroups } from "../data/portfolio";

/** Cylinder shading for the two rollers — built only from theme variables. */
const ROLLER_BG =
  "linear-gradient(180deg, color-mix(in oklab, var(--ink) 30%, var(--panel2)) 0%, var(--panel2) 30%, var(--panel) 55%, color-mix(in oklab, var(--ink) 24%, var(--panel2)) 100%)";

/** Warm parchment tint that still follows the light / dark theme. */
const PAPER_BG =
  "repeating-linear-gradient(180deg, transparent 0 25px, color-mix(in oklab, var(--ink) 7%, transparent) 25px 26px), color-mix(in oklab, #d9c79b 24%, var(--panel))";

function EndCaps() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -left-2 top-1/2 h-[calc(100%+6px)] w-3 -translate-y-1/2 border-2 border-ink bg-panel2"
      />
      <span
        aria-hidden="true"
        className="absolute -right-2 top-1/2 h-[calc(100%+6px)] w-3 -translate-y-1/2 border-2 border-ink bg-panel2"
      />
    </>
  );
}

export default function SkillScroll() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const toggle = () => setOpen((o) => !o);

  return (
    <aside aria-label="Skills list" className="w-full px-2">
      {/* top roller — always visible, this is the "click me" part */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="hard-sm relative flex w-full items-center justify-between gap-3 rounded-full border-2 border-ink px-5 py-3.5 text-left transition-transform hover:-translate-y-px active:translate-y-px"
        style={{ background: ROLLER_BG }}
      >
        <EndCaps />
        <span className="font-pixel text-[9px] text-ink">SKILL SCROLL</span>
        <span className="font-mono text-[11px] text-mute">{open ? "roll up ▴" : "unroll ▾"}</span>
      </button>

      {/* paper + bottom roller unroll together */}
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div
          className="overflow-hidden"
          style={{ visibility: open ? "visible" : "hidden", transition: `visibility 0s linear ${open ? "0s" : "0.5s"}` }}
        >
          <div className="mx-3 border-x-2 border-ink/70 px-4 py-5" style={{ background: PAPER_BG }}>
            <div className="grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-1">
              {skillGroups.map((g) => (
                <section key={g.id}>
                  <h3 className="font-pixel text-[8px] leading-relaxed text-ink">
                    <span className="mr-1.5 text-mute">{g.icon}</span>
                    {g.name}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {g.skills.map((s) => (
                      <li key={s} className="font-mono text-[13px] leading-snug text-ink/90">
                        <span className="mr-2 text-mute">▸</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* bottom roller — purely decorative, also rolls the scroll back up */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={toggle}
            className="hard-sm relative mb-1 block h-7 w-full rounded-full border-2 border-ink"
            style={{ background: ROLLER_BG }}
          >
            <EndCaps />
          </button>
        </div>
      </div>
    </aside>
  );
}
