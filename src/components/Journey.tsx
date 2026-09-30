import { useState } from "react";
import { timeline } from "../data/portfolio";
import { useReveal } from "../hooks";
import { SectionHead } from "./About";

export default function Journey() {
  const list = useReveal<HTMLDivElement>(0.05);
  const [open, setOpen] = useState(0);

  return (
    <section id="journey" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        index="05"
        kicker="Journey"
        title="From first semester"
        accent="to shipped work."
        tail=""
      />

      <div ref={list.ref} className={`reveal ${list.shown ? "in" : ""} mt-10 border-t-2 border-ink`}>
        {timeline.map((t, i) => {
          const isOpen = open === i;
          return (
            <div key={t.title} className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-5 text-left sm:gap-5"
              >
                <span className="font-pixel text-[9px] text-mute">LV{i + 1}</span>
                <span>
                  <span className="block text-[16.5px] font-semibold tracking-tight text-ink">
                    {t.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-[12px] text-mute">
                    {t.date} · {t.org}
                  </span>
                </span>
                <span
                  className={`flex h-7 w-7 items-center justify-center border font-mono text-[14px] transition-colors ${
                    isOpen ? "border-ink bg-ink text-base" : "border-line text-mute"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-400"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="pb-6 pl-10 pr-2 sm:pl-[3.75rem]">
                    <p className="max-w-2xl text-[14.5px] leading-relaxed text-mute">{t.body}</p>
                    <p className="mt-2.5 font-mono text-[11px] text-mute">{t.tags.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 font-mono text-[11px] text-mute">
        <span className="blink-hard mr-2">▮</span>to be continued…
      </p>
    </section>
  );
}
