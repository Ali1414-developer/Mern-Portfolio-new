import React from 'react';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { GraduationCap, MapPin } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/variants';

export default function EducationSection({ education = [] }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 relative border-t border-[rgba(37,99,235,0.12)] bg-[#DCEEFF]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Academic Foundation"
          title="Education & Engineering Degree"
          description="Formal academic grounding in Software Engineering principles, computer science theory, and algorithmic design."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6"
        >
          {education.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white hover:border-[rgba(37,99,235,0.35)] shadow-xs hover:shadow-xl hover:shadow-[#2563EB]/08 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#DCEEFF] text-[#2563EB] border border-[rgba(37,99,235,0.20)] flex items-center justify-center shrink-0 shadow-2xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#142B4A]">{item.degree}</h3>
                  <p className="text-sm font-semibold text-[#2563EB]">{item.institution}</p>
                  <p className="text-xs sm:text-sm text-[#536B86] max-w-xl leading-relaxed mt-2 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#536B86] bg-[#F7FBFF] px-3.5 py-1.5 rounded-lg border border-[rgba(37,99,235,0.14)] shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#36C5F0]" />
                <span>{item.location || 'Multan, Pakistan'}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
