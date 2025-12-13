import supabase from "./supabaseClient";

export async function createAnnouncement(authorId, title, content) {
  // Creating Announcement
  const { data: announcement, error: announcementError } = await supabase
    .from("announcements")
    .insert({
      author_id: authorId,
      title: title,
      content: content,
    })
    .select()
    .single();

  if (announcementError) {
    console.error("Announcement Error: ", announcementError);
    return { error: announcementError };
  }

  // getting all followers
  const { data: followers } = await supabase
    .from("followers")
    .select("follower_id")
    .eq("following_id", authorId);

  if (!followers || followers.length === 0) {
    return { data: announcement, note: "No followers" };
  }

  //Push announcement to all follower
  const notiPayLoad = followers.map((f) => ({
    actor_id: authorId,
    recipient_id: f.follower_id,
    action_type: "announcement",
    target_type: "announcement",
    target_id: announcement.id,
    is_viewed: false,
  }));

  //add to noti table
  const { error: notiError } = await supabase
    .from("notifications")
    .insert(notiPayLoad);

  if (notiError) console.error("Announcement Noti Error: ", notiError);

  return { data: announcement };
}

export async function deleteAnnouncement(rowId) {
  const { data, error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", rowId);

    if (error) {
    console.log("Error deleting announcement: ", error);
    return error;
  }

  return { data };
}
