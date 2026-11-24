import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Lock, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Skills', href: '/#skills', id: 'skills' },
  { label: 'Projects', href: '/#projects', id: 'projects' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection when on homepage
      if (location.pathname === '/') {
        const scrollPosition = window.scrollY + 200;
        let current = '';
        for (const item of navItems) {
          const el = document.getElementById(item.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              current = item.id;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const elementId = href.replace('/#', '');
      const elem = document.getElementById(elementId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[rgba(37,99,235,0.12)] py-3 shadow-xs shadow-[#163B72]/05'
          : 'bg-transparent py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#36C5F0] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-[#2563EB]/25 transition-transform"
            >
              AR
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
                Ali Raza
              </span>
              <span className="text-[10px] font-mono text-[#536B86] font-medium">
                MERN &amp; ERP Dev
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Animated Active Pill Indicator */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/85 border border-[rgba(37,99,235,0.14)] backdrop-blur-xl shadow-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    isActive ? 'text-[#142B4A]' : 'text-[#536B86] hover:text-[#142B4A]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#DCEEFF]/70 rounded-full border border-[rgba(37,99,235,0.20)] -z-10"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="p-2 rounded-xl text-[#536B86] hover:text-[#2563EB] hover:bg-[#DCEEFF]/60 border border-transparent hover:border-[rgba(37,99,235,0.2)] transition-all"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <motion.a
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleNavClick('/#contact');
                }
              }}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md cursor-pointer"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/admin/login"
              title="Admin Portal"
              className="p-2 rounded-xl text-[#536B86] hover:text-[#142B4A] bg-white border border-[rgba(37,99,235,0.18)]"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#142B4A] hover:text-[#2563EB] bg-white border border-[rgba(37,99,235,0.18)] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Staggered Link Entrances */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-b border-[rgba(37,99,235,0.15)] bg-white/98 backdrop-blur-xl px-4 py-5 space-y-3 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.25 }}
                  href={item.href}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                    }
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? 'text-[#2563EB] bg-[#EAF5FF] font-bold'
                      : 'text-[#142B4A] hover:text-[#2563EB] hover:bg-[#EAF5FF]'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </motion.a>
              ))}
            </div>

            <div className="pt-4 border-t border-[rgba(37,99,235,0.12)] flex items-center justify-between gap-3">
              <a
                href="https://github.com/Ali1414-developer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#536B86] hover:text-[#142B4A] font-mono"
              >
                <Github className="w-4 h-4 text-[#2563EB]" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/ali-raza-baloch/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#536B86] hover:text-[#142B4A] font-mono"
              >
                <Linkedin className="w-4 h-4 text-[#36C5F0]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
