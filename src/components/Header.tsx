import { Clock, Moon, Sun } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Epoch Converter
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Convert Unix timestamps to human-readable time and back instantly
              </p>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
