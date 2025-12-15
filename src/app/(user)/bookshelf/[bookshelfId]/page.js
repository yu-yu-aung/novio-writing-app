"use client";

import SmallHeading from "@/components/SmallHeading";
import SmallStoryCard from "@/components/SmallStoryCard";
import StoryCard from "@/components/StoryCard";
import useFetchBookshelf from "@/hooks/useFetchBookshelf";
import useFetchBookshelfItems from "@/hooks/useFetchBookshelfItems";
import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import { saveItemtoBookshelf } from "@/lib/bookShelfItem";
import useAuthStore from "@/store/useAuthStore";
import React, { use, useState } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { bookshelfId } = use(params);
  const { bookshelf } = useFetchBookshelf(bookshelfId);
  const { user } = useAuthStore();
  const [showLibrary, setShowLibrary] = useState(false);

  const { libraryList } = useFetchLibrary(user?.userId);
  const storyIdList = libraryList?.map((item) => item.story_id) || [];
  const { stories } = useFetchStoriesByIds(storyIdList);
  const { items, refresh } = useFetchBookshelfItems(bookshelfId);

  const handleClickAdd = async (story) => {
    const { itemError } = await saveItemtoBookshelf(
      story?.id,
      bookshelfId,
      user
    );

    if (itemError) {
      toast.error("Error adding story to bookshelf!");
      return;
    }

    toast.success("Story added to bookshelf!");
    refresh();
  };

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

      <button
        onClick={() => setShowLibrary((prev) => !prev)}
        className="
          bg-amethyst-600 dark:bg-amethyst-300
          text-white dark:text-black
          px-4 py-2
          rounded-lg font-medium
          shadow-sm
          hover:scale-105 transition
        "
      >
        {showLibrary ? "Close Library" : "Add from Library"}
      </button>

      {/* Library Section */}
      {showLibrary && (
        <div className="mt-14 border-t border-default/40 pt-10">
          <h3 className="text-lg font-semibold mb-6">Your Library</h3>

          <div
            className="
              grid grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-5
              gap-6
            "
          >
            {stories?.map((story) => (
              <div
                key={story.id}
                className="
                  bg-background-soft
                  border border-default/40
                  rounded-xl
                  p-4
                  flex flex-col
                "
              >
                <StoryCard story={story} />

                <button
                  onClick={() => handleClickAdd(story)}
                  className="
                    mt-4
                    bg-coral-tree-300 dark:bg-coral-tree-800
                    text-heading
                    py-2 rounded-lg
                    font-medium
                    hover:scale-105 transition
                  "
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
