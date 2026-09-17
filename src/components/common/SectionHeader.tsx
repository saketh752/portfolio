import React from 'react';

interface SectionHeaderProps {
  code: string;
  category?: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  code,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/[0.06] ${className}`}>
      <div>
        <span className="font-mono text-xs text-crimson tracking-widest font-semibold block mb-1">
          {code}
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase">
          {title}
        </h2>
      </div>
      {description && (
        <p className="mt-3 md:mt-0 font-mono text-xs text-surface-muted max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
};
