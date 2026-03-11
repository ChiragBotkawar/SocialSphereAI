import api from './api';
import type { ApiResponse, Career, PaginationMeta } from '../types';
import { buildQueryString } from '../utils/helpers';

interface CareerParams {
  department?: string;
  type?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const careerService = {
  getCareers: async (params?: CareerParams): Promise<{ data: Career[]; pagination: PaginationMeta }> => {
    const qs = buildQueryString((params ?? {}) as Record<string, string | number | boolean | undefined | null>);
    const resp = await api.get<ApiResponse<Career[]>>(`/careers${qs}`);
    return { data: resp.data.data, pagination: resp.data.pagination! };
  },

  getCareer: async (slug: string): Promise<Career> => {
    const resp = await api.get<ApiResponse<Career>>(`/careers/${slug}`);
    return resp.data.data;
  },
};
