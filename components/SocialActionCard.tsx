
import React, { useState } from 'react';
import { motion as motionLib } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin, Briefcase, Star, Heart, CheckCircle2 } from 'lucide-react';
import { PageType } from '../types';

const motion = motionLib as any;

interface SocialActionCardProps {
  onNavigate: (page: PageType) => void;
}

const SocialActionCard: React.FC<SocialActionCardProps> = ({ onNavigate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center w-full"
    >
      {/* Outer Container - Soft Pink Matte Glass */}
      <div className="relative p-6 bg-gradient-to-br from-[#fff0f3]/60 via-white/40 to-[#ffe4e1]/60 backdrop-blur-3xl rounded-[48px] shadow-[0_40px_100px_-20px_rgba(255,182,193,0.3)] border border-white/60 w-full max-w-[420px] overflow-hidden group">
        
        {/* Interior Animated Blobs for "Motion inside the card" */}
        <motion.div 
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200/20 blur-[60px] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-rose-200/20 blur-[80px] rounded-full pointer-events-none"
        />

        {/* Profile Section - Inner Glass */}
        <div className="bg-white/50 backdrop-blur-md rounded-[36px] p-5 mb-5 border border-white/40 flex items-center justify-between relative overflow-hidden shadow-[inset_0_2px_10px_rgba(255,255,255,0.8)]">
          <div className="flex items-center gap-4 relative z-10">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-[28px] overflow-hidden bg-[#ffe4e1] border border-white/40 shadow-lg">
              <img 
                src="https://i.im.ge/eB89tT/PHOTO-2024-04-12-11-23-43-2.jpg" 
                alt="Sharon Sethi" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Details */}
            <div className="text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-neutral-900 font-bold text-lg tracking-tight">Sharon Sethi</span>
                <CheckCircle2 size={16} className="text-[#ff5c8d] fill-[#ff5c8d]/20" />
              </div>
              <p className="text-neutral-600 text-[11px] font-medium leading-tight mb-2">Founder of Studio Shar & Designer</p>
              <div className="flex items-center gap-1.5 bg-white/60 w-fit px-2 py-0.5 rounded-full border border-pink-100 shadow-sm">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-neutral-900 text-[11px] font-black">5.0</span>
                <span className="text-neutral-500 text-[10px] font-bold">({likesCount})</span>
              </div>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={handleLike}
            className={`transition-all relative z-10 p-3 rounded-2xl ${isLiked ? 'text-[#ff5c8d] bg-pink-50/50 shadow-inner' : 'text-neutral-400 hover:text-[#ff5c8d] bg-transparent'}`}
          >
            <Heart size={22} className={isLiked ? "fill-[#ff5c8d]" : ""} />
            {isLiked && (
              <motion.div 
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                className="absolute inset-0 bg-pink-400 rounded-full"
              />
            )}
          </motion.button>

          {/* Subtle liquid pink pulse in background */}
          <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-32 h-32 bg-[#ff5c8d]/20 blur-[40px] rounded-full pointer-events-none" 
          />
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center gap-2 relative z-10">
          {/* Projects Button (Active/Pink) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(PageType.PROJECTS)}
            className="flex-1 h-16 bg-gradient-to-br from-[#ff5c8d] to-[#ff2d6a] rounded-[24px] flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(255,92,141,0.4)] border border-white/20 transition-all relative overflow-hidden group/btn"
          >
            <Briefcase size={22} className="relative z-10" />
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-white/20 skew-x-[-20deg] pointer-events-none"
            />
          </motion.button>

          {/* Call Button */}
          <motion.a
            href="tel:+919818087469"
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.8)' }}
            className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-[24px] flex items-center justify-center text-neutral-800 border border-white shadow-sm transition-all"
          >
            <Phone size={22} />
          </motion.a>

          {/* Mail Button */}
          <motion.a
            href="mailto:shivam.one76@gmail.com"
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.8)' }}
            className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-[24px] flex items-center justify-center text-neutral-800 border border-white shadow-sm transition-all"
          >
            <Mail size={22} />
          </motion.a>

          {/* Instagram Button */}
          <motion.a
            href="https://www.instagram.com/mr_home_decor77/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.8)' }}
            className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-[24px] flex items-center justify-center text-neutral-800 border border-white shadow-sm transition-all"
          >
            <Instagram size={22} />
          </motion.a>

          {/* Location/Address Button */}
          <motion.button
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.8)' }}
            className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-[24px] flex items-center justify-center text-neutral-800 border border-white shadow-sm transition-all"
          >
            <MapPin size={22} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialActionCard;
