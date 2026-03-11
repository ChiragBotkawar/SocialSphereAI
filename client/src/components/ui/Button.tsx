import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  white: 'btn-white',
  ghost: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white transition-colors duration-200',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variantMap[variant], sizeMap[size], 'inline-flex items-center justify-center gap-2', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner size="sm" color="current" />}
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
