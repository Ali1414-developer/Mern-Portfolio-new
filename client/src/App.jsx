import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from './pages/HomePage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminExperiencePage from './pages/admin/AdminExperiencePage';
import AdminSkillsPage from './pages/admin/AdminSkillsPage';
import AdminEducationPage from './pages/admin/AdminEducationPage';
import AdminCertificationsPage from './pages/admin/AdminCertificationsPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/skills" element={<Navigate to="/#skills" replace />} />
          <Route path="/experience" element={<Navigate to="/#experience" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Console Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="experience" element={<AdminExperiencePage />} />
          <Route path="skills" element={<AdminSkillsPage />} />
          <Route path="education" element={<AdminEducationPage />} />
          <Route path="certifications" element={<AdminCertificationsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
