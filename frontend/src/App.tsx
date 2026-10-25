import React, { useEffect, useState } from 'react';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Features from './components/Features.tsx';
import GetStartedModal from './components/GetStartedModal.tsx';
import Login from './components/Login.tsx';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'waitlist' | 'demo' | 'privacy'>('waitlist');
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleOpenGetStarted = () => {
    setModalTab('waitlist');
    setModalOpen(true);
  };

  const handleOpenPrivacy = () => {
    setModalTab('privacy');
    setModalOpen(true);
  };

  const handleLearnMore = (_featureIndex: number) => {
    setModalTab('demo');
    setModalOpen(true);
  };

  if (currentPath === '/login') {
    return <Login onBackToHome={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] selection:bg-[#DEDBC8] selection:text-black antialiased relative">
      <main>
        {/* SECTION 1: HERO */}
        <Hero
          onOpenGetStarted={handleOpenGetStarted}
          onOpenPrivacy={handleOpenPrivacy}
          onStartRemembering={() => navigateTo('/login')}
        />

        {/* SECTION 2: ABOUT */}
        <About />

        {/* SECTION 3: FEATURES */}
        <Features onLearnMore={handleLearnMore} />
      </main>

      {/* Minimalist Editorial Footer */}
      <footer className="bg-black border-t border-white/[0.05] py-12 px-6 md:px-12 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#E1E0CC] tracking-tight text-sm">
              Remember AI
            </span>
            <span className="text-gray-600">·</span>
            <span>Personal Memory Layer</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-gray-400">
            <button
              type="button"
              onClick={handleOpenPrivacy}
              className="hover:text-[#E1E0CC] transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Privacy & Architecture
            </button>
            <button
              type="button"
              onClick={handleOpenGetStarted}
              className="hover:text-[#E1E0CC] transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Early Access
            </button>
          </div>

          <p className="m-0 text-[11px] text-gray-600">
            © {new Date().getFullYear()} Remember AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Interactive Modal for Early Access / Memory Simulation */}
      <GetStartedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />
    </div>
  );
}
