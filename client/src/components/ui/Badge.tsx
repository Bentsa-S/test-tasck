import { type ReactNode } from 'react';
import { cn } from './utils';

type BadgeProps = {
  children: ReactNode;
  variant?: 'indigo' | 'slate' | 'emerald' | 'rose';
  className?: string;
};

export const Badge = ({
  children,
  variant = 'indigo',
  className
}: BadgeProps) => {
  const variants = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-bold border', variants[variant], className)}>
      {children}
    </span>
  );
};
