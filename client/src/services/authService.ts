import api from './api';
import type { ApiResponse, User, LoginForm, RegisterForm } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (data: LoginForm): Promise<AuthResponse> => {
    const resp = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return resp.data.data;
  },

  register: async (data: RegisterForm): Promise<AuthResponse> => {
    const resp = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return resp.data.data;
  },

  getMe: async (): Promise<User> => {
    const resp = await api.get<ApiResponse<User>>('/auth/me');
    return resp.data.data;
  },
};
