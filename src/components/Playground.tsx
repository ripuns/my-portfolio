import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionHead } from "./About";
import { useReveal } from "../hooks";

type Frame = { a: number[]; cmp: number[]; swp: number[]; done: number[]; c: number; w: number; note: string };

const ALGOS = {
  bubble: { name: "Bubble Sort", time: "O(n²)", space: "O(1)", stable: true },
  selection: { name: "Selection Sort", time: "O(n²)", space: "O(1)", stable: false },
  insertion: { name: "Insertion Sort", time: "O(n²)", space: "O(1)", stable: true },
  merge: { name: "Merge Sort", time: "O(n log n)", space: "O(n)", stable: true },
  quick: { name: "Quick Sort", time: "O(n log n)", space: "O(log n)", stable: false },
} as const;

type AlgoKey = keyof typeof ALGOS;

function makeFrames(input: number[], algo: AlgoKey): Frame[] {
  const a = [...input];
  const frames: Frame[] = [];
  const done = new Set<number>();
  let c = 0;
  let w = 0;
  const n = a.length;

  const snap = (cmp: number[], swp: number[], note: string) =>
    frames.push({ a: [...a], cmp, swp, done: [...done], c, w, note });

  snap([], [], "press play");

  if (algo === "bubble") {
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        c++;
        snap([j, j + 1], [], `compare a[${j}] and a[${j + 1}]`);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          w += 2;
          swapped = true;
          snap([], [j, j + 1], "swap");
        }
      }
      done.add(n - i - 1);
      snap([], [], `a[${n - i - 1}] locked`);
      if (!swapped) break;
    }
  } else if (algo === "selection") {
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        c++;
        snap([min, j], [], `is a[${j}] < a[${min}]?`);
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        w += 2;
        snap([], [i, min], "swap into place");
      }
      done.add(i);
    }
    done.add(n - 1);
  } else if (algo === "insertion") {
    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0) {
        c++;
        snap([j, j + 1], [], `shift a[${j}] right?`);
        if (a[j] <= key) break;
        a[j + 1] = a[j];
        w++;
        j--;
        snap([], [j + 1], "shift");
      }
      a[j + 1] = key;
      w++;
      snap([], [j + 1], `insert ${key}`);
    }
  } else if (algo === "merge") {
    const tmp = new Array(n).fill(0);
    const msort = (lo: number, hi: number) => {
      if (lo >= hi) return;
      const mid = (lo + hi) >> 1;
      msort(lo, mid);
      msort(mid + 1, hi);
      let i = lo;
      let j = mid + 1;
      let k = lo;
      while (i <= mid && j <= hi) {
        c++;
        snap([i, j], [], `merge: a[${i}] vs a[${j}]`);
        tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        w++;
      }
      while (i <= mid) {
        tmp[k++] = a[i++];
        w++;
      }
      while (j <= hi) {
        tmp[k++] = a[j++];
        w++;
      }
      for (let t = lo; t <= hi; t++) {
        a[t] = tmp[t];
        snap([], [t], `write back a[${t}]`);
      }
    };
    msort(0, n - 1);
  } else {
    const qsort = (lo: number, hi: number) => {
      if (lo >= hi) {
        if (lo === hi) done.add(lo);
        return;
      }
      const pivot = a[hi];
      snap([hi], [], `pivot = a[${hi}] = ${pivot}`);
      let i = lo;
      for (let j = lo; j < hi; j++) {
        c++;
        snap([j, hi], [], `a[${j}] < pivot?`);
        if (a[j] < pivot) {
          [a[i], a[j]] = [a[j], a[i]];
          w += 2;
          snap([], [i, j], "swap left of pivot");
          i++;
        }
      }
      [a[i], a[hi]] = [a[hi], a[i]];
      w += 2;
      done.add(i);
      snap([], [i, hi], `pivot lands at ${i}`);
      qsort(lo, i - 1);
      qsort(i + 1, hi);
    };
    qsort(0, n - 1);
  }

  for (let i = 0; i < n; i++) done.add(i);
  snap([], [], "clear! +100 pts");
  return frames;
}

function randomArray(n: number) {
  return Array.from({ length: n }, () => 6 + Math.floor(Math.random() * 94));
}

