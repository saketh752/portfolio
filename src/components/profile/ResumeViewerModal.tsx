import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profileData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Resume Document Viewer"
      >
        {/* Top Control Header */}
        <div className="w-full px-6 py-3.5 flex items-center justify-between border-b border-white/[0.08] bg-obsidian z-20 shrink-0">
          <div className="flex items-center gap-3 font-mono text-xs text-white">
            <FileText className="w-4 h-4 text-crimson" />
            <span className="font-semibold tracking-wide">
              {PROFILE_DATA.resume.filename}
            </span>
            <span className="text-surface-subtle hidden sm:inline text-[11px]">
              // ATS MASTER RESUME
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE_DATA.resume.downloadUrl}
              download={PROFILE_DATA.resume.filename}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-crimson hover:bg-crimson-hover text-white font-mono text-xs font-semibold tracking-wider transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </a>

            <a
              href={PROFILE_DATA.resume.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/[0.06] hover:bg-white/[0.1] text-white font-mono text-xs transition-colors border border-white/[0.08]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>NEW TAB</span>
            </a>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-white/[0.05] hover:bg-white/[0.15] text-white font-mono text-xs transition-colors border border-white/[0.08] focus:outline-none focus:ring-1 focus:ring-crimson"
              aria-label="Close resume viewer"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </div>

        {/* Viewport Frame */}
        <div className="flex-1 w-full bg-[#1A1C23] relative p-2 sm:p-4 overflow-hidden flex items-center justify-center">
          <iframe
            src={`${PROFILE_DATA.resume.downloadUrl}#toolbar=1&navpanes=0`}
            title="Saketh Yadav ATS Master Resume"
            className="w-full h-full max-w-5xl rounded-xs bg-white shadow-2xl border border-white/[0.1]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

