import { ChevronRight, Home, Settings, Sun, Moon, Wrench } from 'lucide-react';

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
                <a href="#home" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </a>
              </li>
              <li>
                <a href="#preferences" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </a>
              </li>
              <li>
                <button onClick={onToggleTheme} className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
                  <span>Toggle theme</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Tools</h3>
            <ul className="space-y-1">
              {[
                'Epoch converter',
                'Batch converter',
                'Time zone converter',
                'Timestamp list',
                'LDAP converter',
                'WebKit/Chrome timestamp',
                'Unix hex timestamp',
                'Cocoa Core Data timestamp',
                'Mac HFS+ timestamp',
                'SAS timestamp',
                'Seconds/days since year 0',
                'Bin/Oct/Hex converter',
                'Countdown in seconds',
                'Epoch clock',
              ].map((label) => (
                <li key={label}>
                  <a href={`#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <Wrench className="w-4 h-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
};


