import React, { useState } from 'react';
import { Mail, Trash2, CheckCircle2, Clock, Archive, Reply, Eye, User, Calendar } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';

export default function AdminMessagesPage() {
  const { data: messages, refetch, setData } = useFetch(api.getMessages, []);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateMessageStatus(id, status);
      setData((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) => ({ ...prev, status }));
      }
    } catch (err) {
      console.warn('Status update notice:', err.message);
      setData((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message inquiry?')) return;
    try {
      await api.deleteMessage(id);
      setData((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch {
      setData((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-navy-500">
        <h1 className="text-2xl font-bold text-white">Client &amp; Recruiter Inquiries</h1>
        <p className="text-xs text-slate-400">View and respond to incoming contact submissions stored in MongoDB.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-3">
          {(!messages || messages.length === 0) ? (
            <div className="glass-panel p-8 rounded-2xl border border-navy-500 text-center text-slate-500 text-xs">
              No inquiries logged in the database yet.
            </div>
          ) : (
            messages.map((m) => {
              const isSelected = selectedMessage?._id === m._id;
              const isNew = m.status === 'new';

              return (
                <div
                  key={m._id}
                  onClick={() => {
                    setSelectedMessage(m);
                    if (m.status === 'new') {
                      handleStatusChange(m._id, 'read');
                    }
                  }}
                  className={`glass-panel p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-navy-850/90 shadow-md shadow-purple-500/10'
                      : 'border-navy-500/80 bg-navy-850/40 hover:border-navy-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {isNew && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                      <span className="font-semibold text-white text-xs truncate">{m.name}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-navy-700 text-slate-400">
                      {m.status}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-300 truncate">{m.subject || 'No Subject'}</p>
                  <p className="text-[11px] text-slate-500 truncate mt-1">{m.message}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 sm:p-8 rounded-2xl border border-[#1E3A56] bg-[#10263D] space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E3A56]">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMessage.subject || 'Inquiry'}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="text-[#C084FC] font-medium">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                  title="Delete Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed bg-[#0D2238] p-4 rounded-xl border border-[#1E3A56]">
                {selectedMessage.message}
              </div>

              {/* Status Actions */}
              <div className="pt-4 border-t border-[#1E3A56] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-mono">
                  Current Status: <strong className="text-white capitalize">{selectedMessage.status}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedMessage._id, 'read')}
                    className="px-3 py-1.5 rounded-lg bg-[#0D2238] hover:bg-[#15324D] border border-[#1E3A56] text-slate-300"
                  >
                    Mark Read
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedMessage._id, 'replied')}
                    className="px-3 py-1.5 rounded-lg bg-[rgba(168,85,247,0.12)] border border-[rgba(168,85,247,0.25)] text-[#C084FC] hover:bg-[#A855F7] hover:text-white"
                  >
                    Mark Replied
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedMessage._id, 'archived')}
                    className="px-3 py-1.5 rounded-lg bg-[#0D2238] border border-[#1E3A56] text-slate-400 hover:text-white"
                  >
                    Archive
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`}
                    className="btn-primary px-4 py-1.5 rounded-lg font-semibold flex items-center gap-1.5"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply Email</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-navy-500 text-center text-slate-500 text-xs">
              Select an inquiry from the list on the left to read details and update its lifecycle status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
