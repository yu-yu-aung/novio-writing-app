import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchLibrary(userId) {
  const [libraryList, setLibraryList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!userId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("library")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching library list: ", error);
        setError(error);
      } else {
        setLibraryList(data);
      }

      setLoading(false);
    }

    load();
  }, [userId]);

  return { libraryList, loading, error };
}
