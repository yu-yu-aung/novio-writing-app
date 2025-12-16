"use client";

import SmallHeading from "@/components/SmallHeading";
import StoryCard from "@/components/StoryCard";
import useFetchBookshelf from "@/hooks/useFetchBookshelf";
import useFetchBookshelfItems from "@/hooks/useFetchBookshelfItems";
import useFetchLibrary from "@/hooks/useFetchLibrary";
import useAuthStore from "@/store/useAuthStore";
import React, { use, useEffect, useState } from "react";

const Page = ({ params }) => {
  const { bookshelfId } = use(params);
  const { bookshelf} = useFetchBookshelf(bookshelfId);
  const [mounted, setMounted] = useState(false);


  const { items} = useFetchBookshelfItems(bookshelfId);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-4 sm:px-8 lg:px-24 py-10 max-w-[1400px] mx-auto flex flex-col items-center">
      {/* Header */}
      <SmallHeading title={bookshelf?.shelf_name} />

      {/* Bookshelf Items */}
      {items?.length > 0 ? (
        <div
          className="
            grid grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-5
            gap-6 mb-8
          "
        >
          {items.map((item) => (
            <StoryCard key={item.id} story={item.story} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center mb-8">
          <img
            src="/no_data.png"
            alt="No story"
            className="w-36 h-36 opacity-80 mb-4"
          />
          <p className="text-xl font-semibold text-muted">
            No stories in this bookshelf
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
