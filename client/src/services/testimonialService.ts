import api from './api';
import type { ApiResponse, Testimonial } from '../types';
import { buildQueryString } from '../utils/helpers';

interface TestimonialParams {
  category?: string;
  country?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const testimonialService = {
  getTestimonials: async (params?: TestimonialParams): Promise<Testimonial[]> => {
    const qs = buildQueryString((params ?? {}) as Record<string, string | number | boolean | undefined | null>);
    const resp = await api.get<ApiResponse<Testimonial[]>>(`/testimonials${qs}`);
    return resp.data.data;
  },
};
