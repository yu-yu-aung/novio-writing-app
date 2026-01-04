"use client";

import ChapterCard from "@/components/ChapterCard";
import ChapterCardSkeleton from "@/components/ChapterCardSkeleton";
import ErrorStage from "@/components/ErrorStage";
import SmallHeading from "@/components/SmallHeading";
import StoryDetailSkeleton from "@/components/StoryDetailSkeleton";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchStory from "@/hooks/useFetchStory";
import { confirmAction } from "@/lib/confirmAction";
import { createStoryPublishedNotifications } from "@/lib/notification";
import { deleteStory } from "@/lib/story";
import supabase from "@/lib/supabaseClient";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { storyId } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();

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

  if (!story || storyError) {
    return (
      <>
        <h2 className="font-semibold text-2xl text-red-600  my-4">
          Story Not Found!
        </h2>
        <ErrorStage />
      </>
    );
  }

  const handleClickPublish = async (storyId) => {
    //console.log("CLICKED storyId:", storyId);

    if (chapters?.length === 0) {
      toast.error("Your story is empty. Please create a chapter to publish!");
      return;
    }

    const { data, error: storyError } = await supabase
      .from("stories")
      .update({ status: "published" })
      .eq("id", storyId);

    //console.log("SUPABASE STORY UPDATE ERROR:", storyError);
    if (storyError) {
      return toast.error("Failed to publish the story!");
    }

    const { error: chapterError } = await supabase
      .from("chapters")
      .update({ is_published: true })
      .eq("story_id", storyId);

    if (chapterError) {
      return toast.error(
        "Story published! Failed in publishing some chapters!"
      );
    }

    await createStoryPublishedNotifications(user?.userId, storyId);
    toast.success("Story published successfully!");
    //window.location.reload();
    router.refresh();
  };

  const handleClickUnpublish = async (storyId) => {
    const { data, error: storyError } = await supabase
      .from("stories")
      .update({ status: "draft" })
      .eq("id", storyId);

    if (storyError) {
      console.log("Story Error: ", storyError);
      return toast.error("Failed to unpublish the story!");
    }

    const { error: chapterError } = await supabase
      .from("chapters")
      .update({ is_published: false });

    if (chapterError) {
      return toast.error(
        "Story unpublished! Failed in unpublishing some chapters!"
      );
    }

    toast.success("Story unpublished successfully!");
    //window.location.reload();
    router.refresh();
  };

  const handleDeleteBtn = async (storyId) => {
    const { data } = await deleteStory(storyId);
    toast.success("Story Deleted Successfully!");
    router.push("/profile");
  };

  return (
    <>
      <SmallHeading title={`Story Dashboard`} />

      <div className="flex flex-col lg:grid lg:grid-cols-9 w-full min-h-screen relative bg-background-default text-heading px-4 sm:px-8 lg:px-24">
        {/* LEFT SECTION — STORY INFO */}
        <section className="lg:col-span-3 flex flex-col items-center gap-6 border-b lg:border-r lg:border-b-transparent border-default py-10 sm:py-16 lg:py-20 px-6 bg-background-soft text-center">
          {storyLoading ? (
            <StoryDetailSkeleton />
          ) : (
            <>
              <div className="w-full max-w-xs rounded-xl overflow-hidden shadow">
                <img
                  src={story.image_url}
                  alt="cover image of the story"
                  className="w-full h-auto object-cover"
                />
              </div>

              <h1 className="text-2xl font-bold">{story.title}</h1>
              <h1 className="text-xl font-bold">{user.penName}</h1>
              <h3 className="text-lg text-text-secondary">{story.category}</h3>

              <div className="flex flex-wrap justify-center gap-3 w-full">
                {story.tags.map(
                  (t, index) =>
                    t !== "" && (
                      <button
                        key={index}
                        className=" bg-coral-tree-400 dark:bg-coral-tree-200 text-white dark:text-black border rounded-full py-1 px-4 text-sm shadow-sm"
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

              <div className="flex justify-between w-full">
                {story.status === "published" ? (
                  <button
                    onClick={() =>
                      confirmAction(
                        () => handleClickUnpublish(storyId),
                        "Are you sure you want to unpublish the whole story?"
                      )
                    }
                    className=" bg-coral-tree-500 dark:bg-coral-tree-400  text-white dark:text-black px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      confirmAction(
                        () => handleClickPublish(storyId),
                        "Are you sure you want to publish the whole story?"
                      )
                    }
                    className=" bg-green-600 dark:bg-green-300 text-white dark:text-black px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                  >
                    Publish Now
                  </button>
                )}
                <button
                  onClick={() =>
                    confirmAction(
                      () => handleDeleteBtn(storyId),
                      "Are you sure you want to delete the whole story? The deleted story cannot be retrieved!"
                    )
                  }
                  className=" bg-red-700  text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
                >
                  Delete story
                </button>
              </div>
            </>
          )}
        </section>

        {/* RIGHT SECTION — CHAPTERS */}
        <section className="lg:col-span-6 px-6 lg:px-12 py-10 sm:py-16 lg:py-20 flex flex-col gap-10">
          <h2 className="text-2xl font-bold">Chapters</h2>

          <div className="flex flex-col gap-3">
            {chaptersLoading &&
              Array.from({ length: 6 }).map((_, index) => (
                <ChapterCardSkeleton key={index} />
              ))}

            {!chaptersLoading &&
              (!chapters || chapters.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="font-semibold text-2xl text-gray-700 dark:text-gray-300 mb-4">
                    No chapter created!
                  </p>
                  <img
                    src="/no_data.png"
                    alt="No story"
                    className="w-40 h-40 object-contain opacity-80"
                  />
                </div>
              ) : (
                chapters.map((chapter, index) => (
                  <ChapterCard
                    chapter={chapter}
                    key={index}
                    storyId={storyId}
                    story={story}
                  />
                ))
              ))}
          </div>

          <Link href={`/stories/${storyId}/new_chapter`}>
            <button className="mx-auto  bg-amethyst-600 dark:bg-amethyst-300  text-white dark:text-black px-8 py-3 rounded-lg shadow hover:scale-105 transition font-semibold">
              Create New Chapter
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};
export default Page;
