import { useEffect, useId, useRef, type ComponentType } from "react";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function useUid() {
  return useId().replace(/:/g, "");
}

export const ORB_CSS = `
.orb-mer { transform-box: fill-box; transform-origin: center; animation: orb-mer 6.4s cubic-bezier(.45,.05,.55,.95) infinite; }
@keyframes orb-mer { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(0.02); } }

.orb-scan { animation: orb-scan 3.4s cubic-bezier(.45,0,.55,1) infinite; }
@keyframes orb-scan {
  0% { transform: translateY(0); opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { transform: translateY(56px); opacity: 0; }
}

.orb-spin, .orb-spin-r, .orb-sweep { transform-box: view-box; transform-origin: 50% 50%; }
.orb-spin { animation: orb-spin 14s linear infinite; }
.orb-spin-r { animation: orb-spin 20s linear infinite reverse; }
.orb-sweep { animation: orb-spin 4s linear infinite; }
@keyframes orb-spin { to { transform: rotate(360deg); } }

.orb-ping { transform-box: view-box; transform-origin: 50% 50%; animation: orb-ping 3.6s ease-out infinite; }
@keyframes orb-ping { 0% { transform: scale(.8); opacity: .75; } 100% { transform: scale(var(--ping-end, 1.32)); opacity: 0; } }

.orb-blip { opacity: .05; transform-box: fill-box; transform-origin: center; animation: orb-blip 4s linear infinite; }
@keyframes orb-blip {
  0% { opacity: 1; transform: scale(1.7); }
  22% { opacity: .75; transform: scale(1); }
  85% { opacity: .05; }
  100% { opacity: .05; }
}

.orb-shimmer { animation: orb-shimmer 2.8s ease-in-out infinite; }
@keyframes orb-shimmer { 0%,100% { opacity: 1; } 50% { opacity: .38; } }

.orb-pulse { transform-box: fill-box; transform-origin: center; animation: orb-pulse 1.4s steps(2) infinite; }
@keyframes orb-pulse { 0%,100% { opacity: .3; transform: scale(.7); } 50% { opacity: 1; transform: scale(1.15); } }

.orb-breathe { transform-box: view-box; transform-origin: 50% 50%; animation: orb-breathe 4.4s ease-in-out infinite; }
@keyframes orb-breathe { 0%,100% { transform: scale(.96); } 50% { transform: scale(1.04); } }
`;

const svgProps = {
  viewBox: "0 0 100 100",
  className: "h-full w-full",
  role: "img" as const,
};

/* ------------------------------------------------------------------ */
/* 01 · Phosphor Globe                                                 */
/* ------------------------------------------------------------------ */

