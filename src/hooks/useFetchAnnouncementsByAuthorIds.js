import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAnnouncementsByAuthorIds(authorIds) {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAnnouncements() {
      if (!authorIds) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .in("author_id", authorIds);

      if (error) {
        console.error("Error fetching announcement!", error);
        setError(error);
        return;
      }

      setAnnouncements(data);
      setLoading(false);
    }

    loadAnnouncements();
  }, [authorIds]);

  return { announcements, loading, error };
}
