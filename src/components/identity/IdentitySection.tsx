import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { IDENTITY_DIMENSIONS } from '../../data/portfolioData';

export const IdentitySection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const developer = IDENTITY_DIMENSIONS.find((d) => d.id === 'developer')!;
  const editor = IDENTITY_DIMENSIONS.find((d) => d.id === 'editor')!;
  const powerlifter = IDENTITY_DIMENSIONS.find((d) => d.id === 'powerlifter')!;

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
      id="identity"
      className="relative min-h-screen w-full py-28 px-6 bg-obsidian overflow-hidden"
      aria-label="Identity Section"
    >
      {/* Subtle Spider-Man Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-crimson/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Minimal Section Introduction: Simple, Pure, Unforced */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-16 pb-4 border-b border-white/[0.08] flex items-baseline justify-between"
        >
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
            IDENTITY
          </h2>
          <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
            02 // 09
          </span>
        </motion.div>

        {/* Connected Composition */}
        <div className="relative space-y-12">
          {/* Thin Web Structure Physically Connecting Developer to Editor and Powerlifter */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {/* Central web node anchored at bottom of Developer */}
              <circle cx="500" cy="320" r="3" fill="#D90429" vectorEffect="non-scaling-stroke" />
              {/* Filament stretching to Editor */}
              <path
                d="M 500 320 Q 350 360 250 420"
                fill="none"
                stroke="rgba(217, 4, 41, 0.2)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Filament stretching to Powerlifter */}
              <path
                d="M 500 320 Q 650 360 750 420"
                fill="none"
                stroke="rgba(217, 4, 41, 0.2)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Cross connection filament between Editor and Powerlifter */}
              <path
                d="M 250 420 Q 500 450 750 420"
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="1"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="250" cy="420" r="2.5" fill="#EF233C" vectorEffect="non-scaling-stroke" />
              <circle cx="750" cy="420" r="2.5" fill="#EF233C" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* ============================================================
              01 — DEVELOPER (Dominant Editorial Canvas)
             ============================================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="group relative rounded-sm bg-[#0A0C11] border border-white/[0.08] hover:border-crimson/40 p-8 sm:p-12 lg:p-16 transition-all duration-300 shadow-2xl"
          >
            {/* Subtle Crimson Left Edge */}
            <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-crimson" />

            {/* Header / Number */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm sm:text-base text-crimson font-bold tracking-widest">
                  01 — DEVELOPER
                </span>
                <span className="text-surface-subtle text-xs font-mono hidden sm:inline">
                  // CORE
                </span>
              </div>

              <div className="font-mono text-xs text-surface-white font-medium tracking-wider px-3 py-1 bg-[#12151E] border border-crimson/30 rounded-sm">
                BUILD → LEARN → EVOLVE
              </div>
            </div>

            {/* Generous Prose Layout with Typographic Rhythm */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Opening Principle */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
                  I don't just build projects to have something to put on GitHub.
                </h3>
                <p className="font-sans text-sm sm:text-base text-surface-muted leading-relaxed">
                  {developer.paragraphs[1]}
                </p>
              </div>

              {/* Right Column: Progressive Evolution */}
              <div className="lg:col-span-6 space-y-5 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed lg:pl-8 lg:border-l border-white/[0.06]">
                <p>{developer.paragraphs[2]}</p>
                <p>{developer.paragraphs[3]}</p>
                <p className="text-white font-medium text-base sm:text-lg">
                  {developer.paragraphs[4]}
                </p>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="font-mono text-sm sm:text-base text-crimson-bright font-semibold tracking-wide">
                    "{developer.paragraphs[5]}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
              02 & 03: EDITOR & POWERLIFTER (Connected Sub-Layers)
             ============================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* ----------------------------------------------------------
                02 — EDITOR (Creative Perspective)
               ---------------------------------------------------------- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="group relative rounded-sm bg-[#0A0C11] border border-white/[0.06] hover:border-white/20 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                  <span className="font-mono text-xs sm:text-sm text-white font-bold tracking-widest">
                    02 — EDITOR
                  </span>
                  <span className="font-mono text-[11px] text-surface-subtle uppercase">
                    CREATIVE VISION
                  </span>
                </div>

                {/* Editor Content */}
                <div className="space-y-4 font-sans text-xs sm:text-sm text-surface-muted leading-relaxed mb-6">
                  <p className="text-white font-medium text-sm sm:text-base font-display">
                    {editor.paragraphs[0]}
                  </p>
                  <p>{editor.paragraphs[1]}</p>
                  <p>{editor.paragraphs[2]}</p>
                  <p>{editor.paragraphs[3]}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06]">
                <p className="font-sans text-xs sm:text-sm text-zinc-200 italic leading-relaxed">
                  "{editor.paragraphs[4]}"
                </p>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------
                03 — POWERLIFTER (Discipline & Progression)
               ---------------------------------------------------------- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="group relative rounded-sm bg-[#0A0C11] border border-white/[0.06] hover:border-crimson/40 p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
                  <span className="font-mono text-xs sm:text-sm text-crimson font-bold tracking-widest">
                    03 — POWERLIFTER
                  </span>
                  <span className="font-mono text-[11px] text-surface-subtle uppercase">
                    DISCIPLINE
                  </span>
                </div>

                {/* Powerlifter Content */}
                <div className="space-y-4 font-sans text-xs sm:text-sm text-surface-muted leading-relaxed mb-6">
                  <p className="text-white font-medium text-sm sm:text-base font-display">
                    {powerlifter.paragraphs[0]}
                  </p>
                  <p>{powerlifter.paragraphs[1]}</p>
                  <p>{powerlifter.paragraphs[2]}</p>

                  {/* Visual Emphasis on DISTRICT GOLD & STATE SILVER */}
                  <div className="my-6 grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-sm bg-[#10131B] border border-amber-500/30">
                      <span className="font-display font-black text-sm text-white tracking-wider block">
                        DISTRICT GOLD
                      </span>
                      <span className="font-mono text-[10px] text-amber-400/90 tracking-widest uppercase">
                        Powerlifting
                      </span>
                    </div>

                    <div className="p-3.5 rounded-sm bg-[#10131B] border border-slate-400/30">
                      <span className="font-display font-black text-sm text-white tracking-wider block">
                        STATE SILVER
                      </span>
                      <span className="font-mono text-[10px] text-slate-300/90 tracking-widest uppercase">
                        Powerlifting
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06]">
                <p className="font-mono text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                  "{powerlifter.paragraphs[4]}"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
