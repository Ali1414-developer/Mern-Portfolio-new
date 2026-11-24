/**
 * Unified API Client for Ali Raza Portfolio
 * Uses relative /api base path to ensure seamless operation both on Vercel and local Vite proxy.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('ar_admin_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    console.warn(`[API] ${endpoint} request notice:`, err.message);
    throw err;
  }
}

export const api = {
  // Public
  getProjects: () => apiRequest('/projects'),
  getProjectBySlug: (slug) => apiRequest(`/projects/${slug}`),
  getExperience: () => apiRequest('/experience'),
  getSkills: () => apiRequest('/skills'),
  getEducation: () => apiRequest('/education'),
  getCertifications: () => apiRequest('/certifications'),
  getSiteSettings: () => apiRequest('/site'),
  sendMessage: (payload) => apiRequest('/messages', { method: 'POST', body: JSON.stringify(payload) }),
  checkHealth: () => apiRequest('/health'),

  // Auth
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getMe: () => apiRequest('/auth/me'),

  // Admin Project CRUD
  createProject: (data) => apiRequest('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => apiRequest(`/projects/${id}`, { method: 'DELETE' }),

  // Admin Experience CRUD
  createExperience: (data) => apiRequest('/experience', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id, data) => apiRequest(`/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id) => apiRequest(`/experience/${id}`, { method: 'DELETE' }),

  // Admin Skill CRUD
  createSkill: (data) => apiRequest('/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id, data) => apiRequest(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id) => apiRequest(`/skills/${id}`, { method: 'DELETE' }),

  // Admin Education CRUD
  createEducation: (data) => apiRequest('/education', { method: 'POST', body: JSON.stringify(data) }),
  updateEducation: (id, data) => apiRequest(`/education/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEducation: (id) => apiRequest(`/education/${id}`, { method: 'DELETE' }),

  // Admin Certification CRUD
  createCertification: (data) => apiRequest('/certifications', { method: 'POST', body: JSON.stringify(data) }),
  updateCertification: (id, data) => apiRequest(`/certifications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCertification: (id) => apiRequest(`/certifications/${id}`, { method: 'DELETE' }),

  // Admin Messages
  getMessages: () => apiRequest('/messages'),
  updateMessageStatus: (id, status) => apiRequest(`/messages/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteMessage: (id) => apiRequest(`/messages/${id}`, { method: 'DELETE' }),

  // Admin Site Settings
  updateSiteSettings: (data) => apiRequest('/site', { method: 'PUT', body: JSON.stringify(data) }),
};
