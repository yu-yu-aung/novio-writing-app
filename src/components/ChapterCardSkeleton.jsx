const ChapterCardSkeleton = () => {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 
        border border-gray-200 
        rounded-xl p-5 my-4 
        shadow-md 
        animate-pulse
      "
    >
      {/* Title */}
      <div className="h-4 md:h-5 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-3" />

      {/* Date */}
      <div className="hidden sm:block h-3 w-1/2 bg-gray-200 dark:bg-gray-600 rounded" />

      {/* Bottom row */}
      <div className="mt-4 flex items-center justify-between">
        {/* Chapter badge */}
        <div className="h-5 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />

        {/* Status badge */}
        <div className="hidden h-5 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default ChapterCardSkeleton;
