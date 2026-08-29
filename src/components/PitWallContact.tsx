"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Radio, Mail, Phone, Send, Check, Copy, FileDown } from "lucide-react";

export const PitWallContact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    sfx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playRadioStatic();
    setSubmitted(true);
    // Prepare mailto link for direct transmission
    const mailto = `mailto:${PORTFOLIO_DATA.driver.email}?subject=${encodeURIComponent(
      `[F1 Pit Radio] ${formState.subject || "Collaboration Opportunity"}`
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    )}`;
    window.open(mailto, "_blank");
  };

  return (
    <section id="pitwall" className="py-24 bg-[#0A0B12] border-t border-[#1F2130] relative">
      {/* Background Radiowave Accents */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#1E2030] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-telemetry text-[#00F5D4] uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
              <span>THE PIT WALL // TEAM RADIO & COMMS CHANNELS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-racing font-extrabold text-white uppercase tracking-tight">
              OPEN <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00F5D4] to-emerald-400">TRANSMISSION</span>
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm font-telemetry text-zinc-400 max-w-md">
            Direct telemetry link to Driver #27. Available for full-time software engineering roles and high-impact internships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Direct Comms Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="bg-[#121422] border border-[#25283E] p-4 sm:p-5 rounded-2xl flex items-center justify-between hover:border-[#00F5D4]/40 transition-colors">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-[#E10600]/15 text-[#E10600]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-telemetry text-zinc-400 uppercase">OFFICIAL EMAIL</span>
                  <p className="font-telemetry text-xs sm:text-sm font-semibold text-white">
                    {PORTFOLIO_DATA.driver.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.driver.email, "email")}
                className="p-2 rounded-lg bg-[#191B2B] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Copy Email"
              >
                {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="bg-[#121422] border border-[#25283E] p-4 sm:p-5 rounded-2xl flex items-center justify-between hover:border-[#00F5D4]/40 transition-colors">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-[#00F5D4]/15 text-[#00F5D4]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-telemetry text-zinc-400 uppercase">DIRECT PHONE / WHATSAPP</span>
                  <p className="font-telemetry text-xs sm:text-sm font-semibold text-white">
                    {PORTFOLIO_DATA.driver.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.driver.phone, "phone")}
                className="p-2 rounded-lg bg-[#191B2B] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Copy Phone Number"
              >
                {copiedField === "phone" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Grid: LinkedIn & GitHub */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PORTFOLIO_DATA.driver.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playClick()}
                className="bg-[#121422] border border-[#25283E] p-4 rounded-2xl flex flex-col items-start hover:border-[#00F5D4] hover:bg-[#16182B] transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#0A66C2]/20 text-[#0A66C2] mb-3 group-hover:scale-105 transition-transform">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-telemetry text-zinc-400 uppercase">PROFESSIONAL</span>
                <span className="font-racing font-bold text-xs sm:text-sm text-white group-hover:text-[#00F5D4] transition-colors mt-0.5">
                  LINKEDIN
                </span>
              </a>

              <a
                href={PORTFOLIO_DATA.driver.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playClick()}
                className="bg-[#121422] border border-[#25283E] p-4 rounded-2xl flex flex-col items-start hover:border-[#E10600] hover:bg-[#16182B] transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-white/10 text-white mb-3 group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-telemetry text-zinc-400 uppercase">CODE REPOSITORY</span>
                <span className="font-racing font-bold text-xs sm:text-sm text-white group-hover:text-[#E10600] transition-colors mt-0.5">
                  GITHUB
                </span>
              </a>
            </div>

            {/* Download CV Banner */}
            <div className="bg-linear-to-r from-[#1E1418] to-[#141525] border border-[#3D252E] p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-racing font-bold text-xs text-white">DRIVER SPEC SHEET (RESUME)</span>
                <p className="text-[11px] font-telemetry text-zinc-400 mt-0.5">Updated for 2026/2027 recruitment cycles</p>
              </div>
              <a
                href={PORTFOLIO_DATA.driver.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playDRSChime()}
                className="bg-[#E10600] hover:bg-[#FF1801] text-white p-2.5 rounded-xl shadow-md shadow-red-950/40 transition-transform active:scale-95"
              >
                <FileDown className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right 7 Cols: Interactive Team Radio Transmission Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121422] border-2 border-[#25283E] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Card Header & Simulated Waveform */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#21243A]">
                <div className="flex items-center space-x-2.5">
                  <Radio className="w-5 h-5 text-[#00F5D4] animate-pulse" />
                  <span className="font-racing font-bold text-xs sm:text-sm tracking-wider text-white uppercase">
                    PIT-TO-CAR RADIO TRANSMITTER
                  </span>
                </div>
                {/* Waveform Bars */}
                <div className="flex items-center space-x-1">
                  {[4, 8, 14, 6, 12, 16, 9, 5].map((height, idx) => (
                    <div
                      key={idx}
                      className="w-1 bg-[#00F5D4] rounded-full animate-pulse"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${idx * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-racing font-bold text-lg text-white">
                    TRANSMISSION DISPATCHED TO DRIVER #27!
                  </h4>
                  <p className="text-xs font-telemetry text-zinc-400 max-w-sm mx-auto">
                    Your email client has been launched with the encrypted transmission payload. Ripun will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-racing text-[#00F5D4] hover:underline"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-telemetry text-zinc-400 uppercase mb-1.5">
                        YOUR CALLSIGN / NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Lead Engineer / Recruiter"
                        className="w-full bg-[#0C0D16] border border-[#23263C] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-telemetry placeholder:text-zinc-600 focus:outline-none focus:border-[#00F5D4] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-telemetry text-zinc-400 uppercase mb-1.5">
                        COMMS FREQUENCY / EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full bg-[#0C0D16] border border-[#23263C] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-telemetry placeholder:text-zinc-600 focus:outline-none focus:border-[#00F5D4] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-telemetry text-zinc-400 uppercase mb-1.5">
                      SUBJECT / OPPORTUNITY TITLE
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Full-Stack Engineering Role / Technical Discussion"
                      className="w-full bg-[#0C0D16] border border-[#23263C] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-telemetry placeholder:text-zinc-600 focus:outline-none focus:border-[#00F5D4] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-telemetry text-zinc-400 uppercase mb-1.5">
                      RADIO TRANSMISSION MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Box this lap! We want to discuss an engineering opportunity with you..."
                      className="w-full bg-[#0C0D16] border border-[#23263C] rounded-xl p-4 text-xs sm:text-sm text-white font-telemetry placeholder:text-zinc-600 focus:outline-none focus:border-[#00F5D4] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-[#E10600] to-[#FF1801] hover:from-[#FF1801] hover:to-[#E10600] text-white font-racing font-extrabold text-sm tracking-wider py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-950/50 hover:shadow-red-600/30 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>BROADCAST TO DRIVER #27</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

