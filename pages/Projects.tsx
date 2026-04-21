
import React, { useState } from 'react';
import { motion as motionLib, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import Interactive3DPreview from '../components/Interactive3DPreview';
import CinematicProjectView from '../components/CinematicProjectView';
import { Project } from '../types';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props
const motion = motionLib as any;

const ProjectDescription: React.FC<{ description: string }> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = description.length > 100;

  return (
    <div className="mb-6 md:mb-10">
      <motion.div
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
        className="relative overflow-hidden"
      >
        <p className={`text-neutral-700 font-medium leading-relaxed text-base md:text-lg transition-all duration-500 ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
          {description}
        </p>
      </motion.div>
      
      {isLong && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 hover:text-black transition-colors group"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              Read More <ChevronDown size={12} className="transition-transform group-hover:translate-y-0.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="pt-24 md:pt-32 px-4 md:px-8 pb-20">
      {/* Cinematic View Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200]"
          >
            <CinematicProjectView 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto mb-16 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl serif mb-4"
        >
          Selected <span className="italic">Works</span>
        </motion.h1>
        <p className="text-neutral-600 font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs drop-shadow-sm">A curation of high-end architectural explorations</p>
      </div>

      <div className="space-y-24 md:space-y-40">
        {PROJECTS.map((project, index) => (
          <motion.section 
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-24 cursor-pointer`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex-1 w-full overflow-hidden rounded-[20px] md:rounded-[40px] group shadow-xl">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full aspect-video md:aspect-[16/10] object-cover"
              />
            </div>
            <div className="flex-1 w-full max-w-lg px-2 md:px-0">
              <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-3 md:mb-4 block font-black">
                {project.category} / 0{index + 1}
              </span>
              <h2 className="text-3xl md:text-6xl serif mb-4 md:mb-8 leading-tight text-neutral-900">{project.title}</h2>
              
              <ProjectDescription description={project.description} />
              
              <button 
                className="group flex items-center gap-4 md:gap-6 text-[10px] uppercase tracking-[0.4em] font-black"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
              >
                View Case Study
                <div className="w-8 md:w-10 h-[2px] bg-black transition-all group-hover:w-20" />
              </button>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Interactive 3D Render Preview Section */}
      <Interactive3DPreview />

      {/* Enhanced UI Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-32 md:mt-60 mb-20 px-2 md:px-8"
      >
        <div className="max-w-5xl mx-auto relative glass p-8 md:p-24 rounded-[40px] md:rounded-[80px] overflow-hidden text-center bg-white/40 border-black/5 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
            {[400, 600, 800].map((size) => (
              <div 
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black rounded-full"
                style={{ width: size, height: size }}
              />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-md mb-8 md:mb-12 border border-black/5"
          >
            <span className="text-base md:text-xl">✨</span>
            <span className="text-[9px] md:text-[11px] uppercase tracking-wider font-black text-black">Elevate Living</span>
          </motion.div>

          <div className="relative mb-12 md:mb-20 inline-block px-4">
            <h2 className="text-3xl md:text-8xl font-semibold text-neutral-900 leading-tight md:leading-[1] tracking-tight">
              From raw space <br className="hidden md:block" /> to <span className="text-neutral-500 italic serif">bespoke</span> <br /> mastery
            </h2>
          </div>

          {/* Floating Points Cards */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 mb-16 md:mb-24 max-w-3xl mx-auto px-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 glass p-5 md:p-8 rounded-[24px] md:rounded-[40px] shadow-xl border border-white flex items-center gap-4 md:gap-6 bg-white/95"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=300" alt="Empty Room" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-black text-lg md:text-xl text-neutral-900">Point A</p>
                <p className="text-[8px] md:text-[10px] text-neutral-500 font-black uppercase tracking-[0.2em]">Uninspired</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 glass p-5 md:p-8 rounded-[24px] md:rounded-[40px] shadow-xl border border-white flex items-center gap-4 md:gap-6 bg-white/95"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shadow-2xl flex-shrink-0 ring-4 ring-neutral-900/10">
                <img src="https://i.im.ge/2026/01/11/G7EfPK.Appartement-.jpeg" alt="Styled Room" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-black text-lg md:text-xl text-neutral-900">Point B</p>
                <p className="text-[8px] md:text-[10px] text-neutral-500 font-black uppercase tracking-[0.2em]">Studio Shar</p>
              </div>
            </motion.div>
          </div>

          {/* Result Cards Visual */}
          <div className="relative h-48 md:h-96 flex justify-center perspective-[2000px]">
            <div className="absolute bottom-0 w-full md:w-[500px] h-24 md:h-48 bg-white rounded-t-[30px] md:rounded-t-[50px] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.1)] border-x border-t border-black/5 flex items-end justify-center pb-4 md:pb-8 z-0">
               <div className="w-16 md:w-24 h-1.5 md:h-2 bg-neutral-100 rounded-full opacity-60" />
            </div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: -40, opacity: 1, rotate: -6 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-4 left-4 md:left-[15%] w-36 md:w-64 bg-white rounded-[20px] md:rounded-[40px] shadow-2xl border border-black/[0.05] p-4 md:p-6 text-left z-10 overflow-hidden"
            >
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=200" alt="Material" className="w-full h-full object-cover" />
                </div>
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-black">Draft</span>
              </div>
              <div className="text-xl md:text-4xl font-black text-neutral-900">$0</div>
            </motion.div>

            <motion.div 
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: -70, opacity: 1, rotate: 3 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-4 right-4 md:right-[15%] w-40 md:w-72 bg-white rounded-[24px] md:rounded-[50px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)] border border-black/[0.05] p-5 md:p-8 text-left z-20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-black">Refined</span>
                <Sparkles size={14} className="text-amber-400" />
              </div>
              
              <div className="flex items-center gap-3 md:gap-5">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                  <img src="https://i.im.ge/2026/01/11/G7ERLS.Luxury-Decore.jpeg" alt="Luxury" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-lg md:text-3xl font-black text-neutral-950">$10k+</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Projects;
