import React, { useState } from 'react';
import { motion } from 'motion/react';
import aliRazaCutout from '../assets/ali-raza-cutout.png';

// ── Crisp High-Fidelity Tech Stack SVGs ──────────────────────────────────
const TechIcons = {
  react: (
    <svg viewBox="0 0 115.3 100" className="w-6 h-6 sm:w-7 sm:h-7">
      <ellipse cx="57.65" cy="50" rx="14.8" ry="46.7" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(30 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="14.8" ry="46.7" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(90 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="14.8" ry="46.7" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(150 57.65 50)" />
      <circle cx="57.65" cy="50" r="9.5" fill="#61DAFB" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M16 2.5L3 10v12l13 7.5 13-7.5V10L16 2.5z" fill="#539E43" />
      <path d="M16 5.8l9.8 5.7v11L16 28.2 6.2 22.5v-11L16 5.8z" fill="#142B4A" />
      <path d="M16 8.5l7 4v8l-7 4-7-4v-8l7-4z" fill="#68BD45" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <rect width="32" height="32" rx="7" fill="#142B4A" />
      <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif">ex</text>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M16.5 2C16.5 2 11 9 11 16.5c0 4.5 3 8 5.5 11.5.5.8 1.5.8 2 0 2.5-3.5 5.5-7 5.5-11.5C24 9 16.5 2 16.5 2z" fill="#47A248" />
      <path d="M16.5 2v26c-.3.3-.6.5-1 .5-.5 0-1-.5-1-1 0-4.5-3-8-3-11 0-7 5-14.5 5-14.5z" fill="#4BAE4F" opacity="0.6" />
      <path d="M16 28.5c-.3.8-.7 1.5-1 2.5.3 0 .7 0 1-.5.3-.5.7-1.2 1-2h-1z" fill="#B8C4C2" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M9 13.5c1.5-3 3.5-4 6-3 1.5.6 2.5 1.7 3.7 2.8 2 2 4.2 4.2 8.3 4.2 4 0 6.5-2.5 7.5-6.5-1.5 3-3.5 4-6 3-1.5-.6-2.5-1.7-3.7-2.8-2-2-4.2-4.2-8.3-4.2-4 0-6.5 2.5-7.5 6.5zm-7 8c1.5-3 3.5-4 6-3 1.5.6 2.5 1.7 3.7 2.8 2 2 4.2 4.2 8.3 4.2 4 0 6.5-2.5 7.5-6.5-1.5 3-3.5 4-6 3-1.5-.6-2.5-1.7-3.7-2.8-2-2-4.2-4.2-8.3-4.2-4 0-6.5 2.5-7.5 6.5z" fill="#38BDF8" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <rect width="32" height="32" rx="6" fill="#F7DF1E" />
      <path d="M18.5 24.5c.8.5 1.7.8 2.7.8 1.4 0 2.3-.7 2.3-1.7 0-1.2-.9-1.6-2.5-2.3-2.3-.9-3.7-2-3.7-3.9 0-2 1.6-3.6 4-3.6 1.1 0 2.1.3 2.9.8l-.8 1.9c-.7-.4-1.4-.7-2.1-.7-1.1 0-1.8.6-1.8 1.4 0 1 .7 1.4 2.2 2 2.5 1 4 2.1 4 4.2 0 2.3-1.8 3.8-4.5 3.8-1.4 0-2.6-.4-3.5-1l.8-2.1zm-8.8 2.2c-.6.3-1.4.5-2.2.5-1.8 0-2.8-1-2.8-2.9V14h2.4v10.1c0 .7.3 1.1.9 1.1.4 0 .7-.1.9-.2l.8 1.9z" fill="#000000" />
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <rect width="32" height="32" rx="7" fill="#00599C" />
      <text x="32%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">C</text>
      <text x="64%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#00B4D8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">++</text>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M15.8 3c-4.4 0-4.1 1.9-4.1 1.9l.01 2h4.2v.6H9.7s-2.8-.3-2.8 4.1 2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.2s2.4.04 2.4-2.3V5.4S20.3 3 15.8 3zm-2.4 1.3a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB" />
      <path d="M16.2 29c4.4 0 4.1-1.9 4.1-1.9l-.01-2h-4.2v-.6h6.2s2.8.3 2.8-4.1-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5h-4.2s-2.4-.04-2.4 2.3v3.6s-.3 2.4 4.2 2.4zm2.4-1.3a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43E" />
    </svg>
  ),
};

// ── Outer Ring Items (5 techs) ────────────────────────────────────────────
const outerTechs = [
  { name: 'React 19',  icon: TechIcons.react,      angle: 0 },
  { name: 'Node.js',   icon: TechIcons.nodejs,     angle: 72 },
  { name: 'MongoDB',   icon: TechIcons.mongodb,    angle: 144 },
  { name: 'Express',   icon: TechIcons.express,    angle: 216 },
  { name: 'Tailwind',  icon: TechIcons.tailwind,   angle: 288 },
];

// ── Inner Ring Items (3 techs) ────────────────────────────────────────────
const innerTechs = [
  { name: 'JavaScript', icon: TechIcons.javascript, angle: 30 },
  { name: 'C++ / OOP',  icon: TechIcons.cpp,        angle: 150 },
  { name: 'Python',     icon: TechIcons.python,     angle: 270 },
];

export default function OrbitingTechProfile() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Ambient Radial Glow Backdrop ── */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#36C5F0]/25 via-[#2563EB]/18 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ── Outer Orbit Track (Dotted Ring) ── */}
      <div className="absolute w-[96%] h-[96%] rounded-full border border-dashed border-[#2563EB]/25 pointer-events-none" />

      {/* ── Outer Orbit Rotating Ring ── */}
      <motion.div
        className="absolute z-20 w-[96%] h-[96%] rounded-full pointer-events-none"
        animate={{ rotate: isPaused ? undefined : 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {outerTechs.map((tech, idx) => {
          const rad = (tech.angle * Math.PI) / 180;
          const leftPercent = 50 + 50 * Math.cos(rad);
          const topPercent  = 50 + 50 * Math.sin(rad);

          return (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              {/* Counter-rotation to keep icon & text upright */}
              <motion.div
                className="flex flex-col items-center gap-1 group cursor-pointer"
                animate={{ rotate: isPaused ? undefined : -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 border border-[rgba(37,99,235,0.22)] shadow-md hover:shadow-lg hover:border-[#2563EB]/60 hover:scale-115 transition-all flex items-center justify-center backdrop-blur-md p-2">
                  {tech.icon}
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#142B4A] bg-white/95 px-1.5 py-0.5 rounded-md border border-[rgba(37,99,235,0.15)] shadow-2xs whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ── Inner Orbit Track (Dotted Ring) ── */}
      <div className="absolute w-[74%] h-[74%] rounded-full border border-dashed border-[#2563EB]/35 pointer-events-none" />

      {/* ── Inner Orbit Rotating Ring (Rotates in reverse direction) ── */}
      <motion.div
        className="absolute z-20 w-[74%] h-[74%] rounded-full pointer-events-none"
        animate={{ rotate: isPaused ? undefined : -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {innerTechs.map((tech, idx) => {
          const rad = (tech.angle * Math.PI) / 180;
          const leftPercent = 50 + 50 * Math.cos(rad);
          const topPercent  = 50 + 50 * Math.sin(rad);

          return (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              {/* Counter-rotation to keep icon & text upright */}
              <motion.div
                className="flex flex-col items-center gap-1 group cursor-pointer"
                animate={{ rotate: isPaused ? undefined : 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/95 border border-[rgba(37,99,235,0.22)] shadow-md hover:shadow-lg hover:border-[#2563EB]/60 hover:scale-115 transition-all flex items-center justify-center backdrop-blur-md p-2">
                  {tech.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-[#142B4A] bg-white/95 px-1.5 py-0.5 rounded-md border border-[rgba(37,99,235,0.15)] shadow-2xs whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ── Center Portrait (Transparent Background Cutout of Ali Raza) ── */}
      <div className="relative z-10 w-[52%] h-[52%] flex items-center justify-center">
        {/* Soft circular aura behind Ali */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#2563EB]/15 via-[#36C5F0]/15 to-transparent blur-md -z-10" />
        <img
          src={aliRazaCutout}
          alt="Ali Raza - MERN & ERP Developer"
          className="w-full h-full object-contain pointer-events-none drop-shadow-xl"
          draggable={false}
        />
      </div>
    </div>
  );
}
