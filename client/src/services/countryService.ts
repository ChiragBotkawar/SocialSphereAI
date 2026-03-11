import api from './api';
import type { ApiResponse, Country } from '../types';
import { buildQueryString } from '../utils/helpers';

interface CountryParams {
  region?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export const countryService = {
  getCountries: async (params?: CountryParams): Promise<Country[]> => {
    const qs = buildQueryString((params ?? {}) as Record<string, string | number | boolean | undefined | null>);
    const resp = await api.get<ApiResponse<Country[]>>(`/countries${qs}`);
    return resp.data.data;
  },

  getCountry: async (slug: string): Promise<Country> => {
    const resp = await api.get<ApiResponse<Country>>(`/countries/${slug}`);
    return resp.data.data;
  },
};
