"use client";

import supabase from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";

export default function useFetchBookshelfItems(bookshelfId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = useCallback(async () => {
    if (!bookshelfId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("bookshelf_items")
      .select(
        `
          id, 
          story: stories(
            id, 
            title, 
            image_url, 
            author: profiles(
              id, 
              pen_name
            )
          )
        `
      )
      .eq("bookshelf_id", bookshelfId);

    if (error) {
      console.error(error);
      setError(error);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }, [bookshelfId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { items, loading, error, refresh: loadItems };
}
