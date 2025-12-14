import supabase from "./supabaseClient";

export async function saveBookShelftoDB(user, bookShelf) {
  const { data, error } = await supabase
    .from("bookshelves")
    .insert({
      user_id: user.userId,
      shelf_name: bookShelf.name,
      description: bookShelf.description,
      category: bookShelf.category,
      is_public: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating bookshelf: ", error);
    return error;
  }

  return { data };
}

export async function deleteBookShelf(rowId) {
  const { data, error } = await supabase
    .from("bookshelves")
    .delete()
    .eq("id", rowId);

  if (error) {
    console.error("Error deleting bookshelf: ", error);
    return error;
  }

  return { data };
}
