import supabase from "./supabaseClient";

export async function addStorytoLibrary(story, user) {
  const { data, error } = await supabase
    .from("library")
    .insert({
      user_id: user.userId,
      story_id: story.id,
    })
    .select()
    .single();

  if (error) {
    console.log("Error adding story to library!", error);
    return error;
  }

  return { data };
}

export async function removeStoryfromLibrary(storyId) {
  const { data, error } = await supabase
    .from("library")
    .delete()
    .eq("story_id", storyId);

  if (error) {
    console.error("Error removing the story!", error);
    return { error };
  }

  return { data };
}
