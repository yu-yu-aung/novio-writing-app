import supabase from "./supabaseClient";

export async function saveItemtoBookshelf(storyId, bookshelfId) {
  const { data, error } = await supabase
    .from("bookshelf_items")
    .insert({
      story_id: storyId,
      bookshelf_id: bookshelfId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding book to bookshelf: ", error);
    return error;
  }

  return { data };
}

export async function deleteItemFromBookshelf(rowId) {
  const { data, error } = await supabase
    .from("bookshelf_items")
    .delete()
    .eq("id", rowId);

  if (error) {
    console.error("Error removing the book: ", error);
    return error;
  }

  return { data };
}
