"use client";

import ChapterCard from "@/components/ChapterCard";
import SmallHeading from "@/components/SmallHeading";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchStory from "@/hooks/useFetchStory";
import Link from "next/link";
import React, { use } from "react";

const Page = ({ params }) => {
  const { storyId } = use(params);

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

  if (!story) {
    return <div className="p-10">Story not found</div>;
  }

  return (
    <>
      <SmallHeading title={`Story Dashboard for ${story.title}`} />

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
            lg:border-r border-default 
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

          {story.status === "published" ? (
            <button
              className="
                bg-red-500 dark:bg-red-300 
                text-white dark:text-black 
                px-6 py-2 rounded-lg 
                shadow hover:scale-105 transition
              "
            >
              Unpublish
            </button>
          ) : (
            <button
              className="
                bg-green-600 dark:bg-green-300 
                text-white dark:text-black 
                px-6 py-2 rounded-lg 
                shadow hover:scale-105 transition
              "
            >
              Publish Now
            </button>
          )}
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
              chapters.map((chapter, index) => (
                <ChapterCard chapter={chapter} key={index} />
              ))
            )}
          </div>

          <Link href={`/stories/${storyId}/new_chapter`}>
            <button
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
              Create New Chapter
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Page;
