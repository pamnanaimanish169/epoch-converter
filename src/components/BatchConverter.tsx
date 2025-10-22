import { useState } from 'react';
import { Upload, Download, Trash2 } from 'lucide-react';
import { detectTimeUnit, normalizeToMilliseconds, formatDateTimeString } from '../utils/epochUtils';

interface ConversionRow {
  id: string;
  input: string;
  output: string;
  error?: string;
}

export const BatchConverter = () => {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<ConversionRow[]>([]);

  const handleConvert = () => {
    const lines = input.split('\n').filter(line => line.trim());

    const converted: ConversionRow[] = lines.map((line, idx) => {
      const trimmed = line.trim();
      const num = parseFloat(trimmed);

      if (isNaN(num)) {
        return {
          id: `${idx}`,
          input: trimmed,
          output: '',
          error: 'Invalid number'
        };
      }

      try {
        const unit = detectTimeUnit(num);
        const ms = normalizeToMilliseconds(num, unit);
        const date = new Date(ms);
        const formatted = formatDateTimeString(date, false);

        return {
          id: `${idx}`,
          input: trimmed,
          output: formatted,
        };
      } catch (err) {
        return {
          id: `${idx}`,
          input: trimmed,
          output: '',
          error: 'Conversion failed'
        };
      }
    });

    setResults(converted);
  };

  const handleExportCSV = () => {
    const csv = ['Epoch,DateTime,Status\n'];
    results.forEach(row => {
      csv.push(`"${row.input}","${row.output}","${row.error || 'Success'}"\n`);
    });

    const blob = new Blob(csv, { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epoch-conversion-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Upload className="w-5 h-5 text-purple-500" />
        Batch Converter
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paste Multiple Timestamps (one per line)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="1234567890&#10;1609459200&#10;1640995200"
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm transition-colors resize-none"
            aria-label="Batch timestamp input"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleConvert}
            disabled={!input.trim()}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
          >
            Convert All
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            aria-label="Clear all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {results.length > 0 && (
          <>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Epoch
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        DateTime
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {results.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3 text-gray-900 dark:text-white font-mono">
                          {row.input}
                        </td>
                        <td className="px-4 py-3">
                          {row.error ? (
                            <span className="text-red-500 text-xs">{row.error}</span>
                          ) : (
                            <span className="text-gray-900 dark:text-white">{row.output}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={handleExportCSV}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as CSV
            </button>
          </>
        )}
      </div>
    </div>
  );
};
