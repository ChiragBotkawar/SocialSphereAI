import api from './api';
import type { ApiResponse, BWNEvent, PaginationMeta } from '../types';
import { buildQueryString } from '../utils/helpers';

interface EventParams {
  search?: string;
  eventType?: string;
  format?: string;
  country?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const eventService = {
  getEvents: async (params: EventParams): Promise<{ data: BWNEvent[]; pagination: PaginationMeta }> => {
    const qs = buildQueryString(params as Record<string, string | number | boolean | undefined | null>);
    const resp = await api.get<ApiResponse<BWNEvent[]>>(`/events${qs}`);
    return { data: resp.data.data, pagination: resp.data.pagination! };
  },

  getEvent: async (slug: string): Promise<BWNEvent> => {
    const resp = await api.get<ApiResponse<BWNEvent>>(`/events/${slug}`);
    return resp.data.data;
  },

  getFeaturedEvents: async (): Promise<BWNEvent[]> => {
    const resp = await api.get<ApiResponse<BWNEvent[]>>('/events?featured=true&limit=3');
    return resp.data.data;
  },
};
