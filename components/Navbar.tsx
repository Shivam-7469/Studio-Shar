
import React from 'react';
import { motion as motionLib } from 'framer-motion';
import { PageType } from '../types';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props
const motion = motionLib as any;

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { label: 'Home', value: PageType.HOME },
    { label: 'About', value: PageType.ABOUT },
    { label: 'Projects', value: PageType.PROJECTS },
    { label: 'Services', value: PageType.SERVICES },
    { label: 'Contact', value: PageType.CONTACT },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass px-4 md:px-8 py-2 md:py-3 rounded-full pointer-events-auto flex items-center gap-4 md:gap-10 max-w-[95vw]"
      >
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0"
          onClick={() => onNavigate(PageType.HOME)}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/60 shadow-sm transition-transform duration-500 group-hover:scale-110">
            <img 
              src="https://i.im.ge/eB8aup/1.jpg"
              alt="Studio Shar Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm md:text-xl serif font-semibold tracking-tighter whitespace-nowrap">
            Studio Shar
          </div>
        </div>
        <ul className="flex items-center gap-3 md:gap-8 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => (
            <li key={item.value} className="flex-shrink-0">
              <button
                onClick={() => onNavigate(item.value)}
                className={`text-[8px] md:text-xs uppercase tracking-[0.15em] md:tracking-widest transition-all duration-300 relative group whitespace-nowrap
                  ${activePage === item.value ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-300 
                  ${activePage === item.value ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </header>
  );
};

export default Navbar;
