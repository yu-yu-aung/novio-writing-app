// Requirements => Chapter No., title, content, image, publish/ save as draft btns, bar to edit and decorate text
"use client";

import ChapterCard from "@/components/ChapterCard";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchStory from "@/hooks/useFetchStory";
import { saveChaptertoDB } from "@/lib/chapter";
import { uploadChapterImage } from "@/lib/upload";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const NewChapterPage = ({storyId}) => {

  const router = useRouter(); 
  const { user } = useAuthStore(); 
  const fileInputRef = useRef(null); 

  //Form States
  const [chapterNumber, setChapterNumber] = useState(""); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  //Fetch chapters
  const { chapters, loading: loadingFetchChapters, error } = useFetchAllChapters(storyId);

  //Fetch story 
  const { story, loading: loadingFetchStory, error: storyFetchError } = useFetchStory(storyId); 

  console.log("chapters: ", chapters);
  console.log("user: ", user);
  const onSubmit = async (e) => {
    e.preventDefault(); 
    if (!storyId) {
      alert("Story Not Found!"); 
      return;
    }

    setLoading(true); 

    //Upload Image
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadChapterImage(imageFile, storyId);
    }

    //Build a chapter payload
    const chapter = {
      chapter_number: chapterNumber, 
      title, 
      content, 
      is_published: false, 
    }; 

    //Save to database
    const { data: newChapter, error } = await saveChaptertoDB(
      storyId,
      chapter,
      imageUrl, 
      user
    );

    setLoading(false);

    if (error) {
      toast.error("Something went wrong! Failed to create the story");
      return;
    }

    toast.success("A new chapter created!");
    console.log("data: ", newChapter);
    console.log("storyid: ", storyId);
    router.push(`/stories/${storyId}/chapters/${newChapter.id}/view`);
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
        px-4 sm:px-8 lg:px-24
      "
    >
      {/* LEFT SECTION — CHAPTER LIST */}
      <section
        className="
          hidden sm:flex 
          sm:col-span-2 lg:col-span-2 
          flex-col 
          gap-6 
          border-r border-default 
          py-10 sm:py-16 lg:py-20 
          px-6 
          bg-background-soft
        "
      >
        <div className="flex flex-col space-y-4 items-center justify-between">
          <img src={story?.image_url} alt="Story Cover Image" />
          <Link href={`/stories/${storyId}`} className="">{story?.title}</Link>
          <Link href={`/profile`}>{user?.penName}</Link>
        </div>

        {!chapters || chapters.length === 0 ? (
          <p className="text-center text-text-secondary">No chapters yet!</p>
        ) : (
          chapters.map((chapter, index) => (
            <ChapterCard chapter={chapter} key={index} storyId={storyId}/>
          ))
        )}
      </section>

      {/* RIGHT SECTION — FORM */}
        <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-scroll">
          <h2 className="text-xl font-semibold">
            Create New Chapter
          </h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
              placeholder="Chapter Number"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              required
              className="border px-3 py-2 rounded"
            />

            {/* Title */}
            <input
              type="text"
              placeholder="Chapter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border px-3 py-2 rounded"
            />

            {/* Content */}
            <textarea
              placeholder="Chapter Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
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

export default NewChapterPage