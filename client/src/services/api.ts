import axios, { type AxiosError, type AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor: attach JWT token ──
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('BWN_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: normalize errors ──
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; errors?: Array<{ msg: string }> }>) => {
    const message =
      error.response?.data?.errors?.[0]?.msg ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    // Auto-logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('BWN_token');
      localStorage.removeItem('BWN_user');
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
