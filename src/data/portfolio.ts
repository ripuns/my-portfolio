export const profile = {
  name: "Ripun Sethia",
  handle: "ripunxs",
  role: "BTech IT · Backend & AI",
  tagline: "I build backend systems that hold the racing line at scale.",
  location: "Vellore, IN",
  school: "BTech Information Technology, VIT Vellore — Class of 2027 · CGPA 8.58/10",
  email: "ripunsethia27@gmail.com",
  phone: "+91 94613 90313",
  available: true,
  bio: [
    "I'm a final-year BTech IT student at VIT Vellore (CGPA 8.58) who lives on the backend: NestJS microservices, PostgreSQL query plans, and event pipelines that have to survive large no. of concurrent users without lifting off the throttle.",
    "As Senior Technical Executive at the Entrepreneurship Cell, I contributed in shipping full-stack platforms with 10+ APIs, JWT/RBAC auth, and CI/CD that cut deploy time by 25% — while holding 99.9% availability through peak event surges. Off the track, I work on AI: an LLM-based customer support pipeline on AWS Bedrock, scored with a hand-labelled 175-example eval harness.",
    "I also hold a published patent application for SpineGuard, an AI + IoT posture-correction system, and a runner-up finish at HackBattle 2025 against 70+ teams. My happy place is where systems meet ML: observability, evals, and software that stays on the racing line.",
  ],
  stats: [
    { label: "Event users served", value: 5000, suffix: "+" },
    { label: "Query throughput boost", value: 35, suffix: "%" },
    { label: "Support records pipelined", value: 2800000, suffix: "" },
    { label: "Hackathon teams outpaced", value: 70, suffix: "+" },
  ],
  socials: [
    { label: "GitHub", handle: "@ripuns", href: "https://github.com/ripuns" },
    { label: "LinkedIn", handle: "in/ripun-sethia", href: "https://www.linkedin.com/in/ripun-sethia" },
    { label: "Email", handle: "ripunsethia27@gmail.com", href: "mailto:ripunsethia27@gmail.com" },
    { label: "Phone", handle: "+91 94613 90313", href: "tel:+919461390313" },
  ],
};

