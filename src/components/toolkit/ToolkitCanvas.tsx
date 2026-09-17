import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SkillItem } from '../../types';
import { TOOLKIT_SKILLS } from '../../data/portfolioData';
import { SkillNode } from './SkillNode';

interface SkillCoordinate {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

// 29 Skill node positions arranged organically around central axis (50%, 48%)
const SKILL_COORDINATES: Record<string, { x: number; y: number }> = {
  // Core Languages & Paradigms (Top-Left & Top-Center)
  dsa: { x: 48, y: 14 },
  oop: { x: 37, y: 18 },
  java: { x: 26, y: 22 },
  python: { x: 36, y: 33 },

  // Web & Client (Top-Right)
  javascript: { x: 63, y: 20 },
  html: { x: 74, y: 15 },
  css: { x: 85, y: 21 },
  react: { x: 70, y: 30 },
  nextjs: { x: 82, y: 36 },

  // Backend & Distributed Services (Left & Mid-Left)
  springboot: { x: 18, y: 34 },
  microservices: { x: 12, y: 48 },
  restapis: { x: 25, y: 44 },
  fastapi: { x: 27, y: 56 },
  linux: { x: 14, y: 66 },

  // Data Persistence (Bottom-Left)
  postgresql: { x: 24, y: 74 },
  mysql: { x: 36, y: 80 },
  mongodb: { x: 47, y: 88 },

  // Cloud, Containers & Delivery (Bottom-Center & Mid-Bottom)
  git: { x: 42, y: 62 },
  github: { x: 34, y: 66 },
  docker: { x: 52, y: 67 },
  kubernetes: { x: 63, y: 73 },
  aws: { x: 52, y: 79 },
  cicd: { x: 58, y: 86 },

  // Creative Branch (Right & Bottom-Right Flank)
  dart: { x: 63, y: 48 },
  flutter: { x: 73, y: 55 },
  figma: { x: 85, y: 50 },
  photoshop: { x: 88, y: 65 },
  lightroom: { x: 77, y: 77 },
  capcut: { x: 89, y: 81 },
};

// Explicit inter-skill connections grounded in architectural synergy
const FILAMENT_CONNECTIONS: [string, string][] = [
  // Core Axis Hub Connections
  ['center', 'java'],
  ['center', 'python'],
  ['center', 'springboot'],
  ['center', 'react'],
  ['center', 'docker'],
  ['center', 'dart'],

  // Backend, Languages & Core Systems
  ['java', 'springboot'],
  ['java', 'oop'],
  ['java', 'dsa'],
  ['java', 'mysql'],
  ['java', 'microservices'],
  ['python', 'fastapi'],
  ['python', 'restapis'],
  ['python', 'linux'],
  ['python', 'docker'],
  ['oop', 'dsa'],
  ['oop', 'dart'],
  ['springboot', 'microservices'],
  ['springboot', 'restapis'],
  ['springboot', 'postgresql'],
  ['springboot', 'mysql'],
  ['springboot', 'docker'],
  ['fastapi', 'restapis'],
  ['fastapi', 'microservices'],
  ['fastapi', 'docker'],
  ['microservices', 'restapis'],
  ['microservices', 'docker'],
  ['microservices', 'kubernetes'],

  // Persistence
  ['postgresql', 'mysql'],
  ['mysql', 'mongodb'],

  // Web & UI
  ['javascript', 'html'],
  ['javascript', 'css'],
  ['javascript', 'react'],
  ['javascript', 'nextjs'],
  ['html', 'css'],
  ['css', 'react'],
  ['react', 'nextjs'],
  ['react', 'figma'],
  ['restapis', 'react'],
  ['restapis', 'flutter'],

  // DevOps & Cloud
  ['docker', 'kubernetes'],
  ['docker', 'linux'],
  ['docker', 'cicd'],
  ['kubernetes', 'aws'],
  ['kubernetes', 'linux'],
  ['aws', 'cicd'],
  ['linux', 'git'],
  ['git', 'github'],
  ['git', 'cicd'],

  // Creative Branch Connections
  ['dart', 'flutter'],
  ['flutter', 'figma'],
  ['figma', 'photoshop'],
  ['photoshop', 'lightroom'],
  ['photoshop', 'capcut'],
  ['lightroom', 'capcut'],
];

// Mobile editorial groupings (without boxy card containers)
const MOBILE_EDITORIAL_GROUPS = [
  {
    code: '01',
    heading: 'ARCHITECTURAL FOUNDATION & LANGUAGES',
    skillIds: ['java', 'python', 'javascript', 'html', 'css', 'dsa', 'oop'],
  },
  {
    code: '02',
    heading: 'SERVICES, FRAMEWORKS & PERSISTENCE',
    skillIds: ['springboot', 'fastapi', 'microservices', 'restapis', 'react', 'nextjs', 'postgresql', 'mysql', 'mongodb'],
  },
  {
    code: '03',
    heading: 'CONTAINERS, CLOUD & INFRASTRUCTURE',
    skillIds: ['docker', 'kubernetes', 'aws', 'linux', 'git', 'github', 'cicd'],
  },
  {
    code: '04',
    heading: 'CREATIVE & DIGITAL VISUAL SYSTEMS',
    skillIds: ['figma', 'flutter', 'dart', 'lightroom', 'photoshop', 'capcut'],
  },
];

export const ToolkitCanvas: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hoveredSkill = TOOLKIT_SKILLS.find((s) => s.id === hoveredId) || null;
  const relatedSkillIds = hoveredSkill?.relatedIds || [];

