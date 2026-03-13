import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ hover = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('card', hover && 'hover:shadow-card-hover transition-shadow duration-300', className)}
      {...props}
    >
      {children}
    </div>
  );
}
