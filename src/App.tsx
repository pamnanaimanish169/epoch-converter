import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ConverterSection } from './components/ConverterSection';
import { CurrentEpochClock } from './components/CurrentEpochClock';
import { BatchConverter } from './components/BatchConverter';
import { CodeSnippets } from './components/CodeSnippets';
import { Footer } from './components/Footer';
import { SideNav } from './components/SideNav';
import { ToastContainer } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { getCurrentEpoch } from './utils/epochUtils';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast, removeToast } = useToast();
  const [currentEpoch, setCurrentEpoch] = useState(getCurrentEpoch('seconds'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(getCurrentEpoch('seconds'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast('Copied to clipboard!', 'success');
    }).catch(() => {
      addToast('Failed to copy', 'error');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ConverterSection onCopy={handleCopy} />
            <CurrentEpochClock onCopy={handleCopy} />
            {/* <BatchConverter />
            <CodeSnippets
              epoch={currentEpoch}
              unit="seconds"
              onCopy={handleCopy}
            /> */}
          </div>

          <div className="space-y-6">
            <SideNav onToggleTheme={toggleTheme} isDark={theme === 'dark'} />
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
