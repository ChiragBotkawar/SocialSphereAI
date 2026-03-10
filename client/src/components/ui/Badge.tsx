import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'red' | 'gray' | 'green' | 'blue';
}

const variantMap = {
  red: 'badge-red',
  gray: 'badge-gray',
  green: 'bg-green-100 text-green-700 border border-green-200',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200',
};

export default function Badge({ variant = 'gray', className, children, ...props }: BadgeProps) {
  return (
    <span className={cn('badge', variantMap[variant], className)} {...props}>
      {children}
    </span>
  );
}
