"use client";

import useFetchChapter from "@/hooks/useFetchChapter";
import { uploadChapterImage } from "@/lib/upload";
import React, { use, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Page = ({ params }) => {
  const { storyId, chapterId } = use(params);

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  console.log("chapter id: ", chapterId);
  const { chapter, loading, error } = useFetchChapter(chapterId);

  if (error) {
    console.log("Error Fetching chapter: ", error);
    return <p>Cannot Edit Chapter!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chapterNumber: chapter?.chapter_number,
      title: chapter?.title,
      content: chapter?.content,
      image: chapter?.image_url,
    },
  });

  const onSubmit = async (data) => {
    try {
      const file = data.image?.[0];
      let imageUrl = chapter.image_url;

      // Upload new image if provided
      if (file) {
        const uploadedUrl = await uploadChapterImage(file, storyId);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      console.log("uploaded image: ", imageUrl);

      const { data: editedChapter, error } = await supabase
        .from("chapters")
        .update({
          chapter_number: data.chapterNumber,
          title: data.title,
          content: data.content,
          image_url: imageUrl,
        })
        .eq("id", chapter.id)
        .select()
        .single();

      console.log("returned info: ", editedChapter);

      // setUser(profile);

      console.log("updated info: ", user);

      if (error) {
        console.error("Supabase Error: ", error);
        toast.error("Error editing chapter!");
        return;
      }

      toast.success("Changes Saved!");
      router.push(`/stories/${storyId}/chapters/${editedChapter.id}/view`);
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error!");
    }
  };

  return (
    <div
      className="
        flex flex-col 
        w-full min-h-screen 
        relative 
        bg-background-default 
        text-heading 
        px-4 sm:px-8 lg:px-24
      "
    >
      {/* RIGHT SECTION — FORM */}
      <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-scroll">
        <h2 className="text-xl font-semibold">Edit</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Image Upload */}
          <div
            className="w-full border border-amethyst-600 h-[120px] sm:h-[200px] lg:h-[300px] 
                        relative flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              {...register("image", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) setPreviewImage(URL.createObjectURL(file));
                },
              })}
            />

            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <p className="text-center font-bold text-gray-500">
                Click here to add an image for your chapter
              </p>
            )}
          </div>

          {/* Chapter Number */}
          <input
            type="number"
            {...register("chapterNumber", { required: true })}
            className="border px-3 py-2 rounded"
          />

          {/* Title */}
          <input
            type="text"
            {...register("title", { required: true })}
            className="border px-3 py-2 rounded"
          />

          {/* Content */}
          <textarea
            {...register("content", { required: true })}
            rows={10}
            className="border px-3 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save and Preview"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
