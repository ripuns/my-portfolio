"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail, Phone, Download, Printer, Award, ExternalLink } from "lucide-react";

export const ExecutiveView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900/95 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-12 text-slate-200">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800 text-xs font-telemetry print:hidden">
          <span className="text-emerald-400 font-semibold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>EXECUTIVE SPEC SHEET // ATS-OPTIMIZED VIEW</span>
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Spec</span>
            </button>
            <a
              href={PORTFOLIO_DATA.driver.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#E10600] hover:bg-[#FF1801] text-white px-3.5 py-1.5 rounded-lg transition-colors font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Resume Header */}
        <header className="text-center pb-8 border-b border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {PORTFOLIO_DATA.driver.name}
          </h1>
          <p className="text-sm sm:text-base text-cyan-400 font-medium mt-1">
            {PORTFOLIO_DATA.driver.role}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-4 text-xs font-telemetry text-slate-300">
            <a href={`tel:${PORTFOLIO_DATA.driver.phone}`} className="flex items-center space-x-1.5 hover:text-white">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PORTFOLIO_DATA.driver.phone}</span>
            </a>
            <span className="text-slate-600">•</span>
            <a href={`mailto:${PORTFOLIO_DATA.driver.email}`} className="flex items-center space-x-1.5 hover:text-white">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PORTFOLIO_DATA.driver.email}</span>
            </a>
            <span className="text-slate-600">•</span>
            <a href={PORTFOLIO_DATA.driver.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-white">
              <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>linkedin.com/in/ripun-sethia</span>
            </a>
            <span className="text-slate-600">•</span>
            <a href={PORTFOLIO_DATA.driver.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-white">
              <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>github.com/ripuns</span>
            </a>
          </div>
        </header>

        {/* Education Section */}
        <section className="py-6 border-b border-slate-800">
          <h2 className="text-sm font-racing font-bold text-[#E10600] tracking-wider uppercase mb-3">
            EDUCATION
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div>
              <h3 className="font-bold text-white text-base">
                {PORTFOLIO_DATA.driver.education.institution}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {PORTFOLIO_DATA.driver.education.degree}
              </p>
            </div>
            <div className="text-xs font-telemetry text-slate-400 sm:text-right mt-2 sm:mt-0">
              <span className="text-amber-400 font-bold">CGPA: {PORTFOLIO_DATA.driver.education.cgpa}</span>
              <span className="mx-2">•</span>
              <span>Expected: {PORTFOLIO_DATA.driver.education.expectedGraduation}</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-6 border-b border-slate-800">
          <h2 className="text-sm font-racing font-bold text-[#E10600] tracking-wider uppercase mb-4">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-40 font-bold text-slate-300 shrink-0">Languages:</span>
              <span className="text-slate-400">C++, JavaScript (ES6+), TypeScript, Python, SQL</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-40 font-bold text-slate-300 shrink-0">Frameworks & Web:</span>
              <span className="text-slate-400">Node.js, Express.js, React.js, Next.js, Tailwind CSS, Flask</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-40 font-bold text-slate-300 shrink-0">Databases & Backend:</span>
              <span className="text-slate-400">PostgreSQL, MongoDB, Supabase, Prisma ORM, REST APIs</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-40 font-bold text-slate-300 shrink-0">Cloud & DevOps:</span>
              <span className="text-slate-400">Git, Docker, Kubernetes, AWS (EC2), GitLab CI/CD</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-40 font-bold text-slate-300 shrink-0">Fundamentals:</span>
              <span className="text-slate-400">OOP, DBMS, Operating Systems, Computer Networks, System Design</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="w-40 font-bold text-slate-300 shrink-0">Tools & Methodologies:</span>
              <span className="text-slate-400">Linux, Bash, Postman, Figma, GitHub</span>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-6 border-b border-slate-800">
          <h2 className="text-sm font-racing font-bold text-[#E10600] tracking-wider uppercase mb-4">
            WORK EXPERIENCE
          </h2>
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    {exp.role} <span className="font-normal text-slate-400">— {exp.team} {exp.organization}</span>
                  </h3>
                </div>
                <span className="text-xs font-telemetry text-slate-400 mt-1 sm:mt-0">
                  {exp.period}
                </span>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <li>Architected backend APIs and optimized database queries, improving data retrieval speed by <strong>35%</strong> and supporting <strong>5,000+ active users</strong> during peak events.</li>
                <li>Mentored 3+ junior developers in Next.js, Node.js, and version control, accelerating onboarding time by <strong>30%</strong>.</li>
                <li>Collaborated with developers, operations teams, and event stakeholders to gather requirements and deliver production-ready applications within project deadlines.</li>
              </ul>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="py-6 border-b border-slate-800">
          <h2 className="text-sm font-racing font-bold text-[#E10600] tracking-wider uppercase mb-4">
            PROJECTS
          </h2>
          <div className="space-y-6">
            {/* Project 1: SpineGuard */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    SpineGuard <span className="font-normal text-slate-400">| AI-Powered Posture Correction System</span>
                  </h3>
                </div>
                <span className="text-xs font-telemetry text-slate-400">September 2025 – Present</span>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-1 text-xs text-slate-300 leading-relaxed">
                <li>Built an AI + IoT posture monitoring solution using Arduino, Python ML pipeline, Flask backend, and React + Tailwind frontend.</li>
                <li>Implemented hardware integration and calibration scripts for real-time spine angle tracking.</li>
                <li>Designed intuitive dashboards and calibration workflows in Figma, improving usability for 100% of test users.</li>
                <li>Integrated Random Forest model for live predictions with voice alerts, ensuring accurate posture.</li>
              </ul>
            </div>

            {/* Project 2: Medibook */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-row sm:items-baseline justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Medibook <span className="font-normal text-slate-400">| Healthcare Appointment Manager Platform</span>
                  </h3>
                </div>
                <span className="text-xs font-telemetry text-slate-400">August 2026 – Present</span>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-1 text-xs text-slate-300 leading-relaxed">
                <li>Engineered a full-stack platform delivering 20+ RESTful APIs using Next.js 16, Node.js, Express, and PostgreSQL.</li>
                <li>Eliminated appointment double-booking race conditions via slot-reservation controls and Google Calendar OAuth 2.0 sync.</li>
                <li>Developed robust RBAC security frameworks and provided unique portals to Patients, Doctors, and Admins.</li>
                <li>Integrated Gemini LLM for automated symptom analysis and patient reminders, ensuring 100% availability via mock fallback handling.</li>
              </ul>
            </div>

            {/* Project 3: Esummit25 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Esummit25 <span className="font-normal text-slate-400">| Digital Platform for VIT&apos;s Entrepreneurship Fest</span>
                  </h3>
                </div>
                <span className="text-xs font-telemetry text-slate-400">August 2024 – September 2024</span>
              </div>
              <ul className="list-disc list-outside pl-5 space-y-1 text-xs text-slate-300 leading-relaxed">
                <li>Designed, developed, and deployed a full-stack web platform supporting 5,000+ users during VIT&apos;s entrepreneurship event.</li>
                <li>Integrated secure authentications and 10+ APIs, reducing bug resolution time by ~30%.</li>
                <li>Optimized build pipelines, cutting deployment time by ~25% for multiple stable production releases.</li>
                <li>Collaborated with 5+ cross-functional teams, ensuring 99.9% uptime and seamless event readiness.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Patents & Achievements */}
        <section className="py-6 border-b border-slate-800">
          <h2 className="text-sm font-racing font-bold text-[#E10600] tracking-wider uppercase mb-4">
            PATENTS & ACHIEVEMENTS
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Patent Application Filed & Published – SpineGuard</span>
              </div>
              <p className="pl-5 mt-0.5 text-slate-400">
                Developed an IoT and Machine Learning-based wearable posture monitoring system for real-time posture detection and correction. Designed complete hardware, ML model, and web app.
              </p>
            </div>

            <div>
              <div className="font-bold text-white flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>HackBattle 2025 (IEEE-CS, VIT Vellore) – 2nd Place among 70+ teams</span>
              </div>
              <p className="pl-5 mt-0.5 text-slate-400">
                Developed a production-ready IoT healthcare solution evaluated by 10+ industry judges, recognized for innovation, usability, and full-stack implementation.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="pt-6">
          <h2 className="text-sm font-racing font-bold text-[#E10600] tracking-wider uppercase mb-3">
            CERTIFICATIONS
          </h2>
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white">Generative AI Using IBM Watsonx</span> – IBM Career Education Program (June 2025)
          </div>
        </section>

      </div>
    </div>
  );
};

