import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchChaptersByIds(chapterIds) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chapterIds || chapterIds.length === 0) return;

    setLoading(true);

    const fetchChapters = async () => {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .in("id", chapterIds);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setChapters(data);
      setLoading(false);
    };

    fetchChapters();
  }, [chapterIds]);

  return { chapters, error, loading };
}
