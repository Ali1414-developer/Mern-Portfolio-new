import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { authService } from '../services/authService';

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Skills', href: '/admin/skills', icon: Code2 },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#EAF5FF] flex items-center justify-center text-[#536B86] font-mono text-sm">
        Authenticating admin session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF5FF] text-[#142B4A] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[rgba(37,99,235,0.14)]">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#2563EB]" />
          <span className="font-bold text-sm text-[#142B4A]">Ali Raza Admin Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-[#EAF5FF] text-[#142B4A]"
          aria-label="Toggle admin sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[rgba(37,99,235,0.14)] p-5 flex flex-col justify-between shadow-xs transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white shadow-xs">
              AR
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#142B4A]">Ali Raza</h2>
              <p className="text-[10px] font-mono text-[#2563EB] font-semibold">Admin Control Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-[#536B86] hover:text-[#142B4A] hover:bg-[#EAF5FF]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[rgba(37,99,235,0.12)] space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#536B86] hover:text-[#142B4A] hover:bg-[#EAF5FF] transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Screen Content */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
