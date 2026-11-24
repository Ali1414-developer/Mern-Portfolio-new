import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTilt } from '../hooks/useTilt';

export default function ProjectCard({ project }) {
  const isUrbanBite = project.slug === 'urbanbite';
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  // Take at most 4 technologies to keep card clean
  const techList = project.technologies?.slice(0, 4) || [];
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(5);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 group relative flex flex-col rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white hover:border-[rgba(37,99,235,0.38)] shadow-xs hover:shadow-2xl hover:shadow-[#2563EB]/10 overflow-hidden transition-all duration-300"
    >
      {/* Designed Card Header Preview Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#EAF5FF] via-[#DCEEFF] to-[#C4E3FD] border-b border-[rgba(37,99,235,0.12)] p-5 flex flex-col justify-between">
        
        {/* Subtle patterned overlay with subtle hover zoom */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide bg-white/95 text-[#163B72] border border-[rgba(37,99,235,0.18)] shadow-xs">
            {project.category}
          </span>
          {project.featured && (
            <motion.span
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2563EB] text-white shadow-xs"
            >
              Featured Work
            </motion.span>
          )}
        </div>

        {/* Bespoke miniature system status preview */}
        <div className="relative z-10 flex items-center justify-between bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[rgba(37,99,235,0.16)] shadow-xs text-[11px] font-mono text-[#163B72]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#36C5F0] animate-pulse"></span>
            <span>
              {isUrbanBite
                ? 'Table & Order Sync • Live'
                : project.slug === 'pesticides-erp'
                ? 'Batch Expiry • POS Ledger'
                : project.slug === 'pharmacy-erp'
                ? 'Rx Stock • Supplier Portal'
                : project.slug === 'razawears'
                ? 'Fashion Cart • SPA Checkout'
                : 'System Architecture • Verified'}
            </span>
          </span>
          <span className="text-[#2563EB] font-semibold hidden sm:inline">
            {project.status || 'Active'}
          </span>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-black text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-[#536B86] font-mono mt-0.5">
            {project.role || 'Full Stack Developer'}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-sm text-[#536B86] leading-relaxed line-clamp-3 font-normal">
            {project.shortDescription || project.description}
          </p>

          {/* Technology badges with micro-scale on hover */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {techList.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-[#F7FBFF] text-[#163B72] border border-[rgba(37,99,235,0.14)] hover:border-[#2563EB]/40 hover:bg-[#DCEEFF]/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links & Footer */}
        <div className="pt-4 border-t border-[rgba(37,99,235,0.10)] space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group/link"
            >
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
            </Link>

            <div className="flex items-center gap-2">
              {hasGithubUrl && (
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="p-1.5 rounded-lg bg-[#F7FBFF] text-[#536B86] hover:text-[#2563EB] hover:bg-[#DCEEFF] border border-[rgba(37,99,235,0.15)] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}

              {hasLiveUrl && (
                <motion.a
                  whileHover={{ scale: 1.04, translateY: -1 }}
                  whileTap={{ scale: 0.96 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xs font-semibold shadow-xs transition-all"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Secondary Admin Panel link for UrbanBite */}
          {isUrbanBite && project.additionalLinks && project.additionalLinks.length > 0 && (
            <div className="pt-2 border-t border-[rgba(37,99,235,0.08)] flex items-center justify-between text-[11px] text-[#536B86]">
              <span className="flex items-center gap-1 text-[#536B86] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Admin Portal:</span>
              </span>
              <a
                href={project.additionalLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:text-[#1D4ED8] font-mono hover:underline flex items-center gap-1 font-semibold"
              >
                <span>{project.additionalLinks[0].label}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
