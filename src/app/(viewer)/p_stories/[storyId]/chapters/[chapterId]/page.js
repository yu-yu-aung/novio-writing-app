"use client";

import CommentSection from "@/components/CommentSection";
import LeftContentBar from "@/components/LeftContentBar";
import ShareMoodle from "@/components/ShareMoodle";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchAuthor from "@/hooks/useFetchAuthor";
import useFetchChapter from "@/hooks/useFetchChapter";
import useFetchStory from "@/hooks/useFetchStory";
import { confirmAction } from "@/lib/confirmAction";
import supabase from "@/lib/supabaseClient";
import useAuthStore from "@/store/useAuthStore";
import { MessagesSquare, Share2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React, { use, useState } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { storyId, chapterId } = use(params);
  const { chapter, loading, error } = useFetchChapter(chapterId);
  const { user, isLoggedIn } = useAuthStore();

  const [liked, setLiked] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [share, setShare] = useState(false);

  console.log("story id: ", storyId);
  console.log("chapter id: ", chapterId);

  //Fetch chapters
  const {
    chapters,
    loading: loadingFetchChapters,
    error: fetchChaptersError,
  } = useFetchAllChapters(storyId);

  console.log("fetched chapters: ", chapters);

  //Fetch story
  const {
    story,
    loading: loadingFetchStory,
    error: storyFetchError,
  } = useFetchStory(storyId);

  console.log("fetched story: ", story);

  //fetch author's info using author id
  const {
    author,
    loading: loadingFetchAuthor,
    error: errorFetchAuthor,
  } = useFetchAuthor({ userId: story?.author_id });
  console.log("author info: ", author);

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

  // --- handlers ---
  const handleClickLikeBtn = () => {
    if (!isLoggedIn) {
      toast.error("Please log in or sign up to like!");
    } else {
      setLiked(!liked);
    }
  };

  const handleClickCommentBtn = () => {
    if (!isLoggedIn) {
      toast.error("Please log in or sign up to write comment!");
    } else {
      setShowComment(!showComment);
    }
  };

  const handleClickShareBtn = () => {
    if (!isLoggedIn) {
      toast.error("Please log in or sign up to share");
    } else {
      setShare(true);
      if (navigator.share) {
        navigator.share({
          title: chapter.title,
          text: "Check out this article!",
          url: window.location.href,
        });
      }
    }
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
        author={author}
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

        <div className="flex flex-wrap justify-between sm:gap-4 lg:gap-4 sm:justify-end lg:justify-end mt-6">
          <button
            onClick={handleClickLikeBtn}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
          px-2 py-1 sm:px-4 lg:px-4 sm:py-2 lg:py-2 rounded-full transition shadow-sm active:scale-95 text-xs sm:text-sm lg:text-sm"
          >
            <ThumbsUp
              className={`size-3 lg:size-5 sm:size-5 ${
                liked ? "text-amethyst-600" : ""
              }`}
            />
            <span className={`font-medium ${liked ? "hidden" : ""}`}>Like</span>
            <span
              className={`font-medium ${
                !liked ? "hidden" : "text-amethyst-600"
              }`}
            >
              Liked
            </span>
          </button>

          <button
            onClick={handleClickCommentBtn}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
          px-2 py-1 sm:px-4 lg:px-4 sm:py-2 lg:py-2 rounded-full transition shadow-sm active:scale-95 text-xs sm:text-sm lg:text-sm"
          >
            <MessagesSquare className="size-3 lg:size-5 sm:size-5" />
            <span className="font-medium">Comment</span>
          </button>

          <button
            onClick={handleClickShareBtn}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200
          px-2 py-1 sm:px-4 lg:px-4 sm:py-2 lg:py-2 rounded-full transition shadow-sm active:scale-95 text-xs sm:text-sm lg:text-sm"
          >
            <Share2 className="size-3 lg:size-5 sm:size-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>

        <div
          className={`${
            share ? "flex" : "hidden"
          } fixed inset-0 z-40 items-center justify-center`}
        >
          <ShareMoodle share={share} setShare={setShare} />
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
        </div>

        {/* ---------- Comment Section ---------- */}
        {showComment && (
          <CommentSection
            commentText={commentText}
            setCommentText={setCommentText}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
