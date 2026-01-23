import { Link } from 'react-router-dom';
import type { Freebie } from '../types';

interface FreebieCardProps {
  freebie: Freebie;
}

export const FreebieCard = ({ freebie }: FreebieCardProps) => {
  return (
    <Link
      to={`/freebies/${freebie.slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
    >
      {/* Thumbnail Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={freebie.thumbnail}
          alt={freebie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {freebie.category && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-md">
            {freebie.category}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {freebie.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {freebie.shortDescription}
        </p>

        {/* Footer Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          {freebie.downloadCount !== undefined && (
            <span>{freebie.downloadCount.toLocaleString()} downloads</span>
          )}
          {freebie.tags && freebie.tags.length > 0 && (
            <span className="text-blue-600 dark:text-blue-400">
              {freebie.tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

