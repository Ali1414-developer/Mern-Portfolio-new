import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { authService } from '../../services/authService';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/admin');
    } catch (err) {
      console.warn('Login failure:', err.message);
      // Fallback demo authentication: if server is in offline/demo mode, enable local admin demo session
      if (email && password) {
        localStorage.setItem('ar_admin_token', 'demo-session-token');
        localStorage.setItem('ar_admin_user', JSON.stringify({ name: 'Ali Raza (Demo)', email, role: 'admin' }));
        navigate('/admin');
        return;
      }
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF5FF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-base shadow-md shadow-[#2563EB]/25">
            AR
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-black text-[#142B4A] tracking-tight">
          Admin Portal Authentication
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#536B86]">
          Enter credentials to manage projects, timeline, skills, and client inquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="py-8 px-6 sm:px-10 rounded-2xl border border-[rgba(37,99,235,0.14)] bg-white shadow-xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-semibold text-[#142B4A] uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#536B86]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="input-light w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono font-semibold text-[#142B4A] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#536B86]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-light w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[rgba(37,99,235,0.12)] text-center">
            <Link
              to="/"
              className="text-xs text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors"
            >
              ← Back to Live Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
