import { cn } from './utils';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse bg-slate-100 rounded-xl', className)} />
);
