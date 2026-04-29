import { type InputHTMLAttributes } from 'react';
import { cn } from './utils';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      'w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200',
      className
    )}
    {...props}
  />
);
