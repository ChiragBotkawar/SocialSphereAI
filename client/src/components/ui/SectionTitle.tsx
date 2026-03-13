import { cn } from '../../utils/helpers';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionTitle({ eyebrow, title, subtitle, centered = true, light = false, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {eyebrow && (
        <span className={cn('mb-2 inline-block text-sm font-semibold uppercase tracking-widest', light ? 'text-red-300' : 'text-primary')}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn('section-title', light ? 'text-white' : 'text-dark')}>{title}</h2>
      {subtitle && (
        <p className={cn('mt-4 max-w-2xl text-lg', centered && 'mx-auto', light ? 'text-gray-300' : 'text-gray-600')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
