import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { FramePhotoItem } from '../../types';

interface PhotoCardProps {
  photo: FramePhotoItem;
  onSelect: (photo: FramePhotoItem) => void;
  index: number;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onSelect, index }) => {
  const shouldReduceMotion = useReducedMotion();

  // Determine width based on native aspect ratio so they flow naturally side by side
  const getWidthClass = () => {
    if (photo.orientation === 'horizontal') {
      return 'w-[360px] sm:w-[420px]'; // 4:3 landscape
    }
    if (photo.aspectRatio === '9/16') {
      return 'w-[200px] sm:w-[220px]'; // 9:16 tall vertical
    }
    if (photo.aspectRatio === '4/5') {
      return 'w-[250px] sm:w-[280px]'; // 4:5 vertical
    }
    return 'w-[240px] sm:w-[270px]'; // standard 3:4 vertical
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: 'easeOut',
      }}
      onClick={() => onSelect(photo)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(photo);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View photograph: ${photo.title} (${photo.category})`}
      className={`shrink-0 snap-start h-[330px] sm:h-[370px] ${getWidthClass()} relative rounded-sm bg-[#0A0C14] border border-white/[0.08] hover:border-crimson/60 transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-crimson flex flex-col group select-none`}
    >
      {/* Spider-Man Corner Tension Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-crimson/70 pointer-events-none z-20 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-crimson/70 pointer-events-none z-20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-crimson/70 pointer-events-none z-20 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-crimson/70 pointer-events-none z-20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />

      {/* Top Header Strip */}
      <div className="px-3.5 py-2 border-b border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-surface-subtle bg-black/50 backdrop-blur-xs z-10 shrink-0">
        <span className="text-crimson font-bold tracking-wider">
          {photo.index} // 09
        </span>
        <span className="uppercase text-white/60 tracking-wider truncate max-w-[130px]">
          {photo.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative w-full flex-1 overflow-hidden bg-black/90">
        <img
          src={photo.imageSrc}
          alt={`${photo.title} — ${photo.mood}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Ambient Hover Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover Center Cue */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="p-2.5 rounded-full bg-obsidian/90 border border-crimson/60 text-crimson shadow-xl backdrop-blur-xs">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Card Info Footer (Compact & Minimal) */}
      <div className="p-3 sm:p-3.5 bg-[#0A0C14] border-t border-white/[0.04] space-y-1 shrink-0">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-crimson transition-colors truncate">
            {photo.title}
          </h3>
          <span className="font-mono text-[9px] text-crimson uppercase tracking-wider shrink-0 font-medium">
            {photo.primaryTool}
          </span>
        </div>
        <p className="font-sans text-[11px] text-surface-subtle truncate leading-tight">
          {photo.mood}
        </p>
      </div>
    </motion.div>
  );
};
