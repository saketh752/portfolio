import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FIELD_LOG_STAGES } from '../../data/portfolioData';

export const FieldLogTimeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredStageNumber, setHoveredStageNumber] = useState<string | null>(null);

  const stageVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <div className="relative max-w-4xl mx-auto pt-4 pb-2">
      {/* Continuous Vertical Tensile Spine */}
      <div
        className="absolute top-3 bottom-6 left-4 sm:left-24 w-[1px] bg-gradient-to-b from-crimson/50 via-white/[0.12] to-crimson pointer-events-none"
        aria-hidden="true"
      />

      <div className="space-y-8 sm:space-y-10">
        {/* Stages 01 to 05 */}
        {FIELD_LOG_STAGES.map((stage, index) => {
          const isHovered = hoveredStageNumber === stage.number;

          return (
            <motion.div
              key={stage.number}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={stageVariants}
              onMouseEnter={() => setHoveredStageNumber(stage.number)}
              onMouseLeave={() => setHoveredStageNumber(null)}
              className="group relative flex items-start"
            >
              {/* Desktop Stage Number (Left of Spine) */}
              <div className="hidden sm:block w-20 text-right pr-6 pt-0.5 shrink-0">
                <span
                  className={`font-mono text-xs font-bold tracking-widest transition-colors duration-200 ${
                    isHovered ? 'text-white' : 'text-crimson'
                  }`}
                >
                  {stage.number}
                </span>
              </div>

              {/* Spine Node */}
              <div className="relative z-10 flex items-center justify-center shrink-0 w-8 h-6 sm:w-8 sm:h-6 -ml-3.5 sm:-ml-4">
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-[#08090E] border-2 transition-all duration-300 flex items-center justify-center ${
                    isHovered
                      ? 'border-crimson shadow-[0_0_12px_#EF233C]'
                      : 'border-white/30 group-hover:border-crimson'
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      isHovered ? 'bg-crimson scale-125' : 'bg-white/50'
                    }`}
                  />
                </div>
              </div>

              {/* Stage Content (Right of Spine) */}
              <div className="pl-4 sm:pl-6 flex-1 min-w-0 transition-transform duration-200 group-hover:translate-x-1">
                {/* Mobile Stage Number Prefix */}
                <div className="sm:hidden font-mono text-[11px] font-bold text-crimson tracking-wider mb-0.5">
                  STAGE {stage.number}
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight uppercase group-hover:text-surface-white transition-colors">
                  {stage.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-surface-subtle leading-relaxed mt-1 max-w-2xl group-hover:text-zinc-300 transition-colors">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Final Marker: Current State // Active Trajectory */}
        <motion.div
          custom={FIELD_LOG_STAGES.length}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={stageVariants}
          className="relative flex items-start pt-2"
        >
          {/* Desktop Left Spacer */}
          <div className="hidden sm:block w-20 text-right pr-6 pt-1 shrink-0">
            <span className="font-mono text-[10px] text-surface-muted tracking-widest uppercase">
              NOW
            </span>
          </div>

          {/* Pulse Anchor Node */}
          <div className="relative z-10 flex items-center justify-center shrink-0 w-8 h-6 sm:w-8 sm:h-6 -ml-3.5 sm:-ml-4">
            <div className="w-4 h-4 rounded-full bg-crimson/20 border-2 border-crimson flex items-center justify-center shadow-[0_0_12px_rgba(239,35,60,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
            </div>
          </div>

          {/* Current State Content */}
          <div className="pl-4 sm:pl-6 flex-1 min-w-0">
            <div className="font-mono text-xs font-bold text-crimson tracking-widest uppercase">
              CURRENT STATE // ACTIVE TRAJECTORY
            </div>
            <div className="font-mono text-xs text-white tracking-wider uppercase font-semibold mt-1">
              BUILDING · LEARNING · LOOKING FOR OPPORTUNITIES
            </div>
            <p className="font-sans text-xs text-surface-muted mt-1 leading-relaxed max-w-xl">
              Continuing to advance technical breadth and architectural depth across working systems.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
