import supabase from "./supabaseClient";

export async function addCommentToDb(
  chapterId,
  userId,
  authorId,
  storyId,
  commentText
) {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      story_id: storyId,
      chapter_id: chapterId,
      user_id: userId,
      author_id: authorId,
      comment_text: commentText,
    })
    .select()
    .single();

  if (error) {
    //console.log("Comment Error: ", error);
    return error;
  }

  return { data };
}

export async function deleteComment(rowId) {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", rowId);

  if (error) {
    //console.log("Error deleting comment: ", error);
    return error;
  }

  return { data };
}
