import supabase from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";

export default function useFetchFollowerList(userId) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFollower = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("followers")
      .select("*")
      .eq("following_id", userId);

    if (error) {
      console.error(error);
      setError(error);
    }

    setFollowers(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    loadFollower();
  }, [userId]);

  return { followers, loading, error, refresh: loadFollower };
}
