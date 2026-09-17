import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ITEMS } from '../../data/navigation';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('origin');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = NAVIGATION_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 240;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAVIGATION_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07080A]/92 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Minimal Brand Monogram */}
          <button
            onClick={() => scrollToSection('origin')}
            className="group flex items-center space-x-2.5 text-left focus:outline-none"
            aria-label="SAKETH YADAV — Return to Origin"
          >
            <div className="w-2 h-2 bg-crimson rotate-45 transition-transform duration-300 group-hover:scale-125" />
            <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-surface-white transition-colors">
              SAKETH YADAV
            </span>
          </button>

          {/* Clean Editorial Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 font-mono text-xs tracking-wider transition-colors duration-200 focus:outline-none rounded-sm ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-surface-muted hover:text-white'
                  }`}
                >
                  <span className="text-[10px] text-crimson mr-1 font-semibold opacity-80">
                    {item.code}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-crimson"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-sm bg-[#0E1015] border border-white/10 text-surface-muted hover:text-white hover:border-crimson focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#07080A]/98 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8 border-b border-white/[0.08]"
          >
            <div className="flex flex-col space-y-2 overflow-y-auto flex-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-sm font-mono text-xs tracking-wide text-left transition-colors ${
                      isActive
                        ? 'bg-[#0E1015] text-white border-l-2 border-crimson'
                        : 'text-surface-muted hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs text-crimson font-bold">
                        {item.code}
                      </span>
                      <span className="font-display font-medium tracking-wider text-sm">
                        {item.label}
                      </span>
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-surface-subtle">
              <span>BUILD → LEARN → EVOLVE</span>
              <span className="text-crimson font-medium">SAKETH YADAV</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