  const centerPos = { x: 50, y: 48 };

  const getNodePos = (id: string) => {
    if (id === 'center') return centerPos;
    return SKILL_COORDINATES[id] || { x: 50, y: 50 };
  };

  const isFilamentActive = (idA: string, idB: string) => {
    if (!hoveredId) return false;
    return (
      (idA === hoveredId && (idB === 'center' || relatedSkillIds.includes(idB))) ||
      (idB === hoveredId && (idA === 'center' || relatedSkillIds.includes(idA)))
    );
  };

  const isFilamentRelated = (idA: string, idB: string) => {
    if (!hoveredId) return false;
    return relatedSkillIds.includes(idA) && relatedSkillIds.includes(idB);
  };

  return (
    <div className="space-y-8">
      {/* =========================================================================
          DESKTOP: Spatial Constellation with Tensile Web Filaments (>= lg)
         ========================================================================= */}
      <div className="relative w-full aspect-[16/11] min-h-[640px] max-w-6xl mx-auto rounded-sm bg-[#08090E] border border-white/[0.08] overflow-hidden shadow-2xl select-none hidden lg:block">
        {/* Subtle Ambient Radial Crimson Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(217,4,41,0.08)_0%,transparent_65%)] pointer-events-none" />

        {/* Fine Architectural Tension Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Outer Corner Precision Markings */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/[0.15] pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/[0.15] pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/[0.15] pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/[0.15] pointer-events-none" />

        {/* Top Header Information Ribbon */}
        <div className="absolute top-0 inset-x-0 z-10 px-6 py-3 border-b border-white/[0.06] bg-[#0A0C13]/90 flex items-center justify-between font-mono text-[10px] text-surface-subtle tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-white/80 font-bold uppercase tracking-widest">SYSTEM WORKBENCH</span>
            <span className="text-white/30">//</span>
            <span className="text-surface-white font-medium uppercase">DYNAMIC REPERTOIRE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-surface-muted">29 ACTIVE TOOLS</span>
            <span className="text-white/20">|</span>
            <span className="text-crimson font-semibold">ZERO ARBITRARY RATINGS</span>
          </div>
        </div>

        {/* SVG Dynamic Tensile Web Canvas */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Spider-Web Tensile Rings centered around (50%, 48%) */}
          <circle
            cx="50%"
            cy="48%"
            r="70"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="2 4"
          />
          <circle
            cx="50%"
            cy="48%"
            r="160"
            stroke="rgba(255, 255, 255, 0.035)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 6"
          />
          <circle
            cx="50%"
            cy="48%"
            r="280"
            stroke="rgba(255, 255, 255, 0.02)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 8"
          />

          {/* Tensile Web Filaments */}
          {FILAMENT_CONNECTIONS.map(([idA, idB], index) => {
            const pA = getNodePos(idA);
            const pB = getNodePos(idB);
            const active = isFilamentActive(idA, idB);
            const related = isFilamentRelated(idA, idB);

            let strokeColor = 'rgba(255, 255, 255, 0.06)';
            let strokeWidth = 1;
            let strokeDash = '3 3';
            let opacity = 1;

            if (hoveredId) {
              if (active) {
                strokeColor = '#EF233C';
                strokeWidth = 1.8;
                strokeDash = 'none';
                opacity = 0.95;
              } else if (related) {
                strokeColor = 'rgba(255, 255, 255, 0.35)';
                strokeWidth = 1.2;
                strokeDash = 'none';
                opacity = 0.8;
              } else {
                strokeColor = 'rgba(255, 255, 255, 0.02)';
                opacity = 0.2;
              }
            }

            return (
              <line
                key={`filament-${index}`}
                x1={`${pA.x}%`}
                y1={`${pA.y}%`}
                x2={`${pB.x}%`}
                y2={`${pB.y}%`}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDash}
                opacity={opacity}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Workbench Anchor Node */}
        <div
          style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%`, transform: 'translate(-50%, -50%)' }}
          className="absolute z-10 pointer-events-none flex flex-col items-center justify-center text-center"
        >
          <div className="relative w-12 h-12 rounded-full border border-crimson/40 bg-[#0A0C13]/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(217,4,41,0.25)]">
            <span className="w-2 h-2 rounded-full bg-crimson animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-crimson relative z-10" />
          </div>
          <span className="mt-2 font-mono text-[9px] text-surface-subtle font-bold tracking-widest uppercase whitespace-nowrap bg-[#08090E]/80 px-2 py-0.5 rounded border border-white/[0.04]">
            CORE AXIS // WORKBENCH
          </span>
        </div>

        {/* 29 Interactive Skill Nodes (Desktop Constellation) */}
        {TOOLKIT_SKILLS.map((skill) => {
          const pos = SKILL_COORDINATES[skill.id] || { x: 50, y: 50 };
          const isHovered = hoveredId === skill.id;
          const isRelated = relatedSkillIds.includes(skill.id);
          const isDimmed = hoveredId !== null && !isHovered && !isRelated;

          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              isHovered={isHovered}
              isRelated={isRelated}
              isDimmed={isDimmed}
              onHover={(id) => setHoveredId(id)}
              positionStyle={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 30 : isRelated ? 20 : 10,
              }}
            />
          );
        })}
      </div>

      {/* =========================================================================
          MOBILE & TABLET: Vertical Tensile Spine Flow (< lg)
         ========================================================================= */}
      <div className="lg:hidden space-y-8">
        <div className="relative pl-6 border-l border-white/[0.08] space-y-10">
          {MOBILE_EDITORIAL_GROUPS.map((group) => (
            <div key={group.code} className="relative space-y-4">
              {/* Group Tensile Web Pip */}
              <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#08090E] border-2 border-crimson flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>

              {/* Group Typography Header */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-crimson font-bold tracking-widest uppercase">
                  SECTION {group.code}
                </span>
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {group.heading}
                </h3>
              </div>

              {/* Group Skill Nodes */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skillIds.map((id) => {
                  const skill = TOOLKIT_SKILLS.find((s) => s.id === id);
                  if (!skill) return null;

                  const isHovered = hoveredId === skill.id;
                  const isRelated = relatedSkillIds.includes(skill.id);
                  const isDimmed = hoveredId !== null && !isHovered && !isRelated;

                  return (
                    <SkillNode
                      key={skill.id}
                      skill={skill}
                      isHovered={isHovered}
                      isRelated={isRelated}
                      isDimmed={isDimmed}
                      onHover={(hId) => setHoveredId(hId)}
                      onClick={(cId) => setHoveredId(hoveredId === cId ? null : cId)}
                      isMobile={true}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE TELEMETRY STRIP (Desktop & Mobile)
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 px-5 border border-white/[0.08] bg-[#0A0C13] rounded-sm font-mono text-xs text-surface-subtle shadow-md">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
              hoveredSkill ? 'bg-crimson shadow-[0_0_8px_#EF233C]' : 'bg-surface-subtle/50'
            }`}
          />
          {hoveredSkill ? (
            <div className="flex flex-wrap items-center gap-1.5 text-white text-[11px] sm:text-xs">
              <span className="text-crimson font-bold uppercase tracking-wider">
                {hoveredSkill.name}
              </span>
              <span className="text-white/30">//</span>
              <span className="text-surface-muted">{hoveredSkill.role}</span>
              <span className="text-white/30">//</span>
              <span className="text-surface-subtle uppercase text-[10px]">
                {hoveredSkill.domain}
              </span>
            </div>
          ) : (
            <span className="text-surface-muted text-[11px] sm:text-xs">
              HOVER OR SELECT ANY TOOL TO MAP ARCHITECTURAL CONNECTIONS
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[10px] shrink-0 font-medium">
          <span className="text-surface-subtle">29 VERIFIED ASSETS</span>
          <span className="text-white/20">|</span>
          <span className="text-crimson uppercase tracking-widest font-semibold">
            CENTRAL AXIS CONNECTED
          </span>
        </div>
      </div>
    </div>
  );
};

