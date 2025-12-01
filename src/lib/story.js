import supabase from "./supabaseClient";

export async function saveStorytoDB(user, story, imageUrl) {
  const { data, error } = await supabase
    .from("stories")
    .insert({
      author_id: user.userId,
      title: story.title,
      description: story.description,
      category: story.category,
      genre: story.genre,
      image_url: imageUrl || "/placeholder.png",
      tags: story.tags ? story.tags.split(",").map((t) => t.trim()) : [],
      status: story.status || "draft",
    })
    .select()
    .single();

  console.log("story: ", story);

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
