"use client";

import LeftContentBar from "@/components/LeftContentBar";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchChapter from "@/hooks/useFetchChapter";
import useFetchStory from "@/hooks/useFetchStory";
import { confirmAction } from "@/lib/confirmAction";
import supabase from "@/lib/supabaseClient";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import React, { use } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { storyId, chapterId } = use(params);
  const { chapter, loading, error } = useFetchChapter(chapterId);
  const { user } = useAuthStore();

  //Fetch chapters
  const {
    chapters,
    loading: loadingFetchChapters,
    error: fetchChaptersError,
  } = useFetchAllChapters(storyId);

  //Fetch story
  const {
    story,
    loading: loadingFetchStory,
    error: storyFetchError,
  } = useFetchStory(storyId);

  if (loading)
    return (
      <div className="w-full flex justify-center py-20 text-lg text-muted-foreground">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center py-20 text-lg text-red-500">
        Something went wrong.
      </div>
    );

  if (!chapter)
    return (
      <div className="w-full flex justify-center py-20 text-lg text-muted-foreground">
        Chapter not found.
      </div>
    );

  const handleConfirmPublish = async (chapter) => {
    const { error } = await supabase
      .from("chapters")
      .update({ is_published: true })
      .eq("id", chapter.id);

    if (error) return toast.error("Failed to publish the chapter!");

    const { error: storyError } = await supabase
      .from("stories")
      .update({ status: "published" })
      .eq("id", chapter.story_id);

    if (storyError) return toast.error("Failed to publish the story!");

    toast.success("Chapter published successfully!");
    window.location.reload();
  };

  const handleConfirmUnpublish = async (chapter) => {
    const { error } = await supabase
      .from("chapters")
      .update({ is_published: false })
      .eq("id", chapter.id);

    if (error) return toast.error("Failed to unpublish the chapter!");

    toast.success("Chapter unpublished successfully!");
    window.location.reload();
  };

  return (
    <div
      className="
        flex flex-col sm:grid sm:grid-cols-7 
        lg:grid lg:grid-cols-7 
        w-full min-h-screen 
        relative 
        bg-background-default 
        text-heading 
        px-4 sm:px-6 lg:px-24
      "
    >
      <LeftContentBar
        storyId={storyId}
        story={story}
        chapters={chapters}
        user={user}
      />

      <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-scroll">
        {/* ---------- Cover Image Section ---------- */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          {chapter?.image_url && (
            <img
              src={chapter.image_url}
              alt="chapter cover"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* ---------- Content Section ---------- */}
        <div className="max-w-3xl mx-auto py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-amethyst-600 mr-2 hidden">
              {chapter.chapter_number}.
            </span>
            {chapter.title}
          </h2>

          <div className="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed">
            <p>{chapter.content}</p>
          </div>

          {/* ---------- Publish Button ---------- */}
          {user?.userId === chapter?.author_id && (
            <div className="mt-10 flex justify-between">
              {chapter.is_published ? (
                <button
                  onClick={() =>
                    confirmAction(
                      () => handleConfirmUnpublish(chapter),
                      "Are you sure you want to unpublish this chapter?"
                    )
                  }
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
                  onClick={() =>
                    confirmAction(
                      () => handleConfirmPublish(chapter),
                      "Are you sure you want to publish this chapter?"
                    )
                  }
                  className="
                bg-green-600 dark:bg-green-300 
                text-white dark:text-black 
                px-4 sm:px-6 lg:px-8 py-2 rounded-lg 
                shadow hover:scale-105 transition
              "
                >
                  Publish
                </button>
              )}

              <Link href={`/stories/${storyId}/chapters/${chapterId}/edit`}>
                <button
                  className="
                mx-auto 
                bg-amethyst-600 dark:bg-amethyst-300 
                text-white dark:text-black 
                px-4 sm:px-6 lg:px-8 py-3 
                rounded-lg 
                shadow 
                hover:scale-105 transition 
                font-semibold
              "
                >
                  Edit
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
