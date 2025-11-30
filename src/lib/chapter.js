import supabase from "./supabaseClient";

export async function saveChaptertoDB(storyId, chapter, imageUrl) {
  const { data, error } = await supabase
    .from("chapters")
    .insert({
      story_id: storyId,
      title: chapter.title,
      chapter_number: chapter.chapter_number,
      content: chapter.content,
      is_published: chapter.status || false,
      image_url: imageUrl || "",
    })
    .select()
    .single();

  console.log("chapter: ", data);

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
