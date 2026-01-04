"use client"

import supabase from "./supabaseClient";

export async function addLiketoChapter(chapterId, userId, authorId, storyId) {
  const { data, error } = await supabase
    .from("likes")
    .insert({
      story_id: storyId,
      chapter_id: chapterId,
      user_id: userId,
      author_id: authorId,
    })
    .select()
    .single();

  if (error) {
    //console.log("Error like chapter: ", error);
    return error;
  }

  return { data };
}

export async function removeLikefromChapter(chapterId, userId) {
  const { data, error } = await supabase
    .from("likes")
    .delete()
    .eq("chapter_id", chapterId)
    .eq("user_id", userId);

  if (error) {
    //console.log("Error removing like: ", error);
    return error;
  }

  return { data };
}
