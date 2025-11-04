import { ChevronRight, Home, Sun, Moon, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SideNavProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

export const SideNav = ({ onToggleTheme, isDark }: SideNavProps) => {
  return (
    <aside className="sticky top-6">
      <nav className="p-4 transition-colors">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Pages</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              </li>
              <li>
                <button onClick={onToggleTheme} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
                  <span>Toggle theme</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
};


