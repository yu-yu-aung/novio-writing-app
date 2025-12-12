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
    <div className="py-4 sm:py-14 lg:py-18">
      {
      isLoggedIn && (
        <div className="w-full">
          
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
            {stories.length > 0 ? stories.map((story, index) => (
              <StoryCard key={index} story={story} />
            )) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
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
        </div>
      )
    }
    </div>
    
    
  );
};

export default Library;
