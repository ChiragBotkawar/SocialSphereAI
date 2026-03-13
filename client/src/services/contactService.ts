import api from './api';
import type { ApiResponse, ContactForm } from '../types';

export const contactService = {
  submitContact: async (data: ContactForm): Promise<{ message: string }> => {
    const resp = await api.post<ApiResponse<{ message: string }>>('/contact', data);
    return resp.data.data;
  },
};
