"use client";

import EditChapterSkeleton from "@/components/EditChapterSkeleton";
import SmallHeading from "@/components/SmallHeading";
import useFetchChapter from "@/hooks/useFetchChapter";
import supabase from "@/lib/supabaseClient";
import { uploadChapterImage } from "@/lib/upload";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { storyId, chapterId } = use(params);

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const didInit = useRef(false);

  //console.log("chapter id: ", chapterId);
  const {
    chapter,
    loading: chapterLoading,
    error,
    refresh,
  } = useFetchChapter(chapterId);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chapterNumber: "",
      title: "",
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    if (chapter && !didInit.current) {
      reset({
        chapterNumber: chapter.chapter_number,
        title: chapter.title,
        content: chapter.content,
        image: chapter.image_url,
      });

      setPreviewImage(chapter.image_url);
      didInit.current = true;
    }
  }, [chapter, reset]);

  if (chapterLoading) {
    return <EditChapterSkeleton />;
  }

  if (!chapter || error) {
    return (
      <>
        <h2 className="font-semibold text-2xl text-red-600  my-4">
          Chapter Not Found!
        </h2>
        <ErrorStage />
      </>
    );
  }

  const onSubmit = async (data) => {
    //console.log("data: ", data);
    try {
      setLoading(true);
      //const file = data.image?.[0];
      let imageUrl = previewImage;

      // Upload new image if provided
      if (imageFile) {
        const uploadedUrl = await uploadChapterImage(imageFile, storyId);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      //console.log("uploaded image: ", imageUrl);

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

      if (error) {
        //console.error("Supabase Error: ", error);
        toast.error("Error editing chapter!");
        return;
      }

      toast.success("Changes Saved!");
      setLoading(false);
      refresh();
      router.push(`/stories/${storyId}/chapters/${editedChapter.id}/view`);
    } catch (err) {
      //console.error(err);
      toast.error("Unexpected error!");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen relative bg-background-default text-heading px-4 sm:px-8 lg:px-24">
      {chapterLoading && (
        <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-hidden animate-pulse">
          {/* Heading */}
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded" />

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* Image Upload */}
            <div className="w-full h-[120px] sm:h-[200px] lg:h-[300px] border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>

            {/* Chapter Number */}
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Title */}
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Content */}
            <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Button */}
            <div className="h-10 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
      )}

      {/* FORM */}
      {!chapterLoading && (
        <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-scroll">
          <SmallHeading title="Edit chapter" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Image Upload */}
            <div
              className="w-full border border-amethyst-600 h-[120px] sm:h-[200px] lg:h-[300px] relative flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) setPreviewImage(URL.createObjectURL(file));
                }}
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
      )}
    </div>
  );
};

export default Page;
