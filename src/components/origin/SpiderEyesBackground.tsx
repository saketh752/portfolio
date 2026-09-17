import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, TargetAndTransition } from 'framer-motion';
import { IntroState } from './OriginIntro';

export type EyeExpression = 'open' | 'squint' | 'blink' | 'wide';

interface SpiderEyesBackgroundProps {
  introState?: IntroState;
  isComplete?: boolean;
}

export const SpiderEyesBackground: React.FC<SpiderEyesBackgroundProps> = ({
  introState = 'initial',
  isComplete = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 3D Mouse Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });

  // Eye Expression State: open, squint, blink, wide
  const [expression, setExpression] = useState<EyeExpression>('open');

  // Scroll visibility: eyes strictly stay on the top theme and vanish on scroll down
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Intro wake-up state
  const isIntroActive = !isComplete && (
    introState === 'swing-down' ||
    introState === 'web-shoot' ||
    introState === 'attached' ||
    introState === 'pulling'
  );

  // 1. Mouse Tracking for 3D Perspective Tilt
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setTargetMouse({ x: nx, y: ny });
    };

    const updateSmoothMouse = () => {
      setMousePos((prev) => {
        const dx = targetMouse.x - prev.x;
        const dy = targetMouse.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animFrame = requestAnimationFrame(updateSmoothMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrame = requestAnimationFrame(updateSmoothMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [targetMouse, shouldReduceMotion]);

  // 2. Autonomous Organic Blinking & Focus Squint Cycle
  useEffect(() => {
    if (shouldReduceMotion || isIntroActive) return;

    let blinkTimeout: ReturnType<typeof setTimeout>;
    let openTimeout: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const scheduleNextBlink = () => {
      // Random interval between 3.2s and 5.5s
      const delay = Math.random() * 2300 + 3200;
      blinkTimeout = setTimeout(() => {
        if (isCancelled) return;

        // Perform Blink: Close -> Open
        setExpression('blink');

        openTimeout = setTimeout(() => {
          if (isCancelled) return;

          // Occasionally do a double-blink (30% probability)
          if (Math.random() < 0.3) {
            setExpression('open');
            setTimeout(() => {
              if (isCancelled) return;
              setExpression('blink');
              setTimeout(() => {
                if (isCancelled) return;
                setExpression('open');
                scheduleNextBlink();
              }, 120);
            }, 90);
          } else {
            setExpression('open');
            scheduleNextBlink();
          }
        }, 130);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isCancelled = true;
      clearTimeout(blinkTimeout);
      clearTimeout(openTimeout);
    };
  }, [shouldReduceMotion, isIntroActive]);

  // 3. User Interaction: Focus squint on rapid mouse move or click
  useEffect(() => {
    if (shouldReduceMotion || isIntroActive) return;

    let squintTimer: ReturnType<typeof setTimeout>;
    const handleAction = () => {
      if (expression === 'blink') return;
      setExpression('squint');
      clearTimeout(squintTimer);
      squintTimer = setTimeout(() => {
        setExpression('open');
      }, 700);
    };

    window.addEventListener('click', handleAction);
    return () => {
      window.removeEventListener('click', handleAction);
      clearTimeout(squintTimer);
    };
  }, [expression, shouldReduceMotion, isIntroActive]);

  // 4. Scroll Tracking: Eyes strictly stay on the top theme and vanish when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade out completely by 280px of scroll
      const progress = Math.min(1, Math.max(0, scrollY / 280));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute Eye Scale and Rotation based on Expression
  const getEyeTransform = useCallback(
    (side: 'left' | 'right'): TargetAndTransition => {
      const isLeft = side === 'left';
      switch (expression) {
        case 'blink':
          // Closed eye: razor thin curved slit
          return {
            scaleY: 0.04,
            scaleX: 1.05,
            rotate: isLeft ? 1 : -1,
            y: 2,
            transition: { duration: 0.09, ease: 'easeIn' },
          };
        case 'squint':
          // Focused sharp comic squint
          return {
            scaleY: 0.55,
            scaleX: 1.04,
            rotate: isLeft ? 3 : -3,
            y: 0,
            transition: { duration: 0.22, ease: 'easeOut' },
          };
        case 'wide':
          // Alert / wide-open
          return {
            scaleY: 1.08,
            scaleX: 1.02,
            rotate: isLeft ? -1 : 1,
            y: -2,
            transition: { duration: 0.25, ease: 'easeOut' },
          };
        case 'open':
        default:
          // Normal open state with spring settle
          return {
            scaleY: 1,
            scaleX: 1,
            rotate: 0,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 18,
              mass: 0.8,
            },
          };
      }
    },
    [expression]
  );

  // If scrolled away, completely hide to free GPU resources
  if (scrollProgress >= 0.99) {
    return null;
  }

  const eyeScrollOpacity = Math.max(0, 1 - scrollProgress * 1.25);
  const eyeScrollY = scrollProgress * -70; // subtle upward drift on scroll

  // 3D Perspective Rotation Angles
  const rotX = -mousePos.y * 14;
  const rotY = mousePos.x * 20;
  const transX = mousePos.x * 18;
  const transY = mousePos.y * 14;

  // Visibility during intro: smoothly reveal as Spider-Man exits
  const eyesIntroOpacity = isIntroActive ? 0 : 1;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      style={{
        perspective: 1200,
        opacity: eyeScrollOpacity,
        transform: `translateY(${eyeScrollY}px)`,
        transition: 'opacity 0.2s ease-out',
      }}
      aria-hidden="true"
    >
      {/* 1. Background Theme: Crimson Hand-Sketched Spider-Web (From Reference Image 1) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate3d(${-transX * 0.35}px, ${-transY * 0.35}px, -40px)`,
        }}
      >
        {/* Subtle Ambient Crimson Radial Glow (Crisp radial gradient, zero blur filter) */}
        <div className="absolute w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-[radial-gradient(circle,rgba(217,4,41,0.12)_0%,rgba(7,8,10,0)_70%)] pointer-events-none" />

        {/* The Authentic Crimson Sketch Web */}
        <div className="relative w-[340px] sm:w-[540px] md:w-[680px] lg:w-[760px] aspect-[736/952] opacity-40 hover:opacity-55 transition-opacity duration-700">
          <img
            src="/spider-web-sketch.png"
            alt="Crimson Spider Web"
            className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(217,4,41,0.4)]"
          />
        </div>
      </motion.div>

      {/* 2. Spider-Man 3D Mask Eyes (Razor-Sharp, Unblurred, Positioned Above Headline) */}
      <motion.div
        initial={{ opacity: isComplete ? 1 : 0 }}
        animate={{ opacity: eyesIntroOpacity }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-x-0 top-16 sm:top-20 md:top-24 flex justify-center pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center gap-3 sm:gap-4 md:gap-6"
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${transX}px, ${transY}px, 20px)`,
            transition: shouldReduceMotion ? 'none' : 'transform 0.08s ease-out',
          }}
        >
          {/* Subtle Mask Edge Accent (Zero blur filter to prevent fuzziness) */}
          <div
            className="absolute -inset-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.25)_0%,transparent_70%)] pointer-events-none transition-opacity duration-300"
            style={{
              opacity: expression === 'blink' ? 0.1 : expression === 'squint' ? 0.6 : 0.4,
            }}
          />

          {/* Left Eye (Clean Transparent PNG from Reference Image 2) */}
          <motion.div
            className="relative w-20 sm:w-24 md:w-32 lg:w-36 aspect-[195/189] will-change-transform"
            style={{
              transformOrigin: '55% 45%', // Natural eyelid shutter center
              transformStyle: 'preserve-3d',
              rotateY: -6, // Subtle convex curvature of mask
            }}
            animate={getEyeTransform('left')}
          >
            <img
              src="/spiderman-eye-left.png"
              alt="Spider-Man Left Eye"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] drop-shadow-[0_0_10px_rgba(217,4,41,0.35)]"
            />
          </motion.div>

          {/* Right Eye (Clean Transparent PNG from Reference Image 2) */}
          <motion.div
            className="relative w-20 sm:w-24 md:w-32 lg:w-36 aspect-[193/189] will-change-transform"
            style={{
              transformOrigin: '45% 45%', // Natural eyelid shutter center
              transformStyle: 'preserve-3d',
              rotateY: 6, // Subtle convex curvature of mask
            }}
            animate={getEyeTransform('right')}
          >
            <img
              src="/spiderman-eye-right.png"
              alt="Spider-Man Right Eye"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] drop-shadow-[0_0_10px_rgba(217,4,41,0.35)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
