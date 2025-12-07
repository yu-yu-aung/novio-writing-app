"use client";

import ChapterCard from "@/components/ChapterCard";
import SmallHeading from "@/components/SmallHeading";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchAuthor from "@/hooks/useFetchAuthor";
import useFetchLibrary from "@/hooks/useFetchLibrary";
import useFetchStory from "@/hooks/useFetchStory";
import { addStorytoLibrary, removeStoryfromLibrary } from "@/lib/library";
import supabase from "@/lib/supabaseClient";

import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { storyId } = use(params);
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const [author, setAuthor] = useState(null);

  //Fetch story
  const {
    story,
    loading: storyLoading,
    error: storyError,
  } = useFetchStory(storyId);

  //Fetch all chapters
  const {
    chapters,
    loading: chaptersLoading,
    error: chaptersError,
  } = useFetchAllChapters(storyId);

  const {
    libraryList,
    loading: loadFetchLibrary,
    error: errorFetchLibrary,
  } = useFetchLibrary(user);

  const authorId = story?.author_id;
  const isInLibrary = libraryList?.some((item) => item.story_id === storyId);

  console.log("Library list: ", libraryList);
  console.log("Author id: ", authorId);
  console.log("story: ", story);
  console.log("user: ", user);

  //fetch author's info using author id
  useEffect(() => {
    if (!authorId) return;

    const fetchAuthor = async () => {
      const { data: authorInfo } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", authorId)
        .single();

      if (authorInfo) {
        console.log("author info: ", authorInfo);
        setAuthor(authorInfo);
      }
    };

    fetchAuthor();
  }, [authorId]);

  console.log("fetched author: ", author);

  if (!story) {
    return <div className="p-10">Story not found</div>;
  }

  const handleAddLibrary = async () => {
    if (!user || !isLoggedIn) {
      toast.error("Please log in or sign up to add the story to your library!");
      return;
    }

    const { data, error } = await addStorytoLibrary(story, user);

    if (error) {
      toast.error("Error adding story to the library!");
      console.log("Error adding story to the library! ", error);
    }

    toast.success("Story added to library!");
    router.refresh();
  };

  const handleRemoveLibrary = async () => {
    const { data, error } = await removeStoryfromLibrary(storyId);

    if (error) {
      toast.error("Error removing story from library!");
      console.error("Error removing story from library! ", error);
      return;
    }

    toast.success("Story removed from the library!");
    router.refresh();
  };

  return (
    <>
      <SmallHeading title="Story Dashboard" />

      <div
        className="
          flex flex-col 
          lg:grid lg:grid-cols-9 
          w-full min-h-screen 
          relative 
          bg-background-default 
          text-heading 
          px-4 sm:px-8 lg:px-24
        "
      >
        {/* LEFT SECTION — STORY INFO */}
        <section
          className="
            lg:col-span-3 
            flex flex-col items-center 
            gap-6 border-b
            lg:border-r lg:border-b-transparent border-default 
            py-10 sm:py-16 lg:py-20 
            px-6 
            bg-background-soft
            text-center
          "
        >
          <div className="w-full max-w-xs rounded-xl overflow-hidden shadow">
            <img
              src={story.image_url}
              alt="cover image of the story"
              className="w-full h-auto object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold">{story.title}</h1>
          <h1 className="text-xl font-bold">{author?.pen_name}</h1>
          <h3 className="text-lg text-text-secondary">{story.category}</h3>

          <div className="flex flex-wrap justify-center gap-3 w-full">
            {story.tags.map(
              (t, index) =>
                t !== "" && (
                  <button
                    key={index}
                    className="
                      bg-coral-tree-400 dark:bg-coral-tree-200 
                      text-white dark:text-black
                      border rounded-full 
                      py-1 px-4 
                      text-sm 
                      shadow-sm
                    "
                  >
                    {t}
                  </button>
                )
            )}
          </div>

          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            {story.description}
          </p>

          <p className="font-medium">
            <span className="font-bold">Status:</span> {story.status}
          </p>

          <div className="flex justify-between">
            {isInLibrary ? (
              <button
                onClick={handleRemoveLibrary}
                className="
               mx-auto 
                bg-coral-tree-600 dark:bg-coral-tree-300
                text-white dark:text-black 
                px-8 py-3 
                rounded-lg 
                shadow 
                hover:scale-105 transition 
                font-semibold 
              "
              >
                Remove from Library
              </button>
            ) : (
              <button
                onClick={handleAddLibrary}
                className="
               mx-auto 
                bg-amethyst-600 dark:bg-amethyst-300 
                text-white dark:text-black 
                px-8 py-3 
                rounded-lg 
                shadow 
                hover:scale-105 transition 
                font-semibold 
              "
              >
                Add to Library
              </button>
            )}
          </div>
        </section>

        {/* RIGHT SECTION — CHAPTERS */}
        <section
          className="
            lg:col-span-6 
            px-6 lg:px-12 
            py-10 sm:py-16 lg:py-20 
            flex flex-col gap-10
          "
        >
          <h2 className="text-2xl font-bold">Chapters</h2>

          <div className="flex flex-col gap-3">
            {!chapters || chapters.length === 0 ? (
              <p className="text-center text-text-secondary">
                No chapters yet!
              </p>
            ) : (
              chapters.map(
                (chapter, index) =>
                  (chapter.is_published = true && (
                    <ChapterCard
                      chapter={chapter}
                      key={index}
                      storyId={storyId}
                      story={story}
                      user={user}
                    />
                  ))
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
