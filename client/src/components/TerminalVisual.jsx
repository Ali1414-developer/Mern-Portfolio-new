import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Database, Server, Code, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TerminalVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#2563EB]/20 via-[#36C5F0]/25 to-[#1D4ED8]/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse pointer-events-none"></div>

      {/* Main Terminal Window */}
      <div className="relative rounded-2xl border border-[#1E3A56] bg-[#091A2C] shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1D32] border-b border-[#1E3A56]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FB7185]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#FBBF24]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#34D399]/80"></div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8]">
            <Terminal className="w-3.5 h-3.5 text-[#C084FC]" />
            <span>ali-raza@core: ~/portfolio-stack</span>
          </div>
          <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(168,85,247,0.12)] text-[#C084FC] border border-[rgba(168,85,247,0.25)]">
            MERN v2026
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 font-mono text-xs sm:text-sm space-y-3 text-[#CBD5E1]">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span className="text-[#C084FC] font-bold">$</span>
            <span className="text-[#34D399]">node</span>
            <span>--version &amp;&amp; mongod --version</span>
          </div>

          <div className="pl-4 text-xs text-[#94A3B8] space-y-1">
            <p className="text-[#22D3EE]">v22.14.0 (LTS)</p>
            <p className="text-[#34D399]">db version v8.0.4 - Atlas Connected</p>
          </div>

          <div className="flex items-center gap-2 text-[#94A3B8] pt-2">
            <span className="text-[#C084FC] font-bold">$</span>
            <span className="text-[#6366F1]">init-engineer</span>
            <span>--identity "Ali Raza"</span>
          </div>

          {/* Structured Output Object */}
          <div className="rounded-lg bg-[#071525] p-3.5 border border-[#1E3A56] text-xs space-y-1.5 text-[#CBD5E1]">
            <p><span className="text-[#C084FC] font-semibold">status:</span> <span className="text-[#34D399]">'Active &amp; Available'</span>,</p>
            <p><span className="text-[#C084FC] font-semibold">specialization:</span> [<span className="text-[#FBBF24]">'MERN'</span>, <span className="text-[#FBBF24]">'ERP'</span>, <span className="text-[#FBBF24]">'Figma'</span>, <span className="text-[#FBBF24]">'C++'</span>],</p>
            <p><span className="text-[#C084FC] font-semibold">campus:</span> <span className="text-[#E2E8F0]">'Air University, Multan'</span>,</p>
            <p><span className="text-[#C084FC] font-semibold">featuredProject:</span> <span className="text-[#22D3EE]">'UrbanBite (Restaurant MERN)'</span>,</p>
            <p><span className="text-[#C084FC] font-semibold">cloudDeploy:</span> <span className="text-[#34D399]">'Vercel Serverless Ready'</span></p>
          </div>

          {/* Running status bar */}
          <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2 border-t border-[#1E3A56]">
            <div className="flex items-center gap-1.5 text-[#34D399] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All services operational</span>
            </div>
            <div className="flex items-center gap-1 text-[#64748B]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22D3EE] animate-ping"></span>
              <span>Listening on :3000 /api</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-850/90 border border-purple-500/40 shadow-lg backdrop-blur-md text-xs font-medium text-purple-200"
      >
        <Server className="w-4 h-4 text-purple-400" />
        <span>REST & Serverless</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -4, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-5 -left-4 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-850/90 border border-cyan-500/40 shadow-lg backdrop-blur-md text-xs font-medium text-cyan-200"
      >
        <Database className="w-4 h-4 text-cyan-400" />
        <span>MongoDB Atlas</span>
      </motion.div>
    </div>
  );
}
