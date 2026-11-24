import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Award, ExternalLink, Calendar, Eye, X, ZoomIn, ArrowRight } from 'lucide-react';
import { fallbackCertifications } from '../data/fallbackData';

export default function CertificationsSection({ certifications = [] }) {
  const items = certifications.length > 0 ? certifications : fallbackCertifications;
  const [selectedCert, setSelectedCert] = useState(null);

  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Measure the total horizontal distance the track needs to travel
  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        // Scroll until the last item is completely in view with comfortable edge padding
        const range = Math.max(0, totalWidth - windowWidth + 48);
        setScrollRange(range);
      }
    };

    updateScrollRange();

    const resizeObserver = new ResizeObserver(() => {
      updateScrollRange();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener('resize', updateScrollRange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScrollRange);
    };
  }, [items]);

  // Lock body scroll when certificate modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  // Hook scroll progress to target container vertical scroll runway
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll progress (0 to 1) to horizontal translation (0 to -scrollRange)
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  if (!items || items.length === 0) return null;

  // Runway height proportional to items so scrolling feels natural and comfortable
  const runwayHeight = `${Math.max(240, items.length * 36)}vh`;

  return (
    <section
      id="certifications"
      ref={targetRef}
      style={{ height: runwayHeight }}
      className="relative bg-[#EAF5FF]"
    >
      {/* ── Sticky Viewport Container: stays pinned while scrolling horizontally ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-22 pb-5 overflow-hidden border-t border-[rgba(37,99,235,0.12)]">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#36C5F0]/15 via-[#2563EB]/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* ── Section Header ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(37,99,235,0.20)] text-[#2563EB] text-xs font-mono font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Verification & Honors ({items.length} Credentials)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#142B4A] tracking-tight">
                Certifications & Assessments
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#536B86] max-w-md leading-relaxed font-normal">
              Scroll down to glide through all credentials horizontally. Section stays pinned until the end is reached.
            </p>
          </div>
        </div>

        {/* ── Horizontal Scroll Runway Track ── */}
        <div className="relative w-full overflow-hidden my-auto py-2">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#EAF5FF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#EAF5FF] to-transparent z-10 pointer-events-none" />

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-6 px-4 sm:px-8 lg:px-12 w-max select-none"
          >
            {items.map((cert, idx) => (
              <div
                key={`${cert._id || cert.title}-${idx}`}
                className="w-[330px] sm:w-[380px] shrink-0 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white hover:border-[rgba(37,99,235,0.40)] shadow-xs hover:shadow-xl hover:shadow-[#2563EB]/12 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ── Certificate Image Preview Header ── */}
                {cert.image ? (
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative h-40 sm:h-44 w-full bg-[#F7FBFF] border-b border-[rgba(37,99,235,0.12)] overflow-hidden cursor-pointer group/img"
                    title="Click to view full certificate"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top group-hover/img:scale-104 transition-transform duration-500"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A]/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                      <span className="text-[11px] font-mono text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm font-medium">
                        <ZoomIn className="w-3.5 h-3.5 text-[#36C5F0]" />
                        <span>View Full Certificate</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#36C5F0] bg-black/60 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 sm:h-44 w-full bg-gradient-to-br from-[#EAF5FF] via-[#DCEEFF] to-[#C4E3FD] border-b border-[rgba(37,99,235,0.12)] p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-white text-[#2563EB] shadow-xs border border-[rgba(37,99,235,0.15)]">
                        <Award className="w-5 h-5" />
                      </span>
                      {cert.credentialId && (
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-[#163B72] border border-[rgba(37,99,235,0.16)] shadow-xs">
                          {cert.credentialId}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#2563EB] uppercase tracking-wide">
                        Verified Program
                      </span>
                      <p className="text-base font-black text-[#142B4A] mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Card Content Body ── */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EAF5FF] px-2.5 py-0.5 rounded border border-[#2563EB]/20 truncate max-w-[190px]">
                        {cert.issuer}
                      </span>
                      {cert.credentialId && (
                        <span className="text-[10px] font-mono text-[#536B86] bg-[#F7FBFF] px-2 py-0.5 rounded border border-[rgba(37,99,235,0.12)] truncate max-w-[130px]">
                          {cert.credentialId}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#142B4A] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#536B86] leading-relaxed mt-1.5 line-clamp-2 sm:line-clamp-3 font-normal">
                      {cert.description}
                    </p>
                  </div>

                  {/* Card Action Strip */}
                  <div className="pt-2.5 border-t border-[rgba(37,99,235,0.10)] flex items-center justify-between text-xs font-mono text-[#536B86]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#36C5F0]" />
                      <span>{cert.issueDate || 'Completed'}</span>
                    </span>

                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors font-semibold hover:underline"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : cert.image ? (
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors font-semibold cursor-pointer"
                      >
                        <span>View Image</span>
                        <Eye className="w-3 h-3" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom Interactive Scroll Progress Strip ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0">
          <div className="flex items-center justify-between gap-4 py-2 border-t border-[rgba(37,99,235,0.12)]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#536B86]">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span>Scroll down or up to explore certificates</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] hidden sm:inline" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#536B86] hidden sm:inline">Progress</span>
              <div className="w-36 sm:w-56 h-1.5 bg-[rgba(37,99,235,0.12)] rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#36C5F0] origin-left rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox Modal for High-Resolution Certificate Viewing ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-[#091A2C]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-[rgba(37,99,235,0.20)] overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-[#142B4A]">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs font-mono text-[#2563EB]">
                    {selectedCert.issuer} • {selectedCert.issueDate}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-[#EAF5FF] text-[#142B4A] hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label="Close certificate modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="my-4 overflow-auto flex-1 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 p-2">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[68vh] w-auto object-contain rounded-xl shadow-md"
                />
              </div>

              {/* Modal Footer with Verification Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-[#536B86]">
                  {selectedCert.credentialId ? `ID: ${selectedCert.credentialId}` : 'Verified Credential'}
                </span>
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Open Verification Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
