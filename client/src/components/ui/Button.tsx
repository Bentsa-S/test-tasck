import { type ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200/50',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};
