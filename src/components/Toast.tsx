import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export const Toast = ({ toast, onRemove }: ToastProps) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const backgrounds = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${backgrounds[toast.type]} animate-slide-in`}>
      {icons[toast.type]}
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onRemove }: { toasts: ToastType[]; onRemove: (id: string) => void }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};
