import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { FramePhotoItem } from '../../types';

interface PhotoLightboxProps {
  photo: FramePhotoItem | null;
  allPhotos: FramePhotoItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  allPhotos,
  onClose,
  onNavigate,
}) => {
  const currentIndex = photo ? allPhotos.findIndex((p) => p.id === photo.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(allPhotos.length - 1);
    }
  }, [currentIndex, allPhotos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < allPhotos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, allPhotos.length, onNavigate]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!photo) return;

    // Prevent background scrolling while modal is active
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, handlePrev, handleNext]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={`Lightbox view: ${photo.title}`}
      >
        {/* Top Control Bar */}
        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/[0.08] bg-obsidian/80 z-20">
          <div className="flex items-center gap-3 font-mono text-xs text-surface-subtle">
            <span className="text-crimson font-bold tracking-widest text-sm">
              {photo.index} // 09
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white uppercase font-medium tracking-wide hidden sm:inline">
              {photo.title}
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="text-surface-muted uppercase text-[11px] hidden md:inline">
              {photo.category}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-surface-muted bg-white/[0.04] px-2.5 py-1 rounded-xs border border-white/[0.06]">
              <span>[← / →] NAVIGATE</span>
              <span>·</span>
              <span>[ESC] CLOSE</span>
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-white/[0.05] hover:bg-crimson text-white font-mono text-xs transition-colors duration-200 border border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-crimson"
              aria-label="Close fullscreen lightbox"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </div>

        {/* Main Viewport & Navigation Buttons */}
        <div className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-obsidian/80 hover:bg-crimson text-white/80 hover:text-white border border-white/[0.1] hover:border-crimson transition-colors duration-200 shadow-xl focus:outline-none focus:ring-1 focus:ring-crimson"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Active Image */}
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <motion.img
              key={photo.id}
              src={photo.imageSrc}
              alt={`${photo.title} — ${photo.mood}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-h-[66vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xs shadow-2xl border border-white/[0.06]"
            />
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-obsidian/80 hover:bg-crimson text-white/80 hover:text-white border border-white/[0.1] hover:border-crimson transition-colors duration-200 shadow-xl focus:outline-none focus:ring-1 focus:ring-crimson"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Metadata Drawer */}
        <div className="w-full px-6 py-4 border-t border-white/[0.08] bg-obsidian/90 z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-crimson uppercase tracking-widest font-semibold">
                  {photo.category}
                </span>
                <span className="text-white/20">·</span>
                <h3 className="font-display font-bold text-base text-white">
                  {photo.title}
                </h3>
              </div>
              <p className="font-sans text-xs text-surface-subtle">
                {photo.mood}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-crimson/10 border border-crimson/30 text-crimson">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span className="font-semibold">PRIMARY TOOL: {photo.primaryTool.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xs bg-white/[0.03] border border-white/[0.06] text-surface-muted">
                <Sliders className="w-3 h-3 text-surface-subtle" />
                <span>DETAILED ADJUSTMENTS // PENDING USER INPUT</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

