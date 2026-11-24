import React from 'react';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { Code2, Server, Terminal, Cloud } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/variants';
import { useTilt } from '../hooks/useTilt';

const skillGroups = [
  {
    title: 'Frontend',
    icon: Code2,
    accent: '#2563EB',
    bgTint: 'bg-[#EAF5FF]',
    items: [
      { name: 'React', desc: 'SPA architecture, hooks, state management' },
      { name: 'JavaScript', desc: 'Modern ES6+, asynchronous async/await' },
      { name: 'HTML', desc: 'Semantic, accessible document structure' },
      { name: 'CSS', desc: 'Modern layout systems, responsive UI' },
      { name: 'Tailwind CSS', desc: 'Utility-first tokens and design systems' },
    ],
  },
  {
    title: 'Backend & Database',
    icon: Server,
    accent: '#1D4ED8',
    bgTint: 'bg-[#E0EFFD]',
    items: [
      { name: 'Node.js', desc: 'Event-driven server runtime environment' },
      { name: 'Express.js', desc: 'RESTful API routing & middleware pipelines' },
      { name: 'MongoDB', desc: 'NoSQL document database & Atlas clustering' },
      { name: 'Mongoose', desc: 'Schema validation & lifecycle hooks' },
      { name: 'REST APIs', desc: 'Stateless endpoints & JSON payload contracts' },
    ],
  },
  {
    title: 'Programming & Tools',
    icon: Terminal,
    accent: '#0284C7',
    bgTint: 'bg-[#E6F4FF]',
    items: [
      { name: 'C++', desc: 'Algorithms, memory concepts, systems fundamentals' },
      { name: 'OOP', desc: 'Object-oriented software principles & design' },
      { name: 'DSA', desc: 'Data structures & algorithmic efficiency' },
      { name: 'Git', desc: 'Version control, branching & history management' },
      { name: 'GitHub', desc: 'Collaborative code hosting & pull requests' },
    ],
  },
  {
    title: 'ERP, Design & DevOps',
    icon: Cloud,
    accent: '#163B72',
    bgTint: 'bg-[#EDF6FF]',
    items: [
      { name: 'ERP Development', desc: 'Inventory, POS, batch alerts & ledgers' },
      { name: 'Figma', desc: 'UI/UX wireframes, user journeys & prototypes' },
      { name: 'Docker', desc: 'Containerization of full-stack services' },
      { name: 'Linux', desc: 'Command line operations & server administration' },
      { name: 'CI/CD & GitHub Actions', desc: 'Automated test suites & deployment runners' },
    ],
  },
];

function SkillCategoryCard({ group }) {
  const Icon = group.icon;
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(4);

  return (
    <motion.div
      variants={fadeInUp}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white p-6 shadow-xs hover:shadow-xl hover:shadow-[#2563EB]/08 hover:border-[rgba(37,99,235,0.35)] transition-all flex flex-col justify-between"
    >
      <div>
        {/* Group Header with micro-movement */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[rgba(37,99,235,0.10)]">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            className={`p-2.5 rounded-xl ${group.bgTint} text-[#2563EB] shrink-0 border border-[rgba(37,99,235,0.15)] shadow-2xs`}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <h3 className="font-bold text-base text-[#142B4A]">
            {group.title}
          </h3>
        </div>

        {/* Group Items with refined hover slide */}
        <div className="space-y-2.5">
          {group.items.map((item, itemIdx) => (
            <motion.div
              key={itemIdx}
              whileHover={{ x: 3, transition: { duration: 0.15 } }}
              className="p-3 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.08)] hover:bg-[#DCEEFF]/50 hover:border-[rgba(37,99,235,0.22)] transition-all cursor-default"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs sm:text-sm text-[#142B4A]">
                  {item.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#36C5F0]" />
              </div>
              <p className="text-[11px] text-[#536B86] mt-0.5 leading-tight">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[rgba(37,99,235,0.08)] text-[11px] font-mono text-[#536B86] flex items-center justify-between">
        <span>Verified Stack</span>
        <span className="text-[#2563EB] font-bold">5 Technologies</span>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative border-t border-[rgba(37,99,235,0.12)] bg-[#EAF5FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Technical Capabilities"
          title="Skills & Technologies"
          description="A structured, honest breakdown of my engineering competencies organized across four core domains."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillGroups.map((group, idx) => (
            <SkillCategoryCard key={idx} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
