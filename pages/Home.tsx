
import React, { useState, useEffect } from 'react';
import { motion as motionLib, AnimatePresence } from 'framer-motion';
import { PageType } from '../types';
import SculpturalElement from '../components/SculpturalElement';
import SocialActionCard from '../components/SocialActionCard';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props
const motion = motionLib as any;

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

const MESSAGES = [
  { title: "Bespoke Clarity", subtitle: "Curating spaces that resonate with quiet luxury." },
  { title: "Material Poetry", subtitle: "The tactile dialogue between form and function." },
  { title: "Luminous Depth", subtitle: "Sculpting atmosphere through the mastery of light." },
  { title: "Organic Logic", subtitle: "Architecture that breathes with human intent." },
  { title: "Timeless Flow", subtitle: "Defying liminality through intentional design." }
];

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400" 
            alt="Hero Interior" 
            className="w-full h-full object-cover filter brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#fcfaf8]" />
        </motion.div>

        <SculpturalElement />

        <div className="relative z-10 text-center px-4 md:px-6 w-full">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark max-w-3xl mx-auto p-8 md:p-16 rounded-2xl"
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl text-black leading-tight mb-6 md:mb-8">
              Designing Spaces That <br />
              <span className="italic">Tell Your Story.</span>
            </h1>
            <p className="text-neutral-600 text-base md:text-xl font-light mb-8 md:text-xl md:mb-10 max-w-xl mx-auto leading-relaxed">
              Studio Shar creates immersive architectural narratives for high-end residential and boutique commercial interiors.
            </p>
            
            <div className="relative inline-block group">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.2, 1.4],
                  transition: { 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "easeOut" 
                  }
                }}
                className="absolute inset-0 bg-black/30 rounded-full blur-xl pointer-events-none"
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(PageType.PROJECTS)}
                className="relative z-10 px-8 py-4 md:px-10 md:py-4 bg-black text-white text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full transition-shadow hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                Explore Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Action Card Section */}
      <section className="relative z-20 pt-12 pb-8 px-4 md:px-8">
        <SocialActionCard onNavigate={onNavigate} />
      </section>

      {/* Philosophy Preview */}
      <section className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl serif mb-6">Artistry in every detail.</h2>
            <p className="text-neutral-500 font-light leading-relaxed mb-8">
              We believe interior design is more than arrangement; it's the sculpting of atmosphere. At Studio Shar, we utilize light, volume, and material to craft environments that transcend the ordinary.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <span className="hidden md:block h-[1px] w-12 bg-black self-center" />
              <button 
                onClick={() => onNavigate(PageType.ABOUT)}
                className="text-[10px] md:text-xs uppercase tracking-widest font-medium hover:italic transition-all"
              >
                Our Philosophy
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" 
              alt="Detail" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Futuristic Glass Slider Section */}
      <section className="pb-24 md:pb-40 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="mb-12 md:mb-20 text-center">
            <h3 className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 mb-4">Aesthetics Manifest</h3>
            <div className="h-[1px] w-20 bg-neutral-200 mx-auto" />
          </div>

          <div className="relative w-full max-w-4xl min-h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Background Decorative Spheres */}
            <motion.div 
              animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-10 left-[10%] md:left-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-200/40 to-rose-300/20 blur-[2px] opacity-40 shadow-inner"
            />
            <motion.div 
              animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 right-[10%] md:right-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-[#ffe4e1]/60 to-[#ffb6c1]/30 blur-[4px] opacity-40 shadow-2xl"
            />

            {/* The Glass Slider Card Container */}
            <div className="relative z-10 w-full max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: 10 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full aspect-[4/5] md:aspect-[4/3] glass border-white/60 rounded-[30px] md:rounded-[40px] shadow-[0_40px_100px_-20px_rgba(255,182,193,0.3)] flex flex-col justify-between p-8 md:p-16 relative overflow-hidden group bg-gradient-to-br from-[#fff0f3]/90 via-white/50 to-[#ffdae9]/90"
                >
                  <motion.div 
                    animate={{ x: [-20, 30, -20], y: [-10, 20, -10], scale: [1, 1.15, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-32 h-32 md:w-48 md:h-48 bg-pink-300/30 blur-[40px] md:blur-[60px] rounded-full pointer-events-none"
                  />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h4 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-neutral-800 mb-1 md:mb-2">Philosophy</h4>
                      <p className="text-[8px] md:text-[10px] text-neutral-400 uppercase tracking-widest font-medium">0{currentMessageIndex + 1} / 05</p>
                    </div>
                  </div>

                  <div className="relative z-10 py-6">
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl md:text-5xl serif leading-tight text-neutral-900 mb-4"
                    >
                      {MESSAGES[currentMessageIndex].title}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-neutral-600 font-medium tracking-wide text-sm md:text-lg"
                    >
                      {MESSAGES[currentMessageIndex].subtitle}
                    </motion.p>
                  </div>

                  <div className="flex justify-between items-end relative z-10 pt-4 md:pt-8 border-t border-black/[0.05]">
                    <div className="flex gap-2">
                      <div className="px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-black/5 text-[7px] md:text-[9px] uppercase tracking-widest font-black bg-white/40">Besoke</div>
                    </div>
                    <div className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">
                      Studio Shar ©
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card Pagination Dots */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {MESSAGES.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentMessageIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${currentMessageIndex === i ? 'w-6 md:w-8 bg-neutral-800' : 'w-1 bg-neutral-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
