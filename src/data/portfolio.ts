export const profile = {
  name: "Ripun Sethia",
  handle: "ripuns",
  role: "BTech IT student · Backend & AI",
  tagline: "I build thoughtful backend systems and practical AI applications.",
  location: "Vellore, IN",
  school: "BTech Information Technology, VIT Vellore — Class of 2027 · CGPA 8.58/10",
  email: "ripunsethia27@gmail.com",
  phone: "+91 94613 90313",
  available: true,
  bio: [
    "I'm a final-year BTech IT student at VIT Vellore, interested in backend development, data systems, and practical AI applications. I enjoy the parts of software that quietly make everything else work: clear APIs, sensible database design, and the debugging trail that eventually explains why something broke at 2 a.m.",
    "I worked as a Senior Technical Executive at the Entrepreneurship Cell, VIT, where I contributed to web platforms used by more than 5,000 event participants. My work included server-side endpoints, database indexing, full-stack features, and CI/CD. It was a good introduction to building for real users, coordinating with different teams, and learning that a small database improvement can save a surprising amount of stress.",
    "Outside that work, I like building projects that sit between software, data, and AI. ReplayDB explores event replay for investigating application issues; MediBook focuses on appointment scheduling; and my customer-support project uses an evaluation-first LLM workflow. I also built SpineGuard, an IoT posture-monitoring system that led to a filed and published patent application. I am still learning, still iterating, and usually happiest when a rough idea turns into something useful.",
  ],
  stats: [
    { label: "Event users served", value: 2000, suffix: "+" },
    { label: "Support records pipelined", value: 2800000, suffix: "" },
    { label: "Hackathon teams beaten", value: 70, suffix: "+" },
    { label: "Fuel: F1, Pumping Iron & 80's Rock", value: 100, suffix: "%" }
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
      "A backend platform that captures application events and reconstructs past states to help investigate production issues. I built asynchronous replay workflows with NestJS, PostgreSQL, Redis, BullMQ, and Docker, alongside JWT/API-key protected REST APIs, Flyway migrations, Jest tests, and OpenTelemetry and Prometheus observability.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "OpenTelemetry", "Prometheus", "Jest"],
    metric: "event replay & debugging",
    accent: "#FF2800",
    emoji: "⏪",
    starred: true,
  },
  {
    id: "p2",
    title: "MediBook",
    year: "2025",
    kind: "Full-Stack",
    blurb: "Healthcare appointment management with scheduling, role-based portals, and calendar sync.",
    detail:
      "A healthcare appointment manager with Patient, Doctor, and Admin portals. I designed the PostgreSQL schema and slot-reservation queries to prevent double bookings, and built 20+ REST APIs with Next.js, Express, role-based access control, Google Calendar OAuth, and an LLM-assisted symptom-analysis and reminder flow with a fallback when the model is unavailable.",
    stack: ["Next.js", "Node.js", "Express", "PostgreSQL", "REST APIs", "OAuth 2.0"],
    metric: "20+ REST APIs",
    accent: "#00E5A0",
    emoji: "🩺",
    starred: true,
  },
  {
    id: "p3",
    title: "Customer Support AI Agent",
    year: "2025",
    kind: "AI/ML",
    blurb: "An AWS Bedrock support pipeline built and evaluated on reconstructed support records.",
    detail:
      "Processed and reconstructed about 2.8 million customer-support records with Python and Pandas to create a reproducible evaluation-data pipeline. Built an AWS Bedrock workflow for intent classification, TF-IDF retrieval, grounded responses, and escalation decisions. A hand-labelled 175-example evaluation set measured 72.6% intent accuracy, 67.4% escalation accuracy, and a 4.67/5 grounded-response quality score.",
    stack: ["Python", "Pandas", "AWS Bedrock", "LLMs", "TF-IDF"],
    metric: "72.6% intent accuracy",
    accent: "#4C7CFF",
    emoji: "🤖",
    starred: true,
  },
  {
    id: "p4",
    title: "SpineGuard",
    year: "2024",
    kind: "IoT",
    blurb: "An IoT posture-monitoring system with a published patent application.",
    detail:
      "An AI and IoT posture-monitoring system built with Arduino sensors, a Python machine-learning pipeline, a Flask backend, and a React frontend. It streams live sensor data for posture classification using a Random Forest model and gives voice alerts when a deviation is detected. I also designed the dashboard and calibration workflow; the work led to a filed and published patent application.",
    stack: ["Arduino", "Python", "scikit-learn", "Flask", "React", "Tailwind"],
    metric: "Published patent application",
    accent: "#FF8000",
    emoji: "🦴",
    starred: false,
  },
  {
    id: "p5",
    title: "Multilingual OCR Detection",
    year: "2025",
    kind: "AI/ML",
    blurb: "A modular pipeline for detecting, grouping, classifying, and recognising text in visual media.",
    detail:
      "A modular OCR project for processing text in images and other visual media. The pipeline covers text detection, grouping, classification, and recognition, with multilingual and script-routing support for different recognition models.",
    stack: ["Python", "OCR", "Machine Learning", "Computer Vision"],
    metric: "Multilingual OCR pipeline",
    accent: "#FFD200",
    emoji: "🔎",
    starred: false,
  },
];

