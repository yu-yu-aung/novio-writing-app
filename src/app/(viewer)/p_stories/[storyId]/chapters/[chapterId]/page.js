"use client";

import CommentSection from "@/components/CommentSection";
import LeftContentBar from "@/components/LeftContentBar";
import ShareMoodle from "@/components/ShareMoodle";
import useFetchAllChapters from "@/hooks/useFetchAllChapters";
import useFetchAuthor from "@/hooks/useFetchAuthor";
import useFetchChapter from "@/hooks/useFetchChapter";
import { useFetchLikes } from "@/hooks/useFetchLikes";
import useFetchStory from "@/hooks/useFetchStory";
import { addLiketoChapter, removeLikefromChapter } from "@/lib/like";
import { createLikeNotification } from "@/lib/notification";
import useAuthStore from "@/store/useAuthStore";
import { Menu, MessagesSquare, Share2, ThumbsUp, X } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = ({ params }) => {
  const { storyId, chapterId } = use(params);
  const { chapter, loading, error } = useFetchChapter(chapterId);
  const { user, isLoggedIn } = useAuthStore();

  const [liked, setLiked] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [showLeftBar, setShowLeftBar] = useState(false);

  const [share, setShare] = useState(false);

  // console.log("story id: ", storyId);
  // console.log("chapter id: ", chapterId);

  //Fetch chapters
  const {
    chapters,
    loading: loadingFetchChapters,
    error: fetchChaptersError,
  } = useFetchAllChapters(storyId);

  //console.log("fetched chapters: ", chapters);

  //Fetch story
  const {
    story,
    loading: loadingFetchStory,
    error: storyFetchError,
  } = useFetchStory(storyId);

  //console.log("fetched story: ", story);

  //fetch author's info using author id
  // const {
  //   author,
  //   loading: loadingFetchAuthor,
  //   error: errorFetchAuthor,
  // } = useFetchAuthor({ userId: story?.author_id });
  //console.log("author info: ", author);

  //fetch likes to check if the chapter is already liked
  const {
    likeList,
    error: fetchLikeError,
    loading: fetchLikeLoading,
  } = useFetchLikes(chapterId);
  const isInLikeList = likeList?.some((item) => item.chapter_id === chapterId);

  useEffect(() => {
    if (isInLikeList) {
      setLiked(true);
    }
  }, [fetchLikeLoading, isInLikeList]);

  if (
    loadingFetchStory ||
    loadingFetchChapters ||
    fetchLikeLoading ||
    loading
  ) {
    return (
      <div className="w-full flex justify-center py-20 text-lg text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error || fetchLikeError || storyFetchError) {
    return (
      <div className="w-full flex justify-center py-20 text-lg text-red-500">
        Something went wrong.
      </div>
    );
  }

  if (!chapter)
    return (
      <div className="w-full flex justify-center py-20 text-lg text-muted-foreground">
        Chapter not found.
      </div>
    );

  //console.log("user info: ", user);

  // --- handlers ---
  const handleClickLikeBtn = async () => {
    if (!isLoggedIn || !user) {
      toast.error("Please log in or sign up to like!");
      return;
    }

    const { data, error } = await addLiketoChapter(
      chapterId,
      user?.userId,
      story?.author?.id,
      storyId
    );

    if (error) {
      toast.error("Something went wrong!");
      console.error("Like Error: ", error);
      return;
    }

    toast.success("You liked the chapter!");
    console.log("You liked the chapter!");
    setLiked(true);
    const { data: notiData, error: notiError } = await createLikeNotification(
      user?.userId,
      story?.author?.id,
      chapterId
    );
  };

  const handleClickUnlikeBtn = async () => {
    const { data, error } = await removeLikefromChapter(
      chapterId,
      user?.userId
    );

    if (error) {
      toast.error("Error removing like!");
      console.log("Error removing like: ", error);
      return;
    }

    toast.success("You removed like!");
    setLiked(false);
    return;
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
      <div
        className="hidden sm:flex 
          sm:col-span-2 lg:col-span-2 "
      >
        <LeftContentBar
          storyId={storyId}
          story={story}
          chapters={chapters}
          author={story?.author}
          user={user}
        />
      </div>

      <div className="col-span-7 sm:col-span-5 lg:col-span-5 flex flex-col gap-6 p-6 overflow-scroll relative">
        <div className="flex items-center gap-4 my-4">
          <button
            onClick={() => setShowLeftBar(!showLeftBar)}
            className="block sm:hidden lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <h2 className="text-2xl font-bold">{story?.title}</h2>
        </div>
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
            onClick={liked ? handleClickUnlikeBtn : handleClickLikeBtn}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 
          px-4 py-2 sm:px-4 lg:px-4 sm:py-2 lg:py-2 rounded-full transition shadow-sm active:scale-95 text-xs sm:text-sm lg:text-sm"
          >
            <ThumbsUp
              className={`size-4 lg:size-5 sm:size-5 ${
                liked ? "text-amethyst-600" : ""
              }`}
            />
            {!liked && <span className="font-medium">Like</span>}
            {liked && (
              <span className="font-medium text-amethyst-600">Liked</span>
            )}
          </button>

          <button
            onClick={handleClickCommentBtn}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600
          px-4 py-2 sm:px-4 lg:px-4 sm:py-2 lg:py-2 rounded-full transition shadow-sm active:scale-95 text-xs sm:text-sm lg:text-sm"
          >
            <MessagesSquare className="size-4 lg:size-5 sm:size-5" />
            <span className="font-medium">Comment</span>
          </button>

          <button
            onClick={handleClickShareBtn}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600
          px-4 py-2 sm:px-4 lg:px-4 sm:py-2 lg:py-2 rounded-full transition shadow-sm active:scale-95 text-xs sm:text-sm lg:text-sm"
          >
            <Share2 className="size-4 lg:size-5 sm:size-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>

        <div
          className={`${
            share ? "flex" : "hidden"
          } fixed inset-0 z-40 items-center justify-center`}
        >
          <ShareMoodle
            share={share}
            setShare={setShare}
            type="chapter"
            story={story}
            chapter={chapter}
            author={story?.author}
          />
        </div>

        {/* ---------- Content Section ---------- */}
        <div className="max-w-3xl mx-auto py-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
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
            chapterId={chapterId}
            storyId={storyId}
            authorId={story?.author?.id}
          />
        )}

        {/* Left Content Bar for Mobile */}
        {showLeftBar && (
          <div
            className="fixed inset-0 z-20 bg-black/40"
            onClick={() => setShowLeftBar(false)}
          >
            <div
              className={`w-[180px] 
               z-20 absolute left-0 top-20 min-h-screen bg-gray-50 dark:bg-gray-900 p-4`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex justify-between items-center px-2 py-2 mt-4 border-b border-gray-400">
                <h2 className="font-semibold py-">Content</h2>
                <button
                  onClick={() => setShowLeftBar(false)}
                  className="text-end"
                >
                  <X className="size-5" />
                </button>
              </div>

              <LeftContentBar
                storyId={storyId}
                story={story}
                chapters={chapters}
                author={story?.author}
                user={user}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
