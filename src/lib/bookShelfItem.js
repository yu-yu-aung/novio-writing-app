import supabase from "./supabaseClient";

export async function saveItemtoBookshelf(storyId, bookshelfId, user) {
  const { data, error: itemError } = await supabase
    .from("bookshelf_items")
    .insert({
      story_id: storyId,
      bookshelf_id: bookshelfId,
      user_id: user.userId,
    })
    .select()
    .single();

  if (itemError) {
    console.error("Error adding book to bookshelf: ", itemError);
    return itemError;
  }

  return { data, itemError };
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
