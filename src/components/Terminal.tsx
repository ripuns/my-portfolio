import { useEffect, useRef, useState } from "react";
import { jokes, profile, projects, skillGroups, terminalHelp } from "../data/portfolio";

type Line = { text: string; cls?: string };

export default function Terminal({
  open,
  onClose,
  onGoto,
  onTheme,
}: {
  open: boolean;
  onClose: () => void;
  onGoto: (id: string) => void;
  onTheme: (t: string) => void;
}) {
  const [lines, setLines] = useState<Line[]>([
    { text: "RIPUN-OS v1.0 — type `help`.", cls: "text-mute" },
  ]);
  const [value, setValue] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const push = (arr: Line[]) => setLines((l) => [...l, ...arr]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHist((h) => [cmd, ...h]);
    setHIdx(-1);
    push([{ text: `ripun@dev:~$ ${cmd}`, cls: "text-ink" }]);

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (head) {
      case "help":
        push([
          ...terminalHelp.map((h) => ({
            text: `  ${h.cmd.padEnd(14, " ")} ${h.desc}`,
            cls: "text-mute",
          })),
        ]);
        break;
      case "whoami":
        push([
          { text: profile.name, cls: "text-ink" },
          { text: `${profile.role} · ${profile.school}`, cls: "text-mute" },
          { text: profile.tagline, cls: "text-mute" },
        ]);
        break;
      case "projects":
        push(
          projects.map((p) => ({
            text: `  ${p.title.padEnd(20, " ")} ${p.kind.padEnd(10, " ")} ${p.year} — ${p.metric}`,
            cls: "text-mute",
          }))
        );
        break;
      case "skills":
        push(
          skillGroups[1].skills.map((s) => ({
            text: `  ${s.name.padEnd(14, " ")} ${s.level}%`,
            cls: "text-ink",
          }))
        );
        break;
      case "contact":
        push([
          { text: "  email     ripunsethia27@gmail.com", cls: "text-ink" },
          { text: "  phone     +91 94613 90313", cls: "text-ink" },
          { text: "  github    github.com/ripunxs", cls: "text-ink" },
          { text: "  linkedin  in/ripun-sethia", cls: "text-ink" },
        ]);
        break;
      case "neofetch":
        push([
          { text: "  ripun@dev", cls: "text-ink" },
          { text: "  ─────────", cls: "text-mute" },
          { text: "  school   VIT Vellore '27 · CGPA 8.58", cls: "text-mute" },
          { text: "  stack    NestJS · Postgres · Bedrock", cls: "text-mute" },
          { text: "  editor   neovim", cls: "text-mute" },
          { text: "  patent   SpineGuard (published)", cls: "text-mute" },
        ]);
        break;
      case "joke":
        push([{ text: jokes[Math.floor(Math.random() * jokes.length)], cls: "text-mute" }]);
        break;
      case "theme": {
        const valid = ["paper", "ink"];
        if (valid.includes(arg)) {
          onTheme(arg);
          push([{ text: `theme → ${arg}`, cls: "text-ink" }]);
        } else {
          push([{ text: `usage: theme <paper|ink>`, cls: "text-mute" }]);
        }
        break;
      }
      case "goto":
        if (["hero", "about", "skills", "projects", "lab", "journey", "guestbook"].includes(arg)) {
          onGoto(arg);
          push([{ text: `→ #${arg}`, cls: "text-ink" }]);
        } else {
          push([{ text: `unknown section: ${arg || "(none)"}`, cls: "text-mute" }]);
        }
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        push([{ text: "There is no escape. Only more sections.", cls: "text-mute" }]);
        break;
      case "sudo":
        push([{ text: "ripun is not in the sudoers file.", cls: "text-mute" }]);
        break;
      case "ls":
        push([{ text: "about/  skills/  projects/  lab/  journey/  guestbook/", cls: "text-mute" }]);
        break;
      default:
        push([{ text: `command not found: ${head}. Try \`help\`.`, cls: "text-mute" }]);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[78] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="hard relative flex h-[65vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-ink/25 bg-panel">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 bg-ink/70" />
          <span className="h-2.5 w-2.5 bg-ink/25" />
          <span className="ml-2 font-pixel text-[8px] text-mute">RIPUN-OS</span>
          <button
            onClick={onClose}
            className="ml-auto font-mono text-[11px] text-mute transition-colors hover:text-ink"
          >
            [X]
          </button>
        </div>

        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="relative flex-1 cursor-text space-y-1 overflow-y-auto bg-base p-4 font-mono text-[13px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <pre key={i} className={`whitespace-pre-wrap font-mono ${l.cls ?? "text-ink"}`}>
              {l.text}
            </pre>
          ))}
          <div className="scanlines pointer-events-none absolute inset-0 opacity-50" />
        </div>

        <div className="flex items-center gap-2 border-t border-line bg-panel px-4 py-3 font-mono text-[13px]">
          <span className="shrink-0 font-pixel text-[8px] text-ink">▶</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(value);
                setValue("");
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const n = Math.min(hIdx + 1, hist.length - 1);
                if (n >= 0) {
                  setHIdx(n);
                  setValue(hist[n]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hIdx - 1;
                setHIdx(n);
                setValue(n >= 0 ? hist[n] : "");
              }
            }}
            spellCheck={false}
            className="flex-1 bg-transparent text-ink outline-none placeholder:text-mute/60"
            placeholder="type a command…"
          />
        </div>
      </div>
    </div>
  );
}
