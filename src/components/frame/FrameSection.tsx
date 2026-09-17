import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FRAME_INTRO, FRAME_PHOTOS } from '../../data/portfolioData';
import { PhotoCard } from './PhotoCard';
import { PhotoLightbox } from './PhotoLightbox';
import { FramePhotoItem } from '../../types';

export const FrameSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedPhoto, setSelectedPhoto] = useState<FramePhotoItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < FRAME_PHOTOS.length) {
      setSelectedPhoto(FRAME_PHOTOS[index]);
    }
  };

  return (
    <section
      id="the-frame"
      className="relative w-full py-16 sm:py-20 px-6 bg-obsidian overflow-hidden scroll-mt-20 border-t border-white/[0.04]"
      aria-label="The Frame Section"
    >
      {/* Subtle Spider-Man Atmospheric Radial Bloom */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Compact Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]"
        >
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                {FRAME_INTRO.title}
              </h2>
              <span className="font-mono text-xs text-crimson tracking-widest font-semibold">
                {FRAME_INTRO.sectionCode} // 09
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-crimson tracking-widest uppercase font-semibold">
              {FRAME_INTRO.tagline}
            </p>
          </div>

          {/* Filmstrip Controls */}
          <div className="flex items-center gap-3 font-mono text-xs text-surface-subtle">
            <span className="hidden sm:inline text-[11px] text-surface-muted">
              09 FRAMES · SIDE-BY-SIDE
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                className="p-2 rounded-sm bg-[#0A0C14] hover:bg-crimson text-surface-subtle hover:text-white border border-white/[0.08] hover:border-crimson transition-colors focus:outline-none focus:ring-1 focus:ring-crimson"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-2 rounded-sm bg-[#0A0C14] hover:bg-crimson text-surface-subtle hover:text-white border border-white/[0.08] hover:border-crimson transition-colors focus:outline-none focus:ring-1 focus:ring-crimson"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Minimal Compact Philosophy Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeUp}
          className="p-3.5 sm:p-4 rounded-sm bg-[#0A0C14] border border-white/[0.06] relative flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-crimson" />
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson shrink-0" />
            <p className="font-sans text-xs sm:text-sm text-white/90 italic font-medium">
              "{FRAME_INTRO.philosophy}"
            </p>
          </div>
          <div className="font-mono text-[10px] text-surface-subtle shrink-0 flex items-center gap-2 pl-4 sm:pl-0 border-t sm:border-t-0 border-white/[0.04] pt-2 sm:pt-0">
            <span className="text-crimson font-semibold">ADOBE LIGHTROOM</span>
            <span>·</span>
            <span>9 AUTHENTIC CAPTURES</span>
          </div>
        </motion.div>

        {/* Side-by-Side Horizontal Scroll Filmstrip */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scroll-smooth focus:outline-none"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(217, 4, 41, 0.4) transparent',
            }}
          >
            {FRAME_PHOTOS.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onSelect={setSelectedPhoto}
                index={index}
              />
            ))}
          </div>

          {/* Minimal Drag / Navigation Cue */}
          <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-surface-muted">
            <span>[ ← SCROLL / DRAG HORIZONTALLY ]</span>
            <span>[ CLICK ANY PHOTO TO EXPAND FULLSCREEN ↗ ]</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        allPhotos={FRAME_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
};
