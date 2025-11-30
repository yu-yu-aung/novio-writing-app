import supabase from "./supabaseClient";

export async function saveChaptertoDB(storyId, chapter, imageUrl) {
  const { data, error } = await supabase
    .from("stories")
    .insert({
      story_id: storyId,
      title: chapter.title,
      chapter_number: chapter.no,
      content: chapter.content,
      is_published: chapter.status || false,
      image_url: imageUrl || "",
    })
    .select()
    .single();

  console.log("chapter: ", story);

  if (error) {
    console.error("Error saving the chapter: ", error);
    return error;
  }

  return { data };
}

export async function deleteChapter(rowId) {
  const { data, error } = await supabase
    .from("chapters")
    .delete()
    .eq("id", rowId);

  if (error) {
    console.error("Error deleting the chapter: ", error);
    return error;
  }

  return { data };
}
