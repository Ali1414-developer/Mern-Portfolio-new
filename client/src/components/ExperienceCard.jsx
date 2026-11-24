import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';

export default function ExperienceCard({ exp, index }) {
  const isSPS = exp.company?.includes('Software Productivity Strategists') || exp.company?.includes('SPS');

  return (
    <motion.div
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 sm:pl-10 pb-10 group last:pb-0"
    >
      {/* Animated Timeline vertical connector */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        className="absolute left-[11px] sm:left-[15px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-[#2563EB] to-[rgba(37,99,235,0.15)] origin-top group-last:hidden"
      />

      {/* Timeline Node Icon with glowing aura */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="absolute left-0 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-white border-2 border-[#2563EB] flex items-center justify-center shadow-md shadow-[#2563EB]/20 group-hover:border-[#36C5F0] transition-colors z-10"
      >
        <Briefcase className="w-3 sm:w-4 h-3 sm:h-4 text-[#2563EB]" />
      </motion.div>

      {/* Content Card with Smooth Lift */}
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="p-6 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white hover:border-[rgba(37,99,235,0.35)] shadow-xs hover:shadow-xl hover:shadow-[#2563EB]/08 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
              {exp.position}
            </h3>
            <div className="text-sm font-semibold text-[#2563EB] flex items-center gap-1.5 mt-0.5">
              <span>{exp.company}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#536B86] font-mono">
            <span className="flex items-center gap-1 bg-[#F7FBFF] px-2.5 py-1 rounded-md border border-[rgba(37,99,235,0.14)]">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{exp.startDate} {exp.endDate ? `– ${exp.endDate}` : ''}</span>
            </span>
            {exp.location && (
              <span className="hidden md:flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#36C5F0]" />
                <span>{exp.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Verified SPS Assessment Score Badge */}
        {isSPS && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E0EFFD] border border-[rgba(37,99,235,0.25)] text-[#163B72] text-xs font-mono font-medium mb-4 shadow-2xs">
            <Award className="w-4 h-4 text-[#2563EB]" />
            <span>Qualifying Assessment Score: 81.6% (40/49)</span>
          </div>
        )}

        <p className="text-sm text-[#536B86] leading-relaxed mb-4 font-normal">
          {exp.description}
        </p>

        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <div className="space-y-2 mb-4">
            {exp.responsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#142B4A]">
                <CheckCircle2 className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        )}

        {exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(37,99,235,0.10)]">
            {exp.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F7FBFF] text-[#163B72] border border-[rgba(37,99,235,0.12)] font-medium hover:bg-[#DCEEFF]/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
