
import React from 'react';
import { motion as motionLib } from 'framer-motion';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props
const motion = motionLib as any;

const LIQUID_GALLERY_IMAGES = [
  {
    url: "https://i.im.ge/eB869G/a.kjla.jpg",
    label: "Tactile Warmth"
  },
  {
    url: "https://i.im.ge/eB8C4S/images.jpg",
    label: "Soft Geometry"
  },
  {
    url: "https://i.im.ge/eB8A3y/abssd.png",
    label: "Curated Essence"
  },
  {
    url: "https://i.im.ge/eB8yLJ/akncx.jpg",
    label: "Atmospheric Light"
  },
  {
    url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=1200",
    label: "Structural Art"
  }
];

const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.span
      className="inline-block"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const LiquidGlassFrame: React.FC<{ imageUrl: string, label: string, index: number }> = ({ imageUrl, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] rounded-[40px] shadow-2xl bg-neutral-100">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={imageUrl} 
          alt={label}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
        />
        
        {/* Subtle vignette on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="absolute bottom-8 left-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-white text-xs uppercase tracking-[0.3em] font-medium drop-shadow-md">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <div className="relative pt-40 px-8 min-h-screen overflow-hidden">
      {/* Dynamic Water Pink Background Gradient with Motion */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Pink Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-gradient-to-br from-[#fff0f3] via-[#ffdae9] to-transparent rounded-full blur-[120px] opacity-40"
        />
        <motion.div 
          animate={{ 
            x: [0, -150, 80, 0],
            y: [0, 120, -100, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-gradient-to-tr from-[#ffe4e1] via-[#ffb6c1] to-transparent rounded-full blur-[100px] opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [-50, 50, -50],
            y: [50, -50, 50],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-gradient-to-r from-white via-[#fff5f7] to-transparent rounded-full blur-[150px] opacity-50"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-32"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-neutral-400 mb-8 block">
            <TypingText text="Our Philosophy" />
          </span>
          <h1 className="text-5xl md:text-7xl serif leading-[1.1] mb-20 max-w-4xl">
            We create with empathy, placing <br />
            <span className="italic text-neutral-400">the human condition</span> <br />
            at the heart of every project.
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mt-20 items-start">
            {/* Studio Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="glass p-10 md:p-14 rounded-[40px] border-none shadow-[0_30px_60px_-15px_rgba(255,182,193,0.2)] bg-white/40 backdrop-blur-3xl"
            >
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-black/40">The Practice</h2>
              <p className="text-neutral-600 font-light leading-relaxed mb-6 text-lg">
                <span className="font-medium text-black">Studio Shar</span> is a practice-based space design and furniture manufacturing studio based in New Delhi, India. 
              </p>
              <p className="text-neutral-500 font-light leading-relaxed mb-6">
                We believe that process inspires product and the felt experience of a place is what makes it memorable. Our alternative approach to design and making creates indulgent spaces that defy liminality.
              </p>
              <p className="text-neutral-500 font-light leading-relaxed">
                In this fast-moving world, we strive to make people experience the immediate present tense in all its tangible glory, crafting environments that are as functional as they are artistic.
              </p>
            </motion.div>

            {/* Sharon Sethi Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-10"
            >
              <div className="flex items-center gap-6 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xl flex-shrink-0">
                  <img 
                    src="https://i.im.ge/eB89tT/PHOTO-2024-04-12-11-23-43-2.jpg"
                    alt="Sharon Sethi" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl serif">Sharon Sethi</h3>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Founder & Creative Lead</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-neutral-600 font-light leading-relaxed">
                  Sharon is a research-driven, autodidact interior designer with a career spanning over a decade. Her portfolio encompasses a versatile collection of Interior Design and Furniture Manufacturing projects across continents.
                </p>
                <p className="text-neutral-500 font-light leading-relaxed text-sm">
                  After graduating from the Academy of Art University, San Francisco and FIDM, Los Angeles, she spent 15 years working with several magazines, PR Agencies, and fashion labels in LA, including serving as a wardrobe stylist for distinct Hollywood names.
                </p>
                <p className="text-neutral-500 font-light leading-relaxed text-sm">
                  She returned to India in 2016, giving in to her creative calling for creating stunning interiors. Her work reflects a passion for innovative materials and a deep understanding of traditional and contemporary practices. Studio Shar represents her second successful entrepreneurial venture in the field.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Artistic Frames Gallery */}
        <div className="mb-40">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] w-20 bg-black/10" />
            <h2 className="text-xs uppercase tracking-[0.5em] font-medium text-neutral-400">Design Fragments</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {LIQUID_GALLERY_IMAGES.map((item, index) => (
              <LiquidGlassFrame 
                key={index} 
                imageUrl={item.url} 
                label={item.label} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[70vh] overflow-hidden rounded-[60px] mb-32 relative group px-8 z-10">
        <div className="w-full h-full overflow-hidden rounded-[60px] shadow-2xl">
          <motion.img 
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2400" 
            alt="Studio Atmosphere" 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf8]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-12 left-20 glass px-8 py-4 rounded-full border-white/20 bg-white/30 backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-900">New Delhi Studio • Furniture Manufacturing Facility</p>
        </div>
      </div>
    </div>
  );
};

export default About;
