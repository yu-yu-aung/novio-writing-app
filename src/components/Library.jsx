"use client";

import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import useAuthStore from "@/store/useAuthStore";
import StoryCard from "./StoryCard";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Library = () => {
  const { user, isLoggedIn } = useAuthStore();

  //console.log("user info: ", user);
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

  // console.log("story id list: ", storyIdList);
  // console.log("Stories in your library: ", stories);

  if (libLoading || storyLoading) return <p>Loading...</p>;

  if (libError || storyError) {
    toast.error("Error connecting the library!");
    return null;
  }

  return (
    <div className="py-10 sm:py-14 lg:py-18">
      {
      isLoggedIn ? (
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 border-l-4 pl-4 border-amethyst-600">
            Your Library
          </h2>

          <div
            className="
              grid 
              grid-cols-3 
              sm:grid-cols-4 
              md:grid-cols-4 
              lg:grid-cols-5
              xl:grid-cols-5 
              gap-5
            "
          >
            {stories.map((story, index) => (
              <StoryCard key={index} story={story} />
            ))}
          </div>
        </div>
      ) : (
        <p></p>
      )
    }
    </div>
    
    
  );
};

export default Library;
