import { api } from './api';

export const authService = {
  async login(email, password) {
    const response = await api.login({ email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('ar_admin_token', response.data.token);
      localStorage.setItem('ar_admin_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('ar_admin_token');
    localStorage.removeItem('ar_admin_user');
  },

  getToken() {
    return localStorage.getItem('ar_admin_token');
  },

  getUser() {
    const raw = localStorage.getItem('ar_admin_user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('ar_admin_token');
  },

  async verifyToken() {
    if (!this.isAuthenticated()) return false;
    try {
      await api.getMe();
      return true;
    } catch {
      this.logout();
      return false;
    }
  },
};
