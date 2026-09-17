import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FieldLogTimeline } from './FieldLogTimeline';
import { FIELD_LOG_INTRO } from '../../data/portfolioData';

export const FieldLogSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="field-log"
      className="relative w-full py-20 sm:py-24 px-6 bg-obsidian overflow-hidden scroll-mt-20 border-t border-white/[0.04]"
      aria-label="Field Log Section"
    >
      {/* Subtle Spider-Man Atmospheric Radial Bloom */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.05)_0%,transparent_70%)] pointer-events-none" />

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
              {FIELD_LOG_INTRO.title}
            </h2>
            <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
              {FIELD_LOG_INTRO.sectionCode} // 09
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-crimson tracking-widest uppercase font-semibold">
            {FIELD_LOG_INTRO.tagline}
          </p>
        </motion.div>

        {/* Positioning Statement Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeUp}
          className="p-6 sm:p-7 rounded-sm bg-[#0A0C14] border border-white/[0.08] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-crimson" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-widest block">
                HANDS-ON TRAJECTORY // ENGINEERING EVOLUTION
              </span>
              <p className="font-sans text-sm sm:text-base text-white/95 font-medium leading-relaxed">
                "{FIELD_LOG_INTRO.statement}"
              </p>
              <p className="font-sans text-xs text-surface-muted leading-relaxed">
                These stages represent areas of hands-on technical development and increasing system complexity rather than chronological employment history.
              </p>
            </div>
            <div className="font-mono text-[11px] text-surface-subtle shrink-0 border-l border-white/[0.06] pl-4 sm:pl-6 space-y-1 hidden lg:block">
              <div>AREAS OF DEVELOPMENT</div>
              <div>SYSTEMS COMPLEXITY</div>
              <div className="text-crimson font-semibold">HANDS-ON LEARNING</div>
            </div>
          </div>
        </motion.div>

        {/* Continuous Engineering Evolution Timeline along Tensile Spine */}
        <FieldLogTimeline />
      </div>
    </section>
  );
};
