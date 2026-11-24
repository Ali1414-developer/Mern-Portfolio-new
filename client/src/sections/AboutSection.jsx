import React from 'react';
import { motion } from 'motion/react';
import SectionHeader from '../components/SectionHeader';
import { fadeInUp, staggerContainer } from '../animations/variants';
import { Layers, Server, Cloud, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import aliRazaImg from '../assets/ali-raza.png';
import { useTilt } from '../hooks/useTilt';

export default function AboutSection() {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(5);

  const highlights = [
    {
      icon: Layers,
      title: 'Full-Stack MERN Architecture',
      desc: 'Developing end-to-end applications with modular Node.js/Express REST APIs, MongoDB data models, and component-driven React SPAs.',
    },
    {
      icon: Server,
      title: 'Enterprise ERP Systems',
      desc: 'Engineering complex business software including inventory workflows, POS invoicing, vendor ledgers, and automated batch tracking.',
    },
    {
      icon: Cloud,
      title: 'DevOps & Cloud Direction',
      desc: 'Expanding into Docker containerization, Linux environments, GitHub Actions CI/CD, and serverless cloud deployment pipelines.',
    },
  ];

  return (
    <section id="about" className="py-24 relative border-t border-[rgba(37,99,235,0.12)] bg-[#DCEEFF]/30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#36C5F0]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Profile & Background"
          title="Engineering Purpose-Driven Software"
          description="A dedicated Software Engineering student focused on building practical, dependable full-stack applications and business systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative & Meaningful Highlights */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white border border-[rgba(37,99,235,0.14)] shadow-xs hover:border-[rgba(37,99,235,0.30)] transition-colors">
              <p className="text-[#142B4A] text-base sm:text-lg leading-relaxed font-normal">
                I am a Software Engineering student at <strong className="text-[#2563EB] font-semibold">Air University, Multan Campus</strong>, with a core focus on <strong className="text-[#163B72] font-semibold">MERN full-stack development</strong> and enterprise <strong className="text-[#163B72] font-semibold">ERP software solutions</strong>. Having completed a rigorous 1-year Web Development internship track and engineered multi-module operational systems, I bridge reliable server architecture with clean, intuitive user interfaces while continuously expanding my knowledge in DevOps and cloud deployment.
              </p>
            </div>

            {/* Three Concise Highlights with Staggered Entrance */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3.5 pt-2"
            >
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="p-4 rounded-xl bg-white/85 border border-[rgba(37,99,235,0.12)] hover:border-[rgba(37,99,235,0.35)] hover:shadow-md hover:shadow-[#2563EB]/05 transition-all shadow-xs flex items-start gap-4 cursor-default group"
                  >
                    <div className="p-2.5 rounded-lg bg-[#DCEEFF] text-[#2563EB] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#142B4A] group-hover:text-[#2563EB] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#536B86] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Refined Verified Profile Card with 3D Interactive Tilt */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 perspective-1000"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-3xl border border-[rgba(37,99,235,0.16)] bg-white p-4 shadow-xl max-w-sm mx-auto overflow-hidden hover:shadow-2xl hover:shadow-[#2563EB]/10 transition-shadow duration-300"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-[#DCEEFF]">
                <img
                  src={aliRazaImg}
                  alt="Ali Raza - MERN Full Stack Developer & ERP Developer"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#142B4A]/70 via-[#142B4A]/20 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 text-[#142B4A] font-bold shadow-md">
                    Ali Raza
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#2563EB] text-white font-semibold">
                    Software Engineer
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.12)] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#163B72] font-medium">
                  <GraduationCap className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>Air University, Multan Campus</span>
                </div>
                <div className="flex items-center gap-2 text-[#536B86]">
                  <MapPin className="w-4 h-4 text-[#36C5F0] shrink-0" />
                  <span>Layyah, Punjab, Pakistan</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
