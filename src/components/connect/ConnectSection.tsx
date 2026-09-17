import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/profileData';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
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
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const ConnectSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' as const },
    },
  };

  const scrollToProfile = () => {
    const el = document.getElementById('profile');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="connect"
      className="relative w-full py-20 sm:py-28 px-6 bg-obsidian overflow-hidden scroll-mt-20 border-t border-white/[0.04]"
      aria-label="Connect Section"
    >
      {/* Subtle Spider-Man Atmospheric Radial Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="pb-4 border-b border-white/[0.08]"
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              CONNECT
            </h2>
            <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
              09 // 09
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-crimson tracking-widest uppercase font-semibold">
            GET IN TOUCH · OPEN FOR COLLABORATION
          </p>
        </motion.div>

        {/* Main Connect Hub Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeUp}
          className="p-6 sm:p-10 rounded-sm bg-[#0A0C14] border border-white/[0.08] relative space-y-8"
        >
          {/* Tension Corner Accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-crimson/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-crimson/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-crimson/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-crimson/70 pointer-events-none" />

          {/* Intro Statement & Profile Nav CTA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-crimson font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNICATION CHANNEL</span>
            </div>
            <p className="font-sans text-base sm:text-lg text-white font-medium leading-relaxed max-w-3xl">
              Whether you want to discuss software engineering opportunities, backend architectures, potential builds, or just talk tech, feel free to reach out directly.
            </p>

            <div className="pt-1">
              <button
                onClick={scrollToProfile}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/[0.05] hover:bg-white/[0.1] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors border border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-crimson"
                aria-label="View Profile section"
              >
                <span>VIEW PROFILE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-crimson" />
              </button>
            </div>
          </div>

          <div className="border-t border-white/[0.06]" />

          {/* Primary Direct Contact (Email & Phone) */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] text-surface-muted uppercase tracking-wider">
              DIRECT CHANNELS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* EMAIL */}
              <a
                href={`mailto:${PROFILE_DATA.contact.email}`}
                className="group p-4 sm:p-5 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-crimson/50 transition-all duration-200 flex items-center justify-between"
                aria-label={`Send email to ${PROFILE_DATA.contact.email}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-sm bg-black/40 border border-white/[0.06] text-crimson group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-surface-muted uppercase tracking-wider">
                      EMAIL
                    </div>
                    <div className="font-sans text-sm font-semibold text-white group-hover:text-crimson transition-colors truncate">
                      {PROFILE_DATA.contact.email}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-surface-muted group-hover:text-white transition-colors shrink-0 ml-2" />
              </a>

              {/* PHONE */}
              <a
                href={`tel:${PROFILE_DATA.contact.phone}`}
                className="group p-4 sm:p-5 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-crimson/50 transition-all duration-200 flex items-center justify-between"
                aria-label={`Call ${PROFILE_DATA.contact.phone}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 rounded-sm bg-black/40 border border-white/[0.06] text-crimson group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-surface-muted uppercase tracking-wider">
                      PHONE
                    </div>
                    <div className="font-sans text-sm font-semibold text-white group-hover:text-crimson transition-colors truncate">
                      +91 {PROFILE_DATA.contact.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-surface-muted group-hover:text-white transition-colors shrink-0 ml-2" />
              </a>
            </div>
          </div>

          {/* Social & Professional Networks (LinkedIn, GitHub, Instagram) */}
          <div className="space-y-3">
            <div className="font-mono text-[11px] text-surface-muted uppercase tracking-wider">
              NETWORKS & PROFILES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* LINKEDIN */}
              <a
                href={PROFILE_DATA.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.18] transition-all duration-200 flex items-center justify-between"
                aria-label="Visit LinkedIn profile"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-sm bg-black/40 border border-white/[0.06] text-crimson group-hover:text-white transition-colors shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-surface-muted uppercase tracking-wider">
                      LINKEDIN
                    </div>
                    <div className="font-sans text-xs font-semibold text-white group-hover:text-surface-white transition-colors truncate">
                      saketh-yadav
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-surface-muted group-hover:text-white transition-colors shrink-0 ml-1.5" />
              </a>

              {/* GITHUB */}
              <a
                href={PROFILE_DATA.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.18] transition-all duration-200 flex items-center justify-between"
                aria-label="Visit GitHub profile"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-sm bg-black/40 border border-white/[0.06] text-crimson group-hover:text-white transition-colors shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-surface-muted uppercase tracking-wider">
                      GITHUB
                    </div>
                    <div className="font-sans text-xs font-semibold text-white group-hover:text-surface-white transition-colors truncate">
                      saketh752
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-surface-muted group-hover:text-white transition-colors shrink-0 ml-1.5" />
              </a>

              {/* INSTAGRAM */}
              <a
                href={PROFILE_DATA.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.18] transition-all duration-200 flex items-center justify-between"
                aria-label="Visit Instagram profile"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-sm bg-black/40 border border-white/[0.06] text-crimson group-hover:text-white transition-colors shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-surface-muted uppercase tracking-wider">
                      INSTAGRAM
                    </div>
                    <div className="font-sans text-xs font-semibold text-white group-hover:text-surface-white transition-colors truncate">
                      {PROFILE_DATA.contact.instagramHandle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-surface-muted group-hover:text-white transition-colors shrink-0 ml-1.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
