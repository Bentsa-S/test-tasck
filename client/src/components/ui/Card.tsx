import { type ReactNode } from 'react';
import { cn } from './utils';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div className={cn('bg-white rounded-3xl border border-slate-100 shadow-sm p-6', className)}>
    {children}
  </div>
);
