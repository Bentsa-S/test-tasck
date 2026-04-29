import { Link } from 'react-router-dom';
import { FormInput } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <FormInput className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Forms Lite
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/forms/new" className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
            Create Form
          </Link>
        </div>
      </div>
    </nav>
  );
};
