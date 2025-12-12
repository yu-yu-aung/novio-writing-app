import supabase from "./supabaseClient";

export async function createFollowNotification(actorId, recipientId) {
  const { data, error } = await supabase.from("notifications").insert({
    actor_id: actorId,
    recipient_id: recipientId,
    action_type: "followed",
    target_type: "user",
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
