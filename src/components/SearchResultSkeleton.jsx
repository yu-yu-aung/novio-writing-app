const SearchResultSkeleton = () => {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 lg:px-16 space-y-12 animate-pulse">
      
      {/* Heading */}
      <div className="h-8 w-80 bg-gray-200 dark:bg-amethyst-800 rounded-md" />

      {/* Tabs */}
      <div className="flex gap-6 border-b border-default pb-3 overflow-x-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-8 w-24 bg-gray-200 dark:bg-amethyst-800 rounded-md"
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg bg-white dark:bg-amethyst-900/30
                       border border-gray-200 dark:border-amethyst-700 shadow-sm"
          >
            {/* Image */}
            <div className="w-24 h-32 bg-gray-200 dark:bg-amethyst-800 rounded-sm" />

            {/* Text */}
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-amethyst-800 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-amethyst-800 rounded" />
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-amethyst-800 rounded" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SearchResultSkeleton;
