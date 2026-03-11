import api from './api';
import type { ApiResponse, VisitRequestForm } from '../types';

export const visitRequestService = {
  submitVisitRequest: async (data: VisitRequestForm): Promise<{ message: string }> => {
    const resp = await api.post<ApiResponse<{ message: string }>>('/visit-requests', data);
    return resp.data.data;
  },
};
