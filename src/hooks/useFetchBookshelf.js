"use client";

import supabase from "@/lib/supabaseClient";
import { refresh } from "next/cache";
import { useCallback, useEffect, useState } from "react";

export default function useFetchBookshelf(bookshelfId) {
  const [bookshelf, setBookshelf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadShelf = useCallback(async () => {
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
  }, [bookshelfId]);

  useEffect(() => {
    loadShelf();
  }, [loadShelf]);

  return { bookshelf, loading, error, refresh: loadShelf };
}
