import React from 'react';
import { Navigation } from './components/common/Navigation';
import { OriginHero } from './components/origin/OriginHero';
import { IdentitySection } from './components/identity/IdentitySection';
import { BuildsSection } from './components/builds/BuildsSection';
import { ToolkitSection } from './components/toolkit/ToolkitSection';
import { FieldLogSection } from './components/fieldlog/FieldLogSection';
import { FrameSection } from './components/frame/FrameSection';
import { WeblogSection } from './components/weblog/WeblogSection';
import { ProfileSection } from './components/profile/ProfileSection';
import { ConnectSection } from './components/connect/ConnectSection';
import { PERSONAL_DATA } from './data/portfolioData';

export function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-surface-white overflow-x-hidden selection:bg-crimson selection:text-white">
      {/* Global Minimal Navigation */}
      <Navigation />

      <main>
        {/* Sector 01: ORIGIN (Hero) */}
        <OriginHero />

        {/* Sector 02: IDENTITY */}
        <IdentitySection />

        {/* Sector 03: BUILDS (Featured Project Showcase) */}
        <BuildsSection />

        {/* Sector 04: TOOLKIT (Skills Showcase) */}
        <ToolkitSection />

        {/* Sector 05: FIELD LOG (Hands-on Engineering Journey) */}
        <FieldLogSection />

        {/* Sector 06: THE FRAME (Photo Editing Showcase) */}
        <FrameSection />

        {/* Sector 07: WEBLOG (Personal Journal · Life & Learning) */}
        <WeblogSection />

        {/* Sector 08: PROFILE (Professional Snapshot & Master Resume) */}
        <ProfileSection />

        {/* Sector 09: CONNECT (Get in Touch & Social Links) */}
        <ConnectSection />
      </main>

      {/* Minimal Terminal Footer */}
      <footer className="w-full py-8 px-6 bg-obsidian border-t border-obsidian-border font-mono text-[11px] text-surface-subtle">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-white font-medium">{PERSONAL_DATA.name}</span>
            <span>//</span>
            <span className="text-crimson font-semibold">{PERSONAL_DATA.philosophy}</span>
          </div>
          <div className="text-surface-subtle">
            ALL SECTORS COMPLETE (01–09) · VERIFIED
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
