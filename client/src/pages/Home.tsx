import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, ConfirmModal } from '../components/ui';
import { PageHeader, EmptyState, LoadingGrid } from '../components/shared';
import { Plus, Eye, BarChart3, FormInput, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHomeForms } from '../hooks/useHomeForms';

const Home = () => {
  const { forms, isLoading, error, deleteForm, isDeleting } = useHomeForms();
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (formToDelete) {
      await deleteForm(formToDelete);
      setFormToDelete(null);
    }
  };

  return (
    <Container>
      <ConfirmModal
        isOpen={!!formToDelete}
        onClose={() => setFormToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Form"
        description="Are you sure you want to delete this form? This action cannot be undone and all collected responses will be lost."
        confirmText="Delete"
        variant="danger"
        isLoading={isDeleting}
      />
      <PageHeader
        title="My Forms"
        description="Manage and view your active survey forms."
      >
        <Link to="/forms/new">
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create New Form
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <LoadingGrid />
      ) : error ? (
        <Card className="text-center py-12 border-rose-100 bg-rose-50/50">
          <p className="text-rose-600 font-medium">Failed to load forms. Please try again.</p>
        </Card>
      ) : forms.length === 0 ? (
        <EmptyState
          icon={FormInput}
          title="No forms yet"
          description="Get started by creating your first form to collect data from your users."
        >
          <Link to="/forms/new">
            <Button variant="secondary">Start Building</Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((form, idx) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 border-slate-200 h-full flex flex-col relative">
                <button
                  onClick={() => setFormToDelete(form.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  title="Delete Form"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="mb-6 pr-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {form.title}
                  </h2>
                  <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                    {form.description || 'No description provided.'}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <Link to={`/forms/${form.id}/fill`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full gap-2 text-xs">
                      <Eye className="w-4 h-4" />
                      Fill Out
                    </Button>
                  </Link>
                  <Link to={`/forms/${form.id}/responses`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full gap-2 text-xs">
                      <BarChart3 className="w-4 h-4" />
                      Responses
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;