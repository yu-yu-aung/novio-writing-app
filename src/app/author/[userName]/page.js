import supabase from "@/lib/supabaseClient";
import React from "react";

const Page = async ({ params }) => {
  const { userName } = params;

  if (!userName) return;

  const {
    data: author,
    loading,
    error,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_name", userName)
    .single();
  
  if (!author) return <div>Author not found.</div>;

  console.log("Author info: ", author);
  
  return <div>page</div>;
};

export default Page;
