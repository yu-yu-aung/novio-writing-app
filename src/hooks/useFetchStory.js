"use client";

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchStory(storyId) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!storyId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("stories")
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
              pen_name
            )
          `
        )
        .eq("id", storyId)
        .single();

      if (error) {
        console.error("Error fetching story: ", error);
        setError(error);
      } else {
        setStory(data);
      }

      setLoading(false);
    }

    load();
  }, [storyId]);

  return { story, loading, error };
}
