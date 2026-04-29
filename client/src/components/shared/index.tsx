import { type ReactNode, type ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Card, cn } from '../ui';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  showBack?: boolean;
  backTo?: string;
};

export const PageHeader = ({ title, description, children, showBack, backTo = '/' }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      {showBack && (
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{title}</h1>
          {description && <p className="text-slate-500 text-lg">{description}</p>}
        </div>
        {children && <div className="flex gap-3">{children}</div>}
      </div>
    </div>
  );
};

type EmptyStateProps = {
  icon?: ElementType;
  title: string;
  description: string;
  children?: ReactNode;
};

export const EmptyState = ({ icon: Icon, title, description, children }: EmptyStateProps) => (
  <Card className="text-center py-20 bg-slate-50/50 border-dashed border-2">
    {Icon && <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />}
    <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
    <p className="text-slate-500 mb-8 max-w-sm mx-auto">{description}</p>
    {children}
  </Card>
);

export const LoadingGrid = ({ count = 4, className }: { count?: number; className?: string }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-3xl" />
    ))}
  </div>
);
