"use client";

import supabase from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";

export default function useSearchQuery(query) {
  const [searchResults, setSearchResults] = useState({
    authors: [],
    stories: [],
    bookshelves: [],
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
        .select(
          `
            id, 
            title, 
            description, 
            total_views, 
            tags,
            category,
            genre, 
            status, 
            image_url, 
            author: profiles(
              id, 
              pen_name, 
              user_name
            )
          `
        )
        .or(
          `title.ilike.%${query}%,description.ilike.%${query}%,genre.ilike.%${query}%,category.ilike.%${query}%,tags_text.ilike.%${query}%`
        );

      if (storyError) {
        console.error("Story Search Error: ", storyError);
        setError(storyError);
      }

      //Search for bookshelves
      const { data: bookshelves, error: shelfError } = await supabase
        .from("bookshelves")
        .select("*")
        .eq("is_public", true)
        .or(
          `shelf_name.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`
        );

      // console.log("Authors found: ", authors);
      // console.log("Stories found: ", stories);

      setSearchResults({
        authors,
        stories,
        bookshelves,
      });

      setLoading(false);
    };

    searchQuery();
  }, [query]);

  return { searchResults, error, loading };
}
