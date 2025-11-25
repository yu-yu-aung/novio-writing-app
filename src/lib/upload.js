import supabase from "./supabaseClient";

export async function uploadStoryImage(file, userId) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const filePath = `stories/${userId}/${Date.now()}.${fileExt}`;

  const { error: UploadError } = await supabase.storage
    .from("story_images")
    .upload(filePath, file);

  if (UploadError) {
    console.error("Upload Error: ", UploadError);
    return null;
  }

  //Get Public URL
  const { data } = supabase.storage.from("story_images").getPublicUrl(filePath);

  return data.publicUrl;
}
