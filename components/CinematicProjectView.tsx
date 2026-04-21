
import React, { useEffect } from 'react';
import { motion as motionLib, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ArrowRight, ArrowDown } from 'lucide-react';
import { Project } from '../types';

const motion = motionLib as any;

interface CinematicProjectViewProps {
  project: Project | null;
  onClose: () => void;
}

const CinematicProjectView: React.FC<CinematicProjectViewProps> = ({ project, onClose }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Lock scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-white">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen"
        >
          {/* Top Navigation */}
          <nav className="fixed top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-[210] pointer-events-none">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={onClose}
              className="pointer-events-auto glass px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 md:gap-3 border-black/5 group"
            >
              <X size={14} className="transition-transform group-hover:rotate-90" />
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black">Close</span>
            </motion.button>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black text-neutral-400 hidden sm:block"
            >
              Editorial / {project.category}
            </motion.div>
          </nav>

          {/* Hero Section */}
          <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden px-4">
            <motion.div 
              style={{ y: yParallax }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
            </motion.div>

            <motion.div 
              style={{ opacity: opacityFade }}
              className="relative z-10 text-center text-white w-full"
            >
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-black block mb-4 md:mb-6 drop-shadow-lg"
              >
                Project Focus
              </motion.span>
              <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="text-5xl md:text-8xl lg:text-[12rem] serif leading-none mb-6 md:mb-10 drop-shadow-2xl"
              >
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'italic' : ''}>{word} </span>
                ))}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4"
              >
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-white/60">Scroll</span>
                <ArrowDown size={16} className="animate-bounce text-white/60" />
              </motion.div>
            </motion.div>
          </section>

          {/* Body Content */}
          <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
              {/* Metadata Column */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-start gap-8 border-b lg:border-b-0 lg:border-l border-black/5 pb-8 lg:pb-0 lg:pl-8 sticky top-24 lg:top-40 bg-white/80 backdrop-blur-md z-10 lg:z-0">
                <div>
                  <h4 className="text-[8px] md:text-[10px] uppercase tracking-widest font-black text-neutral-400 mb-1 md:mb-2">Location</h4>
                  <p className="text-xs md:text-sm font-bold text-neutral-900">Manhattan, NY</p>
                </div>
                <div>
                  <h4 className="text-[8px] md:text-[10px] uppercase tracking-widest font-black text-neutral-400 mb-1 md:mb-2">Scale</h4>
                  <p className="text-xs md:text-sm font-bold text-neutral-900">4,200 SQ FT</p>
                </div>
              </div>

              {/* Narrative Column */}
              <div className="lg:col-span-7">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-400 mb-6 md:mb-10 block">
                  The Brief
                </h3>
                <p className="text-2xl md:text-5xl serif leading-tight text-neutral-900 mb-8 md:mb-12">
                  A sanctuary designed around the concept of <span className="italic">fluid permanence.</span>
                </p>
                <div className="space-y-6 md:space-y-8 text-base md:text-lg font-light text-neutral-600 leading-relaxed">
                  <p>{project.description}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-3">
                <div className="bg-neutral-50 p-6 md:p-8 rounded-[30px] md:rounded-[40px] border border-black/5 italic text-neutral-500 font-light text-sm md:text-base">
                  "Space is not a void to be filled, but a volume to be sculpted."
                  <span className="block mt-4 text-[9px] uppercase tracking-widest font-black not-italic text-neutral-900">— Sharon Sethi</span>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="py-12 md:py-20 bg-neutral-50">
            <div className="flex overflow-x-auto gap-4 md:gap-8 px-6 md:px-8 pb-6 no-scrollbar">
              {[
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
                "https://images.unsplash.com/photo-1497366216548-37526070297c"
              ].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-[85vw] md:w-[45vw] aspect-video rounded-[30px] md:rounded-[60px] overflow-hidden shadow-2xl">
                  <img src={`${img}?auto=format&fit=crop&q=90&w=1200`} className="w-full h-full object-cover" alt={`Detail ${i}`} />
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-24 md:py-40 px-6 md:px-8 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl serif mb-8 md:mb-10">Refined Living.</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={onClose}
              className="px-8 py-4 md:px-12 md:py-6 bg-black text-white rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black flex items-center gap-4 mx-auto"
            >
              Next Project <ArrowRight size={14} />
            </motion.button>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CinematicProjectView;
