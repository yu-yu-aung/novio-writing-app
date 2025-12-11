import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchAllNotifications(user) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;

    async function loadNoti() {
      setLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", user.userId)
        .order("created_at", { ascending: true });

      if (error) {
        console.log("Error fetching noti: ", error);
        setError(error);
      } else {
        setNotifications(data);
      }

      setLoading(false);
    }

    loadNoti();
  }, [user]);

  return { notifications, loading, error };
}
