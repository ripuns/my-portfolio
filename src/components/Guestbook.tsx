import { useEffect, useMemo, useState } from "react";
import { SectionHead } from "./About";

type Entry = { id: string; name: string; role: string; msg: string; time: string; likes: number };

const KEY = "ripun-guestbook-v1";

function load(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Entry[];
  } catch {
    /* ignore */
  }
  return [];
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>(load);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(entries));
    } catch {
      /* ignore */
    }
  }, [entries]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setEntries((x) => [
      {
        id: Math.random().toString(36).slice(2),
        name: name.trim() || "Anonymous",
        role: role.trim() || "Visitor",
        msg: msg.trim(),
        time: "just now",
        likes: 0,
      },
      ...x,
    ]);
    setName("");
    setRole("");
    setMsg("");
    setSent(true);
    window.setTimeout(() => setSent(false), 2600);
  };

  const totalLikes = useMemo(() => entries.reduce((a, e) => a + e.likes, 0), [entries]);

  return (
    <section id="guestbook" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        index="06"
        kicker="Guestbook"
        title="Say hello."
        accent="I read everything."
        tail=""
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr]">
        <form
          onSubmit={submit}
          className="hard-sm h-fit rounded-lg border border-ink/20 bg-panel p-5 lg:sticky lg:top-24"
        >
          <h3 className="font-pixel text-[9px] text-ink">SIGN THE LOG</h3>
          <p className="mt-2 font-mono text-[11px] text-mute">
            {entries.length} entries · {totalLikes} likes · stored locally
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block font-mono text-[11px] text-mute">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full border border-line bg-base px-3 py-2 text-[14px] text-ink outline-none transition-colors placeholder:text-mute/60 focus:border-ink"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[11px] text-mute">Who are you</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Recruiter, friend, classmate"
                className="w-full border border-line bg-base px-3 py-2 text-[14px] text-ink outline-none transition-colors placeholder:text-mute/60 focus:border-ink"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[11px] text-mute">Message</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value.slice(0, 220))}
                rows={4}
                placeholder="Say something kind"
                className="w-full resize-none border border-line bg-base px-3 py-2 text-[14px] text-ink outline-none transition-colors placeholder:text-mute/60 focus:border-ink"
              />
              <div className="mt-1 text-right font-mono text-[11px] tabular-nums text-mute">{msg.length}/220</div>
            </div>
          </div>

          <button
            type="submit"
            className="pixel-btn mt-2 w-full rounded-md bg-ink py-2.5 font-pixel text-[8px] text-base"
          >
            {sent ? "SAVED ✓" : "▶ POST"}
          </button>
        </form>

        <div>
          {entries.length === 0 ? (
            <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-lg border border-dashed border-line p-10 text-center">
              <p className="font-pixel text-[9px] text-ink">NO DATA</p>
              <p className="mt-3 max-w-xs font-mono text-[12px] leading-relaxed text-mute">
                Nothing here yet. Be the first to sign — your note appears here instantly.
              </p>
              <p className="blink-hard mt-4 font-mono text-[12px] text-mute">▼ waiting for input ▼</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {entries.map((e) => (
                <article
                  key={e.id}
                  className="group flex flex-col border border-line bg-panel p-5 transition-all hover:-translate-y-0.5 hover:border-mute"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink font-pixel text-[8px] text-base">
                      {e.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-ink">{e.name}</div>
                      <div className="truncate font-mono text-[11px] text-mute">{e.role}</div>
                    </div>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-mute">{e.time}</span>
                  </div>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink/90">“{e.msg}”</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() =>
                        setEntries((x) => x.map((y) => (y.id === e.id ? { ...y, likes: y.likes + 1 } : y)))
                      }
                      className="border border-line px-3 py-1 font-mono text-[11px] text-mute transition-colors hover:border-ink hover:text-ink active:translate-y-px"
                    >
                      ♥ {e.likes}
                    </button>
                    <button
                      onClick={() => setEntries((x) => x.filter((y) => y.id !== e.id))}
                      className="font-mono text-[11px] text-mute opacity-0 transition-opacity hover:text-ink group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
