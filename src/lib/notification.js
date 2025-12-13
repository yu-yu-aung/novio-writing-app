import supabase from "./supabaseClient";

export async function createFollowNotification(actorId, recipientId) {
  const { data, error } = await supabase.from("notifications").insert({
    actor_id: actorId,
    recipient_id: recipientId,
    action_type: "followed",
    target_type: "user",
    target_id: recipientId,
    is_viewed: false,
  });

  if (error) {
    console.error("Notification error: ", error);
  }

  return { data };
}

export async function createLikeNotification(actorId, recipientId, chapterId) {
  const { data, error } = await supabase.from("notifications").insert({
    actor_id: actorId,
    recipient_id: recipientId,
    action_type: "liked",
    target_id: chapterId,
    target_type: "chapter",
    is_viewed: false,
  });

  if (error) console.error("Notification error:", error);
  return data;
}

export async function createCommentNotification(
  actorId,
  recipientId,
  chapterId
) {
  const { data, error } = await supabase.from("notifications").insert({
    actor_id: actorId,
    recipient_id: recipientId,
    action_type: "commented",
    target_id: chapterId,
    target_type: "chapter",
    is_viewed: false,
  });

  if (error) console.error("Notification error:", error);
  return data;
}

export async function markNotificationAsViewed(notificationId) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_viewed: true })
    .eq("id", notificationId);

  if (error) console.error("Error marking notification as viewed: ", error);
  return data;
}

export async function createStoryPublishedNotifications(authorId, storyId) {

   if (!authorId || !storyId) {
    console.error("Invalid params for story publish noti", {
      authorId,
      storyId,
    });
    return;
  }
  
  //fetch all the followers of the author
  const { data: followers, error: followerError } = await supabase
    .from("followers")
    .select("follower_id")
    .eq("following_id", authorId);

  if (followerError) {
    console.error("Followers fetch error: ", followerError);
    return;
  }

  if (!followers || followers.length === 0) return;

  //Push noti to followers
  const payLoad = followers.map((f) => ({
    actor_id: authorId,
    recipient_id: f.follower_id,
    action_type: "published_story",
    target_type: "story",
    target_id: storyId,
    is_viewed: false,
  }));

  //create noti
  const { error: storyNotiError } = await supabase
    .from("notifications")
    .insert(payLoad);

  if (storyNotiError)
    console.error("Published story noti error: ", storyNotiError);
}

export async function createChapterUpdateNotification(
  authorId,
  storyId,
  chapterId
) {
  // Get all users who saved the story
  const { data: libraryUsers, error: libraryError } = await supabase
    .from("library")
    .select("user_id")
    .eq("story_id", storyId);

  if (libraryError) {
    console.error("Library fetch error: ", libraryError);
    return;
  }

  if (!libraryUsers || libraryUsers.length === 0) return;

  // Create noti
  const payLoad = libraryUsers.map((user) => ({
    actor_id: authorId,
    recipient_id: user.user_id,
    action_type: "updated_chapter",
    target_type: "chapter",
    target_id: chapterId,
    is_viewed: false,
  }));

  //Insert notification
  const { error: notiError } = await supabase
    .from("notifications")
    .insert(payLoad);

  if (notiError) {
    console.error("Chapter update noti error: ", notiError);
  }
}
