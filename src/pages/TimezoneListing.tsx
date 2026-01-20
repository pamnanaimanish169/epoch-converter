import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe } from 'lucide-react';
import { getTimezoneConfig, getTimezonesByRegion, TIMEZONE_CONFIGS } from '../utils/timezoneConfig';
import type { TimezoneConfig } from '../utils/timezoneConfig';

export const TimezoneListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  const allTimezones = useMemo(() => {
    return Object.values(TIMEZONE_CONFIGS) as TimezoneConfig[];
  }, []);

  const regions = useMemo(() => getTimezonesByRegion(), []);

  const filteredTimezones = useMemo(() => {
    let filtered = allTimezones;

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(tz => {
        const regionTimezones = regions[selectedRegion] || [];
        return regionTimezones.some(rtz => rtz.code === tz.code);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tz =>
        tz.code.toLowerCase().includes(query) ||
        tz.fullName.toLowerCase().includes(query) ||
        tz.regions.some(r => r.toLowerCase().includes(query)) ||
        tz.utcOffset.includes(query)
      );
    }

    return filtered.sort((a, b) => a.code.localeCompare(b.code));
  }, [allTimezones, searchQuery, selectedRegion, regions]);

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'US & Canada', label: 'US & Canada' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Australia & Pacific', label: 'Australia & Pacific' },
    { value: 'Middle East & Other', label: 'Middle East & Other' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-500" />
          All Timezone Converters
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and search through all {allTimezones.length} timezone converters. Click any timezone to convert epoch timestamps.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search timezones by code, name, or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {regionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedRegion(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedRegion === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredTimezones.length} of {allTimezones.length} timezones
      </div>

      {/* Timezone Grid */}
      {filteredTimezones.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTimezones.map((tz) => (
            <Link
              key={tz.code}
              to={`/epoch-to-${tz.code.toLowerCase()}`}
              className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {tz.code}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tz.fullName}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                  {tz.utcOffset}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  <span className="font-medium">Regions:</span> {tz.regions.join(', ')}
                </p>
                {tz.observesDST && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    DST: {tz.code} / {tz.dstCode}
                  </p>
                )}
                {!tz.observesDST && (
                  <p className="text-xs text-green-600 dark:text-green-400">
                    No DST
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No timezones found matching your search criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
            }}
            className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