export default function Playground() {
  const head = useReveal<HTMLDivElement>(0.3);
  const [algo, setAlgo] = useState<AlgoKey>("bubble");
  const [size, setSize] = useState(36);
  const [speed, setSpeed] = useState(26);
  const [input, setInput] = useState(() => randomArray(36));
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [best, setBest] = useState<Record<AlgoKey, number | null>>({
    bubble: null,
    selection: null,
    insertion: null,
    merge: null,
    quick: null,
  });

  const frames = useMemo(() => makeFrames(input, algo), [input, algo]);
  const cur = frames[Math.min(idx, frames.length - 1)];
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [algo]);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    if (!playing) return;
    const interval = Math.max(8, 420 - speed * 12);
    timer.current = window.setInterval(() => {
      setIdx((i) => {
        if (i >= frames.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, speed, frames.length]);

  const finished = idx >= frames.length - 1;

  useEffect(() => {
    if (finished && frames.length > 1) {
      const total = cur.c + cur.w;
      setBest((b) => (b[algo] === null || total < b[algo]! ? { ...b, [algo]: total } : b));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const shuffle = useCallback(() => {
    setInput(randomArray(size));
    setIdx(0);
    setPlaying(false);
  }, [size]);

  useEffect(() => {
    setInput(randomArray(size));
    setIdx(0);
  }, [size]);

  const meta = ALGOS[algo];
  const pct = Math.round((idx / (frames.length - 1)) * 100);

  return (
    <section id="lab" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div ref={head.ref} className={`reveal ${head.shown ? "in" : ""}`}>
        <SectionHead
          index="04"
          kicker="Playground"
          title="Sorting, visualized"
          accent="step by step."
          tail=""
        />
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mute">
          A working sorting visualizer. Every step is precomputed, so you can play,
          pause, and scrub through the algorithm like a debugger.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_16rem]">
        {/* cabinet */}
        <div className="hard overflow-hidden rounded-lg border border-ink/20 bg-panel">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-line p-3.5">
            {(Object.keys(ALGOS) as AlgoKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setAlgo(k)}
                className={`border px-2.5 py-1.5 font-mono text-[12px] transition-all ${
                  algo === k
                    ? "border-ink bg-ink text-base"
                    : "border-line text-mute hover:border-mute hover:text-ink"
                }`}
              >
                {k}
              </button>
            ))}
            <span className="ml-auto font-mono text-[11px] tabular-nums text-mute">
              {idx.toLocaleString()} / {frames.length.toLocaleString()}
            </span>
          </div>

          <div className="relative bg-base p-4">
            <div className="flex h-60 items-end gap-[2px] sm:h-64">
              {cur.a.map((v, i) => {
                const active = cur.cmp.includes(i) || cur.swp.includes(i);
                const isDone = cur.done.includes(i);
                return (
                  <div
                    key={i}
                    className="flex-1 transition-[height] duration-100"
                    style={{
                      height: `${v}%`,
                      background: active
                        ? "var(--ink)"
                        : isDone
                        ? "color-mix(in oklab, var(--ink) 45%, transparent)"
                        : "var(--line)",
                    }}
                  />
                );
              })}
            </div>
            <div className="scanlines pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative mt-3 flex justify-between gap-4 font-mono text-[11px] text-mute">
              <span className="truncate">{cur.note}</span>
              <span className="shrink-0">
                {finished ? "■ CLEAR" : playing ? "▶ RUN" : "❚❚ HELD"}
              </span>
            </div>
          </div>

          <div className="border-t border-line p-3.5">
            <div className="flex gap-[2px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[3px] flex-1"
                  style={{ background: (i / 40) * 100 < pct ? "var(--ink)" : "var(--line)" }}
                />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={frames.length - 1}
              value={idx}
              onChange={(e) => {
                setPlaying(false);
                setIdx(Number(e.target.value));
              }}
              className="mt-3 w-full"
              aria-label="Scrub frames"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  if (finished) {
                    setIdx(0);
                    setPlaying(true);
                  } else {
                    setPlaying((p) => !p);
                  }
                }}
                className="pixel-btn rounded-md bg-ink px-5 py-2 font-pixel text-[8px] text-base"
              >
                {playing ? "❚❚ HOLD" : finished ? "↻ AGAIN" : "▶ START"}
              </button>
              <StepBtn onClick={() => { setPlaying(false); setIdx(0); }} label="|◀" />
              <StepBtn onClick={() => { setPlaying(false); setIdx((i) => Math.max(0, i - 1)); }} label="−1" />
              <StepBtn
                onClick={() => { setPlaying(false); setIdx((i) => Math.min(frames.length - 1, i + 1)); }}
                label="+1"
              />
              <StepBtn onClick={shuffle} label="SHUFFLE" />
              <div className="ml-auto flex items-center gap-4">
                <label className="flex items-center gap-2 font-mono text-[11px] text-mute">
                  n
                  <input type="range" min={10} max={48} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-20" />
                </label>
                <label className="hidden items-center gap-2 font-mono text-[11px] text-mute sm:flex">
                  spd
                  <input type="range" min={1} max={34} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-20" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-line bg-panel p-5">
            <p className="font-pixel text-[8px] text-mute">DATA</p>
            <p className="mt-2.5 text-2xl font-semibold tracking-tight text-ink">{meta.time}</p>
            <div className="mt-3 space-y-2 font-mono text-[12px]">
              <Row k="space" v={meta.space} />
              <Row k="stable" v={meta.stable ? "yes" : "no"} />
              <Row k="compare" v={cur.c.toLocaleString()} />
              <Row k="writes" v={cur.w.toLocaleString()} />
              <Row k="best" v={best[algo] !== null ? best[algo]!.toLocaleString() : "—"} />
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-line p-4 font-mono text-[11.5px] leading-relaxed text-mute">
            TIP — run a sorted array through bubble sort. One pass, then halt. Best
            case O(n).
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-line px-3 py-2 font-mono text-[11px] text-mute transition-colors hover:border-ink hover:text-ink active:translate-y-px"
    >
      {label}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-line pb-1.5 last:border-0 last:pb-0">
      <span className="text-mute">{k}</span>
      <span className="tabular-nums text-ink">{v}</span>
    </div>
  );
}
