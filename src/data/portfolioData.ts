export interface Project {
  id: string;
  carNumber: string;
  title: string;
  tagline: string;
  category: "IoT & AI" | "Full-Stack Web & LLM" | "High-Scale Production";
  period: string;
  status: "POLE POSITION" | "PODIUM FINISH" | "CHAMPIONSHIP SPEC";
  badges: string[];
  description: string;
  highlights: string[];
  telemetryStats: { label: string; value: string; icon?: string }[];
  techStack: { name: string; category: "Hardware/ML" | "Backend" | "Frontend" | "Database/Cloud" }[];
  githubUrl?: string;
  liveUrl?: string;
  patentUrl?: string;
  architectureDetails: string[];
}

export interface Experience {
  role: string;
  team: string;
  organization: string;
  period: string;
  location: string;
  statusBadge: string;
  summary: string;
  pitStopLogs: {
    metric: string;
    description: string;
    category: "Performance" | "Mentorship" | "Operations";
  }[];
  technologies: string[];
}

export interface SkillCategory {
  sector: string;
  systemName: string;
  f1Analogy: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    telemetryTag: string;
    highlight?: boolean;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  type: "PATENT" | "HACKATHON PODIUM" | "CERTIFICATION" | "ACADEMIC";
  issuer: string;
  date: string;
  position?: string;
  rankBadge: string;
  description: string;
  keyTakeaways: string[];
  verificationLink?: string;
}

