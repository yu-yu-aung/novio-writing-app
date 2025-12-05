// Flexible function to fetch author info
// by using author id or author's user name

"use client";

import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAuthor({ userId, userName }) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!userName && !userId) return;

      setLoading(true);

      let query = supabase.from("profiles").select("*").limit(1);

      if (userId) {
        query = query.eq("user_id", userId);
      } else if (userName) {
        query = query.eq("user_name", userName);
      }

      const { data, error } = await query.single();

      if (error) {
        console.error("Error fetching author info: ", error);
        setError(error);
      } else {
        setAuthor(data);
      }

      setLoading(false);
    }

    load();
  }, [userName]);

  return { author, loading, error };
}
