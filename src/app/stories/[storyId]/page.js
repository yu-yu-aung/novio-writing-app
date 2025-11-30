import SmallHeading from "@/components/SmallHeading";
import supabase from "@/lib/supabaseClient";
import useStoryStore from "@/store/useStoryStore";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { storyId } = await params;

  const { story, setStory } = useStoryStore();

  //Fetch story
  const { data: currentStory } = await supabase
    .from("stories")
    .select("*")
    .eq("id", storyId)
    .single();

  setStory(currentStory);

  //Fetch chapters
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("story_id", storyId)
    .order("chapter_number", { ascending: true });

  if (!story) {
    return <div className="p-10">Story not found</div>;
  }
  console.log("tags: ", story.tags);

  return (
    <>
      <SmallHeading title={`Story Dashboard for ${currentStory.title}`} />

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
            gap-6 
            border-r border-default 
            py-10 sm:py-16 lg:py-20 
            px-6 
            bg-background-soft
            text-center
          "
        >
          {/* Image */}
          <div className="w-full max-w-xs rounded-xl overflow-hidden shadow">
            <img
              src={currentStory.image}
              alt="cover image of the story"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold">{currentStory.title}</h1>
          <h3 className="text-lg text-text-secondary">
            {currentStory.category}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {currentStory.tags.map(
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

          {/* Description */}
          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            {currentStory.description}
          </p>

          {/* Status */}
          <p className="font-medium">
            <span className="font-bold">Status:</span> {currentStory.status}
          </p>

          {/* Publish / Unpublish */}
          {currentStory.status === "published" ? (
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

          {/* Chapters List */}
          <ul className="flex flex-col gap-3">
            {chapters.map((ch) => (
              <li
                key={ch.id}
                className="
                  bg-background-soft 
                  border border-default 
                  rounded-lg 
                  p-4 
                  shadow-sm 
                  hover:shadow-md transition
                "
              >
                <span className="font-semibold">{ch.chapter_number}.</span>{" "}
                {ch.title}
              </li>
            ))}
          </ul>

          {/* CREATE NEW CHAPTER */}
          <Link href={`/stories/${storyId}/chapters/new_chapter`}>
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
