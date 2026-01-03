"use client";

import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import useAuthStore from "@/store/useAuthStore";
import StoryCard from "./StoryCard";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useFetchAllBookshelves from "@/hooks/useFetchAllBookshelves";
import useFetchAllBookshelfItemsByIds from "@/hooks/useFetchAllBookshelfItemsByIds";
import useFetchBookshelfItems from "@/hooks/useFetchBookshelfItems";
import Link from "next/link";
import StoryCardSkeleton from "./StoryCardSkeleton";

const Library = ({ type = "home" }) => {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [activeShelfId, setActiveShelfId] = useState(null);

  const { libraryList, loading: libLoading, error: libError } =
    useFetchLibrary(user?.userId);

  const storyIdList = libraryList?.map((item) => item.story_id) || [];

  const { stories, loading: storyLoading, error: storyError } =
    useFetchStoriesByIds(storyIdList);

  const { bookshelves } = useFetchAllBookshelves(user);

  const shelfIdList = bookshelves?.map((shelf) => shelf.id) || [];

  useFetchAllBookshelfItemsByIds(shelfIdList);

  const {
    items: shelfItems,
    loading: shelfItemsLoading,
  } = useFetchBookshelfItems(activeShelfId);

  const handleClickShelf = (shelfId) => {
    setActiveShelfId((prev) => (prev === shelfId ? null : shelfId));
  };

  if (libError || storyError) {
    toast.error("Error connecting the library!");
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {isLoggedIn && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8">
          Your Library
        </h2>
      )}

      {isLoggedIn && stories.length > 0 ? (
        <div className="space-y-16">
          {/* Library Stories */}
          <div
            className={`grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${type === "home" ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}
          > 
            
            {(libLoading || storyLoading) && 
              Array.from({length: 6}).map((_, index) => (
                <StoryCardSkeleton key={index}/>
              ))
            }

            {!libLoading && !storyLoading && (
              stories.map((story, index) => (
                <StoryCard key={index} story={story} />
              ))
            )}
          </div>

          {/* Bookshelves */}
          {bookshelves?.length > 0 && (
            <div className="space-y-10 pt-10 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                Your Bookshelves
              </h3>

              {bookshelves.map((shelf) => (
                <div key={shelf.id} className="space-y-6">
                  <button
                    onClick={() => handleClickShelf(shelf.id)}
                    className="flex items-center gap-2 text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-100 hover:text-amethyst-600 transition"
                  >
                    <span>{shelf.shelf_name}</span>
                    <span className="text-sm opacity-60">
                      {activeShelfId === shelf.id ? "−" : "+"}
                    </span>
                  </button>

                  {activeShelfId === shelf.id && (
                    <div className="space-y-6 pl-2">
                      <div
                        className={`grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${type === "home" ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}
                      >
                        {shelfItemsLoading ? (
                          Array.from({length: 6}).map((_, index) => (
                          <StoryCardSkeleton key={index}/>
                        ))
                        ) : shelfItems.length > 0 ? (
                          shelfItems.map((item) => (
                            <StoryCard key={item.id} story={item.story} />
                          ))
                        ) : (
                          <div className="col-span-full flex flex-col items-center py-10 text-center">
                            <p className="text-base font-medium text-gray-600 dark:text-gray-300 mb-4">
                              No stories in this shelf
                            </p>
                            <img
                              src="/no_data.png"
                              alt="No story"
                              className="w-32 h-32 opacity-80"
                            />
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/bookshelf/${shelf.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-amethyst-300 dark:border-amethyst-600 hover:bg-amethyst-100 dark:hover:bg-amethyst-800 transition text-gray-800 dark:text-gray-200"
                      >
                        View shelf
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Create Bookshelf */}
          <div className="flex justify-center pt-10">
            <button
              onClick={() => router.push("/bookshelf/create_bookshelf")}
              className="px-6 py-3 rounded-lg bg-amethyst-600 dark:bg-amethyst-300 text-white dark:text-black text-sm font-medium shadow hover:shadow-lg hover:scale-[1.02] transition"
            >
              Create a bookshelf
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            No Story In Library
          </p>
          <img
            src="/no_data.png"
            alt="No story"
            className="w-40 h-40 opacity-80"
          />
        </div>
      )}
    </section>
  );
};

export default Library;
