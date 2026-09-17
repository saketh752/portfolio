import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, Terminal, Cpu, Layers, GitBranch, ShieldCheck, Activity } from 'lucide-react';
import { ProjectData } from '../../types';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#040508]/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[88vh] bg-[#0A0C13] border border-white/[0.12] rounded-sm overflow-hidden flex flex-col shadow-2xl z-10 my-auto"
          >
            {/* Top Accent Tension Bar */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent" />

            {/* Modal Header */}
            <div className="relative px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-[#08090E] flex items-center justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                  ENGINEERING CASE STUDY
                </span>
                <span className="hidden sm:inline text-white/20">//</span>
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded-sm bg-crimson/15 border border-crimson/30 font-mono text-[10px] text-crimson-bright font-bold tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-surface-subtle">
                    {project.version}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Direct GitHub Repo + Close */}
              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.06] hover:bg-crimson border border-white/[0.1] hover:border-crimson text-white font-mono text-[11px] font-semibold tracking-wider transition-all duration-300"
                  aria-label="Open GitHub Repository"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span className="hidden sm:inline">VIEW REPO</span>
                  <ExternalLink className="w-3 h-3 text-white/70" />
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-sm text-surface-subtle hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson"
                  aria-label="Close Case Study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body */}
            <div className="px-6 sm:px-10 py-8 overflow-y-auto space-y-10 selection:bg-crimson selection:text-white">
              {/* Project Headline & Core Status */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                  <span className="font-mono text-xs text-surface-muted tracking-widest uppercase">
                    STATUS: <strong className="text-white font-semibold">{project.status}</strong>
                  </span>
                  <span className="text-white/20">//</span>
                  <span className="font-mono text-xs text-crimson font-medium tracking-wider">
                    {project.version}
                  </span>
                </div>
                <h2
                  id="modal-project-title"
                  className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase"
                >
                  {project.title}
                </h2>
                <p className="font-mono text-xs sm:text-sm text-crimson-bright font-medium tracking-wide">
                  {project.tagline}
                </p>
                <div className="h-[1px] w-24 bg-crimson mt-2" />
              </div>

              {/* ============================================================
                  01 — OVERVIEW
                 ============================================================ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>01 // OVERVIEW</span>
                </div>
                <div className="p-6 sm:p-7 rounded-sm bg-[#0E1018] border border-white/[0.06] space-y-4">
                  {project.overview.map((para, idx) => (
                    <p key={idx} className="font-sans text-sm text-surface-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Core Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-sm bg-[#08090E] border border-white/[0.06] hover:border-crimson/40 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-crimson" />
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-surface-subtle leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ============================================================
                  02 — TECHNICAL HIGHLIGHTS
                 ============================================================ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>02 // TECHNICAL ARCHITECTURE</span>
                </div>

                <div className="space-y-3">
                  {project.architectureDetails.map((layer, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-sm bg-[#0E1018] border border-white/[0.06] space-y-1.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-crimson font-bold">
                          0{idx + 1} //
                        </span>
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {layer.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-surface-muted leading-relaxed pl-7">
                        {layer.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Medical Safety Safeguards Stamp */}
                <div className="p-4 rounded-sm bg-[#08090E] border border-crimson/30 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                      MEDICAL SAFETY TRIPWIRE GUARDRAILS
                    </span>
                    <p className="font-sans text-xs text-surface-subtle leading-relaxed">
                      Rule-based and algorithmic interceptors screen for chest pain, acute joint strain, and dangerous exertion markers prior to LLM reasoning, safely directing athletes to medical professionals.
                    </p>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  03 — TECHNOLOGIES
                 ============================================================ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                  <Layers className="w-3.5 h-3.5" />
                  <span>03 // COMPLETE TECHNOLOGY STACK</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.techStackCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-sm bg-[#0E1018] border border-white/[0.06] space-y-2.5"
                    >
                      <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-widest">
                        {cat.layer}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ============================================================
                  04 — VERSION / STATUS
                 ============================================================ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>04 // VERSION & DEVELOPMENT LIFECYCLE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-sm bg-[#0E1018] border border-white/[0.06] space-y-1">
                    <span className="font-mono text-[10px] text-surface-subtle uppercase tracking-wider">
                      ACTIVE RELEASE
                    </span>
                    <p className="font-mono text-base font-bold text-white tracking-wide">
                      {project.version}
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-[#0E1018] border border-white/[0.06] space-y-1">
                    <span className="font-mono text-[10px] text-surface-subtle uppercase tracking-wider">
                      LIFECYCLE STATUS
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
                      <p className="font-mono text-base font-bold text-crimson-bright tracking-wide">
                        {project.status}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-sm bg-[#0E1018] border border-white/[0.06] space-y-1">
                    <span className="font-mono text-[10px] text-surface-subtle uppercase tracking-wider">
                      TEST SUITES
                    </span>
                    <p className="font-mono text-base font-bold text-white tracking-wide">
                      42+ PASSING
                    </p>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  05 — SYSTEM ARCHITECTURE & CORE PIPELINES
                 ============================================================ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                    <span>05 // SYSTEM CAPABILITIES & PIPELINE FLOW</span>
                  </div>
                  <span className="font-mono text-[10px] text-surface-subtle">
                    4 INTEGRATED MODULES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Module 1: Dashboard */}
                  <div className="p-5 rounded-sm bg-[#0E1018] border border-white/[0.06] hover:border-crimson/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                        MODULE 01
                      </span>
                      <span className="font-mono text-[9px] text-surface-subtle">FLUTTER CLIENT</span>
                    </div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      DASHBOARD & ATHLETE FEED
                    </h4>
                    <p className="font-sans text-xs text-surface-muted leading-relaxed">
                      Cross-platform client interface tracking daily workout volume, completion streaks, progressive overload metrics, and dynamic nutrition rings.
                    </p>
                  </div>

                  {/* Module 2: AI Coach */}
                  <div className="p-5 rounded-sm bg-[#0E1018] border border-white/[0.06] hover:border-crimson/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                        MODULE 02
                      </span>
                      <span className="font-mono text-[9px] text-surface-subtle">GROQ LLM</span>
                    </div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      AI COACHING CONVERSATION
                    </h4>
                    <p className="font-sans text-xs text-surface-muted leading-relaxed">
                      Conversational coaching engine powered by Llama 3 via Groq, maintaining multi-turn context with integrated medical risk guardrails.
                    </p>
                  </div>

                  {/* Module 3: Kinematics */}
                  <div className="p-5 rounded-sm bg-[#0E1018] border border-white/[0.06] hover:border-crimson/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                        MODULE 03
                      </span>
                      <span className="font-mono text-[9px] text-surface-subtle">CV KINEMATICS</span>
                    </div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      REAL-TIME POSE FORM SCORING
                    </h4>
                    <p className="font-sans text-xs text-surface-muted leading-relaxed">
                      MediaPipe & OpenCV pipeline tracking sub-degree joint angles, depth cues, repetition counts, and 0–100 form alignment scores.
                    </p>
                  </div>

                  {/* Module 4: Workout Tracker */}
                  <div className="p-5 rounded-sm bg-[#0E1018] border border-white/[0.06] hover:border-crimson/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                        MODULE 04
                      </span>
                      <span className="font-mono text-[9px] text-surface-subtle">SESSION ENGINE</span>
                    </div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      ACTIVE WORKOUT PLAYER
                    </h4>
                    <p className="font-sans text-xs text-surface-muted leading-relaxed">
                      Interactive workout tracker with live set completions, automated rest timers, weight adjustments, and gamified XP progression.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-[#08090E] border border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-surface-subtle">
                  <span>Full repository documentation and architecture specs available in repo /UI&Ux</span>
                  <a
                    href={`${project.githubUrl}/tree/main/UI%26Ux`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-crimson-bright hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>BROWSE REPO ASSETS</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* ============================================================
                  06 — LINKS & REPOSITORY REDIRECTION
                 ============================================================ */}
              <div className="space-y-4 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold tracking-widest uppercase">
                  <span>06 // REPOSITORY & REDIRECTION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Direct GitHub Redirection Button */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-sm bg-[#10121A] hover:bg-crimson border border-crimson/40 hover:border-crimson flex items-center justify-between transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-sm bg-black/40 text-white group-hover:text-white">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-white tracking-wider block">
                          GITHUB REPOSITORY
                        </span>
                        <span className="font-mono text-[11px] text-surface-subtle group-hover:text-white/80 transition-colors">
                          saketh752 / AI_Fitness_Platform
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Deployment Blueprint Link */}
                  <a
                    href={`${project.githubUrl}/blob/main/DEPLOYMENT_GUIDE.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-sm bg-[#0E1018] hover:bg-[#151824] border border-white/[0.08] hover:border-white/[0.2] flex items-center justify-between transition-all duration-300"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-sm bg-white/[0.04] text-white">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-white tracking-wider block">
                          DEPLOYMENT BLUEPRINT
                        </span>
                        <span className="font-mono text-[11px] text-surface-subtle">
                          Docker Compose & Render IaC
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-surface-subtle group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/[0.08] bg-[#08090E] flex items-center justify-between font-mono text-[11px] text-surface-subtle">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span>BUILD → LEARN → EVOLVE</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-sm bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
              >
                CLOSE CASE STUDY
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
