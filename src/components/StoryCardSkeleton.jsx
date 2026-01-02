import React from "react";

const StoryCardSkeleton = () => {
  return (
    <div
      className="
        bg-white dark:bg-neutral-900
        rounded-lg overflow-hidden
        border border-neutral-200 dark:border-neutral-700
        shadow-sm
        w-full max-w-xs sm:max-w-sm md:max-w-md
        animate-pulse
      "
    >
      {/* Image Skeleton */}
      <div className="w-full aspect-[4/3] bg-gray-300 dark:bg-neutral-700" />

      {/* Card Content Skeleton */}
      <div className="p-2 sm:p-4 lg:p-4 text-center flex flex-col items-center gap-3">
        {/* Title Skeleton */}
        <div className="h-4 md:h-5 w-3/4 rounded bg-gray-300 dark:bg-neutral-700" />
        <div className="h-4 md:h-5 w-1/2 rounded bg-gray-300 dark:bg-neutral-700" />

        {/* Author Skeleton */}
        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-neutral-600 mt-2" />
      </div>
    </div>
  );
};

export default StoryCardSkeleton;
