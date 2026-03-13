import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/blogService';

interface BlogParams {
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export function useBlogs(params: BlogParams = {}) {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogService.getBlogPosts(params),
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogService.getBlogPost(slug),
    enabled: !!slug,
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: () => blogService.getCategories(),
  });
}
