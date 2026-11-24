import React from 'react';
import { motion } from 'motion/react';
import { fadeInUp } from '../animations/variants';

export default function SectionHeader({ subtitle, title, description, align = 'center' }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`mb-14 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'}`}
    >
      {subtitle && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-[#DCEEFF] text-[#2563EB] border border-[rgba(37,99,235,0.20)] shadow-xs ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#36C5F0] animate-pulse"></span>
          {subtitle}
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#142B4A] mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-[#536B86] text-base md:text-lg leading-relaxed font-normal">
          {description}
        </p>
      )}
    </motion.div>
  );
}
