import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function useFetchUsersByIds(userIds) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userIds || userIds.length === 0) return;

    setLoading(true);

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .in("id", userIds);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, [userIds]);

  return { users, error, loading };
}