function GlobeOrb() {
  const uid = useUid();
  const lats = [-26, -13, 0, 13, 26];
  const nodes: [number, number, number][] = [
    [38, 40, 0],
    [62, 34, 0.4],
    [58, 60, 0.9],
    [44, 66, 1.3],
    [70, 50, 0.6],
  ];

  return (
    <svg {...svgProps} aria-label="Phosphor globe">
      <defs>
        <clipPath id={`${uid}c`}>
          <circle cx="50" cy="50" r="38" />
        </clipPath>
        <radialGradient id={`${uid}g`} cx="34%" cy="28%" r="85%">
          <stop offset="0" stopColor="var(--ink)" stopOpacity=".26" />
          <stop offset=".6" stopColor="var(--ink)" stopOpacity=".05" />
          <stop offset="1" stopColor="var(--ink)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* outer tick ring */}
      <circle
        className="orb-spin-r"
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--mute)"
        strokeWidth="1.4"
        strokeDasharray="1 3.2"
        opacity=".75"
      />
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--ink)" strokeWidth=".5" opacity=".35" />

      {/* sphere */}
      <circle cx="50" cy="50" r="38" fill={`url(#${uid}g)`} stroke="var(--ink)" strokeWidth="1.6" />

      <g clipPath={`url(#${uid}c)`}>
        {lats.map((dy) => {
          const rx = Math.sqrt(38 * 38 - dy * dy);
          return (
            <ellipse
              key={dy}
              cx="50"
              cy={50 + dy}
              rx={rx}
              ry={rx * 0.16}
              fill="none"
              stroke="var(--mute)"
              strokeWidth=".8"
              opacity=".75"
            />
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            className="orb-mer"
            style={{ animationDelay: `${-i * 1.6}s` }}
            cx="50"
            cy="50"
            rx="38"
            ry="38"
            fill="none"
            stroke="var(--ink)"
            strokeWidth=".9"
            opacity=".85"
          />
        ))}

        {/* surface nodes */}
        {nodes.map(([x, y, d], i) => (
          <rect
            key={i}
            className="orb-pulse"
            style={{ animationDelay: `${d}s` }}
            x={x - 1.6}
            y={y - 1.6}
            width="3.2"
            height="3.2"
            fill="var(--ink)"
          />
        ))}

        {/* scanning line */}
        <rect className="orb-scan" x="8" y="14" width="84" height="1.6" fill="var(--ink)" opacity=".9" />
        <rect className="orb-scan" x="8" y="9" width="84" height="6" fill="var(--ink)" opacity=".08" />
      </g>

      {/* axis */}
      <path d="M50 6V14M50 86V94" stroke="var(--ink)" strokeWidth="1.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Plasma Core                                                    */
/* ------------------------------------------------------------------ */

/**
 * The orb artwork on its own, so it can be nested inside another SVG.
 * `perf` swaps the expensive Gaussian-blur filters for pre-softened radial
 * gradients — visually near-identical, but cheap enough to zoom full-screen
 * during the TV preview without jank.
 */
export function PlasmaOrbArt({ perf = false }: { perf?: boolean }) {
  const uid = useUid();

  // Soft plasma blob rendered as a radial gradient instead of a blurred circle.
  const Blob = ({
    cx,
    cy,
    r,
    color,
    opacity,
  }: {
    cx: number;
    cy: number;
    r: number;
    color: string;
    opacity: number;
  }) => {
    const gid = `${uid}bl${cx}${cy}`;
    return (
      <>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset=".55" stopColor={color} stopOpacity={opacity * 0.7} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <circle cx={cx} cy={cy} r={r * 1.5} fill={`url(#${gid})`} />
      </>
    );
  };

  return (
    <g>
      <defs>
        <clipPath id={`${uid}c`}>
          <circle cx="50" cy="50" r="36" />
        </clipPath>
        {!perf && (
          <>
            <filter id={`${uid}b`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5.5" />
            </filter>
            <filter id={`${uid}s`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </>
        )}
        <radialGradient id={`${uid}sh`} cx="34%" cy="28%" r="82%">
          <stop offset="0" stopColor="var(--base)" stopOpacity="0" />
          <stop offset=".62" stopColor="var(--base)" stopOpacity=".12" />
          <stop offset="1" stopColor="var(--base)" stopOpacity=".86" />
        </radialGradient>
        {!perf && (
          <>
            <linearGradient id={`${uid}lg`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#000" />
              <stop offset=".35" stopColor="#000" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <mask id={`${uid}m`}>
              <rect width="100" height="100" fill={`url(#${uid}lg)`} />
            </mask>
            <pattern id={`${uid}p`} width="3" height="3" patternUnits="userSpaceOnUse">
              <rect width="1.4" height="1.4" fill="var(--base)" />
            </pattern>
          </>
        )}
      </defs>

      {/* expanding signal rings */}
      {[0, 1.2, 2.4].map((d) => (
        <circle
          key={d}
          className="orb-ping"
          style={{ animationDelay: `${-d}s` }}
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="var(--ink)"
          strokeWidth=".9"
        />
      ))}

      <g className="orb-breathe">
        <circle cx="50" cy="50" r="36" fill="var(--panel2)" />
        <g clipPath={`url(#${uid}c)`}>
          {perf ? (
            <>
              <g className="orb-spin" style={{ animationDuration: "9s" }}>
                <Blob cx={34} cy={44} r={17} color="var(--ink)" opacity={0.78} />
                <Blob cx={66} cy={58} r={14} color="var(--mute)" opacity={0.9} />
                <Blob cx={52} cy={28} r={10} color="var(--ink)" opacity={0.65} />
              </g>
              <g className="orb-spin-r" style={{ animationDuration: "13s" }}>
                <Blob cx={60} cy={70} r={13} color="var(--ink)" opacity={0.55} />
                <Blob cx={38} cy={64} r={10} color="var(--mute)" opacity={0.8} />
                <Blob cx={72} cy={38} r={8} color="var(--ink)" opacity={0.5} />
              </g>
            </>
          ) : (
            <>
              <g className="orb-spin" style={{ animationDuration: "9s" }} filter={`url(#${uid}b)`}>
                <circle cx="34" cy="44" r="17" fill="var(--ink)" opacity=".78" />
                <circle cx="66" cy="58" r="14" fill="var(--mute)" opacity=".9" />
                <circle cx="52" cy="28" r="10" fill="var(--ink)" opacity=".65" />
              </g>
              <g className="orb-spin-r" style={{ animationDuration: "13s" }} filter={`url(#${uid}b)`}>
                <circle cx="60" cy="70" r="13" fill="var(--ink)" opacity=".55" />
                <circle cx="38" cy="64" r="10" fill="var(--mute)" opacity=".8" />
                <circle cx="72" cy="38" r="8" fill="var(--ink)" opacity=".5" />
              </g>
            </>
          )}

          {/* 3D terminator */}
          <circle cx="50" cy="50" r="36" fill={`url(#${uid}sh)`} />
          {/* screen-door dither — mask+pattern is costly, so skip it in perf mode */}
          {!perf && (
            <g mask={`url(#${uid}m)`}>
              <rect width="100" height="100" fill={`url(#${uid}p)`} opacity=".75" />
            </g>
          )}

          {/* specular glint */}
          <ellipse
            cx="38"
            cy="31"
            rx="10"
            ry="4.2"
            transform="rotate(-32 38 31)"
            fill="var(--ink)"
            opacity=".38"
            filter={perf ? undefined : `url(#${uid}s)`}
          />
        </g>
        <circle cx="50" cy="50" r="36" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      </g>
    </g>
  );
}

function PlasmaOrb() {
  return (
    <svg {...svgProps} aria-label="Plasma core">
      <PlasmaOrbArt />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Packet Orbit                                                   */
/* ------------------------------------------------------------------ */

const ORBIT_PATH = "M6 50 a44 15 0 1 0 88 0 a44 15 0 1 0 -88 0";

function OrbitOrb() {
  const tilts = [0, 60, 120];

  return (
    <svg {...svgProps} aria-label="Packet orbit">
      <circle className="orb-ping" cx="50" cy="50" r="16" fill="none" stroke="var(--ink)" strokeWidth=".9" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="var(--mute)" strokeWidth=".5" strokeDasharray="1 3" opacity=".6" />

      {tilts.map((deg, i) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <ellipse cx="50" cy="50" rx="44" ry="15" fill="none" stroke="var(--mute)" strokeWidth=".9" opacity=".6" />
          {[0, 1].map((k) => (
            <g key={k}>
              <rect x="-2.2" y="-2.2" width="4.4" height="4.4" fill="var(--ink)">
                <animateMotion
                  dur={`${4.2 + i * 0.9}s`}
                  repeatCount="indefinite"
                  path={ORBIT_PATH}
                  begin={`-${i * 1.3 + k * 2.2}s`}
                />
              </rect>
              <rect x="-1.4" y="-1.4" width="2.8" height="2.8" fill="var(--ink)" opacity=".35">
                <animateMotion
                  dur={`${4.2 + i * 0.9}s`}
                  repeatCount="indefinite"
                  path={ORBIT_PATH}
                  begin={`-${i * 1.3 + k * 2.2 + 0.22}s`}
                />
              </rect>
            </g>
          ))}
        </g>
      ))}

      {/* core */}
      <g className="orb-spin" style={{ animationDuration: "8s" }}>
        <rect x="40" y="40" width="20" height="20" fill="var(--base)" stroke="var(--ink)" strokeWidth="2" transform="rotate(45 50 50)" />
      </g>
      <rect className="orb-pulse" x="45.5" y="45.5" width="9" height="9" fill="var(--ink)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Sonar Sweep                                                    */
/* ------------------------------------------------------------------ */

const BLIPS: { angle: number; r: number }[] = [
  { angle: 28, r: 22 },
  { angle: 96, r: 30 },
  { angle: 154, r: 15 },
  { angle: 214, r: 27 },
  { angle: 262, r: 11 },
  { angle: 318, r: 31 },
];

function wedge(a0: number, a1: number, r = 38) {
  const p = (a: number) => {
    const rad = (a * Math.PI) / 180;
    return `${(50 + r * Math.cos(rad)).toFixed(2)} ${(50 + r * Math.sin(rad)).toFixed(2)}`;
  };
  return `M50 50 L${p(a0)} A${r} ${r} 0 0 1 ${p(a1)} Z`;
}

function SonarOrb() {
  return (
    <svg {...svgProps} aria-label="Sonar sweep">
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--mute)" strokeWidth="1.2" strokeDasharray="1 3" opacity=".75" />
      <circle cx="50" cy="50" r="38" fill="var(--panel2)" fillOpacity=".5" stroke="var(--ink)" strokeWidth="1.6" />
      {[13, 25.5].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="var(--mute)" strokeWidth=".7" opacity=".7" />
      ))}
      <path d="M50 12V88M12 50H88" stroke="var(--mute)" strokeWidth=".6" opacity=".55" />
      <path d="M23 23L77 77M77 23L23 77" stroke="var(--mute)" strokeWidth=".4" opacity=".35" />

      {/* sweep with fading trail */}
      <g className="orb-sweep">
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={wedge(-(i + 1) * 6, -i * 6)}
            fill="var(--ink)"
            opacity={Math.max(0.04, 0.5 * (1 - i / 9))}
          />
        ))}
        <path d="M50 50L88 50" stroke="var(--ink)" strokeWidth="1.5" />
      </g>

      {/* blips lit by the sweep */}
      {BLIPS.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180;
        const x = 50 + b.r * Math.cos(rad);
        const y = 50 + b.r * Math.sin(rad);
        return (
          <rect
            key={i}
            className="orb-blip"
            style={{ animationDelay: `${(b.angle / 360) * 4}s` }}
            x={x - 1.8}
            y={y - 1.8}
            width="3.6"
            height="3.6"
            fill="var(--ink)"
          />
        );
      })}

      <rect x="48" y="48" width="4" height="4" fill="var(--ink)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · Pixel Planet                                                   */
/* ------------------------------------------------------------------ */

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

type Cell = { x: number; y: number; on: boolean; gx: number };

function buildPlanet(): Cell[] {
  const s = 2.5;
  const R = 30;
  const L = [-0.55, -0.6, 0.58];
  const len = Math.hypot(L[0], L[1], L[2]);
  const cells: Cell[] = [];
  for (let gy = -12; gy < 12; gy++) {
    for (let gx = -12; gx < 12; gx++) {
      const cx = (gx + 0.5) * s;
      const cy = (gy + 0.5) * s;
      if (cx * cx + cy * cy > R * R) continue;
      const nx = cx / R;
      const ny = cy / R;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      let lam = Math.max(0, (nx * L[0] + ny * L[1] + nz * L[2]) / len);
      lam += Math.sin(ny * 9 + Math.sin(nx * 3) * 1.4) * 0.09;
      const th = (BAYER[(gy + 12) & 3][(gx + 12) & 3] + 0.5) / 16;
      cells.push({ x: 50 + gx * s, y: 50 + gy * s, on: lam > th * 0.95 + 0.05, gx });
    }
  }
  return cells;
}

const PLANET_CELLS = buildPlanet();
const RING_PATH = "M4 50 a46 10 0 1 0 92 0 a46 10 0 1 0 -92 0";
const STARS: [number, number, number][] = [
  [8, 14, 0],
  [90, 18, 0.9],
  [14, 88, 1.6],
  [86, 84, 0.4],
  [72, 7, 1.2],
  [6, 44, 2.1],
];

function PlanetOrb() {
  const uid = useUid();

  return (
    <svg {...svgProps} aria-label="Pixel planet" shapeRendering="crispEdges">
      <defs>
        <clipPath id={`${uid}back`}>
          <rect x="0" y="0" width="100" height="50" />
        </clipPath>
        <clipPath id={`${uid}front`}>
          <rect x="0" y="50" width="100" height="50" />
        </clipPath>
      </defs>

      {STARS.map(([x, y, d], i) => (
        <rect key={i} className="orb-shimmer" style={{ animationDelay: `${-d}s` }} x={x} y={y} width="1.8" height="1.8" fill="var(--ink)" />
      ))}

      {/* ring — back half */}
      <g transform="rotate(-20 50 50)">
        <ellipse cx="50" cy="50" rx="46" ry="10" fill="none" stroke="var(--ink)" strokeWidth="1.4" opacity=".55" clipPath={`url(#${uid}back)`} />
        <ellipse cx="50" cy="50" rx="39" ry="8" fill="none" stroke="var(--mute)" strokeWidth=".8" opacity=".6" clipPath={`url(#${uid}back)`} />
      </g>

      {/* dithered planet */}
      <g>
        {PLANET_CELLS.map((c, i) => (
          <rect
            key={i}
            className={c.on ? "orb-shimmer" : undefined}
            style={c.on ? { animationDelay: `-${(((c.gx + 12) / 24) * 2.8).toFixed(2)}s` } : undefined}
            x={c.x}
            y={c.y}
            width="2.55"
            height="2.55"
            fill="var(--ink)"
            opacity={c.on ? 1 : 0.14}
          />
        ))}
      </g>

      {/* ring — front half + moon */}
      <g transform="rotate(-20 50 50)">
        <ellipse cx="50" cy="50" rx="46" ry="10" fill="none" stroke="var(--ink)" strokeWidth="1.6" clipPath={`url(#${uid}front)`} />
        <ellipse cx="50" cy="50" rx="39" ry="8" fill="none" stroke="var(--mute)" strokeWidth=".9" clipPath={`url(#${uid}front)`} />
        <rect x="-2.4" y="-2.4" width="4.8" height="4.8" fill="var(--ink)" stroke="var(--base)" strokeWidth=".8">
          <animateMotion dur="7s" repeatCount="indefinite" path={RING_PATH} />
        </rect>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 06 · Tesseract (real 3D, requestAnimationFrame)                     */
/* ------------------------------------------------------------------ */

const CUBE: [number, number, number][] = [];
for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) CUBE.push([x, y, z]);

const CUBE_EDGES: [number, number][] = [];
for (let i = 0; i < 8; i++) {
  for (let j = i + 1; j < 8; j++) {
    const d =
      (CUBE[i][0] !== CUBE[j][0] ? 1 : 0) +
      (CUBE[i][1] !== CUBE[j][1] ? 1 : 0) +
      (CUBE[i][2] !== CUBE[j][2] ? 1 : 0);
    if (d === 1) CUBE_EDGES.push([i, j]);
  }
}

/** 0–7 outer cube, 8–15 inner cube */
const TESS_EDGES: { a: number; b: number; kind: "outer" | "inner" | "link" }[] = [
  ...CUBE_EDGES.map(([a, b]) => ({ a, b, kind: "outer" as const })),
  ...CUBE_EDGES.map(([a, b]) => ({ a: a + 8, b: b + 8, kind: "inner" as const })),
  ...CUBE.map((_, i) => ({ a: i, b: i + 8, kind: "link" as const })),
];

function project(p: [number, number, number], scale: number, ay: number, ax: number, az: number) {
  const x = p[0] * scale;
  const y = p[1] * scale;
  const z = p[2] * scale;
  const x1 = x * Math.cos(ay) + z * Math.sin(ay);
  const z1 = -x * Math.sin(ay) + z * Math.cos(ay);
  const y1 = y * Math.cos(ax) - z1 * Math.sin(ax);
  const z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
  const x2 = x1 * Math.cos(az) - y1 * Math.sin(az);
  const y2 = x1 * Math.sin(az) + y1 * Math.cos(az);
  const f = 3.6 / (3.6 - z2);
  return { x: 50 + x2 * f * 17, y: 50 + y2 * f * 17, z: z2 };
}

function TesseractOrb() {
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const dots = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const t = now / 1000;
      const ay = t * 0.7;
      const ax = t * 0.45;
      const az = t * 0.2;
      const pts = [
        ...CUBE.map((p) => project(p, 1, ay, ax, az)),
        ...CUBE.map((p) => project(p, 0.5, ay + t * 0.55, ax - t * 0.25, az + t * 0.3)),
      ];
      TESS_EDGES.forEach((e, i) => {
        const el = lines.current[i];
        if (!el) return;
        const a = pts[e.a];
        const b = pts[e.b];
        el.setAttribute("x1", a.x.toFixed(2));
        el.setAttribute("y1", a.y.toFixed(2));
        el.setAttribute("x2", b.x.toFixed(2));
        el.setAttribute("y2", b.y.toFixed(2));
        const depth = (a.z + b.z) / 2;
        const base = e.kind === "link" ? 0.45 : e.kind === "outer" ? 0.95 : 0.8;
        el.setAttribute("opacity", Math.max(0.2, base - depth * 0.22).toFixed(2));
      });
      pts.forEach((p, i) => {
        const el = dots.current[i];
        if (!el) return;
        const s = i < 8 ? 3.4 : 2.4;
        el.setAttribute("x", (p.x - s / 2).toFixed(2));
        el.setAttribute("y", (p.y - s / 2).toFixed(2));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg {...svgProps} aria-label="Tesseract" strokeLinecap="square">
      <circle className="orb-ping" cx="50" cy="50" r="40" fill="none" stroke="var(--ink)" strokeWidth=".7" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--mute)" strokeWidth="1.1" strokeDasharray="1 3.4" opacity=".6" />

      {TESS_EDGES.map((e, i) => (
        <line
          key={i}
          ref={(el) => {
            lines.current[i] = el;
          }}
          stroke={e.kind === "inner" ? "var(--mute)" : "var(--ink)"}
          strokeWidth={e.kind === "outer" ? 1.5 : e.kind === "inner" ? 1.2 : 0.7}
          strokeDasharray={e.kind === "link" ? "1.5 2" : undefined}
        />
      ))}
      {CUBE.concat(CUBE).map((_, i) => (
        <rect
          key={i}
          ref={(el) => {
            dots.current[i] = el;
          }}
          width={i < 8 ? 3.4 : 2.4}
          height={i < 8 ? 3.4 : 2.4}
          fill="var(--ink)"
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export type OrbDesign = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  traits: string[];
  Art: ComponentType;
};

export const ORBS: OrbDesign[] = [
  {
    id: "01",
    name: "Phosphor Globe",
    tag: "Wireframe world",
    blurb:
      "A glowing wireframe Earth. Meridians sweep around the sphere, nodes ping across the surface, and a scan line reads the planet top to bottom — like a 90s network-operations screen.",
    traits: ["rotating meridians", "surface pings", "scan line"],
    Art: GlobeOrb,
  },
  {
    id: "02",
    name: "Plasma Core",
    tag: "Liquid energy",
    blurb:
      "A dithered glass sphere filled with swirling liquid plasma. It breathes, throws out ripple rings and has a screen-door shadow for that printed, retro-shaded depth.",
    traits: ["liquid swirl", "dither shading", "ripple rings"],
    Art: PlasmaOrb,
  },
  {
    id: "03",
    name: "Packet Orbit",
    tag: "Atom of data",
    blurb:
      "An atom built from requests: three tilted orbits carry square packets with short trails around a spinning core. The most direct nod to backend, APIs and event streams.",
    traits: ["data packets", "tilted orbits", "pulsing core"],
    Art: OrbitOrb,
  },
  {
    id: "04",
    name: "Sonar Sweep",
    tag: "Radar pulse",
    blurb:
      "A radar sphere with a fading sweep. Blips light up exactly when the beam passes over them, so the whole thing feels like a system scanning and finding signals.",
    traits: ["fading trail", "synced blips", "crosshair grid"],
    Art: SonarOrb,
  },
  {
    id: "05",
    name: "Pixel Planet",
    tag: "8-bit world",
    blurb:
      "A true pixel-dithered gas giant, lit from one side with Bayer shading. Bands shimmer across its surface while a ringed orbit and a tiny moon circle it.",
    traits: ["ordered dithering", "ring + moon", "shimmer wave"],
    Art: PlanetOrb,
  },
  {
    id: "06",
    name: "Tesseract",
    tag: "Real 3D hypercube",
    blurb:
      "A genuine rotating 3D cube-within-a-cube, computed live with perspective. The inner cube twists against the outer one, linked by dashed edges — the most technical-looking of the set.",
    traits: ["live 3D maths", "twisting inner cube", "depth fade"],
    Art: TesseractOrb,
  },
];
