"use client";

import SmallHeading from "@/components/SmallHeading";
import SmallStoryCard from "@/components/SmallStoryCard";
import useSearchQuery from "@/hooks/useSearchQuery";
import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const {user, isLoggedIn} = useAuthStore(); 
  const [activeTab, setActiveTab] = useState("stories"); 
  const router = useRouter(); 

  //console.log("keyWord: ", query);

  const { searchResults, error, loading } = useSearchQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  console.log("search results: ", searchResults);

  const { authors, stories, bookshelves } = searchResults;

  // console.log("Authors: ", authors);
  // console.log("Stories: ", stories);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 lg:px-16 space-y-12">
      <SmallHeading title={`Search Results for "${query}"`} />

      <div className="flex gap-6 border-b border-default pb-3 overflow-x-auto">
        {[
          { key: 'stories' , label: "Stories"}, 
          { key: 'authors', label: "Authors"}, 
          { key: 'bookshelves', label: "Bookshelves"}
        ].map((tab) => (
          <button 
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`p-2 font-semibold text-lg whitespace-nowrap transition ${
              activeTab === tab.key
                ? "text-brand bg-amethyst-200 dark:bg-amethyst-800"
                : "text-muted hover:text-heading"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {/* STORIES */}

      <section className="space-y-4">
        {
          activeTab === "stories" && (
            <>
              {stories?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-4 sm:py-10 text-center">
                  <p className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-4">
                    No story found!
                  </p>

                  <img
                    src="/no_data.png"
                    alt="No story"
                    className="w-40 h-40 lg:w-80 lg:h-80 object-contain opacity-80"
                  />
                </div>
              )}

              {/* Story List */}
              <div className="grid gap-6 lg:grid-cols-3">
                {stories?.length !== 0 &&
                  stories?.map(
                    (story, index) =>
                      story.status === "published" && (
                        <SmallStoryCard
                          story={story}
                          storyId={story.id}
                          key={index}
                        />
                      )
                  )}
              </div>
            </>
          )
        }

        {
          activeTab === 'authors' && (
            <>
              {authors?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-4 sm:py-10 text-center">
            <p className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-4">
              No author found!
            </p>

            <img
              src="/no_data.png"
              alt="No author"
              className="w-40 h-40 lg:w-80 lg:h-80 object-contain opacity-80"
            />
          </div>
        )}

        {/* Author Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-4">
          {authors?.length !== 0 &&
            authors?.map((author, index) => (
              <Link
                href={`/author/${author.user_name}`}
                key={index}
                className="flex items-center gap-4 p-4 bg-amethyst-100 dark:bg-amethyst-900/30 
                         rounded-xl border border-amethyst-200 dark:border-amethyst-700 shadow-sm
                         hover:shadow-md transition"
              >
                <img
                  src={author.profile_image_url}
                  alt="profile picture"
                  className="rounded-full w-20 h-20 object-cover border border-white shadow"
                />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {author.pen_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">Author</p>
                </div>
              </Link>
            ))}
        </div>
            </>
          )
        }

        {
          activeTab === 'bookshelves' && (
            <>
              {isLoggedIn ? (
          <>
            {bookshelves?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-4 sm:py-10 text-center">
                <p className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-4">
                  No bookshelf found!
                </p>

                <img
                  src="/no_data.png"
                  alt="No bookshelf"
                  className="w-40 h-40 object-contain opacity-80"
                />
              </div>
            )}

            {/* Bookshelves Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookshelves?.length !== 0 &&
                bookshelves?.map((bookshelf, index) => (
                  <Link
                    href={`/p_bookshelves/${bookshelf.id}`}
                    key={index}
                    className="flex items-center gap-4 p-4 bg-amethyst-100 dark:bg-amethyst-900/30 
                    rounded-xl border border-amethyst-200 dark:border-amethyst-700 shadow-sm
                    hover:shadow-md transition"
                  >

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {bookshelf.shelf_name}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </>          
        ) :  (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <img
              src="/oops.png"
              alt="oops"
              className="w-40 h-40 lg:w-80 lg:h-80 object-contain opacity-80"
            />
            <p className="font-semibold text-lg text-gray-700 dark:text-gray-300">
              Please <span className="text-amethyst-600 underline" onClick={() => router.push("/log_in")}>log in</span> or <span className="text-amethyst-600 underline" onClick={() => router.push("/sign_up")}>sign up</span> to view bookshelves!
            </p>
          </div>
          
        )}
            </>
          )
        }
      </section>

    </div>
  );
}
