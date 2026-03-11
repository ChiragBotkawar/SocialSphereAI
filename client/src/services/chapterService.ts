import api from './api';
import type { ApiResponse, Chapter, ChapterSearchParams, PaginationMeta } from '../types';
import { buildQueryString } from '../utils/helpers';

export const chapterService = {
  getChapters: async (params: ChapterSearchParams): Promise<{ data: Chapter[]; pagination: PaginationMeta }> => {
    const qs = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    const resp = await api.get<ApiResponse<Chapter[]>>(`/chapters${qs}`);
    return {
      data: resp.data.data,
      pagination: resp.data.pagination!,
    };
  },

  getChapter: async (id: string): Promise<Chapter> => {
    const resp = await api.get<ApiResponse<Chapter>>(`/chapters/${id}`);
    return resp.data.data;
  },

  getFeaturedChapters: async (): Promise<Chapter[]> => {
    const resp = await api.get<ApiResponse<Chapter[]>>('/chapters/featured');
    return resp.data.data;
  },
};
