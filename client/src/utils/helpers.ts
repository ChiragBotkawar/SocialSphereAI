import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

/**
 * Merge Tailwind classes safely (handles conflicts)
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Format a date string for display
 */
export const formatDate = (dateString: string, pattern = 'MMM dd, yyyy'): string => {
  try {
    return format(new Date(dateString), pattern);
  } catch {
    return dateString;
  }
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return dateString;
  }
};

/**
 * Format a number with commas (e.g., 355000 → "355,000")
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Truncate a string with ellipsis
 */
export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '...';
};

/**
 * Generate initials from a name (e.g., "John Doe" → "JD")
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert slug to readable title
 */
export const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(capitalize)
    .join(' ');
};

/**
 * Build an API query string from an object
 */
export const buildQueryString = (params: Record<string, string | number | boolean | undefined | null>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
};

/**
 * Get chapter meeting day display text
 */
export const getMeetingDisplay = (schedule?: { dayOfWeek?: string; time?: string }): string => {
  if (!schedule?.dayOfWeek) return 'Meeting schedule TBD';
  return `Every ${schedule.dayOfWeek} at ${schedule.time || ''}`.trim();
};

/**
 * Get a stable placeholder image URL for a given seed
 */
export const getPlaceholderImage = (seed: string, width = 800, height = 450): string => {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
};

/**
 * Debounce a function call
 */
export const debounce = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Check whether a value is a valid MongoDB ObjectId
 */
export const isObjectId = (value: string): boolean => /^[0-9a-fA-F]{24}$/.test(value);

/**
 * Strip HTML tags from a string (for excerpt generation)
 */
export const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
