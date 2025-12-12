import supabase from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";

export default function useFectchAnnouncements(authorId) {
  const [announcements, setAnnouncements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    if (!authorId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("author_id", authorId);

    if (error) {
      console.error("Error fetching announcement: ", error);
      setError(error);
    } else {
      setAnnouncements(data);
    }

    setLoading(false);
  }, [authorId]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { announcements, loading, error, refresh: fetchAnnouncements };
}
