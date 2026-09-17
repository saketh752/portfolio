import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ProjectVisualProps {
  onClick?: () => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

type ServiceNodeId = 'client' | 'monolith' | 'cv' | 'ai' | 'db';

interface ServiceNode {
  id: ServiceNodeId;
  label: string;
  tag: string;
  tech: string;
  detail: string;
  x: number;
  y: number;
}

const SERVICE_NODES: ServiceNode[] = [
  {
    id: 'client',
    label: 'CLIENT LAYER',
    tag: 'CROSS-PLATFORM',
    tech: 'Flutter 3.x · Dart',
    detail: 'Camera Video Stream · Offline Stores',
    x: 75,
    y: 110,
  },
  {
    id: 'monolith',
    label: 'CORE MONOLITH',
    tag: 'PORT 8080',
    tech: 'Java 21 · Spring Boot',
    detail: 'JWT Auth · Risk & Workout Engine',
    x: 200,
    y: 110,
  },
  {
    id: 'cv',
    label: 'CV KINEMATICS',
    tag: 'PORT 5000',
    tech: 'FastAPI · MediaPipe',
    detail: 'Joint Angles · 0–100 Form Score',
    x: 325,
    y: 60,
  },
  {
    id: 'ai',
    label: 'AI COACH AGENT',
    tag: 'PORT 8000',
    tech: 'FastAPI · Groq Llama 3',
    detail: 'Session Memory · Safety Tripwires',
    x: 325,
    y: 160,
  },
  {
    id: 'db',
    label: 'DATA LAYER',
    tag: 'MYSQL 8.0',
    tech: 'InnoDB · Flyway',
    detail: 'Relational Store · Encrypted Auth',
    x: 200,
    y: 200,
  },
];

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  onClick,
  isHovered,
  setIsHovered,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<ServiceNodeId>('monolith');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const activeService = SERVICE_NODES.find((n) => n.id === activeNode) || SERVICE_NODES[1];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  const rotX = -mouseOffset.y * 4;
  const rotY = mouseOffset.x * 5;

  return (
    <div
      className="relative w-full cursor-pointer group select-none"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label="View AI Fitness Platform Architecture Details"
      style={{ perspective: 1200 }}
    >
      {/* Outer Comic / Editorial Chassis Frame */}
      <motion.div
        className="relative rounded-sm bg-[#08090E] border border-white/[0.08] group-hover:border-crimson/50 overflow-hidden shadow-2xl transition-colors duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: shouldReduceMotion
            ? 'none'
            : `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isHovered ? 1.015 : 1})`,
          transition: shouldReduceMotion
            ? 'none'
            : isHovered
            ? 'transform 0.12s ease-out, border-color 0.4s ease'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
        }}
      >
        {/* Diagonal Corner Cut Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden z-20">
          <div className="absolute top-0 right-0 w-24 h-[1px] bg-white/[0.12] group-hover:bg-crimson/60 rotate-45 transform origin-top-right transition-colors duration-300" />
        </div>

        {/* Diagonal Corner Pip */}
        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-surface-subtle group-hover:bg-crimson transition-colors duration-300 z-20" />

        {/* Top Header Bar */}
        <div className="relative z-10 px-5 pt-4 pb-3 border-b border-white/[0.06] bg-[#0A0C13] flex items-center justify-between font-mono text-[10px] tracking-wider text-surface-subtle">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-white/80 font-bold tracking-widest">FIGURE 01</span>
            <span className="text-white/30">//</span>
            <span className="text-surface-white font-medium">SYSTEM TOPOLOGY & DATA WEB</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-crimson font-bold">
            v0.3.0 · MULTI-TIER
          </span>
        </div>

        {/* Primary Schematic Canvas (Native Dark Obsidian & Tensile Web Lines) */}
        <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full bg-[#05060A] overflow-hidden flex flex-col justify-between p-5 sm:p-7">
          {/* Subtle Ambient Crimson Radial Bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.07)_0%,transparent_70%)] pointer-events-none" />

          {/* Precision Architectural Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Corner Alignment Markings */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/[0.15] pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/[0.15] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/[0.15] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/[0.15] pointer-events-none" />

          {/* Interactive Topology Graph */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <svg
              className="w-full h-full max-w-[460px] max-h-[240px] overflow-visible"
              viewBox="0 0 400 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tensile Web Connections linking Client -> Monolith -> Services -> DB */}
              {/* Client to Monolith */}
              <motion.path
                d="M 120 110 L 160 110"
                stroke={activeNode === 'client' || activeNode === 'monolith' ? '#D90429' : 'rgba(217, 4, 41, 0.35)'}
                strokeWidth={activeNode === 'client' || activeNode === 'monolith' ? 2 : 1.2}
                strokeDasharray="3 3"
              />
              {/* Monolith to CV Kinematics */}
              <motion.path
                d="M 240 100 Q 275 80 285 70"
                stroke={activeNode === 'cv' || activeNode === 'monolith' ? '#D90429' : 'rgba(217, 4, 41, 0.35)'}
                strokeWidth={activeNode === 'cv' || activeNode === 'monolith' ? 2 : 1.2}
                fill="none"
              />
              {/* Monolith to AI Agent */}
              <motion.path
                d="M 240 120 Q 275 140 285 150"
                stroke={activeNode === 'ai' || activeNode === 'monolith' ? '#D90429' : 'rgba(217, 4, 41, 0.35)'}
                strokeWidth={activeNode === 'ai' || activeNode === 'monolith' ? 2 : 1.2}
                fill="none"
              />
              {/* Monolith to MySQL DB */}
              <motion.path
                d="M 200 135 L 200 185"
                stroke={activeNode === 'db' || activeNode === 'monolith' ? '#D90429' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={activeNode === 'db' || activeNode === 'monolith' ? 1.8 : 1}
                strokeDasharray="2 2"
              />
              {/* Subtle Ambient Cross-Filament (CV to AI) */}
              <path
                d="M 325 85 L 325 135"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Data Flow Pulse Particle */}
              <circle
                cx={isHovered ? 200 : 160}
                cy={110}
                r="3"
                fill="#EF233C"
                className="transition-all duration-700"
              />

              {/* Render Service Nodes */}
              {SERVICE_NODES.map((node) => {
                const isSelected = activeNode === node.id;
                const isClientOrMonolith = node.id === 'client' || node.id === 'monolith';
                const nodeWidth = isClientOrMonolith ? 90 : 85;
                const nodeHeight = 44;
                const rx = node.x - nodeWidth / 2;
                const ry = node.y - nodeHeight / 2;

                return (
                  <g
                    key={node.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNode(node.id);
                    }}
                    className="cursor-pointer"
                  >
                    {/* Node Background Box */}
                    <rect
                      x={rx}
                      y={ry}
                      width={nodeWidth}
                      height={nodeHeight}
                      rx="3"
                      fill={isSelected ? '#121520' : '#0B0D14'}
                      stroke={isSelected ? '#D90429' : 'rgba(255, 255, 255, 0.1)'}
                      strokeWidth={isSelected ? 1.5 : 1}
                      className="transition-colors duration-200"
                    />

                    {/* Active Corner Marker */}
                    {isSelected && (
                      <circle cx={rx + 5} cy={ry + 5} r="2" fill="#D90429" />
                    )}

                    {/* Node Label */}
                    <text
                      x={node.x}
                      y={node.y - 6}
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)'}
                      fontSize="7.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                      letterSpacing="0.5"
                    >
                      {node.label}
                    </text>

                    {/* Node Tech Subtitle */}
                    <text
                      x={node.x}
                      y={node.y + 7}
                      textAnchor="middle"
                      fill={isSelected ? '#EF233C' : 'rgba(255, 255, 255, 0.45)'}
                      fontSize="6.5"
                      fontFamily="monospace"
                      letterSpacing="0.2"
                    >
                      {node.tech}
                    </text>

                    {/* Node Tag Pill */}
                    <text
                      x={node.x}
                      y={node.y + 16}
                      textAnchor="middle"
                      fill="rgba(255, 255, 255, 0.3)"
                      fontSize="5.5"
                      fontFamily="monospace"
                      letterSpacing="0.5"
                    >
                      {node.tag}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Live Telemetry Strip at Bottom of Visual */}
          <div className="relative z-10 px-3.5 py-2.5 rounded-sm bg-[#080A10] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="font-mono text-[10px] text-white font-bold tracking-wider uppercase">
                {activeService.label}:
              </span>
              <span className="font-mono text-[10px] text-surface-muted">
                {activeService.detail}
              </span>
            </div>
            <span className="font-mono text-[9px] text-crimson font-medium tracking-widest uppercase">
              CLICK NODES TO INSPECT
            </span>
          </div>

          {/* Interactive Hover Callout Pill */}
          <div
            className={`absolute bottom-16 inset-x-0 flex justify-center transition-opacity duration-300 z-20 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0E1017]/95 border border-crimson/40 text-[11px] font-mono text-white shadow-2xl backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
              <span>EXPLORE FULL CASE STUDY</span>
              <span className="text-crimson font-bold">→</span>
            </div>
          </div>
        </div>

        {/* Bottom Framing Status Bar */}
        <div className="px-5 py-3 border-t border-white/[0.06] bg-[#0A0C12] flex items-center justify-between font-mono text-[11px] text-surface-subtle">
          <div className="flex items-center gap-2">
            <span className="text-crimson font-bold">01 //</span>
            <span className="text-white/80 font-medium">REACTIVE PIPELINE & MICROSERVICES</span>
          </div>
          <div className="flex items-center gap-2 text-surface-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] tracking-widest uppercase">DOCKERIZED STACK</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
