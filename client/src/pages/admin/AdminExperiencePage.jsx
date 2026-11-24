import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, X, Loader2 } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';
import { fallbackExperiences } from '../../data/fallbackData';

export default function AdminExperiencePage() {
  const { data: experiences, refetch, setData } = useFetch(api.getExperience, fallbackExperiences);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: '',
    technologies: '',
  });
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      company: '',
      position: '',
      location: 'Pakistan',
      startDate: '',
      endDate: '',
      description: '',
      responsibilities: '',
      technologies: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingId(exp._id);
    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
      responsibilities: exp.responsibilities ? exp.responsibilities.join('\n') : '',
      technologies: exp.technologies ? exp.technologies.join(', ') : '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await api.deleteExperience(id);
      setData((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.warn('API notice:', err.message);
      setData((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await api.updateExperience(editingId, payload);
      } else {
        await api.createExperience(payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      console.warn('Notice:', err.message);
      if (editingId) {
        setData((prev) => prev.map((e) => (e._id === editingId ? { ...e, ...payload } : e)));
      } else {
        setData((prev) => [...prev, { ...payload, _id: 'temp-' + Date.now() }]);
      }
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-500">
        <div>
          <h1 className="text-2xl font-bold text-white">Experience Timeline</h1>
          <p className="text-xs text-slate-400">Manage work history, internships, and qualifying assessments.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences?.map((exp) => (
          <div
            key={exp._id || exp.company}
            className="glass-panel p-5 rounded-2xl border border-navy-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-white text-base">{exp.position}</h3>
              <p className="text-xs font-semibold text-purple-400">{exp.company}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-2">
                <span>{exp.startDate} – {exp.endDate}</span>
                <span>•</span>
                <span>{exp.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditModal(exp)}
                className="p-2 rounded-lg bg-navy-700 hover:bg-navy-600 text-slate-300 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl rounded-2xl border border-navy-500 bg-navy-850 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-500">
              <h2 className="text-base font-bold text-white">
                {editingId ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Position / Role</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Start Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 Year Program"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">End Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Completed"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Key Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-navy-500">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
