import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profileData';
import { ResumeViewerModal } from './ResumeViewerModal';

export const ProfileSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="profile"
      className="relative w-full py-16 sm:py-20 px-6 bg-obsidian overflow-hidden scroll-mt-20 border-t border-white/[0.04]"
      aria-label="Profile Section"
    >
      {/* Subtle Spider-Man Atmospheric Radial Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="pb-4 border-b border-white/[0.08]"
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              {PROFILE_DATA.title}
            </h2>
            <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
              {PROFILE_DATA.sectionCode} // 09
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-crimson tracking-widest uppercase font-semibold">
            {PROFILE_DATA.supportingLabel}
          </p>
        </motion.div>

        {/* Minimal Profile & Resume Action Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeUp}
          className="p-6 sm:p-8 rounded-sm bg-[#0A0C14] border border-white/[0.08] relative space-y-6"
        >
          {/* Tension Corner Accents */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-crimson/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-crimson/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-crimson/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-crimson/70 pointer-events-none" />

          {/* Top Row: Snapshot Info & Status */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                  {PROFILE_DATA.name}
                </h3>
              </div>
              <p className="font-mono text-xs text-surface-subtle">
                B.Tech, Computer Science & Engineering · KL University
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] text-crimson shrink-0 self-start">
              <span>{PROFILE_DATA.currentStatus}</span>
            </div>
          </div>

          {/* Minimal Narrative Statement */}
          <p className="font-sans text-sm sm:text-base text-surface-subtle leading-relaxed max-w-3xl">
            {PROFILE_DATA.intro.primary}{' '}
            All comprehensive academic records, verified coursework, technical proficiencies, certifications, and project histories are cataloged in the official master resume.
          </p>

          {/* Quick Focus Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {PROFILE_DATA.focusAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xs bg-white/[0.04] border border-white/[0.06] font-mono text-[11px] text-white/90"
              >
                {area}
              </span>
            ))}
          </div>

          {/* Dual Resume Actions: Download + View */}
          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-surface-muted">
              <FileText className="w-4 h-4 text-crimson" />
              <span>{PROFILE_DATA.resume.filename}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PROFILE_DATA.resume.downloadUrl}
                download={PROFILE_DATA.resume.filename}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-crimson hover:bg-crimson-hover text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-crimson/20 focus:outline-none focus:ring-1 focus:ring-crimson"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.1] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors border border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-crimson"
              >
                <Eye className="w-4 h-4 text-surface-subtle" />
                <span>VIEW RESUME</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Embedded Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
};
