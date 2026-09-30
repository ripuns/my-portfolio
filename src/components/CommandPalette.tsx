import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/portfolio";

export type Action = {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onGoto: (id: string) => void;
  onTheme: (t: string) => void;
  onProject: (id: string) => void;
  onTerminal: () => void;
  onReplay: () => void;
};

export default function CommandPalette({ open, onClose, onGoto, onTheme, onProject, onTerminal, onReplay }: Props) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions = useMemo<Action[]>(() => {
    const list: Action[] = [
      { id: "n-hero", label: "Overview", hint: "top", group: "Go to", run: () => onGoto("hero") },
      { id: "n-about", label: "About", hint: "bio", group: "Go to", run: () => onGoto("about") },
      { id: "n-skills", label: "Skills", hint: "toolbox", group: "Go to", run: () => onGoto("skills") },
      { id: "n-projects", label: "Work", hint: "projects", group: "Go to", run: () => onGoto("projects") },
      { id: "n-lab", label: "Lab", hint: "visualizer", group: "Go to", run: () => onGoto("lab") },
      { id: "n-journey", label: "Journey", hint: "timeline", group: "Go to", run: () => onGoto("journey") },
      { id: "n-gb", label: "Guestbook", hint: "say hi", group: "Go to", run: () => onGoto("guestbook") },
      { id: "t-open", label: "Open terminal", hint: "T", group: "Actions", run: onTerminal },
      { id: "m-copy", label: "Copy email", hint: "ripunsethia27@gmail.com", group: "Actions", run: () => navigator.clipboard?.writeText("ripunsethia27@gmail.com") },
      { id: "m-print", label: "Print / save PDF", hint: "", group: "Actions", run: () => window.print() },
      { id: "m-replay", label: "Replay TV intro", hint: "5s", group: "Actions", run: onReplay },
      {
        id: "m-orbs",
        label: "Preview orb designs",
        hint: "gallery",
        group: "Actions",
        run: () => {
          window.location.hash = "orbs";
        },
      },
    ];
    (["paper", "ink"] as const).forEach((t) =>
      list.push({ id: `th-${t}`, label: `Theme: ${t}`, hint: "", group: "Appearance", run: () => onTheme(t) })
    );
    projects.forEach((p) =>
      list.push({
        id: `p-${p.id}`,
        label: p.title,
        hint: `${p.kind} · ${p.year}`,
        group: "Projects",
        run: () => onProject(p.id),
      })
    );
    return list;
  }, [onGoto, onTheme, onProject, onTerminal, onReplay]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(s) || a.hint.toLowerCase().includes(s)
    );
  }, [actions, q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[sel]?.run();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, sel, onClose]);

  if (!open) return null;

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[75] flex items-start justify-center px-4 pt-[14vh]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="hard-sm relative w-full max-w-lg overflow-hidden rounded-lg border border-ink/25 bg-panel">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-pixel text-[8px] text-ink">▶</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            className="w-full bg-transparent font-mono text-[13.5px] text-ink outline-none placeholder:text-mute/70"
          />
          <kbd className="hidden border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute sm:block">esc</kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center font-mono text-[12px] text-mute">No results</div>
          )}
          {filtered.map((a, i) => {
            const showGroup = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <div key={a.id}>
                {showGroup && (
                  <div className="px-4 pb-1 pt-3 font-pixel text-[7px] text-mute">
                    {a.group.toUpperCase()}
                  </div>
                )}
                <button
                  onMouseEnter={() => setSel(i)}
                  onClick={() => {
                    a.run();
                    onClose();
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] transition-colors ${
                    sel === i ? "bg-panel2 text-ink" : "text-ink/75"
                  }`}
                >
                  <span className="font-mono text-[12px] text-mute">{sel === i ? "▸" : "·"}</span>
                  <span className="flex-1">{a.label}</span>
                  {a.hint && <span className="font-mono text-[11px] text-mute">{a.hint}</span>}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[11px] text-mute">
          <span>↑↓ move · ↵ run</span>
          <span className="tabular-nums">{filtered.length}</span>
        </div>
      </div>
    </div>
  );
}
