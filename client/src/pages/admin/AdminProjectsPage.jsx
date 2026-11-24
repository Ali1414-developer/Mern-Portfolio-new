import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Github, Check, X, Loader2 } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';
import { fallbackProjects } from '../../data/fallbackData';

export default function AdminProjectsPage() {
  const { data: projects, refetch, setData } = useFetch(api.getProjects, fallbackProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Full Stack',
    shortDescription: '',
    description: '',
    technologies: '',
    features: '',
    liveUrl: '',
    githubUrl: '',
    role: 'Full Stack Developer',
    status: 'Completed',
    featured: false,
  });
  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Full Stack',
      shortDescription: '',
      description: '',
      technologies: '',
      features: '',
      liveUrl: '',
      githubUrl: '',
      role: 'Full Stack Developer',
      status: 'Completed',
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      slug: p.slug,
      category: p.category,
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      technologies: p.technologies ? p.technologies.join(', ') : '',
      features: p.features ? p.features.join('\n') : '',
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      role: p.role || 'Full Stack Developer',
      status: p.status || 'Completed',
      featured: !!p.featured,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setData((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.warn('API error during delete:', err.message);
      setData((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((s) => s.trim()).filter(Boolean),
      features: formData.features.split('\n').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await api.updateProject(editingId, payload);
      } else {
        await api.createProject(payload);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      console.warn('Project save notice:', err.message);
      // Update local state in demo mode
      if (editingId) {
        setData((prev) => prev.map((p) => (p._id === editingId ? { ...p, ...payload } : p)));
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
          <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
          <p className="text-xs text-slate-400">Add, edit, or archive portfolio projects and ERP builds.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-panel rounded-2xl border border-navy-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-850/80 text-slate-400 border-b border-navy-500 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3A56] text-slate-300">
              {projects?.map((p) => (
                <tr key={p._id || p.slug} className="hover:bg-navy-850/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{p.title}</div>
                    <div className="text-[11px] font-mono text-purple-400">/{p.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-navy-700 text-slate-300 font-mono text-[11px]">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono">{p.status || 'Completed'}</td>
                  <td className="p-4">
                    {p.featured ? (
                      <span className="text-emerald-400 font-mono text-[11px]">Yes</span>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px]">No</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-navy-700 hover:bg-navy-600 text-slate-300 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-2xl border border-navy-500 bg-navy-850 p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-navy-500">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="ERP">ERP</option>
                    <option value="Frontend">Frontend</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Production">Production</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Full Description</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, Express, MongoDB, Tailwind"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Features (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-500 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded bg-navy-950 border-navy-500 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-xs text-slate-300">Feature on homepage showcase</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-500">
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
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
