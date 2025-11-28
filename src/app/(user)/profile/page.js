"use client";

import BookShelf from "@/components/BookShelf";
import SmallStoryCard from "@/components/SmallStoryCard";
import useAuthStore from "@/store/useAuthStore";
import { Book, Pen, UserRoundCheck, UserRoundPlus, Bell } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("published");

  const { register, handleSubmit } = useForm();
  const [showForm, setShowForm] = useState(false);

  const onSubmit = async (data) => {
    console.log("You clicked Announce!");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-7 lg:py-20 w-full min-h-screen">
      {/* Left Sidebar — Profile Section */}
      <section className="lg:col-span-3 flex flex-col items-center gap-8 border-r border-default px-6 py-10 bg-background-soft">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src="/placeholder.png"
            alt={`Profile picture of ${user.userName}`}
            className="size-24 sm:size-32 lg:size-48 rounded-full object-cover shadow-md transition group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-brand text-white dark:text-black rounded-full p-2 shadow cursor-pointer hover:scale-110 transition">
            <Pen className="size-4 sm:size-5" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-muted text-sm">{user.userName}</p>
          <p className="text-body">{user.userEmail}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-4">
          <div className="flex flex-col items-center">
            <UserRoundCheck className="size-6" />
            <span className="text-sm font-medium mt-1">3k Followers</span>
          </div>

          <div className="flex flex-col items-center">
            <UserRoundPlus className="size-6" />
            <span className="text-sm font-medium mt-1">10 Followings</span>
          </div>

          <div className="flex flex-col items-center">
            <Book className="size-6" />
            <span className="text-sm font-medium mt-1">Stories</span>
          </div>
        </div>
      </section>

      {/* Right Content Section */}
      <section className="lg:col-span-4 px-6 lg:px-12 py-10 flex flex-col gap-10">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-default pb-3 overflow-x-auto">
          {[
            { key: "published", label: "Published Stories" },
            { key: "draft", label: "Drafts" },
            { key: "library", label: "Library" },
            { key: "notice", label: "Notice Board" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
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

        {/* Published Stories */}
        {activeTab === "published" && (
          <div className="grid gap-6">
            <SmallStoryCard />
          </div>
        )}

        {/* Drafts */}
        {activeTab === "draft" && (
          <div className="grid gap-6">
            <SmallStoryCard />
          </div>
        )}

        {/* Library Section */}
        {activeTab === "library" && <BookShelf />}

        {/* Notice Board */}
        {activeTab === "notice" && (
          <div className="flex flex-col gap-6 text-center py-10">
            {/* Empty State */}
            <div className="flex flex-col gap-3">
              <Bell className="mx-auto size-10 text-brand" />
              <p className="text-lg text-muted">No announcements yet.</p>
            </div>

            {/* Reveal Form Button */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mx-auto bg-brand text-white dark:text-black px-6 py-2 rounded-lg shadow hover:scale-105 transition font-medium"
              >
                Make an announcement!
              </button>
            )}

            {/* The Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`transition-all duration-300 overflow-hidden ${
                showForm ? "opacity-100 max-h-[400px]" : "opacity-0 max-h-0"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-4">
                {/* Description Input */}
                <div className="relative w-full">
                  <textarea
                    id="description"
                    rows="3"
                    {...register("description", { required: true })}
                    className="block w-full py-3 px-2 text-sm text-heading bg-transparent
                       border-b-2 border-default focus:outline-none
                       focus:border-brand transition peer"
                  />
                  <label
                    htmlFor="description"
                    className="absolute left-2 top-3 text-body text-sm transition-all
                       peer-focus:text-brand peer-focus:-top-3 peer-focus:text-xs
                       peer-valid:-top-3 peer-valid:text-xs"
                  >
                    Description
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-coral-tree-300 dark:bg-coral-tree-800 text-heading
                     font-semibold hover:scale-105 rounded px-6 py-3 shadow transition"
                >
                  Announce
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
