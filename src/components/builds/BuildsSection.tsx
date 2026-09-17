import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProjectShowcase } from './ProjectShowcase';
import { ProjectDetailModal } from './ProjectDetailModal';
import { BUILDS_INTRO, FEATURED_PROJECT } from '../../data/portfolioData';

export const BuildsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

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
      id="builds"
      className="relative min-h-screen w-full py-28 px-6 bg-obsidian overflow-hidden scroll-mt-20"
      aria-label="Builds Section"
    >
      {/* Subtle Spider-Man Atmospheric Depth (Clean radial gradient, zero blur filters) */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Minimal Section Introduction: Simple, Pure, Consistent with ORIGIN & IDENTITY */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="pb-6 border-b border-white/[0.08]"
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              {BUILDS_INTRO.title}
            </h2>
            <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
              {BUILDS_INTRO.sectionCode} // 09
            </span>
          </div>
          <p className="mt-4 font-sans text-sm sm:text-base text-surface-muted max-w-2xl leading-relaxed">
            {BUILDS_INTRO.supportingLine}
          </p>
        </motion.div>

        {/* Centerpiece Single Featured Project Showcase */}
        <ProjectShowcase onOpenDetail={() => setIsDetailOpen(true)} />
      </div>

      {/* Case Study Full Detail Modal */}
      <ProjectDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={FEATURED_PROJECT}
      />
    </section>
  );
};

