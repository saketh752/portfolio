import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type IntroState =
  | 'initial'
  | 'swing-down'
  | 'web-shoot'
  | 'attached'
  | 'pulling'
  | 'rebound'
  | 'exit'
  | 'complete';

interface OriginIntroProps {
  onStateChange: (state: IntroState) => void;
  onComplete: () => void;
  onPullProgress?: (progress: number) => void; // 0 = submerged/down, 1 = fully hoisted to center
}

export const OriginIntro: React.FC<OriginIntroProps> = ({
  onStateChange,
  onComplete,
  onPullProgress,
}) => {
  const [state, setState] = useState<IntroState>('initial');
  const [pullProgress, setPullProgress] = useState<number>(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for reduced motion or query param replay
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReplay = window.location.search.includes('replay=true');
    const hasSeen = sessionStorage.getItem('saketh_portfolio_intro_seen');

    if (prefersReducedMotion || (hasSeen && !isReplay)) {
      setState('complete');
      onStateChange('complete');
      setPullProgress(1);
      onPullProgress?.(1);
      onComplete();
      return;
    }

    // Sequence timeline:
    // 0.00s: initial (ready off-screen above ceiling)
    // 0.18s: swing-down (Spider-Man drops from ceiling on suspension silk thread)
    // 0.70s: web-shoot (Shoots ONE single realistic web line straight down to text)
    // 1.05s: attached (Web splay locks onto center of text block, hand grips line)
    // 1.25s: pulling (Hand actively flexes and hauls single web line upward in 3D)
    // 2.05s: rebound (Text reaches center with natural elastic settle, hand relaxes)
    // 2.35s: exit (Spider-Man lets go and zips up through ceiling)
    // 2.95s: complete
    const t0 = setTimeout(() => {
      setState('swing-down');
      onStateChange('swing-down');
    }, 180);

    const t1 = setTimeout(() => {
      setState('web-shoot');
      onStateChange('web-shoot');
    }, 700);

    const t2 = setTimeout(() => {
      setState('attached');
      onStateChange('attached');
    }, 1050);

    const t3 = setTimeout(() => {
      setState('pulling');
      onStateChange('pulling');
    }, 1250);

    let pullStart: number | null = null;
    let animId: number;
    const animatePull = (timestamp: number) => {
      if (!pullStart) pullStart = timestamp;
      const elapsed = timestamp - pullStart;
      const duration = 800;
      const p = Math.min(1, elapsed / duration);
      // Realistic elastic friction curve
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setPullProgress(ease);
      onPullProgress?.(ease);

      if (p < 1) {
        animId = requestAnimationFrame(animatePull);
      }
    };

    const tPullAnim = setTimeout(() => {
      animId = requestAnimationFrame(animatePull);
    }, 1250);

    const t4 = setTimeout(() => {
      setState('rebound');
      onStateChange('rebound');
      setPullProgress(1);
      onPullProgress?.(1);
    }, 2050);

    const t5 = setTimeout(() => {
      setState('exit');
      onStateChange('exit');
    }, 2350);

    const t6 = setTimeout(() => {
      setState('complete');
      onStateChange('complete');
      sessionStorage.setItem('saketh_portfolio_intro_seen', 'true');
      onComplete();
    }, 2950);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tPullAnim);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleSkip = () => {
    setState('complete');
    onStateChange('complete');
    setPullProgress(1);
    onPullProgress?.(1);
    sessionStorage.setItem('saketh_portfolio_intro_seen', 'true');
    onComplete();
  };

  if (state === 'complete') {
    return null;
  }

  const isMobile = windowSize.width < 768;

  // Spider-Man dimensions & coordinates
  const spideyWidth = isMobile ? 88 : 130;
  const spideyHeight = spideyWidth * 1.9877; // 407x809 ratio
  const spideyCenterX = windowSize.width * 0.5;

  // 3D Physical recoil and suspension heave of Spider-Man's intact body
  const heaveY =
    state === 'pulling'
      ? Math.sin(pullProgress * Math.PI * 3) * (isMobile ? 4 : 7)
      : 0;

  const bodyRotateX =
    state === 'pulling'
      ? -Math.sin(pullProgress * Math.PI) * 5
      : 0;

  const bodyRotateY =
    state === 'pulling'
      ? Math.sin(pullProgress * Math.PI) * 2.5
      : 0;

  const bodyScale =
    state === 'pulling'
      ? 1 + Math.sin(pullProgress * Math.PI) * 0.02
      : 1;

  const spideyHangY = (isMobile ? 32 : 45) + heaveY;

  // Hand 3D pulling motion (flexion, heave upward along forearm, 3D perspective depth)
  const pullPhase = state === 'pulling' ? pullProgress : state === 'rebound' ? 1 : 0;
  const pullHandY =
    state === 'pulling'
      ? -Math.sin(pullPhase * Math.PI * 0.85) * (isMobile ? 18 : 26)
      : 0;

  const pullHandX =
    state === 'pulling'
      ? -Math.sin(pullPhase * Math.PI * 0.85) * (isMobile ? 4 : 7)
      : 0;

  const pullHandZ =
    state === 'pulling'
      ? Math.sin(pullPhase * Math.PI * 0.85) * 16
      : 0;

  const wristFlexAngle =
    state === 'pulling'
      ? -Math.sin(pullPhase * Math.PI * 0.85) * 18
      : state === 'rebound'
      ? -4
      : 0;

  // Fist / hand coordinates on character
  const fistOriginRelX = spideyWidth * 0.7617 + spideyWidth * 0.1892 * 0.5;
  const fistOriginRelY = spideyHeight * 0.7837 + spideyHeight * 0.1236 * 0.9;

  const isFistState = state === 'attached' || state === 'pulling' || state === 'rebound';

  // Dynamic hand anchor point where web cord originates
  const handX = isFistState
    ? spideyCenterX - spideyWidth / 2 + fistOriginRelX + pullHandX
    : spideyCenterX - spideyWidth / 2 + spideyWidth * 0.82;

  const handY = isFistState
    ? spideyHangY + fistOriginRelY + pullHandY
    : spideyHangY + spideyHeight * 0.82;

  // Single web line target: Center top of SAKETH YADAV text
  const targetAnchorY = windowSize.height * (isMobile ? 0.45 : 0.42);
  const initialAnchorY = targetAnchorY + (isMobile ? 220 : 280);
  const currentAnchorY = initialAnchorY - (initialAnchorY - targetAnchorY) * pullProgress;
  const textAnchorX = spideyCenterX;

  // Dynamic tensile catenary curve for the single web strand
  const dynamicTension =
    state === 'pulling'
      ? Math.sin(pullProgress * Math.PI * 6) * 6
      : 18;

  const midX = (handX + textAnchorX) / 2 + dynamicTension;
  const midY = (handY + currentAnchorY) / 2;

  const singleWebPath = `M ${handX} ${handY} Q ${midX} ${midY} ${textAnchorX} ${currentAnchorY}`;

  // Spiral micro-thread wound around the vertical ceiling line
  const generateSpiralThread = (startY: number, endY: number, centerX: number, amplitude: number, frequency: number) => {
    let d = `M ${centerX} ${startY}`;
    const steps = Math.floor((endY - startY) / 12);
    for (let i = 1; i <= steps; i++) {
      const y = startY + (i / steps) * (endY - startY);
      const x = centerX + Math.sin(i * frequency) * amplitude;
      d += ` L ${x} ${y}`;
    }
    return d;
  };

  const ceilingSpiral = generateSpiralThread(0, spideyHangY + 8, spideyCenterX, 3.5, 0.9);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="pointer-events-auto absolute top-6 right-6 z-50 px-3 py-1.5 rounded-sm bg-[#0E1015]/90 border border-white/10 hover:border-crimson text-surface-muted hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors"
        aria-label="Skip intro"
      >
        [ SKIP INTRO ]
      </button>

      {/* SVG Canvas for Single Realistic Web Strand & Ceiling Suspension */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="realSilk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#E2E8F0" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#F8FAFC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EF233C" stopOpacity="0.7" />
          </linearGradient>

          <filter id="silkGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Suspension Web Thread from Ceiling to Spider-Man */}
        {state !== 'initial' && state !== 'exit' && (
          <g>
            <line
              x1={spideyCenterX}
              y1={0}
              x2={spideyCenterX}
              y2={spideyHangY + 8}
              stroke="#D90429"
              strokeWidth="3.5"
              strokeOpacity="0.4"
            />
            <line
              x1={spideyCenterX}
              y1={0}
              x2={spideyCenterX}
              y2={spideyHangY + 8}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={ceilingSpiral}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.85"
            />
          </g>
        )}

        {/* 2. EXACTLY ONE REALISTIC WEB LINE PULLING THE TEXT */}
        {(state === 'web-shoot' ||
          state === 'attached' ||
          state === 'pulling' ||
          state === 'rebound') && (
          <g filter="url(#silkGlowEffect)">
            {/* Outer crimson tensile aura */}
            <motion.path
              d={singleWebPath}
              fill="none"
              stroke="#D90429"
              strokeWidth={state === 'pulling' ? 5 : 3.5}
              strokeOpacity={0.6}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            {/* Main high-tensile braided pearlescent silk cord */}
            <motion.path
              d={singleWebPath}
              fill="none"
              stroke="url(#realSilk)"
              strokeWidth={state === 'pulling' ? 2.8 : 2.2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            {/* Spiral secondary micro-filament wrapped along the single web line */}
            <motion.path
              d={`M ${handX} ${handY} Q ${midX - 6} ${midY - 8} ${textAnchorX} ${currentAnchorY}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.1"
              strokeOpacity="0.85"
              strokeDasharray="6 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </g>
        )}
      </svg>

      {/* 3. Single Centered Authentic Web Splay Gripping the Text */}
      {(state === 'attached' || state === 'pulling' || state === 'rebound') && (
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.22, ease: 'backOut' }}
          style={{
            position: 'absolute',
            left: textAnchorX - 75,
            top: currentAnchorY - 85,
            width: 150,
            height: 180,
            pointerEvents: 'none',
            transform: 'rotate(-45deg)', // centered web fan splaying out over SAKETH YADAV
          }}
        >
          <img
            src="/spiderman-web-splay.png"
            alt="Web Splay Anchor"
            className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]"
          />
        </motion.div>
      )}

      {/* 4. Realistic Spider-Man (100% Solid Body + 3D Pulling Hand Only) */}
      <AnimatePresence>
        {state !== 'initial' && state !== 'exit' && (
          <motion.div
            style={{
              position: 'absolute',
              left: spideyCenterX - spideyWidth / 2,
              top: 0,
              width: spideyWidth,
              height: spideyHeight,
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
            initial={{ y: -spideyHeight - 80 }}
            animate={{
              y: spideyHangY,
              rotateX: bodyRotateX,
              rotateY: bodyRotateY,
              scale: bodyScale,
              transition: {
                y: {
                  type: 'spring',
                  stiffness: 170,
                  damping: 15,
                  mass: 1.1,
                },
                rotateX: { duration: 0.1 },
                rotateY: { duration: 0.1 },
                scale: { duration: 0.1 },
              },
            }}
            exit={{
              y: -spideyHeight - 160,
              transition: { duration: 0.45, ease: [0.36, 0, 0.66, -0.05] },
            }}
            className="pointer-events-none select-none relative"
          >
            {/* Spider-Man 100% Solid Intact Body (Head, Torso, Legs, Shoulders, Forearms) */}
            <img
              src="/spiderman-body.png"
              alt="Spider-Man"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(217,4,41,0.5)] pointer-events-none"
            />

            {/* State A: Open Hand Shooting Web (Smooth Wrist Cuff Attachment) */}
            {!isFistState && (
              <div
                style={{
                  position: 'absolute',
                  left: '65.11%',
                  top: '80.59%',
                  width: '25.80%',
                  height: '13.10%',
                }}
                className="pointer-events-none select-none"
              >
                <img
                  src="/spiderman-hand-open.png"
                  alt="Spider-Man Open Hand"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(217,4,41,0.4)]"
                />

                {/* Web Shooter Flash on Wrist When Firing */}
                {state === 'web-shoot' && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '60%',
                      top: '20%',
                    }}
                    className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_#FFFFFF] animate-ping"
                  />
                )}
              </div>
            )}

            {/* State B: Clenched Gripping Fist with 3D Pulling Heave */}
            {isFistState && (
              <div
                style={{
                  position: 'absolute',
                  left: '76.17%',
                  top: '78.37%',
                  width: '18.92%',
                  height: '12.36%',
                  transformOrigin: '22% 16%', // Wrist joint rotation pivot
                  transform: `perspective(600px) translate3d(${pullHandX}px, ${pullHandY}px, ${pullHandZ}px) rotate3d(0.8, -0.3, 0.4, ${wristFlexAngle}deg)`,
                  transition: state === 'pulling' ? 'none' : 'transform 0.25s ease-out',
                }}
                className="pointer-events-none select-none"
              >
                <img
                  src="/spiderman-hand-fist.png"
                  alt="Spider-Man Pulling Fist"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(217,4,41,0.5)]"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
