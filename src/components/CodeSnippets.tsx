import { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { getJavaScriptSnippet, getPythonSnippet, getSQLSnippet } from '../utils/codeSnippets';

interface CodeSnippetsProps {
  epoch: number;
  unit: string;
  onCopy: (text: string) => void;
}

type Language = 'javascript' | 'python' | 'sql';

export const CodeSnippets = ({ epoch, unit, onCopy }: CodeSnippetsProps) => {
  const [activeTab, setActiveTab] = useState<Language>('javascript');
  const [copied, setCopied] = useState(false);

  const snippets = {
    javascript: getJavaScriptSnippet(epoch, unit),
    python: getPythonSnippet(epoch, unit),
    sql: getSQLSnippet(epoch, unit)
  };

  const handleCopy = () => {
    onCopy(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: Language; label: string }[] = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'sql', label: 'SQL' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Code className="w-5 h-5 text-cyan-500" />
        Developer Tools
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
            aria-label="Copy code snippet"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {snippets[activeTab]}
            </code>
          </pre>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Mock API Endpoint
          </h3>
          <code className="text-xs font-mono text-blue-700 dark:text-blue-400 break-all">
            GET /api/convert?epoch={epoch}&unit={unit} 
          </code>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            Example endpoint format for your application
          </p>
        </div>
      </div>
    </div>
  );
};
