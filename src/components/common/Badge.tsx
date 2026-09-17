import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'crimson' | 'pulse';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm font-mono text-[10px] tracking-widest uppercase transition-all duration-200';

  const variants = {
    default:
      'bg-[#0E1015] border border-white/[0.08] text-surface-muted hover:border-white/20',
    crimson:
      'bg-[#12141C] border border-[#D90429]/40 text-[#EF233C] shadow-[0_0_12px_rgba(217,4,41,0.15)]',
    pulse:
      'bg-[#12141C] border border-[#D90429]/40 text-white',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {variant === 'pulse' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#D90429] animate-pulse" />
      )}
      {children}
    </span>
  );
};

