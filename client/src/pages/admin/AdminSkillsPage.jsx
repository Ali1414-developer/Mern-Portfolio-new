import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';
import { fallbackSkills } from '../../data/fallbackData';

export default function AdminSkillsPage() {
  const { data: skills, refetch, setData } = useFetch(api.getSkills, fallbackSkills);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    icon: 'react',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'Frontend', icon: 'react', description: '' });
    setModalOpen(true);
  };

  const openEditModal = (s) => {
    setEditingId(s._id);
    setFormData({
      name: s.name,
      category: s.category,
      icon: s.icon || 'code',
      description: s.description || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      setData((prev) => prev.filter((s) => s._id !== id));
    } catch {
      setData((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.updateSkill(editingId, formData);
      } else {
        await api.createSkill(formData);
      }
      setModalOpen(false);
      refetch();
    } catch {
      if (editingId) {
        setData((prev) => prev.map((s) => (s._id === editingId ? { ...s, ...formData } : s)));
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
          <h1 className="text-2xl font-bold text-white">Skills Matrix</h1>
          <p className="text-xs text-slate-400">Manage developer tools, technologies, and classifications.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {skills?.map((s) => (
          <div
            key={s._id || s.name}
            className="glass-panel p-4 rounded-xl border border-navy-500 flex items-center justify-between gap-2"
          >
            <div>
              <div className="font-semibold text-white text-sm">{s.name}</div>
              <div className="text-[10px] font-mono text-purple-400">{s.category}</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEditModal(s)}
                className="p-1 rounded bg-navy-700 hover:bg-navy-600 text-slate-300"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-3 h-3" />
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
                {editingId ? 'Edit Skill' : 'New Skill'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Programming">Programming</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Tools">Tools</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
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
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1 inline" />}
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