export const PORTFOLIO_DATA = {
  driver: {
    name: "Ripun Sethia",
    carNumber: "27",
    role: "Full-Stack & Systems Engineer | AI & IoT Builder",
    currentStatus: "GREEN FLAG — READY TO RACE (Open to Roles & Internships)",
    trackTemperature: "34°C / Peak Race Pace",
    team: "Scuderia Ripun / VIT IT '27",
    location: "Vellore / India",
    email: "ripunsethia27@gmail.com",
    phone: "+91-9461390313",
    linkedin: "https://www.linkedin.com/in/ripun-sethia",
    github: "https://github.com/ripuns",
    resumePdfUrl: "/Ripun_Sethia_Resume.pdf",
    shortBio:
      "High-performance Software Engineer & Maker. Specialized in scalable backend architectures, IoT sensor pipelines, real-time ML systems, and modern full-stack web applications with 99.9% uptime delivery.",
    education: {
      institution: "Vellore Institute of Technology (VIT), Vellore",
      degree: "Bachelor of Technology – Information Technology",
      cgpa: "8.58 / 10",
      expectedGraduation: "July 2027",
      status: "P1 Academic Trajectory",
    },
  },

  quickMetrics: [
    { label: "Patent Published", value: "1", subtext: "SpineGuard IoT/ML", color: "text-amber-400" },
    { label: "Hackathon Standing", value: "2nd Place", subtext: "HackBattle '25 / 70+ Teams", color: "text-emerald-400" },
    { label: "Peak Production Users", value: "5,000+", subtext: "Zero-Downtime E-Summit", color: "text-red-500" },
    { label: "API Query Optimization", value: "+35%", subtext: "Data Retrieval Boost", color: "text-cyan-400" },
    { label: "Academic Standing", value: "8.58", subtext: "CGPA / VIT Vellore", color: "text-purple-400" },
  ],

  skillSectors: [
    {
      sector: "Sector 1.1",
      systemName: "Internal Combustion Engine (ICE)",
      f1Analogy: "Core Programming Languages & Algorithms",
      description: "Low-level execution power, type safety, computational complexity, and systems fundamentals.",
      skills: [
        { name: "C++", level: 90, telemetryTag: "High-RPM Execution", highlight: true },
        { name: "TypeScript", level: 92, telemetryTag: "Strict Type Safety", highlight: true },
        { name: "JavaScript (ES6+)", level: 95, telemetryTag: "Core Dynamic Engine", highlight: true },
        { name: "Python", level: 88, telemetryTag: "ML & Sensor Pipelines", highlight: true },
        { name: "SQL", level: 86, telemetryTag: "Relational Queries" },
        { name: "OOP & System Design", level: 88, telemetryTag: "Chassis Architecture" },
        { name: "DBMS & OS", level: 85, telemetryTag: "Kernel & Memory Mgmt" },
        { name: "Computer Networks", level: 84, telemetryTag: "Low-Latency Comms" },
      ],
    },
    {
      sector: "Sector 1.2",
      systemName: "Aerodynamics & Cockpit (Frontend)",
      f1Analogy: "User Interfaces, Responsive Design & Telemetry Dashboards",
      description: "High downforce, pixel-perfect responsiveness, smooth animations, and intuitive workflows.",
      skills: [
        { name: "React.js", level: 94, telemetryTag: "Virtual DOM Downforce", highlight: true },
        { name: "Next.js (App Router)", level: 92, telemetryTag: "Server-Side Boost", highlight: true },
        { name: "Tailwind CSS", level: 96, telemetryTag: "Zero Drag Aero", highlight: true },
        { name: "Figma UI/UX", level: 85, telemetryTag: "Wind Tunnel Prototyping" },
        { name: "Framer Motion", level: 90, telemetryTag: "Kinetic Telemetry FX" },
        { name: "Flask UI Bridges", level: 82, telemetryTag: "Micro-service Cockpit" },
      ],
    },
    {
      sector: "Sector 1.3",
      systemName: "Hybrid Powertrain & Fuel Injection (Backend)",
      f1Analogy: "Server Architectures, Microservices, Databases & Concurrency",
      description: "High-throughput API pipelines, distributed data stores, transaction safety, and sub-millisecond response times.",
      skills: [
        { name: "Node.js & Express.js", level: 93, telemetryTag: "Event-Loop Acceleration", highlight: true },
        { name: "PostgreSQL", level: 90, telemetryTag: "ACID Race Safety", highlight: true },
        { name: "MongoDB", level: 85, telemetryTag: "Flexible Telemetry Stores" },
        { name: "Supabase & Prisma ORM", level: 88, telemetryTag: "Fast Data Migration" },
        { name: "RESTful API Design", level: 94, telemetryTag: "20+ Enterprise Endpoints", highlight: true },
        { name: "OAuth 2.0 & RBAC", level: 88, telemetryTag: "Telemetry Security Protocol" },
      ],
    },
    {
      sector: "Sector 1.4",
      systemName: "Pit Crew, Garage & Telemetry (DevOps & Tools)",
      f1Analogy: "Infrastructure, Containerization, CI/CD & Deployment",
      description: "Continuous integration pipelines, cloud virtualization, container orchestration, and runtime telemetry.",
      skills: [
        { name: "Docker", level: 88, telemetryTag: "Chassis Containerization", highlight: true },
        { name: "Kubernetes", level: 80, telemetryTag: "Fleet Orchestration" },
        { name: "AWS (EC2 & S3)", level: 84, telemetryTag: "Cloud Track Support", highlight: true },
        { name: "GitLab / GitHub CI/CD", level: 87, telemetryTag: "25% Faster Pit Deploys", highlight: true },
        { name: "Linux & Bash Scripting", level: 90, telemetryTag: "Terminal Cockpit" },
        { name: "Postman & API Testing", level: 92, telemetryTag: "Bench Test Telemetry" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "spineguard",
      carNumber: "01",
      title: "SpineGuard",
      tagline: "AI-Powered Wearable Posture Correction & Spine Angle Monitoring System",
      category: "IoT & AI",
      period: "September 2025 – Present",
      status: "POLE POSITION",
      badges: ["🏆 PATENT PUBLISHED", "🥈 HACKBATTLE '25 2ND PLACE", "IOT HARDWARE + ML"],
      description:
        "An end-to-end patented biomedical IoT wearable combined with a machine learning classification pipeline and web telemetry dashboard for real-time postural ergonomic correction.",
      highlights: [
        "Constructed physical wearable sensor hardware using Arduino with custom calibration scripts for real-time multi-axis spine angle tracking.",
        "Engineered Python ML classification pipeline utilizing Random Forest algorithms for sub-second predictive posture classification.",
        "Integrated real-time biofeedback audio alerts when dangerous angular deviations occur during prolonged sitting.",
        "Built dynamic calibration and analytics dashboard in React + Tailwind with Flask backend, achieving 100% usability rating in user trials.",
        "Patent filed and published for novel integration of wearable sensor geometry with ML feedback loops.",
      ],
      telemetryStats: [
        { label: "Hardware Latency", value: "<15ms" },
        { label: "Usability Rating", value: "100%" },
        { label: "ML Model", value: "Random Forest" },
        { label: "Patent Status", value: "Published" },
      ],
      techStack: [
        { name: "Arduino / C++", category: "Hardware/ML" },
        { name: "Python / Scikit-Learn", category: "Hardware/ML" },
        { name: "Flask", category: "Backend" },
        { name: "React.js", category: "Frontend" },
        { name: "Tailwind CSS", category: "Frontend" },
        { name: "Figma", category: "Frontend" },
      ],
      githubUrl: "https://github.com/ripuns",
      architectureDetails: [
        "Hardware Sensor Tier: Multi-axis gyro/accelerometer data acquisition on Arduino with noise filtering.",
        "ML Inference Tier: Serial-to-Python pipeline running real-time feature extraction and Random Forest inference.",
        "Feedback & Control Tier: Instant audio feedback loop accompanied by WebSockets telemetry push.",
        "Telemetry UI: Interactive React charts visualizing angular curvature over time.",
      ],
    },
    {
      id: "medibook",
      carNumber: "02",
      title: "Medibook",
      tagline: "Enterprise Healthcare Appointment Management & Gemini LLM Clinical Platform",
      category: "Full-Stack Web & LLM",
      period: "August 2026 – Present",
      status: "CHAMPIONSHIP SPEC",
      badges: ["NEXT.JS 16", "20+ REST APIS", "GEMINI LLM AI", "RACE-CONDITION FREE"],
      description:
        "A robust, multi-tenant healthcare appointment manager engineered with Next.js 16, Node.js, Express, and PostgreSQL featuring Google Calendar OAuth sync and AI-assisted symptom triage.",
      highlights: [
        "Architected and deployed 20+ secure RESTful API endpoints handling complex patient scheduling, doctor availability, and triage workflows.",
        "Completely eliminated slot double-booking race conditions through pessimistic database locking, slot-reservation transactions, and Google Calendar 2-way OAuth 2.0 sync.",
        "Constructed strict multi-role Role-Based Access Control (RBAC) delivering dedicated, secure portals for Patients, Doctors, and Hospital Admins.",
        "Integrated Google Gemini LLM for automated intelligent symptom analysis and personalized appointment preparation notes with mock fallback for 100% SLA.",
      ],
      telemetryStats: [
        { label: "REST Endpoints", value: "20+" },
        { label: "Double Bookings", value: "0 (Guaranteed)" },
        { label: "AI Engine", value: "Gemini LLM" },
        { label: "Auth Protocol", value: "OAuth 2.0 + RBAC" },
      ],
      techStack: [
        { name: "Next.js 16", category: "Frontend" },
        { name: "Node.js & Express", category: "Backend" },
        { name: "PostgreSQL", category: "Database/Cloud" },
        { name: "Google Calendar API", category: "Backend" },
        { name: "Gemini LLM API", category: "Hardware/ML" },
        { name: "Prisma ORM", category: "Database/Cloud" },
      ],
      githubUrl: "https://github.com/ripuns",
      architectureDetails: [
        "Concurrency Control: Transactional slot locking ensuring strict isolation levels in PostgreSQL.",
        "Calendar Gateway: Webhook-driven synchronization with Google Calendar to prevent physician schedule conflicts.",
        "AI Diagnostic Pipeline: Token-optimized prompt engineering with Gemini LLM + resilient fallback handlers.",
        "Role Separation: JWT session validation with granular route guards across 3 stakeholder personas.",
      ],
    },
    {
      id: "esummit25",
      carNumber: "03",
      title: "Esummit25 Platform",
      tagline: "High-Traffic Digital Platform for VIT's Flagship Entrepreneurship Fest",
      category: "High-Scale Production",
      period: "August 2024 – September 2024",
      status: "PODIUM FINISH",
      badges: ["5,000+ USERS", "99.9% UPTIME", "CI/CD PIPELINES", "CROSS-TEAM LEAD"],
      description:
        "Full-stack production platform powering ticketing, event schedules, speaker portals, and live announcements for 5,000+ active participants during VIT's largest entrepreneurship summit.",
      highlights: [
        "Architected, built, and operated the official full-stack event platform handling over 5,000+ registered attendees under heavy concurrent surges.",
        "Integrated robust authentication layers and 10+ third-party service APIs, slashing event-day bug resolution times by ~30%.",
        "Streamlined and optimized GitLab CI/CD build and deploy pipelines, reducing deployment cycle times by ~25% for rapid hotfixes.",
        "Liaised with 5+ cross-functional operational squads (marketing, guest relations, finance, logistics) to guarantee 99.9% uptime throughout the summit.",
      ],
      telemetryStats: [
        { label: "Active Users", value: "5,000+" },
        { label: "Uptime Delivered", value: "99.9%" },
        { label: "Deploy Time Cut", value: "-25%" },
        { label: "APIs Integrated", value: "10+" },
      ],
      techStack: [
        { name: "React.js & Next.js", category: "Frontend" },
        { name: "Node.js", category: "Backend" },
        { name: "Tailwind CSS", category: "Frontend" },
        { name: "GitLab CI/CD", category: "Database/Cloud" },
        { name: "AWS EC2", category: "Database/Cloud" },
        { name: "Postman", category: "Backend" },
      ],
      githubUrl: "https://github.com/ripuns",
      architectureDetails: [
        "Edge Caching: Static asset distribution and aggressive Redis/CDN caching for event speaker lineups.",
        "Load Resilience: Tested with simulated traffic surges to prevent database lockups during live ticket drops.",
        "Continuous Delivery: Automated Docker container builds triggering zero-downtime rolling updates on AWS.",
      ],
    },
  ] as Project[],

  experience: [
    {
      role: "Senior Technical Executive",
      team: "Entrepreneurship Cell (E-Cell)",
      organization: "Vellore Institute of Technology (VIT), Vellore",
      period: "March 2024 – Present",
      location: "Vellore, Tamil Nadu, India",
      statusBadge: "ACTIVE RACE CREW LEAD",
      summary:
        "Leading the core technical engineering team responsible for architecting high-availability web platforms, internal event management tooling, and mentoring junior developers across the university ecosystem.",
      pitStopLogs: [
        {
          metric: "+35% Query Speed",
          description:
            "Architected backend microservices and heavily optimized PostgreSQL/MongoDB indexing and querying, achieving a 35% speedup in data retrieval under 5,000+ active user load spikes.",
          category: "Performance",
        },
        {
          metric: "-30% Onboarding Friction",
          description:
            "Mentored and led 3+ junior engineers in Next.js, Node.js best practices, Git branching workflows, and clean code standards, accelerating their sprint velocity by 30%.",
          category: "Mentorship",
        },
        {
          metric: "99.9% Race Day Uptime",
          description:
            "Collaborated directly with engineering, operations, and external event sponsors to gather technical requirements and deliver mission-critical software on strict milestone deadlines.",
          category: "Operations",
        },
      ],
      technologies: ["Next.js", "Node.js", "Express", "PostgreSQL", "GitLab CI/CD", "Docker", "Figma", "REST APIs"],
    },
  ] as Experience[],

  achievements: [
    {
      id: "patent-spineguard",
      title: "Patent Application Filed & Published — SpineGuard",
      type: "PATENT",
      issuer: "Patent Office / Intellectual Property Rights Authority",
      date: "Published 2025/2026",
      rankBadge: "🏆 INTELLECTUAL PROPERTY",
      description:
        "Invented and published a patent for an IoT & Machine Learning-based wearable posture monitoring system for real-time anatomical spine angle tracking and active corrective biofeedback.",
      keyTakeaways: [
        "Complete ownership of hardware sensor integration, microcontroller firmware, ML prediction pipeline, and web analytics interface.",
        "Published novel approach to real-time angular classification under natural everyday movement constraints.",
      ],
    },
    {
      id: "hackbattle-2025",
      title: "HackBattle 2025 — 2nd Place Podium Finish",
      type: "HACKATHON PODIUM",
      issuer: "IEEE Computer Society, VIT Vellore",
      date: "2025",
      position: "2nd Place (70+ Competing Teams)",
      rankBadge: "🥈 2ND PLACE PODIUM",
      description:
        "Developed a production-ready IoT healthcare telemetry solution in an intensive 36-hour hackathon, evaluated and praised by 10+ distinguished industry judges.",
      keyTakeaways: [
        "Recognized among 70+ top collegiate engineering teams for technical innovation, real-world usability, and clean full-stack execution.",
        "Built functional hardware-to-cloud live demo with sub-second dashboard updates.",
      ],
    },
    {
      id: "ibm-watsonx",
      title: "Generative AI Using IBM Watsonx Certification",
      type: "CERTIFICATION",
      issuer: "IBM Career Education Program",
      date: "June 2025",
      rankBadge: "📜 CERTIFIED SPECIALIST",
      description:
        "Mastered advanced Generative AI architectures, foundation model tuning, prompt engineering, and LLM enterprise deployment patterns.",
      keyTakeaways: [
        "Deep foundational understanding of Transformer architectures, attention mechanisms, and fine-tuning pipelines.",
        "Applied practical enterprise LLM orchestration directly to subsequent platforms like Medibook.",
      ],
    },
    {
      id: "vit-education",
      title: "B.Tech in Information Technology — CGPA 8.58 / 10",
      type: "ACADEMIC",
      issuer: "Vellore Institute of Technology (VIT), Vellore",
      date: "Expected Graduation: July 2027",
      rankBadge: "🎓 TOP TIER ACADEMICS",
      description:
        "Comprehensive coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, Operating Systems, OOP, and Distributed Systems.",
      keyTakeaways: [
        "Consistent academic excellence with high technical aptitude across theory and hands-on systems engineering labs.",
      ],
    },
  ] as Achievement[],

  pitRadioMessages: [
    { from: "Race Engineer", message: "Radio check Ripun, we are seeing purple sectors across the backend stack." },
    { from: "Pit Wall", message: "Box this lap for new opportunities. Resume telemetry is primed for download." },
    { from: "Driver #27", message: "Copy. Pushing hard on full-stack innovation and AI integrations." },
  ],
};

