import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from './utils';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading = false,
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-900/20 p-8 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={cn(
                "p-4 rounded-2xl mb-6",
                variant === 'danger' ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"
              )}>
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={onClose}
                >
                  {cancelText}
                </Button>
                <Button
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  className="flex-1"
                  onClick={onConfirm}
                  isLoading={isLoading}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
