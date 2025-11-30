"use client";

import SmallHeading from "@/components/SmallHeading";
import SmallStoryCard from "@/components/SmallStoryCard";
import { saveStorytoDB } from "@/lib/story";
import { uploadStoryImage } from "@/lib/upload";
import useAuthStore from "@/store/useAuthStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [clickPublish, setClickPublish] = useState(true);
  const [clickDraft, setClickDraft] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const router = useRouter();

  const { user, isLoggedIn } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePublishClick = () => {
    setClickPublish(true);
    setClickDraft(false);
  };

  const handleDraftClick = () => {
    setClickDraft(true);
    setClickPublish(false);
  };

  const onSubmit = async (data) => {
    if (!isLoggedIn || !user) {
      toast.error("Please log in or sign up to create a story");
      return;
    }

    const file = data.image?.[0];

    let imageUrl = null;

    if (file) {
      imageUrl = await uploadStoryImage(file, user.id);
    }

    const { data: newStory, error } = await saveStorytoDB(user.id, data, imageUrl);

    if (error) {
      toast.error("Something went wrong! Failed to create the story");
      return;
    }

    toast.success("Story created!");
    console.log("data: ", newStory);
    router.push(`/stories/${newStory.id}`);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-8 lg:px-24">
      {/* Create Section */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <SmallHeading title="Create a New Story" />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-10"
        >
          {/* Image Upload */}
          <div className="relative group">
            <label className="block">
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
              <div className="w-40 h-56 sm:w-72 sm:h-[500px] border-2 border-dashed border-brand rounded-xl bg-brand-soft cursor-pointer flex items-center justify-center transition group-hover:bg-brand-light/40">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Plus className="size-10 text-brand" />
                    <p className="text-sm text-muted mt-2">Upload Cover</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Text Inputs */}
          <div className="flex-1">
            {/* Title */}
            <div className="relative mb-6 group">
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
              />
              <label
                htmlFor="title"
                className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs"
              >
                Story Title
              </label>
            </div>

            {/* Description */}
            <div className="relative mb-6 group">
              <textarea
                id="description"
                rows="3"
                {...register("description", { required: true })}
                className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
              />
              <label
                htmlFor="description"
                className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs"
              >
                Description
              </label>
            </div>

            {/* Category */}
            <div className="relative mb-6 group">
              <input
                type="text"
                id="category"
                {...register("category", { required: true })}
                className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
              />
              <label
                htmlFor="category"
                className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs"
              >
                Category
              </label>
            </div>

            {/* Genre */}
            <div className="relative mb-6 group">
              <input
                type="text"
                id="genre"
                {...register("genre", { required: true })}
                className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
              />
              <label
                htmlFor="genre"
                className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs"
              >
                Genre
              </label>
            </div>

            {/* Tags */}
            <div className="relative mb-6 group">
              <input
                type="text"
                id="tags"
                {...register("tags", { required: true })}
                className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
              />
              <label
                htmlFor="tags"
                className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs"
              >
                Tags
              </label>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              className="bg-coral-tree-200 dark:bg-coral-tree-800 hover:scale-110 rounded px-5 py-3 mt-2 shadow transition"
            >
              Next
            </button>
          </div>
        </form>
      </section>

      {/* Tabs Section */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <div className="flex gap-6 border-b border-default pb-2">
          <button
            onClick={handlePublishClick}
            className={`pb-2 font-bold text-lg transition ${
              clickPublish
                ? "text-brand border-b-2 border-brand"
                : "text-muted hover:text-heading"
            }`}
          >
            Published
          </button>

          <button
            onClick={handleDraftClick}
            className={`pb-2 font-bold text-lg transition ${
              clickDraft
                ? "text-brand border-b-2 border-brand"
                : "text-muted hover:text-heading"
            }`}
          >
            Drafts
          </button>
        </div>

        {/* Published */}
        {clickPublish && <SmallStoryCard />}

        {/* Draft */}
        {clickDraft && <SmallStoryCard />}
      </section>
    </div>
  );
};

export default Page;
