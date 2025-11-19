import { useState } from 'react';
import Logo from '../../epoch-converter-logo.png';

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Epoch & Unix Timestamp Converter"
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Epoch & Unix Timestamp Converter
              </h1>
              {/* <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Convert Unix timestamps to human-readable time and back instantly
              </p> */}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
