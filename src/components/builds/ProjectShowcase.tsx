import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProjectVisual } from './ProjectVisual';
import { FEATURED_PROJECT } from '../../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface ProjectShowcaseProps {
  onOpenDetail: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenDetail }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const project = FEATURED_PROJECT;

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.65, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="relative w-full">
      {/* Tensile Web Filament connecting Visual to Information Panel (Desktop Only) */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none -z-10 overflow-visible"
        aria-hidden="true"
      >
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle tensile anchor connecting visual right to info left */}
          <motion.path
            d={
              isHovered
                ? 'M 56 50 Q 59 46 62 50'
                : 'M 56 50 Q 59 52 62 50'
            }
            stroke={isHovered ? 'rgba(217, 4, 41, 0.45)' : 'rgba(217, 4, 41, 0.18)'}
            strokeWidth="1.2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            transition={{ duration: 0.35 }}
          />
          <circle cx="56" cy="50" r="2" fill="#D90429" vectorEffect="non-scaling-stroke" />
          <circle cx="62" cy="50" r="2" fill="#D90429" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Dominant Centerpiece Split Composition */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="relative rounded-sm bg-[#08090E] border border-white/[0.08] hover:border-crimson/30 transition-colors duration-500 p-6 sm:p-10 lg:p-12 shadow-2xl"
      >
        {/* Subtle Vertical Crimson Accent on Far Left Edge */}
        <div className="absolute left-0 top-10 bottom-10 w-[2px] bg-gradient-to-b from-crimson via-crimson to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ============================================================
              LEFT / PRIMARY AREA: Large Project Visual & Framing
             ============================================================ */}
          <div className="lg:col-span-7">
            <ProjectVisual
              onClick={onOpenDetail}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />
          </div>

          {/* ============================================================
              RIGHT / SUPPORTING AREA: Project Information & Placeholders
             ============================================================ */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Top Metadata Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] text-crimson-bright font-bold tracking-widest px-3 py-1 rounded-sm bg-crimson/10 border border-crimson/30 uppercase">
                {project.category}
              </span>
              <span className="font-mono text-xs text-surface-subtle">
                {project.version}
              </span>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-sm bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                <span className="font-mono text-[10px] text-surface-white font-medium tracking-wider uppercase">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Dominant Project Title */}
            <div className="space-y-2">
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[0.95]">
                {project.title}
              </h3>
              <div className="w-16 h-[2px] bg-crimson" />
            </div>

            {/* Authentic Content from GitHub Repository */}
            <div className="space-y-4 pt-1">
              {/* WHAT IT IS */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-crimson font-bold tracking-widest uppercase">
                  WHAT IT IS
                </span>
                <div className="p-3.5 rounded-sm bg-[#0C0E15] border border-white/[0.05]">
                  <p className="font-sans text-xs text-surface-muted leading-relaxed">
                    {project.whatItIs}
                  </p>
                </div>
              </div>

              {/* TECHNICAL HIGHLIGHTS */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-crimson font-bold tracking-widest uppercase">
                  TECHNICAL HIGHLIGHTS
                </span>
                <div className="p-3.5 rounded-sm bg-[#0C0E15] border border-white/[0.05] space-y-2">
                  {project.technicalHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-crimson mt-1.5 shrink-0" />
                      <p className="font-mono text-[11px] text-surface-muted leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECHNOLOGIES */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-crimson font-bold tracking-widest uppercase">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-sm bg-[#0C0E15] border border-white/[0.05]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-surface-white font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action: Open Full Case Study + View on GitHub */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenDetail}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-sm bg-[#10121A] hover:bg-crimson border border-crimson/40 hover:border-crimson text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 text-crimson group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-crimson/50 text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson group"
                aria-label="View AI Fitness Platform on GitHub"
              >
                <svg
                  className="w-4 h-4 text-surface-subtle group-hover:text-crimson-bright transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


