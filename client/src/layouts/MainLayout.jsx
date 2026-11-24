import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EAF5FF] text-[#142B4A] selection:bg-[#2563EB] selection:text-white relative">
      {/* Subtle atmospheric ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#36C5F0]/[0.09] rounded-full blur-[130px] pointer-events-none -z-10 animate-ambient-drift"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#2563EB]/[0.08] rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/2 right-1/3 w-[380px] h-[380px] bg-[#DCEEFF]/70 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <Navbar />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
