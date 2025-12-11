import supabase from "./supabaseClient";

export async function followAuthor(userId, authorId) {
  const { data, error } = await supabase
    .from("followers")
    .insert({
      follower_id: userId,
      following_id: authorId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error following author: ", error);
    return { error };
  }

  return { data };
}

export async function unfollowAuthor(userId, authorId) {
  const { data, error } = await supabase
    .from("followers")
    .delete()
    .eq("follower_id", userId)
    .eq("following_id", authorId);

  if (error) {
    console.error("Error unfollowing author: ", error);
    return { error };
  }

  return { data };
}
