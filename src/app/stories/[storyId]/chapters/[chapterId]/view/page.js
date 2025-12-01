"use client";

import useFetchChapter from "@/hooks/useFetchChapter";
import React, { use } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { chapterId } = use(params);

  const { chapter, loading, error } = useFetchChapter(chapterId);

  console.log("id: ", chapterId);
  console.log("chapter: ", chapter);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!chapter) return <p>Chapter not found</p>;

  const handlePublish = () => {
    const toastId = toast(
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to publish?</p>
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
    <div>
      <img src={chapter.image_url} alt="chapter cover" />
      <h2>
        <span>{chapter.chapter_number}</span> {chapter.title}
      </h2>
      <div>
        <p>{chapter.content}</p>
      </div>
      <button
        onClick={handlePublish}
        className="
            bg-background-soft dark:bg-background-muted 
            text-heading 
            border border-default 
            rounded-xl 
            px-6 py-3 
            shadow 
            hover:scale-105 
            transition 
            font-medium
          "
      >
        Publish
      </button>
    </div>
  );
};

export default Page;
