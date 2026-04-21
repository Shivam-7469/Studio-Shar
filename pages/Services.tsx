
import React, { useState } from 'react';
import { motion as motionLib, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props
const motion = motionLib as any;

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="pt-32 md:pt-40 px-4 md:px-8 pb-32 min-h-screen bg-[#fcfaf8]">
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl serif mb-6"
        >
          Curating <span className="italic">Experiences</span>
        </motion.h1>
      </div>

      {/* Futuristic Navigation Bar - Refined Matte Glass Capsule */}
      <div className="flex flex-col items-center gap-12 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#1a1a1a]/85 backdrop-blur-[40px] p-1 md:p-1.5 rounded-full flex items-center gap-0.5 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.4)] border border-white/5 overflow-x-auto no-scrollbar max-w-[95vw]"
        >
          {/* Subtle depth lighting for the matte background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full pointer-events-none" />

          {SERVICES.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon];
            const isActive = activeTab === index;
            
            return (
              <button
                key={service.title}
                onClick={() => setActiveTab(index)}
                className="relative px-4 md:px-7 py-2.5 md:py-3 rounded-full flex flex-col items-center justify-center transition-all group z-10 flex-shrink-0"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/15 backdrop-blur-lg border border-white/20 rounded-full shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                  >
                    {/* Inner highlight for glass button depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-60" />
                  </motion.div>
                )}
                
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className={`transition-all duration-300 ${isActive ? 'text-white scale-100' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                    {IconComponent && <IconComponent size={16} className="md:size-5 stroke-[2.5px]" />}
                  </div>
                  <span className={`text-[7px] md:text-[8px] mt-1 md:mt-1.5 uppercase tracking-[0.2em] font-black transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                    {service.title.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Detailed Service Card Display */}
        <div className="w-full max-w-5xl mx-auto px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row min-h-[500px] md:min-h-[550px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-white/40"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.5 }}
                  src={`https://images.unsplash.com/photo-${[
                    '1618221195710-dd6b41faaea6',
                    '1497366216548-37526070297c',
                    '1600210492486-724fe5c67fb0',
                    '1513519247388-4a26d18b91f0',
                    '1524758631624-e2822e304c36',
                    '1600585154340-be6161a56a0c'
                  ][activeTab]}?auto=format&fit=crop&q=90&w=1200`}
                  alt={SERVICES[activeTab].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                
                {/* Floating UI element for texture */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 glass px-4 py-1.5 md:px-6 md:py-2 rounded-full border-white/20 bg-black/10">
                   <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-black text-white/90">Refining Space</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-left bg-white/70 backdrop-blur-3xl">
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-neutral-400 font-black mb-4 md:mb-6 block">Service 0{activeTab + 1}</span>
                <h2 className="text-3xl md:text-5xl serif mb-6 md:mb-8 leading-tight text-neutral-900">
                  {SERVICES[activeTab].title}
                </h2>
                <p className="text-neutral-600 font-light leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
                  {SERVICES[activeTab].description}
                </p>
                <div className="space-y-3 md:space-y-4 mb-10 md:mb-12">
                  {['Personalized consultation', 'High-end sourcing', '3D Visualization'].map((feature) => (
                    <div key={feature} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">{feature}</span>
                    </div>
                  ))}
                </div>
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black text-black"
                >
                  Request Information
                  <div className="w-12 md:w-16 h-[1.5px] bg-black transition-all group-hover:w-20 origin-left" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer text */}
      <div className="text-center mt-20 md:mt-32">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-neutral-300 font-black">Excellence in every square foot</p>
      </div>
    </div>
  );
};

export default Services;
