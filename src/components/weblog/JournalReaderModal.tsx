import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Compass } from 'lucide-react';
import { SAKETH_PERSONAL_STORY } from '../../data/personalStoryData';

interface JournalReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JournalReaderModal: React.FC<JournalReaderModalProps> = ({ isOpen, onClose }) => {
  const [activeChapter, setActiveChapter] = useState<string>(SAKETH_PERSONAL_STORY.chapters[0].id);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & scroll locking
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Track reading progress
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(`chapter-${chapterId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveChapter(chapterId);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex flex-col bg-obsidian/98 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Personal Journal: Behind the Code"
      >
        {/* Top Reading Progress Line */}
        <div className="w-full h-1 bg-white/[0.06] fixed top-0 left-0 z-40">
          <div
            className="h-full bg-crimson transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Top Navigation Bar */}
        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/[0.08] bg-obsidian/90 z-30 shrink-0">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span className="text-white font-semibold tracking-wider">
              {SAKETH_PERSONAL_STORY.title}
            </span>
            <span className="text-white/30 hidden sm:inline">//</span>
            <span className="text-surface-subtle hidden sm:inline uppercase text-[11px]">
              {SAKETH_PERSONAL_STORY.author}’s Journal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-surface-muted hidden md:inline">
              [ESC] TO CLOSE JOURNAL
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/[0.05] hover:bg-crimson text-white font-mono text-xs transition-colors duration-200 border border-white/[0.1] focus:outline-none focus:ring-1 focus:ring-crimson"
              aria-label="Close journal"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </div>

        {/* Main Reading Canvas & Sidebar */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* Left Desktop Chapter Index Rail */}
          <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-white/[0.06] p-6 overflow-y-auto font-mono text-xs bg-[#08090D]">
            <div className="pb-4 mb-4 border-b border-white/[0.06] flex items-center gap-2 text-surface-subtle">
              <BookOpen className="w-3.5 h-3.5 text-crimson" />
              <span className="font-bold tracking-wider uppercase text-[10px]">
                JOURNAL CHAPTERS
              </span>
            </div>

            <nav className="space-y-2">
              {SAKETH_PERSONAL_STORY.chapters.map((ch) => {
                const isActive = activeChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToChapter(ch.id)}
                    className={`w-full text-left p-2.5 rounded-sm transition-all duration-200 flex flex-col gap-0.5 border ${
                      isActive
                        ? 'bg-crimson/10 border-crimson/40 text-white'
                        : 'border-transparent text-surface-subtle hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-crimson font-semibold">
                        CHAPTER {ch.number}
                      </span>
                    </div>
                    <span className="font-sans font-medium text-xs leading-snug truncate">
                      {ch.title}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/[0.06] text-[10px] text-surface-muted space-y-1">
              <div>AUTHENTIC PERSONAL NARRATIVE</div>
              <div className="text-crimson font-medium">100% FIRST-PERSON VOICE</div>
            </div>
          </aside>

          {/* Center Reading Body */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-6 sm:px-12 py-12 md:py-16 scroll-smooth"
          >
            <div className="max-w-3xl mx-auto space-y-16">
              {/* Journal Title Header */}
              <div className="space-y-4 pb-8 border-b border-white/[0.08] relative">
                <div className="absolute top-0 left-0 w-1 h-12 bg-crimson" />
                <div className="pl-4 space-y-2">
                  <div className="font-mono text-xs text-crimson uppercase tracking-widest font-semibold flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>PERSONAL JOURNAL · FULL STORY</span>
                  </div>
                  <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                    {SAKETH_PERSONAL_STORY.title}
                  </h1>
                  <p className="font-sans text-base text-surface-subtle font-medium">
                    {SAKETH_PERSONAL_STORY.subtitle}
                  </p>
                </div>
              </div>

              {/* Chapters Content */}
              <div className="space-y-20">
                {SAKETH_PERSONAL_STORY.chapters.map((chapter) => (
                  <article
                    key={chapter.id}
                    id={`chapter-${chapter.id}`}
                    className="scroll-mt-12 space-y-6 pt-4"
                  >
                    <div className="space-y-1 pb-3 border-b border-white/[0.04]">
                      <span className="font-mono text-xs text-crimson font-bold tracking-widest">
                        CHAPTER {chapter.number}
                      </span>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                        {chapter.title}
                      </h2>
                      <p className="font-mono text-xs text-surface-muted italic">
                        // {chapter.subtitle}
                      </p>
                    </div>

                    <div className="space-y-5 font-sans text-sm sm:text-base text-white/85 leading-relaxed sm:leading-loose font-normal">
                      {chapter.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Journal Signoff */}
              <div className="pt-12 pb-16 border-t border-white/[0.08] text-center space-y-4 font-mono text-xs text-surface-subtle">
                <div className="w-2 h-2 rounded-full bg-crimson mx-auto" />
                <p className="text-white font-medium text-sm tracking-wider">
                  BUILD → LEARN → EVOLVE
                </p>
                <p className="text-surface-muted text-[11px]">
                  End of Journal Excerpt · Saketh Yadav
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 rounded-sm bg-obsidian-secondary hover:bg-crimson text-white border border-white/[0.1] hover:border-crimson transition-colors tracking-widest uppercase font-semibold text-xs"
                >
                  RETURN TO PORTFOLIO
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

