import React from 'react';
import { motion } from 'framer-motion';
import { SkillItem } from '../../types';

interface SkillNodeProps {
  skill: SkillItem;
  isHovered: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onClick?: (id: string) => void;
  positionStyle?: React.CSSProperties;
  className?: string;
  isMobile?: boolean;
}

export const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  isHovered,
  isRelated,
  isDimmed,
  onHover,
  onClick,
  positionStyle,
  className = '',
  isMobile = false,
}) => {
  const isDominant = skill.weight === 'dominant';
  const isCreative = skill.domain === 'creative';

  // Dynamic styling based on interaction states
  let borderClass = 'border-white/[0.08]';
  let bgClass = 'bg-obsidian-secondary/90';
  let textClass = 'text-surface-muted';
  let dotClass = 'bg-white/20';

  if (isHovered) {
    borderClass = 'border-crimson shadow-crimson-subtle ring-1 ring-crimson/50';
    bgClass = 'bg-obsidian-tertiary';
    textClass = 'text-white font-semibold';
    dotClass = 'bg-crimson shadow-[0_0_8px_#EF233C] animate-pulse';
  } else if (isRelated) {
    borderClass = 'border-white/30 ring-1 ring-white/10';
    bgClass = 'bg-obsidian-secondary';
    textClass = 'text-surface-white';
    dotClass = 'bg-crimson/70';
  } else if (isDimmed) {
    borderClass = 'border-white/[0.03]';
    bgClass = 'bg-obsidian-secondary/30';
    textClass = 'text-surface-subtle/50';
    dotClass = 'bg-white/5';
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(skill.id);
      onHover(isHovered ? null : skill.id);
    }
  };

  return (
    <div
      style={positionStyle}
      className={`group select-none focus:outline-none ${className}`}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => {
        onClick?.(skill.id);
        onHover(isHovered ? null : skill.id);
      }}
      onFocus={() => onHover(skill.id)}
      onBlur={() => onHover(null)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} (${skill.role})`}
      aria-pressed={isHovered}
    >
      <motion.div
        layout={!positionStyle}
        animate={{
          scale: isHovered ? 1.06 : isRelated ? 1.02 : 1,
          opacity: isDimmed ? 0.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className={`relative flex items-center gap-2 border rounded-sm transition-colors duration-200 cursor-pointer ${borderClass} ${bgClass} ${
          isDominant
            ? 'px-3 py-1.5 sm:px-3.5 sm:py-2'
            : 'px-2.5 py-1 sm:px-3 sm:py-1.5'
        }`}
      >
        {/* Subtle Spider-Man tension micro-dot */}
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${dotClass}`}
          aria-hidden="true"
        />

        {/* Skill Label */}
        <span
          className={`tracking-tight uppercase transition-colors duration-200 ${textClass} ${
            isDominant
              ? 'font-display font-bold text-xs sm:text-sm tracking-wider'
              : 'font-mono text-[11px] sm:text-xs font-normal'
          }`}
        >
          {skill.name}
        </span>

        {/* Creative Branch Subtle Indicator */}
        {isCreative && (
          <span
            className="text-[9px] font-mono text-crimson/80 uppercase tracking-tighter"
            title="Creative Branch"
          >
            ✦
          </span>
        )}

        {/* Dynamic Contextual Role Pill on Desktop Hover */}
        {!isMobile && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none px-2.5 py-0.5 rounded-sm bg-obsidian-tertiary border border-crimson/40 shadow-xl"
          >
            <span className="font-mono text-[10px] text-white tracking-wide">
              <span className="text-crimson font-bold">{skill.name}</span>
              <span className="text-white/40 mx-1.5">//</span>
              <span className="text-surface-muted">{skill.role}</span>
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

