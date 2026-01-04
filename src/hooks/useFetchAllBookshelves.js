import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAllBookshelves(user) {
  const [bookshelves, setBookshelves] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookshelves")
        .select("*")
        .eq("user_id", user?.userId)
        .order("created_at", { ascending: true });

      if (error) {
        //console.log("Error fetching bookshelves: ", error);
        setError(error);
      } else {
        setBookshelves(data || []);
      }

      setLoading(false);
    }

    load();
  }, [user]);

  return { bookshelves, loading, error };
}
