import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { WEBLOG_TEASER } from '../../data/portfolioData';
import { JournalReaderModal } from './JournalReaderModal';

export const WeblogSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="weblog"
      className="relative w-full py-20 sm:py-24 px-6 bg-obsidian overflow-hidden scroll-mt-20 border-t border-white/[0.04]"
      aria-label="Weblog Section"
    >
      {/* Subtle Spider-Man Atmospheric Radial Bloom */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="pb-6 border-b border-white/[0.08]"
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              {WEBLOG_TEASER.title}
            </h2>
            <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
              {WEBLOG_TEASER.sectionCode} // 09
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-crimson tracking-widest uppercase font-semibold">
            {WEBLOG_TEASER.tagline}
          </p>
        </motion.div>

        {/* Curiosity Teaser Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeUp}
          className="relative max-w-4xl rounded-sm bg-[#0A0C14] border border-white/[0.08] hover:border-crimson/40 transition-colors duration-300 p-8 sm:p-12 overflow-hidden"
        >
          {/* Spider-Man Corner Tension Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-crimson/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-crimson/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-crimson/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-crimson/70 pointer-events-none" />

          <div className="space-y-8">
            {/* Top Label */}
            <div className="flex items-center gap-2 font-mono text-xs text-crimson font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PERSON BEHIND THE WORK</span>
            </div>

            {/* Exactly Authored Narrative Body */}
            <div className="space-y-4 font-sans text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              {WEBLOG_TEASER.paragraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'font-medium text-white text-lg sm:text-xl' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {/* Curiosity Transition Trigger */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-surface-muted uppercase tracking-widest block font-medium">
                  {WEBLOG_TEASER.curiosityPrompt}
                </span>
                <p className="font-mono text-xs text-surface-subtle">
                  7 chapters · Origins, building, photography, lifting, and aspirations
                </p>
              </div>

              <button
                onClick={() => setIsJournalOpen(true)}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-sm bg-crimson hover:bg-crimson-hover text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-lg shadow-crimson/20 hover:shadow-crimson/40 focus:outline-none focus:ring-2 focus:ring-crimson shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>{WEBLOG_TEASER.actionLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dedicated Journal Layer Modal */}
      <JournalReaderModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
      />
    </section>
  );
};

