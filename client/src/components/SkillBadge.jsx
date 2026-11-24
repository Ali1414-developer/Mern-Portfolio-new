import React from 'react';
import { motion } from 'motion/react';
import { Code2, Server, Database, Terminal, Cpu, Cloud, Wrench, Palette, Box } from 'lucide-react';

const iconMap = {
  react: Code2,
  javascript: Code2,
  tailwind: Palette,
  vite: Cpu,
  router: Box,
  html: Code2,
  css: Palette,
  node: Server,
  express: Server,
  api: Server,
  mongodb: Database,
  mongoose: Database,
  cpp: Terminal,
  oop: Cpu,
  dsa: Cpu,
  docker: Box,
  linux: Terminal,
  cicd: Cloud,
  actions: Cloud,
  cloud: Cloud,
  git: Wrench,
  github: Wrench,
  figma: Palette,
};

export default function SkillBadge({ skill }) {
  const IconComponent = iconMap[skill.icon] || Code2;

  const categoryStyles = {
    Frontend: {
      text: 'text-[#22D3EE]',
      badge: 'bg-[rgba(34,211,238,0.08)] border-[rgba(34,211,238,0.20)] text-[#22D3EE]',
      hoverBorder: 'hover:border-[#22D3EE]/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]',
    },
    Backend: {
      text: 'text-[#C084FC]',
      badge: 'bg-[rgba(168,85,247,0.08)] border-[rgba(168,85,247,0.20)] text-[#C084FC]',
      hoverBorder: 'hover:border-[#A855F7]/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]',
    },
    Database: {
      text: 'text-[#34D399]',
      badge: 'bg-[rgba(52,211,153,0.08)] border-[rgba(52,211,153,0.20)] text-[#34D399]',
      hoverBorder: 'hover:border-[#34D399]/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.12)]',
    },
    Programming: {
      text: 'text-[#FBBF24]',
      badge: 'bg-[rgba(251,191,36,0.08)] border-[rgba(251,191,36,0.20)] text-[#FBBF24]',
      hoverBorder: 'hover:border-[#FBBF24]/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]',
    },
    DevOps: {
      text: 'text-[#60A5FA]',
      badge: 'bg-[rgba(96,165,250,0.08)] border-[rgba(96,165,250,0.20)] text-[#60A5FA]',
      hoverBorder: 'hover:border-[#60A5FA]/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]',
    },
    Tools: {
      text: 'text-[#CBD5E1]',
      badge: 'bg-[rgba(203,213,225,0.08)] border-[rgba(203,213,225,0.20)] text-[#CBD5E1]',
      hoverBorder: 'hover:border-slate-400/50 hover:shadow-[0_0_20px_rgba(203,213,225,0.10)]',
    },
    Design: {
      text: 'text-[#F472B6]',
      badge: 'bg-[rgba(244,114,182,0.08)] border-[rgba(244,114,182,0.20)] text-[#F472B6]',
      hoverBorder: 'hover:border-[#F472B6]/50 hover:shadow-[0_0_20px_rgba(244,114,182,0.12)]',
    },
  };

  const style = categoryStyles[skill.category] || categoryStyles.Frontend;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-xl border border-[rgba(37,99,235,0.14)] bg-white/90 shadow-xs hover:shadow-lg transition-all duration-300 group flex items-start gap-3.5 ${style.hoverBorder}`}
    >
      <div className={`p-2.5 rounded-lg border transition-transform duration-200 group-hover:scale-110 ${style.badge}`}>
        <IconComponent className="w-5 h-5 transition-colors" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-sm text-[#142B4A] group-hover:text-[#2563EB] truncate">
            {skill.name}
          </h4>
          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${style.badge}`}>
            {skill.category}
          </span>
        </div>

        {skill.description && (
          <p className="text-xs text-[#536B86] mt-1 line-clamp-2 leading-relaxed">
            {skill.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
