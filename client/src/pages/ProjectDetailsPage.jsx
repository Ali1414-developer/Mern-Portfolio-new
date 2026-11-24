import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, ShieldCheck, Layers, Server } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { fallbackProjects } from '../data/fallbackData';
import { fadeInUp, staggerContainer } from '../animations/variants';

export default function ProjectDetailsPage() {
  const { slug } = useParams();

  const fetchSingle = useMemo(() => () => api.getProjectBySlug(slug), [slug]);
  const defaultFallback = useMemo(() => fallbackProjects.find((p) => p.slug === slug) || null, [slug]);

  const { data: project, loading } = useFetch(fetchSingle, defaultFallback);

  if (loading && !project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-[#536B86] font-mono text-sm">
        Loading case study...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-bold text-[#142B4A]">Project Not Found</h2>
        <p className="text-[#536B86] text-sm">The requested project case study could not be located.</p>
        <Link
          to="/"
          className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Back button with spring hover */}
      <motion.div whileHover={{ x: -3 }} className="inline-block mb-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>Back to All Projects</span>
        </Link>
      </motion.div>

      {/* Hero Header */}
      <div className="space-y-4 mb-10 pb-8 border-b border-[rgba(37,99,235,0.14)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#DCEEFF] text-[#2563EB] border border-[rgba(37,99,235,0.20)] shadow-2xs">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-[#536B86] bg-white border border-[rgba(37,99,235,0.14)]">
            Status: {project.status || 'Production'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-[#536B86] bg-white border border-[rgba(37,99,235,0.14)]">
            Role: {project.role || 'Full Stack Engineer'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#142B4A] tracking-tight">
          {project.title}
        </h1>

        <p className="text-[#536B86] text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
          {project.shortDescription}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3.5 pt-4">
          {hasLiveUrl && (
            <motion.a
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Live Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}

          {project.additionalLinks && project.additionalLinks.map((link, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          ))}

          {hasGithubUrl && (
            <motion.a
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F7FBFF] text-[#142B4A] border border-[rgba(37,99,235,0.18)] text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Repository / Source</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Full Description, Purpose, Verified Contribution & Core Features */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Overview */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(37,99,235,0.14)] shadow-xs">
            <h2 className="text-xl font-bold text-[#142B4A] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
              <span>Project Overview</span>
            </h2>
            <div className="text-[#536B86] text-sm sm:text-base leading-relaxed space-y-3 font-normal">
              <p>{project.description}</p>
            </div>
          </div>

          {/* 2. Purpose & System Objective */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(37,99,235,0.14)] shadow-xs">
            <h2 className="text-xl font-bold text-[#142B4A] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#36C5F0]"></span>
              <span>Purpose &amp; Operational Objectives</span>
            </h2>
            <p className="text-[#536B86] text-sm sm:text-base leading-relaxed font-normal">
              {project.slug === 'urbanbite'
                ? 'Engineered to solve real-world restaurant bottlenecks by unifying customer digital ordering, table booking, cashier checkout, and real-time kitchen line fulfillment into a unified MERN platform.'
                : project.slug === 'pesticides-erp'
                ? 'Designed for agricultural chemical distribution to automate complex stock batch tracking, prevent sale of expired inventory, streamline point-of-sale transactions, and maintain audit-compliant vendor ledgers.'
                : project.slug === 'pharmacy-erp'
                ? 'Constructed to guarantee regulatory safety in retail pharmaceutical sales, providing automated low-stock warnings, batch expiration monitoring, and distinct portal workflows for managers and floor salesmen.'
                : project.slug === 'razawears'
                ? 'Built to deliver a modern, high-speed fashion e-commerce shopping experience with smooth client-side routing, responsive catalog filters, persistent shopping bag management, and fast checkout.'
                : 'Developed to address real operational requirements through clean, scalable, and dependable full-stack software architecture.'}
            </p>
          </div>

          {/* 3. Verified Engineering Contribution */}
          <div className="p-6 rounded-2xl bg-white border border-[rgba(37,99,235,0.14)] shadow-xs">
            <h2 className="text-xl font-bold text-[#142B4A] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
              <span>Verified Engineering Contribution</span>
            </h2>
            <p className="text-[#536B86] text-sm sm:text-base leading-relaxed font-normal mb-3">
              As the <strong className="text-[#163B72]">{project.role || 'Full Stack Developer'}</strong>, verified technical responsibilities included:
            </p>
            <ul className="space-y-2 text-sm text-[#142B4A]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Architecting modular frontend components and client-side routing with React and Vite.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Designing RESTful API endpoint contracts and JSON payload handling in Node.js &amp; Express.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Structuring MongoDB schema models, lifecycle validations, and efficient queries.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Ensuring responsive layouts, accessibility, and production deployment standards.</span>
              </li>
            </ul>
          </div>

          {/* 4. Implemented Architectural Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#142B4A] mb-4">Main Implemented Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[rgba(37,99,235,0.12)] flex items-start gap-3 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#142B4A]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Stack, Architecture Blueprint & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Architectural Blueprint Card */}
          <div className="p-6 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white space-y-4 shadow-xs">
            <h3 className="text-xs font-mono uppercase text-[#536B86] font-semibold tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span>System Blueprint</span>
            </h3>
            <div className="p-4 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.10)] space-y-2.5 text-xs font-mono text-[#163B72]">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(37,99,235,0.08)]">
                <span className="text-[#536B86]">Client Tier</span>
                <span className="font-semibold text-[#2563EB]">React SPA</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(37,99,235,0.08)]">
                <span className="text-[#536B86]">Service API</span>
                <span className="font-semibold text-[#163B72]">Express REST</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(37,99,235,0.08)]">
                <span className="text-[#536B86]">Data Storage</span>
                <span className="font-semibold text-[#36C5F0]">MongoDB Atlas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#536B86]">Deployment</span>
                <span className="font-semibold text-[#142B4A]">Vercel Cloud</span>
              </div>
            </div>
          </div>

          {/* Technologies Card */}
          <div className="p-6 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white space-y-6 shadow-xs">
            <div>
              <h3 className="text-xs font-mono uppercase text-[#536B86] font-semibold tracking-wider mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[#F7FBFF] text-[#163B72] border border-[rgba(37,99,235,0.14)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(37,99,235,0.10)] space-y-3 text-xs">
              <div>
                <span className="text-[#536B86] block font-mono text-[10px] uppercase font-semibold">Lead Developer</span>
                <span className="text-[#142B4A] font-bold">Ali Raza</span>
              </div>
              <div>
                <span className="text-[#536B86] block font-mono text-[10px] uppercase font-semibold">Verification</span>
                <span className="text-[#142B4A]">Documented Architecture</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
