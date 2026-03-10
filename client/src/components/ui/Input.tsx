import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, id, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="form-label">
        {label}
      </label>
    )}
    <input ref={ref} id={id} className={cn('form-input', error && 'border-red-500 focus:ring-red-500', className)} {...props} />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

Input.displayName = 'Input';

export default Input;
