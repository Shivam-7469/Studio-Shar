
import React from 'react';
import { motion as motionLib } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin, ArrowUpRight, Facebook, Twitter } from 'lucide-react';
import { PageType } from '../types';

const motion = motionLib as any;

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navLinks = [
    { label: 'About', value: PageType.ABOUT },
    { label: 'Projects', value: PageType.PROJECTS },
    { label: 'Services', value: PageType.SERVICES },
    { label: 'Contact', value: PageType.CONTACT },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/mr_home_decor77/', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative mt-20 md:mt-40 overflow-hidden pt-20 pb-10">
      {/* Decorative glass background element */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#fcfaf8] to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => onNavigate(PageType.HOME)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/60 shadow-lg transition-transform duration-500 group-hover:scale-110">
                <img 
                  src="https://i.im.ge/eB8aup/1.jpg"
                  alt="Studio Shar Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-2xl serif font-bold tracking-tighter">
                Studio Shar
              </div>
            </div>
            <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-[240px]">
              Sculpting atmospheric narratives through intentional design and architectural poetry.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Important Links</h4>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.value}>
                  <button
                    onClick={() => onNavigate(link.value)}
                    className="group flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Get in Touch</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-black/30 mt-0.5" />
                <a href="mailto:hello@studioshar.com" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
                  hello@studioshar.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-black/30 mt-0.5" />
                <a href="tel:+12125550198" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">
                  +1 (212) 555-0198
                </a>
              </div>
            </div>
          </div>

          {/* Address Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Studio Location</h4>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-black/30 mt-0.5" />
              <p className="text-sm font-medium text-neutral-600 leading-relaxed">
                Suite 402, The Obsidian Plaza<br />
                Design District, NY 10011
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">
            © 2026 Studio Shar — All Rights Reserved
          </p>
          <div className="flex gap-8">
            <button className="text-[9px] uppercase tracking-widest font-black text-neutral-400 hover:text-black transition-colors">Privacy Policy</button>
            <button className="text-[9px] uppercase tracking-widest font-black text-neutral-400 hover:text-black transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
