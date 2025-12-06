"use client";

import supabase from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";

export default function useSearchQuery(query) {
  const [searchResults, setSearchResults] = useState({
    authors: [],
    stories: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) return;

    //Search for Authors
    const searchQuery = async () => {
      setLoading(true);

      const { data: authors, error: authorError } = await supabase
        .from("profiles")
        .select("*")
        .or(`pen_name.ilike.%${query}%,user_name.ilike.%${query}%`);

      if (authorError) {
        console.error("Author Search Error: ", authorError);
        setError(authorError);
      }

      //Search for stories
      const { data: stories, error: storyError } = await supabase
        .from("stories_with_tags_text")
        .select("*")
        .or(
          `title.ilike.%${query}%,description.ilike.%${query}%,genre.ilike.%${query}%,category.ilike.%${query}%,tags_text.ilike.%${query}%`
        );

      if (storyError) {
        console.error("Story Search Error: ", storyError);
        setError(storyError);
      }

      console.log("Authors found: ", authors);
      console.log("Stories found: ", stories);

      setSearchResults({
        authors,
        stories,
      });

      setLoading(false);
    };

    searchQuery();
  }, [query]);

  return { searchResults, error, loading };
}
