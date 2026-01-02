import React from "react";

const NotiCardSkeleton = () => {
  return (
    <div className="flex gap-3 p-3 rounded-xl border bg-amethyst-50 dark:bg-gray-800 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gray-300 dark:bg-gray-700 shrink-0" />

      {/* Text Skeleton */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Content line */}
        <div className="h-4 sm:h-5 lg:h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />

        {/* Timestamp line */}
        <div className="h-3 sm:h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-600" />
      </div>
    </div>
  );
};

export default NotiCardSkeleton;
