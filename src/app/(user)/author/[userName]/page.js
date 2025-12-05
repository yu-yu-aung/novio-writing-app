"use client";

import ShareMoodle from "@/components/ShareMoodle";
import SmallStoryCard from "@/components/SmallStoryCard";
import useFetchAllStories from "@/hooks/useFetchAllStories";
import useFetchAuthor from "@/hooks/useFetchAuthor";
import supabase from "@/lib/supabaseClient";
import {
  Bell,
  Book,
  Share,
  UserPlus2,
  UserRoundCheck,
  UserRoundPlus,
} from "lucide-react";
import React, { use, useEffect, useState } from "react";

const Page = ({ params }) => {
  const { userName } = use(params);

  const [share, setShare] = useState(false);
  const [activeTab, setActiveTab] = useState("published");
  const [stories, setStories] = useState([]);

  if (!userName) return;

  const {
    author,
    error: errorFetchAuthor,
    loading: loadingFetchAuthor,
  } = useFetchAuthor({ userName: userName });

  useEffect(() => {
    if (!author) return;

    const fetchStories = async () => {
      const { data: fetchedStories } = await supabase
        .from("stories")
        .select("*")
        .eq("author_id", author.id);

      if (fetchedStories) {
        console.log("fetched stories: ", fetchedStories);
        setStories(fetchedStories);
      }
    };

    fetchStories();
  }, [author]);

  console.log("author info: ", author);

  if (errorFetchAuthor) {
    console.log("Error Fetching Author Info: ", errorFetchAuthor);
    return <p>Can't view author's profile!</p>;
  }

  if (loadingFetchAuthor) {
    return <p>Loading...</p>;
  }

  console.log("fetched stories: ", stories);
  const publishedStories = stories?.filter(
    (story) => story.status === "drafts"
  );

  console.log("stories", stories);
  console.log("published stories: ", publishedStories);

  if (errorFetchAuthor) {
    console.log("Error Fetching Author Info: ", errorFetchAuthor);
    return <p>Can't view author's profile!</p>;
  }

  if (loadingFetchAuthor) {
    return <p>Loading...</p>;
  }

  const baseStyle =
    "mx-auto bg-brand-soft text-brand border border-brand hover:scale-110 px-4 sm:px-6 lg:px-6 py-2 rounded-lg shadow hover:scale-110 transition font-medium flex items-center gap-2";

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-7 w-full min-h-screen relative bg-background-default text-heading px-4 sm:px-8 lg:px-24">
      {/* Left Sidebar — Profile Section */}
      <section className="lg:col-span-3 flex flex-col items-center gap-8 border-b sm:border-r sm:border-b-transparent lg:border-r lg:border-b-transparent border-default py-8 sm:py-16 lg:py-20 px-6 bg-background-soft">
        {/* Profile Image */}
        <div className=" group">
          <img
            src={author?.profile_image_url}
            alt={`Profile picture of ${author?.user_name}`}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-md transition-transform group-hover:scale-105"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">{author?.pen_name}</h2>
        </div>

        {/* About */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-xs sm:text-sm font-bold">About</h2>
          <p className="text-sm text-muted">{author.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-4">
          <div className="flex flex-col items-center">
            <UserRoundCheck className="w-6 h-6 sm:w-7 sm:h-7 text-brand" />
            <span className="text-sm font-medium mt-1">3k Followers</span>
          </div>

          <div className="flex flex-col items-center">
            <UserRoundPlus className="w-6 h-6 sm:w-7 sm:h-7 text-brand" />
            <span className="text-sm font-medium mt-1">10 Followings</span>
          </div>

          <div className="flex flex-col items-center">
            <Book className="w-6 h-6 sm:w-7 sm:h-7 text-brand" />
            <span className="text-sm font-medium mt-1">
              {publishedStories?.length} stories
            </span>
          </div>
        </div>

        {/* Buttons: Edit / Share / Settings */}
        <div className="flex gap-2 sm:gap-4 mt-6 w-full justify-between">
          <button className={baseStyle}>
            <UserPlus2 className="w-5 h-5 sm:w-6 sm:h-6" />
            Follow
          </button>

          <button onClick={() => setShare(true)} className={baseStyle}>
            <Share className="w-5 h-5 sm:w-6 sm:h-6" />
            Share
          </button>
        </div>
      </section>

      <div
        className={`${
          share ? "flex" : "hidden"
        } fixed inset-0 z-40 items-center justify-center`}
      >
        <ShareMoodle share={share} setShare={setShare} />
      </div>

      {/* Right Content Section */}
      <section className="lg:col-span-4 px-6 lg:px-12 py-8 sm:py-16 lg:py-20 flex flex-col gap-10">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-default pb-3 overflow-x-auto">
          {[
            { key: "published", label: "Published Stories" },
            { key: "notice", label: "Notice Board" },
          ].map((tab, index) => (
            <button
              key={index}
              className={`pb-2 font-semibold text-lg whitespace-nowrap transition ${
                activeTab === tab.key
                  ? "text-brand border-b-2 border-brand"
                  : "text-muted hover:text-heading"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          {activeTab === "published" &&
            stories?.map((story, index) =>
              story.status === "published" ? (
                <SmallStoryCard key={index} story={story} storyId={story.id} />
              ) : null
            )}

          {activeTab === "notice" && (
            <div className="flex flex-col gap-6 text-center py-10">
              {!showForm && (
                <>
                  <div className="flex flex-col gap-3">
                    <Bell className="mx-auto w-10 h-10 text-brand" />
                    <p className="text-lg text-muted">No announcements yet.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
