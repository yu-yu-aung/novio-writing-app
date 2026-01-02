"use client";

import SmallHeading from "@/components/SmallHeading";
import SmallStoryCard from "@/components/SmallStoryCard";
import StoryCard from "@/components/StoryCard";
import StoryCardSkeleton from "@/components/StoryCardSkeleton";
import useFetchBookshelf from "@/hooks/useFetchBookshelf";
import useFetchBookshelfItems from "@/hooks/useFetchBookshelfItems";
import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import {
  deleteItemFromBookshelf,
  saveItemtoBookshelf,
} from "@/lib/bookShelfItem";
import { confirmAction } from "@/lib/confirmAction";
import supabase from "@/lib/supabaseClient";
import useAuthStore from "@/store/useAuthStore";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { bookshelfId } = use(params);
  const { bookshelf, refresh: refreshShelf } = useFetchBookshelf(bookshelfId);
  const { user } = useAuthStore();
  const [showLibrary, setShowLibrary] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { libraryList } = useFetchLibrary(user?.userId);
  const storyIdList = libraryList?.map((item) => item.story_id) || [];

  const { stories, loading: storyLoading } = useFetchStoriesByIds(storyIdList);
  const {
    items,
    refresh,
    loading: itemLoading,
  } = useFetchBookshelfItems(bookshelfId);

  console.log("bookshelf info: ", bookshelf);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClickAdd = async (story) => {
    const alreadyExists = items?.some((item) => item.story.id === story.id);

    if (alreadyExists) {
      toast.warning("Story already existed in the bookshelf!");
      return;
    }

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

  const handleClickPublic = async (bookshelfId) => {
    const { data, error: publicError } = await supabase
      .from("bookshelves")
      .update({ is_public: true })
      .eq("id", bookshelfId);

    if (publicError) {
      console.log("Error making public: ", publicError);
      return toast.error("Error changing privacy to public!");
    }

    toast.success("Your bookshelf is public now!");
    refreshShelf();
  };

  const handleClickPrivate = async (bookshelfId) => {
    const { data, error: privateError } = await supabase
      .from("bookshelves")
      .update({ is_public: false })
      .eq("id", bookshelfId);

    if (privateError) {
      console.log("Error making private: ", privateError);
      return toast.error("Error changing privacy to private!");
    }

    toast.success("Your bookshelf is private now!");
    refreshShelf();
  };

  const handleClickRemove = async (id) => {
    const { error: removeError } = await deleteItemFromBookshelf(id);

    if (removeError) {
      console.log("Error removing book from bookahelf: ", removeError);
      toast.error("Error removing book from bookshelf!");
      return;
    }

    toast.success("Story removed from bookshelf");
    refresh();
  };

  return (
    <div className="px-4 sm:px-8 lg:px-24 py-10 max-w-[1400px] mx-auto flex flex-col items-center">
      {/* Header */}
      <SmallHeading title={bookshelf?.shelf_name} />

      {(storyLoading || itemLoading) &&
        Array.from({ length: 6 }).map((_, index) => (
          <StoryCardSkeleton key={index} />
        ))}

      {!storyLoading &&
        !itemLoading &&
        (items?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-background-soft flex flex-col relative"
              >
                <StoryCard story={item.story} />
                <button
                  onClick={() =>
                    confirmAction(
                      () => handleClickRemove(item.id),
                      "Are you sure you want to remove the story from the bookshelf?"
                    )
                  }
                  className="bg-coral-tree-700 hover:scale-105 text-gray-100 absolute inline p-2 text-xs rounded-xl right-2 top-2"
                >
                  Remove
                </button>
              </div>
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
        ))}

      <div className="flex justify-between w-full gap-12">
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

        <button
          onClick={
            bookshelf?.is_public
              ? () =>
                  confirmAction(
                    () => handleClickPrivate(bookshelfId),
                    "Are you sure you want to make the bookshelf private? Only you can access your private bookshelf."
                  )
              : () =>
                  confirmAction(
                    () => handleClickPublic(bookshelfId),
                    "Are you sure you want to make the bookshelf public? Everyone can access your public bookshelf."
                  )
          }
          className="
          bg-amethyst-600 dark:bg-amethyst-300
          text-white dark:text-black
          px-4 py-2
          rounded-lg font-medium
          shadow-sm
          hover:scale-105 transition
        "
        >
          {bookshelf?.is_public === true ? "Make Private" : "Make Public"}
        </button>
        {/* {bookshelf?.is_public === true ? (

        )

        } */}
      </div>

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
            {(storyLoading || itemLoading) &&
              Array.from({ length: 6 }).map((_, index) => (
                <StoryCardSkeleton key={index} />
              ))}

            {!storyLoading &&
              !itemLoading &&
              stories?.map((story) => {
                const isAdded = items?.some(
                  (item) => item.story.id === story.id
                );

                return (
                  <div
                    key={story.id}
                    className="bg-background-soft border border-default/40 rounded-xl p-4 flex flex-col"
                  >
                    <StoryCard story={story} />

                    <button
                      disabled={isAdded}
                      onClick={() => handleClickAdd(story)}
                      className={`
                      mt-4 py-2 rounded-lg font-medium transition 
                      ${
                        isAdded
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-coral-tree-700 hover:scale-105 text-gray-100"
                      }
                    `}
                    >
                      {isAdded ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
