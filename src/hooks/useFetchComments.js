import supabase from "@/lib/supabaseClient";
import { useEffect, useState, useCallback } from "react";

export default function useFetchComments(chapterId) {
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!chapterId) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("chapter_id", chapterId)
      .order("created_at", { ascending: true });

    if (error) {
      setError(error);
      //console.log("Error fetching comments: ", error);
    } else {
      setCommentList(data);
    }

    setLoading(false);
  }, [chapterId]);

  // Initial fetch
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { commentList, error, loading, refetch: fetchComments };
}
