import supabase from "./supabaseClient";

export async function uploadStoryImage(file, userId) {
  if (!file) {
    console.log("NO FILE RECEIVED");
    return null;
  }

  const fileExt = file.name.split(".").pop();
  const filePath = `stories/${userId}/${Date.now()}.${fileExt}`;
  console.log("Uploading to:", filePath);

  const { error: uploadError } = await supabase.storage
    .from("story_images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload Error: ", uploadError);
    return null;
  }

  const { data } = supabase.storage.from("story_images").getPublicUrl(filePath);

  console.log("Public URL result:", data);

  return data.publicUrl;
}

export async function uploadChapterImage(file, storyId) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const filePath = `chapters/${storyId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("chapter_images")
    .upload(filePath, file);

  if (uploadError) {
    console.log("Upload error: ", uploadError);
    return null;
  }

  const { data } = supabase.storage
    .from("chapter_images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
