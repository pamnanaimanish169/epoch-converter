import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Gift } from 'lucide-react';
import { FreebieCard } from '../components/FreebieCard';
import { Pagination } from '../components/Pagination';
import { useFreebies, useSearchFreebies } from '../hooks/useFreebies';

const ITEMS_PER_PAGE = 12;

export const FreebiesListing = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all freebies or search results
  const { data: allFreebies = [], isLoading: isLoadingAll } = useFreebies();
  const { data: searchResults = [], isLoading: isLoadingSearch } = useSearchFreebies(searchQuery);

  const filteredFreebies = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    return allFreebies;
  }, [searchQuery, searchResults, allFreebies]);

  const paginatedFreebies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredFreebies.slice(startIndex, endIndex);
  }, [filteredFreebies, currentPage]);

  const totalPages = Math.ceil(filteredFreebies.length / ITEMS_PER_PAGE);
  const isLoading = isLoadingAll || (searchQuery.trim() && isLoadingSearch);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('freebies.listing.title')}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('freebies.listing.description', { count: allFreebies.length })}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('freebies.listing.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {t('freebies.listing.resultsCount', {
            count: filteredFreebies.length,
            query: searchQuery
          })}
        </div>
      )}

      {/* Freebies Grid */}
      {paginatedFreebies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedFreebies.map((freebie) => (
              <FreebieCard key={freebie.id} freebie={freebie} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            {t('freebies.listing.noResults')}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            {t('freebies.listing.tryDifferentSearch')}
          </p>
          <button
            onClick={() => handleSearchChange('')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('freebies.listing.clearSearch')}
          </button>
        </div>
      )}
    </div>
  );
};