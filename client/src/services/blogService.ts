import api from './api';
import type { ApiResponse, BlogPost, PaginationMeta } from '../types';
import { buildQueryString } from '../utils/helpers';

interface BlogParams {
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const blogService = {
  getBlogPosts: async (params: BlogParams): Promise<{ data: BlogPost[]; pagination: PaginationMeta }> => {
    const qs = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    const resp = await api.get<ApiResponse<BlogPost[]>>(`/blog${qs}`);
    return { data: resp.data.data, pagination: resp.data.pagination! };
  },

  getBlogPost: async (slug: string): Promise<BlogPost> => {
    const resp = await api.get<ApiResponse<BlogPost>>(`/blog/${slug}`);
    return resp.data.data;
  },

  getCategories: async (): Promise<Array<{ _id: string; count: number }>> => {
    const resp = await api.get<ApiResponse<Array<{ _id: string; count: number }>>>('/blog/categories');
    return resp.data.data;
  },
};
