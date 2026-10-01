import { useEffect, useMemo, useState } from "react";
import { projects, type Project } from "../data/portfolio";
import { useReveal } from "../hooks";
import { SectionHead } from "./About";

const FILTERS = ["All", "Starred", "Backend", "AI/ML", "IoT", "Full-Stack"] as const;

export default function Projects({ openId, setOpenId }: { openId: string | null; setOpenId: (id: string | null) => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const grid = useReveal<HTMLDivElement>(0.05);
  const [sort, setSort] = useState<"year" | "az">("year");

  const list = useMemo(() => {
    let l = projects.filter((p) => (filter === "All" ? true : filter === "Starred" ? p.starred : p.kind === filter));
    l = [...l].sort((a, b) => (sort === "year" ? b.year.localeCompare(a.year) : a.title.localeCompare(b.title)));
    return l;
  }, [filter, sort]);

  const open = projects.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpenId]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        index="03"
        kicker="Selected work"
        title="Things I've built"
        accent="and shipped."
        tail=""
      />

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md border px-3 py-1.5 font-mono text-[12px] transition-colors ${
              filter === f
                ? "border-ink bg-ink text-base"
                : "border-line text-mute hover:border-mute hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
        <button
          onClick={() => setSort((s) => (s === "year" ? "az" : "year"))}
          className="ml-auto font-mono text-[12px] text-mute transition-colors hover:text-ink"
        >
          {sort === "year" ? "Newest ↓" : "A–Z ↓"}
        </button>
      </div>

      <div ref={grid.ref} className={`reveal ${grid.shown ? "in" : ""} mt-3 border-t-2 border-ink`}>
        {list.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpenId(p.id)}
            className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-3 border-b border-line py-5 text-left transition-colors hover:bg-panel sm:gap-5 sm:px-3"
          >
            <span className="pt-1 font-pixel text-[9px] tabular-nums text-mute transition-colors group-hover:text-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[17px] font-semibold tracking-tight text-ink">{p.title}</span>
                <span className="font-mono text-[12px] text-mute">{p.year}</span>
                {p.starred && <span className="font-mono text-[11px] text-mute">★ featured</span>}
              </span>
              <span className="mt-1 block text-[14px] leading-relaxed text-mute">{p.blurb}</span>
              <span className="mt-2 block font-mono text-[11px] text-mute">
                {p.kind} · {p.stack.slice(0, 4).join(" · ")}
              </span>
            </span>
            <span className="pt-1 text-right">
              <span className="block max-w-[11rem] truncate font-mono text-[11px] text-mute">{p.metric}</span>
              <span className="mt-1.5 inline-block border border-line px-2 py-0.5 font-mono text-[11px] text-mute transition-all group-hover:border-ink group-hover:text-ink">
                OPEN →
              </span>
            </span>
          </button>
        ))}
      </div>

      {open && <Modal p={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="hard relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-ink/25 bg-panel">
        <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
          <span className="h-2.5 w-2.5 bg-ink/70" />
          <span className="h-2.5 w-2.5 bg-ink/25" />
          <span className="ml-2 truncate font-pixel text-[8px] text-mute">
            {p.title.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}.EXE
          </span>
          <button
            onClick={onClose}
            className="ml-auto font-mono text-[12px] text-mute transition-colors hover:text-ink"
          >
            [X]
          </button>
        </div>
        <div className="p-6 sm:p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            {p.kind} · {p.year}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{p.title}</h3>
          <p className="mt-1 font-mono text-[12px] text-mute">{p.metric}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-mute">{p.detail}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="border border-line px-2.5 py-1 font-mono text-[11px] text-mute"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
            <a
              href="https://github.com/ripuns"
              target="_blank"
              rel="noreferrer"
              className="pixel-btn rounded-md bg-ink px-5 py-2.5 text-[13px] font-medium text-base"
            >
              View source ↗
            </a>
            <button
              onClick={onClose}
              className="rounded-md border border-line px-5 py-2.5 text-[13px] text-mute transition-colors hover:text-ink"
            >
              Back to list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
