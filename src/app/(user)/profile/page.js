"use client";

import BookShelf from "@/components/BookShelf";
import SettingDrawer from "@/components/SettingDrawer";
import ShareMoodle from "@/components/ShareMoodle";
import SmallStoryCard from "@/components/SmallStoryCard";
import useAuthStore from "@/store/useAuthStore";
import {
  Book,
  Pen,
  UserRoundCheck,
  UserRoundPlus,
  Bell,
  Settings,
  Pencil,
  Share,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("published");

  const { register, handleSubmit } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [share, setShare] = useState(false);

  const baseStyle =
    "mx-auto bg-brand-soft text-brand border border-brand hover:scale-110 px-4 sm:px-6 lg:px-6 py-2 rounded-lg shadow hover:scale-110 transition font-medium flex items-center gap-2";

  const onSubmit = async (data) => {
    console.log("You clicked Announce!", data);
  };

  const handleClickSetting = () => {
    setShowSetting(!showSetting);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-7 w-full min-h-screen relative bg-background-default text-heading px-4 sm:px-8 lg:px-24">
      {/* Left Sidebar — Profile Section */}
      <section className="lg:col-span-3 flex flex-col items-center gap-8 border-r border-default py-8 sm:py-16 lg:py-20 px-6 bg-background-soft">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src="/placeholder.png"
            alt={`Profile picture of ${user.userName}`}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-md transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-amethyst-600 dark:bg-amethyst-300 text-white dark:text-black rounded-full p-2 shadow cursor-pointer hover:scale-110 transition">
            <Pen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">{user.displayName}</h2>
          <p className="text-sm text-muted">@{user.userName}</p>
          <p className="text-sm text-body">{user.userEmail}</p>
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
            <span className="text-sm font-medium mt-1">10 Stories</span>
          </div>
        </div>

        {/* Buttons: Edit / Share / Settings */}
        <div className="flex gap-2 sm:gap-4 mt-6 w-full justify-between">
          <Link href={'/edit'} className={baseStyle}>
            <Pencil className="size-4 sm:size-6" />
            <span>Edit </span>
          </Link>

          <button onClick={() => setShare(true)} className={baseStyle}>
            <Share className="w-5 h-5 sm:w-6 sm:h-6" />
            Share
          </button>

          <button onClick={handleClickSetting} className={baseStyle}>
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            Settings
          </button>
        </div>
      </section>

      {/* Setting Drawer */}
      <div
        className={`w-[260px] sm:w-[320px] lg:w-[360px] z-30 h-full absolute left-0 top-0 shadow-xl shadow-gray-100 dark:shadow-gray-800 transition-transform duration-300 ${
          showSetting ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SettingDrawer setShowSetting={setShowSetting} />
      </div>

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

        {/* Content */}
        <div className="flex flex-col gap-6">
          {activeTab === "published" && <SmallStoryCard />}
          {activeTab === "draft" && <SmallStoryCard />}
          {activeTab === "library" && <BookShelf />}
          {activeTab === "notice" && (
            <div className="flex flex-col gap-6 text-center py-10">
              {!showForm && (
                <>
                  <div className="flex flex-col gap-3">
                    <Bell className="mx-auto w-10 h-10 text-brand" />
                    <p className="text-lg text-muted">No announcements yet.</p>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="mx-auto bg-amethyst-600 dark:bg-amethyst-300 text-white dark:text-black px-6 py-2 rounded-lg shadow hover:scale-105 transition font-medium"
                  >
                    Make an announcement!
                  </button>
                </>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`transition-all duration-300 overflow-hidden ${
                  showForm ? "opacity-100 max-h-[400px]" : "opacity-0 max-h-0"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-4">
                  <div className="relative w-full">
                    <textarea
                      id="description"
                      rows="3"
                      {...register("description", { required: true })}
                      className="block w-full py-3 px-3 text-sm text-heading bg-background-soft
                      border-b-2 border-default focus:outline-none focus:border-brand rounded-md transition peer"
                    />
                    <label
                      htmlFor="description"
                      className="absolute left-3 top-3 text-body text-sm transition-all
                      peer-focus:text-brand peer-focus:-top-2 peer-focus:text-xs
                      peer-valid:-top-2 peer-valid:text-xs"
                    >
                      Description
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-coral-tree-300 dark:bg-coral-tree-800 text-heading font-semibold hover:scale-105 rounded px-6 py-3 shadow transition"
                  >
                    Announce
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
