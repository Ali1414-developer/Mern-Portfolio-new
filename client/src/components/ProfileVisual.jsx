import React from 'react';
import { motion } from 'motion/react';
import { Server, Database, Code2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import aliRazaImg from '../assets/ali-raza.png';

export default function ProfileVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background ambient lighting behind image */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#2563EB]/25 via-[#36C5F0]/25 to-[#1D4ED8]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse -z-10"></div>

      {/* Main Profile Card Container */}
      <div className="relative rounded-3xl border border-[#1E3A56] bg-gradient-to-b from-[#10263D] to-[#091A2C] p-3 sm:p-4 shadow-2xl backdrop-blur-xl overflow-hidden group">
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Photo Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#1E3A56] bg-[#071525]">
          <img
            src={aliRazaImg}
            alt="Ali Raza - MERN Full Stack Developer & ERP Developer"
            className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />

          {/* Bottom gradient shadow for smooth transition */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#091A2C] via-[#091A2C]/60 to-transparent pointer-events-none"></div>

          {/* Embedded Bottom Tagline */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-[#071525]/90 border border-[#1E3A56] text-[#E2E8F0] backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Ali Raza</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[rgba(168,85,247,0.18)] border border-[rgba(168,85,247,0.35)] text-[#C084FC] backdrop-blur-md font-semibold">
              MERN &amp; ERP
            </span>
          </div>
        </div>

        {/* Bottom Status Info Strip */}
        <div className="mt-3 px-3 py-2.5 rounded-xl bg-[#0D2238]/90 border border-[#1E3A56] flex items-center justify-between text-xs font-mono text-[#CBD5E1]">
          <div className="flex items-center gap-1.5 text-[#34D399]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-medium">Active &amp; Available</span>
          </div>
          <div className="flex items-center gap-1 text-[#22D3EE]">
            <span className="text-[#94A3B8]">Stack:</span>
            <span>React + Node + Mongo</span>
          </div>
        </div>
      </div>

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1D32]/95 border border-[rgba(168,85,247,0.4)] shadow-xl backdrop-blur-md text-xs font-medium text-purple-200 z-20"
      >
        <Server className="w-4 h-4 text-[#C084FC]" />
        <span>Full Stack &amp; ERP</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -4, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1D32]/95 border border-[rgba(34,211,238,0.4)] shadow-xl backdrop-blur-md text-xs font-medium text-cyan-200 z-20"
      >
        <Database className="w-4 h-4 text-[#22D3EE]" />
        <span>MongoDB Atlas &amp; REST</span>
      </motion.div>
    </div>
  );
}
