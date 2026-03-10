import { type HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export default function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('container-bni', className)} {...props}>
      {children}
    </div>
  );
}
