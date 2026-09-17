import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ToolkitCanvas } from './ToolkitCanvas';
import { TOOLKIT_INTRO } from '../../data/portfolioData';

export const ToolkitSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="toolkit"
      className="relative min-h-screen w-full py-28 px-6 bg-obsidian overflow-hidden scroll-mt-20"
      aria-label="Toolkit Section"
    >
      {/* Subtle Spider-Man Atmospheric Radial Bloom (Zero blur filters) */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Consistent Section Header (Matches ORIGIN, IDENTITY, BUILDS) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="pb-6 border-b border-white/[0.08]"
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              {TOOLKIT_INTRO.title}
            </h2>
            <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
              {TOOLKIT_INTRO.sectionCode} // 09
            </span>
          </div>
          <p className="mt-4 font-sans text-sm sm:text-base text-surface-muted max-w-2xl leading-relaxed">
            {TOOLKIT_INTRO.supportingLine}
          </p>
        </motion.div>

        {/* Dynamic Asymmetric Constellation & Mobile Tensile Spine */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
        >
          <ToolkitCanvas />
        </motion.div>

        {/* Minimal Engineering Philosophy Footer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-surface-subtle"
        >
          <div className="flex items-center gap-2">
            <span className="text-crimson font-bold">TOOLKIT DISCIPLINE //</span>
            <span>NO ARBITRARY RATINGS · ONLY VERIFIED WORKING TOOLS</span>
          </div>
          <div className="text-surface-muted">
            EVOLVING REPERTOIRE THROUGH ACTIVE IMPLEMENTATION
          </div>
        </motion.div>
      </div>
    </section>
  );
};

