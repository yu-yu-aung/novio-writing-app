// Requirements => Chapter No., title, content, image, publish/ save as draft btns, bar to edit and decorate text
"use client";

import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import { uploadChapterImage } from "@/lib/upload";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = async () => {
  const [previewImage, setPreviewImage] = useState(false);
  // const { story } = useStoryStore();
  // const { chapter, setChapter } = useChapterStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //Fetch chapters
  const { chapters, loading, error } = useFetchAllChapters(storyId);

  console.log("chapters: ", chapters);

  const onSubmit = async (data) => {
    const file = data.image?.[0];

    let imageUrl = null;

    if (file) {
      imageUrl = await uploadChapterImage(file, storyId);
    }
  };

  return (
    <div
      className="
        flex flex-col 
        lg:grid lg:grid-cols-7 
        w-full min-h-screen 
        relative 
        bg-background-default 
        text-heading 
        px-4 sm:px-8 lg:px-24
      "
    >
      {/* LEFT SECTION — CHAPTER LIST */}
      <section
        className="
          hidden sm:flex 
          sm:col-span-2 lg:col-span-3 
          flex-col 
          gap-6 
          border-r border-default 
          py-10 sm:py-16 lg:py-20 
          px-6 
          bg-background-soft
        "
      >
        {!chapters || chapters.length === 0 ? (
          <p className="text-center text-text-secondary">No chapters yet!</p>
        ) : (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="
                border border-default 
                bg-white dark:bg-background-muted
                rounded-xl 
                p-4 
                shadow-sm 
                hover:shadow-md 
                transition
              "
            >
              <h3 className="text-lg font-semibold">{chapter.title}</h3>
              <p className="text-sm text-text-secondary mt-1">
                Last Updated: {chapter.updated_at}
              </p>
            </div>
          ))
        )}
      </section>

      {/* RIGHT SECTION — FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-10 py-10 sm:py-16 lg:py-20 w-full"
      >
        {/* IMAGE UPLOAD */}
        <div className="relative group">
          <label className="block cursor-pointer">
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPreviewImage(URL.createObjectURL(file));
              }}
            />

            <div
              className="
                w-40 h-56 
                sm:w-72 sm:h-[500px] 
                border-2 border-dashed border-brand 
                rounded-xl 
                bg-brand-soft 
                flex items-center justify-center 
                transition 
                group-hover:bg-brand-light/40
                overflow-hidden
              "
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Plus className="size-10 text-brand" />
                  <p className="text-sm text-muted mt-2">Upload Image</p>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* TEXT INPUTS */}
        <div className="flex-1 flex flex-col gap-8">
          {/* TITLE */}
          <div className="relative group">
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="
                block w-full 
                py-3 px-1 
                text-sm 
                text-heading 
                bg-transparent 
                border-b-2 border-default 
                focus:outline-none focus:border-brand 
                transition peer
              "
            />
            <label
              htmlFor="title"
              className="
                absolute left-1 top-3 
                text-body text-sm 
                transition-all 
                peer-focus:text-brand 
                peer-focus:-top-3 peer-focus:text-xs 
                peer-valid:-top-3 peer-valid:text-xs
              "
            >
              Title
            </label>
          </div>

          {/* CONTENT */}
          <div className="relative group">
            <textarea
              id="content"
              rows="12"
              {...register("content", { required: true })}
              className="
                block w-full 
                py-3 px-1 
                text-sm 
                text-heading 
                bg-transparent 
                border-b-2 border-default 
                focus:outline-none focus:border-brand 
                transition peer
              "
            />
            <label
              htmlFor="content"
              className="
                absolute left-1 top-3 
                text-body text-sm 
                transition-all 
                peer-focus:text-brand 
                peer-focus:-top-3 peer-focus:text-xs 
                peer-valid:-top-3 peer-valid:text-xs
              "
            >
              Start Writing
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="
                bg-coral-tree-400 dark:bg-coral-tree-300 
                text-white dark:text-black 
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

            <button
              type="button"
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
              Save as Draft
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
