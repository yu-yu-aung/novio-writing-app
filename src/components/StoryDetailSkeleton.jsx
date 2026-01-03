const StoryDetailSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6 animate-pulse w-full">

      {/* Cover Image */}
      <div className="w-full max-w-xs rounded-xl overflow-hidden shadow">
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Title */}
      <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Author */}
      <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Category */}
      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-3 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"
          />
        ))}
      </div>

      {/* Description */}
      <div className="max-w-md w-full space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-9/12 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Status */}
      <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Action Buttons */}
      <div className="flex justify-between w-full gap-4">
        <div className="h-10 w-36 bg-gray-300 dark:bg-gray-600 rounded-lg" />
        <div className="h-10 w-36 bg-gray-300 dark:bg-gray-600 rounded-lg" />
      </div>
    </div>
  );
};

export default StoryDetailSkeleton;
