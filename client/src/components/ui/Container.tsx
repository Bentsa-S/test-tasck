import { type ReactNode } from 'react';
import { cn } from './utils';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn('max-w-5xl mx-auto px-6 py-12', className)}>
    {children}
  </div>
);
