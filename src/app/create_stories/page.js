"use client";

import SmallStoryCard from "@/components/SmallStoryCard";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [clickPublish, setClickPublish] = useState(true);
  const [clickDraft, setClickDraft] = useState(false);

  const handlePublishClick = () => {
    setClickPublish(true);
    setClickDraft(false);
  };

  const handleDraftClick = () => {
    setClickDraft(true);
    setClickPublish(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-10">
          <img src="/swan.png" alt="Logo" className="size-[100px] dark:hidden"/>
          <img src="/light_swan.png" alt="Logo" className="size-[100px] hidden dark:block"/>
          <h2 className="text-2xl lg:text-3xl font-bold text-heading">
            Create a New Story
          </h2>
        </div>

        {/* Form */}
        <form className="flex flex-col lg:flex-row gap-10">
          {/* Image Upload */}
          <div className="relative group">
            <label className="block">
              <input type="file" id="file" className="hidden" />
              <div className="w-40 h-56 sm:w-72 sm:h-[500px] border-2 border-dashed border-brand rounded-xl bg-brand-soft cursor-pointer flex flex-col items-center justify-center transition group-hover:bg-brand-light/40">
                <Plus className="size-10 text-brand" />
                <p className="text-sm text-muted mt-2">Upload Cover</p>
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
                required
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
                required
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
                required
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
                required
                className="block w-full py-3 px-1 text-sm text-heading bg-transparent border-b-2 border-default focus:outline-none focus:border-brand transition peer"
              />
              <label
                htmlFor="genre"
                className="absolute left-1 top-3 text-body text-sm transition-all peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs peer-valid:-top-3 peer-valid:text-xs"
              >
                Genre
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
