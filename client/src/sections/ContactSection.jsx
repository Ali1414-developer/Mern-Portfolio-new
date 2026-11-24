import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Linkedin, Github, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative border-t border-[rgba(37,99,235,0.12)] bg-[#DCEEFF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Get in Touch"
          title="Let's build something meaningful."
          description="Whether you have an upcoming full-stack MERN project, require an ERP solution, or want to discuss technical opportunities, feel free to reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left: Contact Info & Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-[#142B4A]">Direct Communication</h3>
              <p className="text-sm text-[#536B86] leading-relaxed">
                I am interested in discussing engineering roles, ERP system architectures, and full-stack software initiatives.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5 text-sm text-[#142B4A]">
                  <div className="p-2.5 rounded-xl bg-[#EAF5FF] text-[#2563EB] border border-[rgba(37,99,235,0.20)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#536B86] uppercase font-semibold">Email</span>
                    <a
                      href="mailto:aliraza777212@gmail.com"
                      className="text-[#142B4A] hover:text-[#2563EB] transition-colors font-medium text-sm"
                    >
                      aliraza777212@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-sm text-[#142B4A]">
                  <div className="p-2.5 rounded-xl bg-[#EAF5FF] text-[#36C5F0] border border-[rgba(37,99,235,0.20)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-[#536B86] uppercase font-semibold">Location</span>
                    <span className="text-[#142B4A] font-medium text-sm">Layyah, Punjab, Pakistan</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(37,99,235,0.10)]">
                <span className="block text-[11px] font-mono text-[#536B86] uppercase font-semibold mb-3">Verified Profiles</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/ali-raza-baloch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#F7FBFF] hover:bg-[#EAF5FF] text-[#163B72] text-xs font-semibold flex items-center justify-center gap-2 border border-[rgba(37,99,235,0.16)] transition-all shadow-xs"
                  >
                    <Linkedin className="w-4 h-4 text-[#2563EB]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/Ali1414-developer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#F7FBFF] hover:bg-[#EAF5FF] text-[#163B72] text-xs font-semibold flex items-center justify-center gap-2 border border-[rgba(37,99,235,0.16)] transition-all shadow-xs"
                  >
                    <Github className="w-4 h-4 text-[#163B72]" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EAF5FF] border border-[rgba(37,99,235,0.16)] text-xs text-[#536B86] flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>Inquiries are securely logged in MongoDB and protected by backend rate limiting.</span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
