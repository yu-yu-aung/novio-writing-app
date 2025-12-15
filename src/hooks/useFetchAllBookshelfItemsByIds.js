import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAllBookshelfItemsByIds(bookshelfIds) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookshelfIds || bookshelfIds.length === 0) return;

    setLoading(true);

    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("bookshelf_items")
        .select("*")
        .in("bookshelf_id", bookshelfIds);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, [bookshelfIds]);

  return { items, error, loading };
}
