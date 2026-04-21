
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SculpturalElement: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 perspective pointer-events-none opacity-40">
      <motion.div
        style={{ rotateY, rotateX, y: yTranslate }}
        className="w-full h-full relative"
      >
        {/* Abstract Layered Geometry */}
        <div className="absolute inset-0 border-[0.5px] border-black/20 rounded-[40%] blur-[2px] transform rotate-45" />
        <div className="absolute inset-4 border-[0.5px] border-black/10 rounded-[40%] transform -rotate-12" />
        <div className="absolute inset-10 bg-gradient-to-br from-stone-200/40 to-white/10 rounded-[35%] backdrop-blur-sm" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-black/10 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </motion.div>
    </div>
  );
};

export default SculpturalElement;
