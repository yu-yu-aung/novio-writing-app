"use client"

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export function useFetchLikes(chapterId) {
  const [likeList, setLikeList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterId) return;

    async function fetchLikes() {
      setLoading(true);

      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("chapter_id", chapterId);

      if (error) {
        console.log("Error fetching likes:", error);
        setError(error);
      } else {
        setLikeList(data); // ✅ FIXED
      }

      setLoading(false);
    }

    fetchLikes(); // ✅ FIXED
  }, [chapterId]);

  return { likeList, error, loading };
}
