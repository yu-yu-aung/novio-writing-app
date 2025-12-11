import supabase from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";

export default function useFetchFollowingList(userId) {
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFollowing = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("followers")
      .select("*")
      .eq("follower_id", userId);

    if (error) {
      console.error(error);
      setError(error);
    }

    setFollowings(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    loadFollowing();
  }, [userId]);

  return { followings, loading, error, refresh: loadFollowing };
}
