import { useState } from "react";
import { profile } from "../data/portfolio";
import { useReveal } from "../hooks";

export default function Footer({
  onGoto,
  onTerminal,
  onReplay,
}: {
  onGoto: (id: string) => void;
  onTerminal: () => void;
  onReplay: () => void;
}) {
  const r = useReveal<HTMLDivElement>(0.2);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div ref={r.ref} className={`reveal ${r.shown ? "in" : ""}`}>
          <p className="font-pixel text-[8px] text-mute">
            {profile.available ? "● QUEST AVAILABLE" : "● AFK — GRINDING"}
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            Let's build something <span className="font-serif font-normal italic">worth shipping.</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">
            I’m interested in backend internships and projects involving data, AI,
            or APIs. Feel free to get in touch.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="pixel-btn rounded-md bg-ink px-6 py-3 text-[14px] font-medium text-base"
            >
              {profile.email}
            </a>
            <button
              onClick={copy}
              className="rounded-md border border-line px-5 py-3 font-mono text-[12px] text-mute transition-colors hover:border-ink hover:text-ink"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
            <button
              onClick={onTerminal}
              className="rounded-md border border-line px-5 py-3 font-mono text-[12px] text-mute transition-colors hover:border-ink hover:text-ink"
            >
              $ contact
            </button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="flex items-center gap-2 text-[14px] font-semibold text-ink">
              <span className="grid h-5 w-5 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden="true">
                <span className="bg-ink" />
                <span className="bg-ink/25" />
                <span className="bg-ink/25" />
                <span className="bg-ink" />
              </span>
              {profile.name}
            </p>
            <p className="mt-2 max-w-[15rem] font-mono text-[11px] leading-relaxed text-mute">
              BTech IT · VIT Vellore · Class of 2027
            </p>
          </div>
          <FooterCol
            title="Site"
            items={[
              { l: "About", a: () => onGoto("about") },
              { l: "Skills", a: () => onGoto("skills") },
              { l: "Work", a: () => onGoto("projects") },
            ]}
          />
          <FooterCol
            title="More"
            items={[
              { l: "Lab", a: () => onGoto("lab") },
              { l: "Journey", a: () => onGoto("journey") },
              { l: "Guestbook", a: () => onGoto("guestbook") },
            ]}
          />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-under text-[13px] text-ink/80 hover:text-ink"
                  >
                    {s.label} <span className="text-mute">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-mute">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <button onClick={onReplay} className="font-pixel text-[7px] transition-colors hover:text-ink">
            ▶ REPLAY TV INTRO
          </button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-ink">
            CONTINUE? ▸ TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { l: string; a: () => void }[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.l}>
            <button onClick={i.a} className="link-under text-[13px] text-ink/80 hover:text-ink">
              {i.l}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