export const skillGroups: { id: string; name: string; icon: string; skills: string[] }[] = [
  {
    id: "languages",
    name: "Languages",
    icon: "{ }",
    skills: ["TypeScript", "JavaScript (ES6+)", "C++", "SQL", "Java"],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    icon: "▸",
    skills: ["REST APIs", "NestJS", "Node.js", "Next.js", "Flask"],
  },
  {
    id: "data",
    name: "Data & Infra",
    icon: "▤",
    skills: ["PostgreSQL", "Docker", "MongoDB", "Redis", "AWS"],
  },
  {
    id: "ai",
    name: "AI & Fundamentals",
    icon: "∑",
    skills: ["Python", "DSA", "LLMs", "System Design", "ML"],
  },
];

export const timeline = [
  {
    date: "2026 · Now",
    title: "BTech IT — VIT Vellore",
    org: "Final year · CGPA 8.58 · graduating July 2027",
    body: "Currently balancing coursework with personal projects in backend development, data systems, and AI. Open to internships where I can learn from a strong engineering team and contribute meaningfully.",
    tags: ["VIT", "CGPA 8.58", "Class of '27"],
  },
  {
    date: "2025 · Published",
    title: "Patent Application — SpineGuard",
    org: "Filed & published",
    body: "Filed and published a patent application for SpineGuard, an IoT and machine-learning posture-monitoring system.",
    tags: ["Patent", "IoT", "ML"],
  },
  {
    date: "2025 · Runner-up",
    title: "HackBattle 2025 — 2nd of 70+",
    org: "IEEE-CS, VIT Vellore",
    body: "My team placed second among more than 70 teams with an IoT healthcare solution evaluated by over 10 industry judges.",
    tags: ["Hackathon", "Healthcare", "Full-stack"],
  },
  {
    date: "2025 · Certified",
    title: "Generative AI with IBM Watsonx",
    org: "IBM Career Education Program",
    body: "Completed the IBM Career Education Program certification in Generative AI using Watsonx in June 2025.",
    tags: ["LLMs", "Watsonx", "Evals"],
  },
  {
    date: "2024 – 25",
    title: "Senior Technical Executive — E-Cell VIT",
    org: "Entrepreneurship Cell",
    body: "Worked on server-side endpoints, database indexing, full-stack web solutions, and CI/CD. The platform served more than 5,000 event participants; indexing improved query throughput by 35% and CI/CD reduced deployment time by about 25%.",
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
  { cmd: "skills", desc: "all skills by category" },
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
