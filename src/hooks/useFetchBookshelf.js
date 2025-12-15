"use client";

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchBookshelf(bookshelfId) {
  const [bookshelf, setBookshelf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!bookshelfId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("bookshelves")
        .select("*")
        .eq("id", bookshelfId)
        .single();

      if (error) {
        console.error("Error fetching bookshelf: ", error);
        setError(error);
      } else {
        setBookshelf(data);
      }

      setLoading(false);
    }

    load();
  }, [bookshelfId]);

  return { bookshelf, loading, error };
}
