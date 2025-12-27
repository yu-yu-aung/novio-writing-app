"use client";

import supabase from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";

export default function useFetchChapter(chapterId) {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadChapter = useCallback(async () => {
    if (!chapterId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("id", chapterId)
      .single();

    if (error) {
      console.error("Error fetching chapter: ", error);
      setError(error);
    } else {
      setChapter(data);
    }

    setLoading(false);
  }, [chapterId]);

  useEffect(() => {
    loadChapter();
  }, [loadChapter]);

  return { chapter, loading, error, refresh: loadChapter };
}
