import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function useFetchAllStories(userId) {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    async function load() {
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
              pen_name, 
              user_name
            )
          `
        )
        .eq("author_id", userId)
        .order("created_at", { ascending: true });

      if (error) {
        console.log("Error fetching stories: ", error);
        setError(error);
      } else {
        setStories(data || []);
      }

      setLoading(false);
    }

    load();
  }, [userId]);

  return { stories, loading, error };
}
