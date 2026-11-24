import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ExperienceCard from '../components/ExperienceCard';

export default function ExperienceSection({ experiences = [] }) {
  return (
    <section id="experience" className="py-24 relative border-t border-[rgba(37,99,235,0.12)] bg-[#EAF5FF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Career Timeline"
          title="Practical Engineering Experience"
          description="Internships and professional roles focused on full-stack development, modern frontend engineering, and production standards."
        />

        <div className="mt-12">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={exp._id || idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
