import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchStoriesByIds(storyIds) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storyIds || storyIds.length === 0) return;

    setLoading(true);

    const fetchStories = async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .in("id", storyIds);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setStories(data);
      setLoading(false);
    };

    fetchStories();
  }, [storyIds]);

  return{stories, error, loading}
}
