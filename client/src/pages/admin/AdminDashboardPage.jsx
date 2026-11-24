import React from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Briefcase, Code2, GraduationCap, Award, Mail, ArrowUpRight, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { api } from '../../services/api';
import { fallbackProjects, fallbackExperiences, fallbackSkills, fallbackCertifications } from '../../data/fallbackData';

export default function AdminDashboardPage() {
  const { data: projects } = useFetch(api.getProjects, fallbackProjects);
  const { data: experiences } = useFetch(api.getExperience, fallbackExperiences);
  const { data: skills } = useFetch(api.getSkills, fallbackSkills);
  const { data: certifications } = useFetch(api.getCertifications, fallbackCertifications);
  const { data: messages } = useFetch(api.getMessages, []);

  const stats = [
    { label: 'Active Projects', value: projects?.length || 0, href: '/admin/projects', icon: FolderGit2, color: 'text-[#2563EB]' },
    { label: 'Experience Nodes', value: experiences?.length || 0, href: '/admin/experience', icon: Briefcase, color: 'text-[#0284C7]' },
    { label: 'Technologies', value: skills?.length || 0, href: '/admin/skills', icon: Code2, color: 'text-[#163B72]' },
    { label: 'Certifications', value: certifications?.length || 0, href: '/admin/certifications', icon: Award, color: 'text-[#36C5F0]' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(37,99,235,0.14)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142B4A] tracking-tight">System Overview</h1>
          <p className="text-xs sm:text-sm text-[#536B86] mt-1">
            Real-time management portal for Ali Raza's MERN &amp; ERP portfolio.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>MongoDB &amp; Serverless Active</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.href}
              className="p-5 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white hover:border-[rgba(37,99,235,0.35)] hover:shadow-md transition-all group shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <ArrowUpRight className="w-4 h-4 text-[#8BA2BC] group-hover:text-[#2563EB] transition-colors" />
              </div>
              <div className="text-3xl font-black text-[#142B4A]">{stat.value}</div>
              <div className="text-xs font-semibold text-[#536B86] mt-1">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries preview */}
        <div className="p-6 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#142B4A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Contact Messages</span>
            </h3>
            <Link to="/admin/messages" className="text-xs font-mono text-[#2563EB] font-semibold hover:underline">
              View All ({messages?.length || 0})
            </Link>
          </div>

          {messages && messages.length > 0 ? (
            <div className="space-y-3">
              {messages.slice(0, 3).map((msg, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.10)] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#142B4A]">
                    <span className="font-bold text-[#142B4A]">{msg.name}</span>
                    <span className="font-mono text-[#536B86]">{msg.status}</span>
                  </div>
                  <p className="text-[#536B86] truncate">{msg.subject || msg.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#536B86] py-6 text-center">No contact inquiries received yet.</p>
          )}
        </div>

        {/* System & Architecture Info */}
        <div className="p-6 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white space-y-4 shadow-xs">
          <h3 className="font-bold text-base text-[#142B4A] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Architecture &amp; Deployment</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.10)]">
              <span className="text-[#536B86]">Target Platform</span>
              <span className="text-[#142B4A] font-mono font-bold">Vercel (Single Repo Monorepo)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.10)]">
              <span className="text-[#536B86]">Backend API</span>
              <span className="text-emerald-700 font-mono font-bold">Express Serverless Handler</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FBFF] border border-[rgba(37,99,235,0.10)]">
              <span className="text-[#536B86]">Database Engine</span>
              <span className="text-[#2563EB] font-mono font-bold">MongoDB Atlas + Mongoose</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
