import { useQuery } from '@tanstack/react-query';
import { chapterService } from '../services/chapterService';
import type { ChapterSearchParams } from '../types';

export function useChapters(params: ChapterSearchParams = {}) {
  return useQuery({
    queryKey: ['chapters', params],
    queryFn: () => chapterService.getChapters(params),
  });
}

export function useChapter(id: string) {
  return useQuery({
    queryKey: ['chapter', id],
    queryFn: () => chapterService.getChapter(id),
    enabled: !!id,
  });
}

export function useFeaturedChapters() {
  return useQuery({
    queryKey: ['chapters', 'featured'],
    queryFn: () => chapterService.getFeaturedChapters(),
  });
}
