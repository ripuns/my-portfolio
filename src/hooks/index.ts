import { useCallback, useEffect, useRef, useState } from "react";

/** Adds an `in` class when the element scrolls into view. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/** Counts up to `end` once `run` becomes true. */
export function useCountUp(end: number, run: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, run, duration]);
  return n;
}

export function useTheme() {
  const themes = ["paper", "ink"] as const;
  const [theme, setTheme] = useState<(typeof themes)[number]>(() => {
    try {
      const saved = localStorage.getItem("ripun-theme");
      return saved === "paper" || saved === "ink" ? saved : "ink";
    } catch {
      return "ink";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ripun-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return { theme, setTheme, themes };
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return p;
}

/** Types out a list of strings, looping. */
export function useRotatingText(words: string[], speed = 65, hold = 1500) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    const list = wordsRef.current;
    const word = list[idx % list.length];
    let t: number;
    if (!del && text === word) {
      t = window.setTimeout(() => setDel(true), hold);
    } else if (del && text === "") {
      setDel(false);
      setIdx((i) => (i + 1) % list.length);
      t = window.setTimeout(() => {}, 10);
    } else {
      t = window.setTimeout(
        () => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        del ? speed / 2.2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, del, idx, speed, hold]);

  return text;
}

export function useKonami(onUnlock: () => void) {
  const cb = useRef(onUnlock);
  cb.current = onUnlock;
  useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          pos = 0;
          cb.current();
        }
      } else {
        pos = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** Subtle 3D tilt for cards. */
export function useMouseTilt(max = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setStyle({
        transform: `perspective(1000px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${
          (0.5 - py) * max * 2
        }deg)`,
      });
    },
    [max]
  );

  const onLeave = useCallback(() => {
    setStyle({ transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)" });
  }, []);

  return { ref, style, onMove, onLeave };
}

/** Live clock string, e.g. 14:32:05. */
export function useClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setT(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/** Persistent hi-score counter. */
export function useHiScore(key = "ripun-hiscore") {
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);
  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(key) ?? 0);
      if (!Number.isNaN(v)) setHi(v);
    } catch {
      /* ignore */
    }
  }, [key]);
  const add = useCallback(
    (n = 1) => {
      setScore((s) => {
        const next = s + n;
        setHi((h) => {
          const nh = Math.max(h, next);
          try {
            localStorage.setItem(key, String(nh));
          } catch {
            /* ignore */
          }
          return nh;
        });
        return next;
      });
    },
    [key]
  );
  return { score, hi, add };
}
