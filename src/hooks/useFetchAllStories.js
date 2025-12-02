import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function useFetchAllStories(user) {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("author_id", user.userId)
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
  }, [user]);

  return { stories, loading, error };
}
