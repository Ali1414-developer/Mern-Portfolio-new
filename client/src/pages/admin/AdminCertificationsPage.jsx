import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';
import { fallbackCertifications } from '../../data/fallbackData';

export default function AdminCertificationsPage() {
  const { data: certifications, refetch, setData } = useFetch(api.getCertifications, fallbackCertifications);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      issuer: '',
      issueDate: 'Completed',
      credentialId: '',
      credentialUrl: '',
      description: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingId(c._id);
    setFormData({
      title: c.title,
      issuer: c.issuer,
      issueDate: c.issueDate || '',
      credentialId: c.credentialId || '',
      credentialUrl: c.credentialUrl || '',
      description: c.description || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification record?')) return;
    try {
      await api.deleteCertification(id);
      setData((prev) => prev.filter((c) => c._id !== id));
    } catch {
      setData((prev) => prev.filter((c) => c._id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.updateCertification(editingId, formData);
      } else {
        await api.createCertification(formData);
      }
      setModalOpen(false);
      refetch();
    } catch {
      if (editingId) {
        setData((prev) => prev.map((c) => (c._id === editingId ? { ...c, ...formData } : c)));
      } else {
        setData((prev) => [...prev, { ...formData, _id: 'temp-' + Date.now() }]);
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
          <h1 className="text-2xl font-bold text-white">Certifications &amp; Assessments</h1>
          <p className="text-xs text-slate-400">Manage credentials and verifiable qualifications.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-4">
        {certifications?.map((c) => (
          <div
            key={c._id || c.title}
            className="glass-panel p-5 rounded-2xl border border-navy-500 flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold text-white text-base">{c.title}</h3>
              <p className="text-xs font-semibold text-emerald-400">{c.issuer} {c.credentialId ? `• ${c.credentialId}` : ''}</p>
              <p className="text-xs text-slate-400 mt-1">{c.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEditModal(c)}
                className="p-2 rounded-lg bg-navy-700 hover:bg-navy-600 text-slate-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl border border-navy-500 bg-navy-850 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-500">
              <h2 className="text-base font-bold text-white">
                {editingId ? 'Edit Certification' : 'New Certification'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Issuer</label>
                <input
                  type="text"
                  required
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Score / Credential ID</label>
                <input
                  type="text"
                  placeholder="e.g. Score: 81.6% (40/49)"
                  value={formData.credentialId}
                  onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
