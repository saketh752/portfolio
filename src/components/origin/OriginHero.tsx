import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SpiderEyesBackground } from './SpiderEyesBackground';
import { OriginIntro, IntroState } from './OriginIntro';
import { PERSONAL_DATA } from '../../data/portfolioData';

export const OriginHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [introState, setIntroState] = useState<IntroState>(() => {
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem('saketh_portfolio_intro_seen');
      const isReplay = window.location.search.includes('replay=true');
      if (hasSeen && !isReplay) return 'complete';
    }
    return 'initial';
  });

  const [pullProgress, setPullProgress] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem('saketh_portfolio_intro_seen');
      const isReplay = window.location.search.includes('replay=true');
      if (hasSeen && !isReplay) return 1;
    }
    return 0;
  });

  const isComplete = introState === 'complete';
  const textOffsetY = isComplete || shouldReduceMotion ? 0 : (1 - pullProgress) * 280;
  const textOpacity = isComplete || shouldReduceMotion ? 1 : Math.max(0.15, pullProgress);

  const handleScrollClick = () => {
    const nextSection = document.getElementById('identity');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="origin"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 pt-28 pb-12 overflow-hidden bg-obsidian select-none"
      aria-label="Origin Hero"
    >
      {/* 1. Background Theme: Crimson Hand-Sketched Web + 3D Spider-Man Mask Eyes (Unblurred, Top Section Only) */}
      <SpiderEyesBackground introState={introState} isComplete={isComplete} />

      {/* 2. Spider-Man Hanging from Ceiling Hoisting the Text */}
      <OriginIntro
        onStateChange={(state) => setIntroState(state)}
        onPullProgress={(p) => setPullProgress(p)}
        onComplete={() => {
          setIntroState('complete');
          setPullProgress(1);
        }}
      />

      {/* Top Spacer / Subtle Origin Pip */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-surface-subtle opacity-70">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span className="tracking-widest uppercase text-[10px]">ORIGIN</span>
        </div>
        <div className="text-[10px] tracking-widest text-surface-muted hidden sm:block">
          {PERSONAL_DATA.philosophy}
        </div>
      </div>

      {/* 3. Central Dominant Identity Canvas (Hoisted from Below by the Web) */}
      <div
        style={{
          transform: `translateY(${textOffsetY}px)`,
          opacity: textOpacity,
          transition: introState === 'rebound' || isComplete ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease' : 'none',
        }}
        className="relative z-20 my-auto w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4 will-change-transform mt-20 sm:mt-24 md:mt-28"
      >
        {/* Subtle Web Line Accent */}
        <div className="relative flex items-center justify-center w-full max-w-xs mb-8">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
          <div className="absolute w-2 h-2 rotate-45 border border-crimson-bright bg-obsidian" />
        </div>

        {/* Primary Dominant Typography: SAKETH YADAV */}
        <div className="relative group cursor-default">
          {/* Faint Crimson Ambient Aura (Zero blur filter, pure clean gradient) */}
          <div
            className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.12)_0%,transparent_70%)] opacity-70 pointer-events-none"
            aria-hidden="true"
          />

          <h1 className="relative font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.88] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)]">
            <span className="inline-block tracking-tight text-white hover:text-surface-white transition-colors spider-headline">
              SAKETH
            </span>
            <span className="mx-2 sm:mx-4 text-crimson font-light select-none">
              ·
            </span>
            <span className="inline-block tracking-tight text-white hover:text-surface-white transition-colors spider-headline">
              YADAV
            </span>
          </h1>
        </div>

        {/* Secondary Visual Element: DEVELOPER */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative inline-flex items-center">
            <h2 className="font-mono text-xs sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.5em] text-crimson-bright uppercase font-bold px-6 py-2 rounded-sm bg-obsidian-secondary/90 border border-crimson/40 shadow-crimson-glow">
              {PERSONAL_DATA.primaryTitle}
            </h2>
          </div>

          <p className="mt-4 font-mono text-[11px] sm:text-xs text-surface-muted tracking-widest max-w-sm mx-auto uppercase">
            B.Tech / Computer Science & Engineering
          </p>
        </div>

        {/* Philosophy Stamp */}
        <div className="mt-7 inline-flex items-center gap-2.5 px-3.5 py-1 rounded-sm bg-[#0E1015]/90 border border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-surface-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span className="tracking-wider">{PERSONAL_DATA.philosophy}</span>
        </div>
      </div>

      {/* 4. Minimal Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center pt-6"
      >
        <button
          onClick={handleScrollClick}
          className="group flex flex-col items-center text-surface-subtle hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson"
          aria-label="Scroll to discover portfolio"
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-surface-subtle group-hover:text-crimson-bright transition-colors">
            SCROLL TO DISCOVER
          </span>
          <div className="mt-2.5 w-[1px] h-8 bg-gradient-to-b from-crimson via-crimson/50 to-transparent flex items-start justify-center overflow-hidden">
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 24, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-crimson-bright"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
