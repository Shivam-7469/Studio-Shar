
import React, { useState, useEffect } from 'react';
import { motion as motionLib, AnimatePresence } from 'framer-motion';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props like initial, animate, exit
const motion = motionLib as any;

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>(PageType.HOME);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case PageType.HOME: return <Home onNavigate={setActivePage} />;
      case PageType.ABOUT: return <About />;
      case PageType.PROJECTS: return <Projects />;
      case PageType.SERVICES: return <Services />;
      case PageType.CONTACT: return <Contact />;
      default: return <Home onNavigate={setActivePage} />;
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      
      <main className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={setActivePage} />
    </div>
  );
};

export default App;
