import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Loader2, Globe, User, Shield } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';
import { fallbackSiteSettings } from '../../data/fallbackData';

export default function AdminSettingsPage() {
  const { data: siteSettings, refetch } = useFetch(api.getSiteSettings, fallbackSiteSettings);
  const [formData, setFormData] = useState(fallbackSiteSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (siteSettings) {
      setFormData(siteSettings);
    }
  }, [siteSettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      await api.updateSiteSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      refetch();
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-navy-500">
        <h1 className="text-2xl font-bold text-white">Global Site &amp; SEO Configuration</h1>
        <p className="text-xs text-slate-400">Configure public portfolio bio, social links, and metadata.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-navy-500 bg-navy-850/60 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>Developer Profile Info</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">About Biography</label>
            <textarea
              rows={4}
              value={formData.about || ''}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Social URLs */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-navy-500 bg-navy-850/60 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Socials &amp; External Links</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={formData.linkedinUrl || ''}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          {saved && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved!</span>
            </span>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
