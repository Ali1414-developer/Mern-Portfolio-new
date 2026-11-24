import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-[rgba(37,99,235,0.14)] bg-[#EAF5FF] py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Identity info */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#36C5F0] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                AR
              </div>
              <div>
                <span className="font-bold text-sm text-[#142B4A]">Ali Raza</span>
                <span className="text-xs text-[#536B86] block">
                  MERN Full Stack Developer | ERP Developer
                </span>
              </div>
            </div>

            {/* Socials & Top jump */}
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.08, translateY: -2 }}
                whileTap={{ scale: 0.94 }}
                href="https://github.com/Ali1414-developer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ali Raza GitHub"
                className="p-2.5 rounded-xl bg-white border border-[rgba(37,99,235,0.16)] text-[#536B86] hover:text-[#2563EB] hover:border-[#2563EB]/40 shadow-xs transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.08, translateY: -2 }}
                whileTap={{ scale: 0.94 }}
                href="https://www.linkedin.com/in/ali-raza-baloch/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ali Raza LinkedIn"
                className="p-2.5 rounded-xl bg-white border border-[rgba(37,99,235,0.16)] text-[#536B86] hover:text-[#2563EB] hover:border-[#2563EB]/40 shadow-xs transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.08, translateY: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={scrollToTop}
                title="Back to Top"
                className="p-2.5 rounded-xl bg-[#DCEEFF] text-[#2563EB] border border-[rgba(37,99,235,0.20)] hover:bg-[#2563EB] hover:text-white transition-all ml-1 cursor-pointer shadow-xs"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(37,99,235,0.10)] flex flex-col sm:flex-row items-center justify-between text-xs text-[#536B86] gap-2">
            <p>© {new Date().getFullYear()} Ali Raza. All rights reserved.</p>
            <p className="font-mono text-[11px]">
              Air University Multan • Single-Repo Vercel Architecture
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Indicator for Long Scroll Exploration */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            whileHover={{ scale: 1.1, translateY: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white/95 text-[#2563EB] border border-[rgba(37,99,235,0.25)] shadow-xl shadow-[#2563EB]/15 backdrop-blur-md cursor-pointer hover:border-[#2563EB]/60 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
