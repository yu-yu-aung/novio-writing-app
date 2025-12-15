"use client";

import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import useAuthStore from "@/store/useAuthStore";
import StoryCard from "./StoryCard";
import React, { useState } from "react";
import { toast } from "sonner";;
import { useRouter } from "next/navigation";
import useFetchAllBookshelves from "@/hooks/useFetchAllBookshelves";
import useFetchAllBookshelfItemsByIds from "@/hooks/useFetchAllBookshelfItemsByIds";
import useFetchBookshelfItems from "@/hooks/useFetchBookshelfItems";

const Library = ({type = "home"}) => {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter(); 
  const [activeShelfId, setActiveShelfId] = useState(null);

  const {
    libraryList,
    loading: libLoading,
    error: libError,
  } = useFetchLibrary(user?.userId);

  const storyIdList = libraryList?.map((item) => item.story_id) || [];

  const {
    stories,
    loading: storyLoading,
    error: storyError,
  } = useFetchStoriesByIds(storyIdList);

  const { bookshelves, loading, error} = useFetchAllBookshelves(user); 

  // console.log("bookshelves: ", bookshelves);
  const shelfIdList = bookshelves?.map((shelf) => shelf.id) || []; 

  const {items} = useFetchAllBookshelfItemsByIds(shelfIdList); 

  const { items: shelfItems, error: shelfItemsError, loading: shelfItemsLoading } = useFetchBookshelfItems(activeShelfId); 

    console.log("items", shelfItems);
  const istory = shelfItems?.map((i) => i.story)
console.log("stories : ", istory);

  const handleClickShelf = (shelfId) => {
    setActiveShelfId((prev) => (prev === shelfId ? null : shelfId)); 
  }; 



  if (libLoading || storyLoading) return <p>Loading...</p>;

  if (libError || storyError) {
    toast.error("Error connecting the library!");
    return null;
  }

  return (
    <div className="py-4 sm:py-14 lg:py-18">
      {
      isLoggedIn && stories.length > 0 ? (
        <div className="w-full flex flex-col items-start gap-4">
          <div
            className={`
              grid 
              grid-cols-3 
              sm:grid-cols-4 
              md:grid-cols-4 
              ${type === "home" ? "lg:grid-cols-5" : "lg:grid-cols-4"}
              gap-5
            `}
          >
              {stories.map((story, index) => (
                <StoryCard key={index} story={story} />
            ))} 
            
          </div>
          {bookshelves?.length > 0 && 
            <div className="flex flex-col justify-start items-start">
              {bookshelves?.map((shelf, index) => (
                <div key={index}>
                  <button
                  onClick={() => handleClickShelf(shelf.id)}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 border-l-4 pl-4 border-amethyst-600">
                  <h2>{shelf.shelf_name}</h2>
                </button>
                { activeShelfId === shelf.id && (
                  <div
                    className={`
                      grid 
                      grid-cols-3 
                      sm:grid-cols-4 
                      md:grid-cols-4 
                      ${type === "home" ? "lg:grid-cols-5" : "lg:grid-cols-4"}
                      gap-5
                    `}
                  >
                    {shelfItemsLoading ? (
                      <p>Loading...</p>
                    ) : (
                      shelfItems.map((item) => (
                        <StoryCard key={item.id} story={item?.story} />
                      ))
                    )}
                  </div>
                )}
                </div>
              ))}
            </div>
          }
          
          {type != "home" && 
            <button 
              onClick={() => router.push("/bookshelf/create_bookshelf") }
              className="mx-auto bg-amethyst-600 dark:bg-amethyst-300 text-white dark:text-black px-6 py-2 rounded-lg shadow hover:scale-105 transition font-medium text-xs sm:text-sm lg:text-sm"
            >
              Create a bookshelf
            </button>
          }
          
        </div> )
         : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <p className="font-semibold text-2xl text-gray-700 dark:text-gray-300 mb-4">
              No Story In Library
            </p>

            <img
              src="/no_data.png"
              alt="No story"
              className="w-40 h-40 object-contain opacity-80"
            />
          </div>)}
    </div>
    
    
  );
};

export default Library;