export type Project = {
  id: string;
  title: string;
  year: string;
  kind:  "Full-Stack" | "Backend" | "AI/ML" | "IoT";
  blurb: string;
  detail: string;
  stack: string[];
  metric: string;
  accent: string;
  emoji: string;
  starred: boolean;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "ReplayDB",
    year: "2025",
    kind: "Backend",
    blurb: "Event replay & time-travel debugging — capture app events, reconstruct any past state.",
    detail:
      "A backend infrastructure platform that records application events and replays them to reconstruct exact historical states, so production bugs can be rewound and investigated instead of guessed at. Scalable NestJS microservice workflows in Docker, RESTful APIs with JWT/API-key auth, and PostgreSQL queries tuned for high-performance replay. OpenTelemetry tracing plus Prometheus metrics give full observability for root-cause analysis, with Flyway migrations and Jest testing keeping operations reliable.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "OpenTelemetry", "Prometheus", "Jest"],
    metric: "rewind any prod state",
    accent: "#FF2800",
    emoji: "⏪",
    starred: true,
  },
  {
    id: "p2",
    title: "SpineGuard",
    year: "2025",
    kind: "IoT",
    blurb: "AI + IoT posture correction with live spine tracking — filed as a published patent.",
    detail:
      "An AI-powered posture monitoring system: Arduino sensors stream live spine-angle data through calibration scripts to a Flask backend, where a trained Random Forest model classifies posture in real time and triggers voice alerts on deviation for instant corrective feedback. React + Tailwind dashboards and Figma-designed calibration workflows improved usability for 100% of test users. Filed and published as a patent application.",
    stack: ["Arduino", "Python", "scikit-learn", "Flask", "React", "Tailwind", "Figma"],
    metric: "📜 patent published",
    accent: "#00E5A0",
    emoji: "🦴",
    starred: true,
  },
  {
    id: "p3",
    title: "Support AI Agent",
    year: "2025",
    kind: "AI/ML",
    blurb: "Bedrock intent classification + TF-IDF retrieval over 2.8M tickets, rigorously evaluated.",
    detail:
      "Processed and reconstructed ~2.8M customer-support records with Python and Pandas into a reproducible data pipeline for evaluation dataset generation. Built an LLM-powered support pipeline on AWS Bedrock for intent classification, TF-IDF retrieval of historical resolutions, and grounded response generation with escalation logic. A hand-labelled 175-example eval harness benchmarks the pipeline: 72.6% intent accuracy, 67.4% escalation accuracy, 4.6/5 response quality.",
    stack: ["Python", "Pandas", "AWS Bedrock", "LLMs", "TF-IDF"],
    metric: "72.6% intent accuracy",
    accent: "#4C7CFF",
    emoji: "🤖",
    starred: true,
  },
  {
    id: "p4",
    title: "E-Cell VIT Platform",
    year: "2024",
    kind: "Full-Stack",
    blurb: "Event platform for 5,000+ users — +35% throughput, 99.9% availability at peak.",
    detail:
      "As Senior Technical Executive at the Entrepreneurship Cell VIT (Mar 2024 – Apr 2025), I engineered server-side endpoints and database indexing that boosted query throughput by 35% across 5,000+ active event participants. Contributed to UI/UX and full-stack development with 10+ APIs and robust auth, streamlined CI/CD to cut deploy time ~25%, partnered with 5+ cross-functional teams, and sustained 99.9% availability through peak surges.",
    stack: ["Node.js", "PostgreSQL", "Redis", "REST APIs", "JWT", "CI/CD"],
    metric: "5,000+ event users",
    accent: "#FF8000",
    emoji: "🎟️",
    starred: false,
  },
  {
    id: "p5",
    title: "HackBattle Healthcare",
    year: "2025",
    kind: "Full-Stack",
    blurb: "Production-ready healthcare solution — 2nd place of 70+ teams at HackBattle 2025.",
    detail:
      "Built with my team at HackBattle 2025 (IEEE-CS, VIT Vellore): a production-ready healthcare solution evaluated by 10+ industry judges and recognised for innovation, usability, and full-stack implementation. Finished 2nd among 70+ teams — the demo gods were kind, the APIs were clean, and the evals were real.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind"],
    metric: "🥈 2nd of 70+ teams",
    accent: "#FFD200",
    emoji: "🏆",
    starred: false,
  },
  {
    id: "p6",
    title: "Watsonx GenAI Lab",
    year: "2025",
    kind: "AI/ML",
    blurb: "IBM Watsonx certification build — LLM app patterns that fed the support agent.",
    detail:
      "IBM Career Education Program capstone (certified June 2025): built and evaluated LLM workflows on IBM Watsonx — retrieval, grounding, and response-quality evals. The patterns and eval discipline from this lab went straight into the Customer Support AI Agent pipeline.",
    stack: ["IBM Watsonx", "LLMs", "Python", "Prompt Eng."],
    metric: "IBM certified · 2025",
    accent: "#B06BFF",
    emoji: "🧪",
    starred: false,
  },
];

export const skillGroups = [
  {
    name: "Languages",
    short: "LANG",
    compound: "SOFT",
    compoundColor: "#e10600",
    icon: "{ }",
    skills: [
      { name: "TypeScript", code: "TS", level: 92, note: "daily driver" },
      { name: "JavaScript (ES6+)", code: "JS", level: 90, note: "the chassis" },
      { name: "C++", code: "C++", level: 88, note: "contest weapon" },
      { name: "SQL", code: "SQL", level: 86, note: "query whisperer" },
      { name: "Java", code: "JAV", level: 82, note: "OOP roots" },
    ],
  },
  {
    name: "Backend & APIs",
    short: "API",
    compound: "MEDIUM",
    compoundColor: "#ffd200",
    icon: "▸",
    skills: [
      { name: "REST APIs", code: "RST", level: 92, note: "clean contracts" },
      { name: "NestJS", code: "NJS", level: 90, note: "pit-wall framework" },
      { name: "Node.js", code: "NOD", level: 88, note: "event-loop enjoyer" },
      { name: "JWT / RBAC", code: "AUT", level: 85, note: "access control" },
      { name: "BullMQ", code: "BMQ", level: 72, note: "job-queue crew" },
    ],
  },
  {
    name: "Data & Infra",
    short: "DATA",
    compound: "HARD",
    compoundColor: "#c9c9c9",
    icon: "▤",
    skills: [
      { name: "PostgreSQL", code: "PG", level: 86, note: "index whisperer" },
      { name: "Docker", code: "DCK", level: 80, note: "ships every lap" },
      { name: "MongoDB", code: "MDB", level: 78, note: "flexible storage" },
      { name: "Redis", code: "RDS", level: 74, note: "cache = DRS" },
      { name: "AWS Bedrock", code: "BDR", level: 70, note: "LLM power unit" },
    ],
  },
  {
    name: "AI & Fundamentals",
    short: "AI",
    compound: "INTER",
    compoundColor: "#00e5a0",
    icon: "∑",
    skills: [
      { name: "Python", code: "PY", level: 90, note: "ML & pipelines" },
      { name: "DSA", code: "DSA", level: 89, note: "pure racecraft" },
      { name: "LLMs", code: "LLM", level: 82, note: "prompt to podium" },
      { name: "System Design", code: "SYS", level: 78, note: "aero for backends" },
      { name: "scikit-learn", code: "SKL", level: 76, note: "forest specialist" },
    ],
  },
];

