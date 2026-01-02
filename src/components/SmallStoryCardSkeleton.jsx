"use client";

import React from "react";

const SmallStoryCardSkeleton = ({ type = "user" }) => {
  return (
    <div
      className="
        flex gap-6 items-start
        p-3 sm:p-6 rounded-lg max-w-[400px] max-h-[220px]
        bg-white dark:bg-amethyst-950
        shadow-sm
        border border-transparent dark:border-amethyst-800
        animate-pulse
      "
    >
      {/* Image Skeleton */}
      <div
        className="
          w-[120px] md:w-36 h-42
          rounded-lg
          bg-gray-300 dark:bg-amethyst-800
          shrink-0
        "
      />

      {/* Content Skeleton */}
      <div className="flex-1 w-full flex flex-col justify-between h-full">
        {/* Top Content */}
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-amethyst-800" />
            <div className="h-5 w-1/2 rounded bg-gray-300 dark:bg-amethyst-800" />
          </div>

          {/* Author */}
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-amethyst-700" />

          {/* Likes */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-4 h-4 rounded bg-yellow-300/70" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-amethyst-700" />
          </div>
        </div>

        {/* Bottom Buttons (user only) */}
        {type === "user" && (
          <div className="flex justify-between items-center mt-4">
            {/* Edit button */}
            <div className="h-8 w-16 rounded-lg bg-gray-300 dark:bg-amethyst-800" />

            {/* Status badge */}
            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-amethyst-700" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallStoryCardSkeleton;
