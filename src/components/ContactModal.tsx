"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sfx } from "@/lib/audio";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Radio, Mail, Phone, Send, Check, Copy, X, FileDown } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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
    const mailto = `mailto:${PORTFOLIO_DATA.driver.email}?subject=${encodeURIComponent(
      `[F1 Pit Radio] ${formState.subject || "Collaboration Opportunity"}`
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    )}`;
    window.open(mailto, "_blank");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sfx.playClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-4xl bg-[#0E111C] border-2 border-[#00F5D4]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,245,212,0.25)] overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Scanline Overlay */}
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#212740]">
            <div className="flex items-center space-x-2.5">
              <Radio className="w-5 h-5 text-[#00F5D4] animate-pulse" />
              <span className="font-racing font-bold text-sm tracking-wider text-white uppercase">
                TEAM RADIO TRANSMITTER // ENCRYPTED COMMS
              </span>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-[#191D30] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 5 Cols: Quick Comms Badges */}
            <div className="lg:col-span-5 space-y-3.5">
              
              {/* Email */}
              <div className="bg-[#141829] border border-[#262D4A] p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#E10600]/20 text-[#E10600]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-telemetry text-zinc-400 uppercase block">EMAIL</span>
                    <p className="font-telemetry text-xs font-semibold text-white">
                      {PORTFOLIO_DATA.driver.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.driver.email, "email")}
                  className="p-1.5 rounded-lg bg-[#1D223B] text-zinc-400 hover:text-white"
                >
                  {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              <div className="bg-[#141829] border border-[#262D4A] p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#00F5D4]/20 text-[#00F5D4]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-telemetry text-zinc-400 uppercase block">PHONE / WHATSAPP</span>
                    <p className="font-telemetry text-xs font-semibold text-white">
                      {PORTFOLIO_DATA.driver.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.driver.phone, "phone")}
                  className="p-1.5 rounded-lg bg-[#1D223B] text-zinc-400 hover:text-white"
                >
                  {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={PORTFOLIO_DATA.driver.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="bg-[#141829] border border-[#262D4A] hover:border-[#00F5D4] p-3 rounded-2xl flex items-center space-x-2.5 transition-colors group"
                >
                  <div className="p-2 rounded-xl bg-[#0A66C2]/20 text-[#0A66C2]">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <span className="font-racing font-bold text-xs text-white group-hover:text-[#00F5D4]">
                    LINKEDIN
                  </span>
                </a>

                <a
                  href={PORTFOLIO_DATA.driver.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playClick()}
                  className="bg-[#141829] border border-[#262D4A] hover:border-[#E10600] p-3 rounded-2xl flex items-center space-x-2.5 transition-colors group"
                >
                  <div className="p-2 rounded-xl bg-white/10 text-white">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <span className="font-racing font-bold text-xs text-white group-hover:text-[#E10600]">
                    GITHUB
                  </span>
                </a>
              </div>

              {/* CV Download */}
              <a
                href={PORTFOLIO_DATA.driver.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.playDRSChime()}
                className="bg-gradient-to-r from-[#1F1522] to-[#141829] border border-[#3E2548] p-3.5 rounded-2xl flex items-center justify-between hover:border-[#00F5D4] transition-colors"
              >
                <div>
                  <span className="font-racing font-bold text-xs text-white block">DOWNLOAD RESUME (PDF)</span>
                  <span className="text-[10px] font-telemetry text-zinc-400">Class of 2027 • Ripun Sethia</span>
                </div>
                <div className="p-2 rounded-xl bg-[#E10600] text-white">
                  <FileDown className="w-4 h-4" />
                </div>
              </a>

            </div>

            {/* Right 7 Cols: Radio Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-[#121626] border border-[#242C4C] rounded-2xl p-8 text-center space-y-3">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 border border-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-racing font-bold text-base text-white">
                    TRANSMISSION SENT TO DRIVER #27!
                  </h4>
                  <p className="text-xs font-telemetry text-zinc-400">
                    Your transmission payload has launched in your email client.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-telemetry text-zinc-400 uppercase mb-1">
                        YOUR CALLSIGN / NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Lead Engineer / Recruiter"
                        className="w-full bg-[#090B13] border border-[#232944] rounded-xl px-3 py-2 text-xs text-white font-telemetry focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-telemetry text-zinc-400 uppercase mb-1">
                        COMMS EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full bg-[#090B13] border border-[#232944] rounded-xl px-3 py-2 text-xs text-white font-telemetry focus:outline-none focus:border-[#00F5D4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-telemetry text-zinc-400 uppercase mb-1">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Engineering Opportunity / Technical Discussion"
                      className="w-full bg-[#090B13] border border-[#232944] rounded-xl px-3 py-2 text-xs text-white font-telemetry focus:outline-none focus:border-[#00F5D4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-telemetry text-zinc-400 uppercase mb-1">
                      TRANSMISSION MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Box this lap! We would love to discuss a role with you..."
                      className="w-full bg-[#090B13] border border-[#232944] rounded-xl p-3 text-xs text-white font-telemetry focus:outline-none focus:border-[#00F5D4] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#E10600] to-[#FF1801] hover:from-[#FF1801] hover:to-[#E10600] text-white font-racing font-extrabold text-xs tracking-wider py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-950/50 active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>BROADCAST TO DRIVER #27</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

