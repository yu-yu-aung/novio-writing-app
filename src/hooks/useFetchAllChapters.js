import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAllChapters(storyId) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storyId) return;

    async function load() {
      setLoading(true);

      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("story_id", storyId)
        .order("chapter_number", { ascending: true });

      if (error) {
        console.error(error);
        setError(error);
      } else {
        setChapters(data || []);
      }

      setLoading(false);
    }

    load();
  }, [storyId]);

  return { chapters, loading, error };
}
