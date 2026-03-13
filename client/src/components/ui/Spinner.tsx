import { cn } from '../../utils/helpers';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'current';
  className?: string;
}

const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
const colorMap = { primary: 'border-primary', white: 'border-white', current: 'border-current' };

export default function Spinner({ size = 'md', color = 'primary', className }: SpinnerProps) {
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-t-transparent',
        sizeMap[size],
        colorMap[color],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
