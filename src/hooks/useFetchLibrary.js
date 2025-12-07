import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchLibrary(user) {
  const [libraryList, setLibraryList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!user) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("library")
        .select("*")
        .eq("user_id", user.userId);

      if (error) {
        console.error("Error fetching library list: ", error);
        setError(error);
      } else {
        setLibraryList(data);
      }

      setLoading(false);
    }

    load();
  }, [user]);

  return { libraryList, loading, error };
}
