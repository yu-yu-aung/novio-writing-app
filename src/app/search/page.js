"use client";

import SmallHeading from "@/components/SmallHeading";
import SmallStoryCard from "@/components/SmallStoryCard";
import useSearchQuery from "@/hooks/useSearchQuery";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  console.log("keyWord: ", query);

  const { searchResults, error, loading } = useSearchQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  console.log("search results: ", searchResults);

  const { authors, stories } = searchResults;

  console.log("Authors: ", authors);
  console.log("Stories: ", stories);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 lg:px-16 space-y-12">
      <SmallHeading title={`Search Results for "${query}"`} />

      {/* STORIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-amethyst-700 dark:text-amethyst-300">
          Stories Related to "{query}"
        </h2>

        {stories?.length === 0 && (
          <p className="text-muted-foreground text-sm">No story found!</p>
        )}

        {/* Story List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* AUTHORS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-amethyst-700 dark:text-amethyst-300">
          Profiles Related to "{query}"
        </h2>

        {authors?.length === 0 && (
          <p className="text-muted-foreground text-sm">No user found!</p>
        )}

        {/* Author Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="text-lg font-semibold text-foreground">
                    {author.pen_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">Author</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
