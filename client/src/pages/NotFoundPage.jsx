import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-purple-900/30 text-purple-400 border border-purple-800/40 flex items-center justify-center font-mono text-2xl font-bold mb-6">
        404
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Page Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        The route you are navigating to doesn't exist or has been relocated in the portfolio directory.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Portfolio Home</span>
      </Link>
    </div>
  );
}
