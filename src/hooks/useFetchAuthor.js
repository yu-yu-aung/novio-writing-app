"use client";

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAuthor(authorId) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!authorId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authorId)
        .single();

      if (error) {
        console.error("Error fetching author info: ", error);
        setError(error);
      } else {
        setAuthor(data);
      }

      setLoading(false);
    }

    load();
  }, [authorId]);

  return { author, loading, error };
}