export const timeline = [
  {
    date: "2026 · Now",
    title: "BTech IT — VIT Vellore",
    org: "Third year · CGPA 8.58 · graduating July 2027",
    body: "Splitting time between distributed-systems coursework, LLM evals, and keeping ReplayDB's replay latency on pole position. Open to backend internships for the next stint.",
    tags: ["VIT", "CGPA 8.58", "Class of '27"],
  },
  {
    date: "2025 · Published",
    title: "Patent Application — SpineGuard",
    org: "Filed & published",
    body: "Filed and published a patent application for the AI + IoT posture-correction system: Arduino sensing, Random Forest classification, and voice-alert feedback. My first time reading legal documents for fun.",
    tags: ["Patent", "IoT", "ML"],
  },
  {
    date: "2025 · Runner-up",
    title: "HackBattle 2025 — 2nd of 70+",
    org: "IEEE-CS, VIT Vellore",
    body: "Production-ready healthcare solution evaluated by 10+ industry judges. Recognised for innovation, usability, and full-stack implementation — one position off the top step.",
    tags: ["Hackathon", "Healthcare", "Full-stack"],
  },
  {
    date: "2025 · Certified",
    title: "Generative AI with IBM Watsonx",
    org: "IBM Career Education Program",
    body: "Certified June 2025. Prompt engineering, LLM app patterns, and evals — techniques that went straight from the lab into the support-agent pipeline.",
    tags: ["LLMs", "Watsonx", "Evals"],
  },
  {
    date: "2024 – 25",
    title: "Senior Technical Executive — E-Cell VIT",
    org: "Entrepreneurship Cell",
    body: "+35% query throughput for 5,000+ event users, 10+ APIs, −25% deploy time via CI/CD, and 99.9% availability at peak. Five cross-functional teams, zero missed milestones.",
    tags: ["Backend", "Scale", "Leadership"],
  },
  {
    date: "2023 · Lap 1",
    title: "Hello, world — BTech begins",
    org: "VIT Vellore",
    body: "First semester, first data structure, first all-nighter. Committed to main without a branch. Have not done that since.",
    tags: ["DSA", "Git", "Regret"],
  },
];

export const ticker = [
  "TypeScript",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Python",
  "AWS Bedrock",
  "Docker",
  "Redis",
  "MongoDB",
  "LLMs",
  "BullMQ",
  "OpenTelemetry",
  "Prometheus",
  "C++",
  "Java",
  "React",
  "Tailwind",
  "Figma",
  "Git",
  "System Design",
];

export const terminalHelp: { cmd: string; desc: string }[] = [
  { cmd: "help", desc: "list available commands" },
  { cmd: "whoami", desc: "short bio" },
  { cmd: "projects", desc: "list projects" },
  { cmd: "skills", desc: "top skills" },
  { cmd: "contact", desc: "how to reach me" },
  { cmd: "neofetch", desc: "system info, but for a person" },
  { cmd: "theme <name>", desc: "paper | ink" },
  { cmd: "goto <section>", desc: "hero about skills projects lab journey guestbook" },
  { cmd: "joke", desc: "a programming joke" },
  { cmd: "clear", desc: "wipe the screen" },
  { cmd: "exit", desc: "you can't really" },
];

export const jokes = [
  "There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
  "My backend has DRS: Docker, Redis, and Speed.",
  "I'd tell you a UDP joke but you might not get it.",
  "A SQL query walks into a bar, approaches two tables and asks: may I join you?",
  "Why did the microservice go to therapy? Too many unresolved dependencies.",
  "Lights out and away we go — except my deploy pipeline, which is still running tests.",
];
