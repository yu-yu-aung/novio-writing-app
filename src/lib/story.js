import supabase from "./supabaseClient";

export async function saveStorytoDB(userId, story, imageUrl) {
  const { data, error } = await supabase.from("stories").insert({
    author_id: userId,
    title: story.title,
    description: story.description,
    category: story.category,
    genre: story.genre,
    image_url: imageUrl || "/placeholder.png",
    tags: story.tags ? story.tags.split(",").map((t) => t.trim()) : [],
    status: story.status || "draft",
  });

  if (error) {
    console.error("Error creating the story: ", error);
    return error;
  }

  return { data };
}

export async function deleteStory(rowId) {
  const { data, error } = await supabase
    .from("stories")
    .delete()
    .eq("id", rowId);

  if (error) {
    console.error("Error deleting the story: ", error);
    return error;
  }

  return { data };
}
