
import React, { useState, useRef } from 'react';
import { motion as motionLib, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Maximize2, Move, ZoomIn, Box } from 'lucide-react';

const motion = motionLib as any;

const Interactive3DPreview: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  // Maps mouse position to rotation degrees - slightly more subtle tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        <div className="max-w-xl text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-neutral-400 font-bold mb-3 md:mb-4 block"
          >
            Digital Prototyping
          </motion.span>
          <h2 className="text-3xl md:text-6xl serif text-neutral-900 leading-tight">
            The <span className="italic">Void</span> Pavilion
          </h2>
          <p className="text-neutral-500 font-light mt-4 md:mt-6 text-base md:text-lg max-w-lg leading-relaxed">
            Hover over the viewport to engage the interactive camera system. Our engine allows for sub-millimeter inspection of every architectural detail.
          </p>
        </div>
      </div>

      {/* 3D Viewport Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-video md:aspect-[21/9] rounded-[40px] md:rounded-[64px] overflow-hidden bg-[#0a0a0a] perspective-[2500px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] cursor-crosshair group transition-all duration-700 ring-1 ring-white/10"
      >
        {/* Render Layer */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale: zoom,
            transformStyle: "preserve-3d"
          }}
          className="w-full h-full relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=90&w=2400" 
            alt="3D Render" 
            className="w-full h-full object-cover"
          />
          
          {/* Depth Overlays */}
          <motion.div 
            style={{ translateZ: 50 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" 
          />
          
          {/* Interactive POI */}
          <motion.div 
            style={{ translateZ: 200, top: '40%', left: '60%' }}
            className="absolute"
          >
            <div className="relative group/poi">
              <motion.div 
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 bg-white rounded-full blur-sm"
              />
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] border-2 border-black/20" />
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic HUD Elements (Only visible on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none z-20 p-6 md:p-10"
            >
              {/* Top Bar HUD */}
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">Live Engine / Orbital Active</span>
                </div>

                <div className="pointer-events-auto">
                  <div className="glass px-5 py-2.5 rounded-full flex items-center gap-4 border border-white/10 bg-black/40 backdrop-blur-md group/slider">
                    <ZoomIn size={14} className="text-white/60 group-hover/slider:text-white transition-colors" />
                    <input 
                      type="range" 
                      min="1" 
                      max="1.8" 
                      step="0.01" 
                      value={zoom} 
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-24 md:w-40 accent-white cursor-pointer h-1.5 rounded-full bg-white/20 appearance-none transition-all"
                    />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/80 min-w-[35px]">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom HUD - Reticle Elements */}
              <div className="absolute bottom-10 left-10 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Box size={14} className="text-white/40" />
                  <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">Geometric Logic: 0.984</span>
                </div>
                <div className="flex items-center gap-3">
                  <Move size={14} className="text-white/40" />
                  <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">Camera Bias: Calculated</span>
                </div>
              </div>

              {/* Reticle Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center opacity-30">
                <div className="w-[1px] h-4 bg-white" />
                <div className="w-4 h-[1px] bg-white absolute" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static HUD (Minimal) */}
        {!isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute bottom-8 right-8 flex items-center gap-3 pointer-events-none"
          >
            <Move size={16} className="text-white" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white">Hover to Explore</span>
          </motion.div>
        )}

        {/* Scanline / CRT / Grain Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay">
          <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>
      </div>

      {/* Tech Stack Footer */}
      <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-24 opacity-20 grayscale transition-all hover:opacity-40 hover:grayscale-0 duration-1000">
        {['Autodesk VRED', 'Rhinoceros 7', 'Unreal Engine 5.3', 'V-Ray 6'].map((tech) => (
          <span key={tech} className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-black whitespace-nowrap">{tech}</span>
        ))}
      </div>
    </div>
  );
};

export default Interactive3DPreview;
