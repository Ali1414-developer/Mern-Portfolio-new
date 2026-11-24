import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';

const categories = ['All', 'Full Stack', 'ERP', 'Frontend'];

export default function ProjectsSection({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Ensure priority projects (UrbanBite, Pesticides ERP, Pharmacy ERP, RazaWears) appear first
  const sortedProjects = useMemo(() => {
    const prioritySlugs = ['urbanbite', 'pesticides-erp', 'pharmacy-erp', 'razawears'];
    const cloned = [...projects];

    return cloned.sort((a, b) => {
      const aIndex = prioritySlugs.indexOf(a.slug);
      const bIndex = prioritySlugs.indexOf(b.slug);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return (a.order || 99) - (b.order || 99);
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return sortedProjects;
    return sortedProjects.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [sortedProjects, activeCategory]);

  return (
    <section id="projects" className="py-24 relative border-t border-[rgba(37,99,235,0.12)] bg-[#DCEEFF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Featured Work"
          title="Engineered Projects & Systems"
          description="Explore full-stack platforms, enterprise ERP solutions, modern web storefronts, and system architectures built for scale."
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04, translateY: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-mono font-semibold cursor-pointer overflow-hidden transition-all duration-200 border ${
                  isActive
                    ? 'text-white border-[#2563EB] shadow-md shadow-[#2563EB]/30 bg-[#2563EB]'
                    : 'text-[#536B86] hover:text-[#142B4A] bg-white hover:bg-[#EAF5FF] border-[rgba(37,99,235,0.16)] shadow-xs'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="categoryActivePill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-xl z-0"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
