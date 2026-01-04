"use client";

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const useFetchStoryLikes = (storyId) => {
  const [likeList, setLikeList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!storyId) return;

    async function loadLikes() {
      setLoading(true);

      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("story_id", storyId);

      if (error) {
        //console.log("Error fetching story like: ", error);
        setError(error);
      } else {
        setLikeList(data);
      }

      setLoading(false);
    }

    loadLikes();
  }, [storyId]);

  return { likeList, error, loading };
};

export default useFetchStoryLikes;
