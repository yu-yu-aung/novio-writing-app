"use client";

import useFetchChapter from "@/hooks/useFetchChapter";
import React, { use } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { chapterId } = use(params);
  const { chapter, loading, error } = useFetchChapter(chapterId);

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

  const handlePublish = () => {
    const toastId = toast(
      <div className="flex flex-col gap-2">
        <p className="text-sm ">Are you sure you want to publish?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              chapter.is_published = true;
            }}
            className="px-3 py-1 bg-amethyst-600 text-white rounded hover:bg-amethyst-700"
          >
            Publish Now
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      { duration: Infinity }
    );
  };

  return (
    <div className="w-full">
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
      <div className="max-w-3xl mx-auto px-6 py-12">
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
        <div className="mt-10 flex justify-end">
          <button
            onClick={handlePublish}
            className="
              bg-amethyst-600 
              text-white 
              px-6 py-3 
              rounded-xl 
              shadow-md 
              hover:bg-amethyst-700 
              hover:shadow-lg 
              transition 
              font-medium
            "
          >
            Publish Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
