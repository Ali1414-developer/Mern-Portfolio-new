import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  FileText,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { fadeInUp, fadeIn } from '../animations/variants';
import OrbitingTechProfile from '../components/OrbitingTechProfile';

export default function HeroSection({ siteSettings }) {
  const hasValidResume = Boolean(
    siteSettings?.resumeUrl &&
    siteSettings.resumeUrl !== '#' &&
    siteSettings.resumeUrl.trim().length > 0
  );

  return (
    <section id="hero" className="relative flex flex-col pt-12 sm:pt-16 pb-10 overflow-hidden">
      {/* Background Subtle Tech Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563eb18_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#36C5F0]/20 via-[#2563EB]/14 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Symmetrical 2-Column Hero: Left Identity & Actions, Right Orbiting Tech Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Core Identity, Story & Actions */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[rgba(37,99,235,0.20)] text-[#163B72] text-xs font-mono shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold text-[11px] sm:text-xs">Available for Hire &amp; Projects</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm sm:text-base font-bold tracking-wide text-[#2563EB] flex items-center justify-center lg:justify-start gap-2">
                <span>Ali Raza</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#EAF5FF] text-[#2563EB] border border-[#2563EB]/20">
                  Full Stack Engineer
                </span>
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight text-[#142B4A] leading-[1.15]">
                MERN Full Stack Developer <br />
                <span className="text-gradient-cyan">| ERP Developer</span>
              </h1>
            </div>

            <p className="text-[#536B86] text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
              I build modern web applications and business management systems with a focus on clean interfaces, practical functionality, and reliable backend architecture.
            </p>

            {/* Primary actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <motion.a
                whileHover={{ scale: 1.025, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="btn-primary px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 group cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#2563EB]/25"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.025, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="btn-secondary px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
              >
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>Contact Me</span>
              </motion.a>

              {hasValidResume && (
                <motion.a
                  whileHover={{ scale: 1.025, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={siteSettings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <span>Resume</span>
                </motion.a>
              )}
            </div>

            {/* Social Connect Bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono text-[#536B86] font-medium">Connect:</span>
              <motion.a
                whileHover={{ scale: 1.06, translateY: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://github.com/Ali1414-developer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ali Raza GitHub"
                className="p-2 rounded-xl bg-white border border-[rgba(37,99,235,0.18)] text-[#536B86] hover:text-[#2563EB] hover:border-[#2563EB]/40 shadow-2xs transition-all flex items-center gap-1.5 text-xs font-mono font-medium"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.06, translateY: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://www.linkedin.com/in/ali-raza-baloch/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ali Raza LinkedIn"
                className="p-2 rounded-xl bg-white border border-[rgba(37,99,235,0.18)] text-[#536B86] hover:text-[#2563EB] hover:border-[#2563EB]/40 shadow-2xs transition-all flex items-center gap-1.5 text-xs font-mono font-medium"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span className="hidden sm:inline">LinkedIn</span>
              </motion.a>
            </div>

          </motion.div>

          {/* Right Column: Orbiting Tech Stack Profile Visual */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2"
          >
            <OrbitingTechProfile />
          </motion.div>

        </div>

        {/* Bottom Scroll Exploration Bridge */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-8 hidden sm:flex flex-col items-center gap-1 text-[11px] font-mono text-[#536B86] cursor-pointer hover:text-[#2563EB] transition-colors"
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Scroll to explore portfolio</span>
          <ChevronDown className="w-4 h-4 text-[#2563EB]" />
        </motion.div>
      </div>
    </section>
  );
}
