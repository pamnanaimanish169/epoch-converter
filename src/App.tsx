import { useEffect } from 'react';
import { Header } from './components/Header';
import { ConverterSection } from './components/ConverterSection';
import { CurrentEpochClock } from './components/CurrentEpochClock';
import { Footer } from './components/Footer';
import { SideNav } from './components/SideNav';
import { ToastContainer } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import FAQ from './pages/FAQ';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { toasts, addToast, removeToast } = useToast();

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ConverterSection onCopy={handleCopy} />
                  <CurrentEpochClock onCopy={handleCopy} />
                  {/* Reserved for future tools/components */}
                </div>

                <div className="space-y-6">
                  <SideNav onToggleTheme={toggleTheme} isDark={theme === 'dark'} />
                </div>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
