import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await api.sendMessage(formData);
      setStatus({
        loading: false,
        success: true,
        error: null,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Unable to submit your message at this time. Please try again or reach out directly via email.',
      });
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white shadow-xl hover:shadow-2xl hover:shadow-[#2563EB]/05 transition-all duration-300 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {status.success ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-10 space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
              className="w-16 h-16 rounded-full bg-[#E0EFFD] text-[#2563EB] flex items-center justify-center mx-auto border border-[rgba(37,99,235,0.25)] shadow-md"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <h3 className="text-2xl font-bold text-[#142B4A]">Message Received</h3>
            <p className="text-[#536B86] text-sm max-w-md mx-auto leading-relaxed">
              Thank you for reaching out. Your inquiry has been securely stored in the database. I will review it and reply promptly.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setStatus({ loading: false, success: false, error: null })}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#EAF5FF] hover:bg-[#DCEEFF] text-[#2563EB] text-xs font-semibold border border-[rgba(37,99,235,0.18)] transition-all cursor-pointer shadow-xs"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <AnimatePresence>
              {status.error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 overflow-hidden"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{status.error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono font-semibold text-[#142B4A] uppercase tracking-wider mb-2">
                  Your Name <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="input-light w-full px-4 py-3 rounded-xl text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono font-semibold text-[#142B4A] uppercase tracking-wider mb-2">
                  Your Email <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className="input-light w-full px-4 py-3 rounded-xl text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono font-semibold text-[#142B4A] uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. MERN Full-Stack Inquiry / ERP Discussion"
                className="input-light w-full px-4 py-3 rounded-xl text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono font-semibold text-[#142B4A] uppercase tracking-wider mb-2">
                Message <span className="text-[#2563EB]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Provide a brief overview of your project, opportunity, or technical inquiry..."
                className="input-light w-full px-4 py-3 rounded-xl text-sm resize-y focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.015, translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status.loading}
              className="btn-primary w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#2563EB]/25"
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
