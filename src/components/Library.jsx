"use client";

import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStoriesByIds from "@/hooks/useFetchStoriesByIds";
import useAuthStore from "@/store/useAuthStore";
import StoryCard from "./StoryCard";
import React from "react";
import { toast } from "sonner";

const Library = () => {
  const { user, isLoggedIn } = useAuthStore();

  const {
    libraryList,
    loading: libLoading,
    error: libError,
  } = useFetchLibrary(user);

  const storyIdList = libraryList?.map((item) => item.story_id) || [];

  const {
    stories,
    loading: storyLoading,
    error: storyError,
  } = useFetchStoriesByIds(storyIdList);

  if (libLoading || storyLoading) return <p>Loading...</p>;

  if (libError || storyError) {
    toast.error("Error connecting the library!");
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-neutral-100">
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
  );
};

export default Library;
