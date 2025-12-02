import supabase from "./supabaseClient";

//sign up function
export async function signUp(email, password, userName, penName) {
  //Check if user_name is unique first
  const { data: checkUser } = await supabase
    .from("profile")
    .select("*")
    .eq("user_name", userName)
    .maybeSingle();

  if (checkUser) return { error: "userName already taken!" };

  // Creating user by using original auth table
  const { data: authData, error: authError } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    { redirectTo: window.location.origin }
  );

  if (authError) return { error: authError };

  const userId = authData?.user?.id;
  if (!userId) return { error: "User ID not found after signing up!" };

  // Inserting Profile
  const { error: profileInsertError } = await supabase.from("profiles").insert({
    id: userId,
    user_id: userId,
    user_name: userName,
    email: email,
    pen_name: penName,
  });

  if (profileInsertError) return { error: profileInsertError };

  // Fetch profile
  const { data: profileData, error: profileFetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileFetchError) return { error: profileFetchError };

  console.log("Sign Up and Profile Creation Success!");
  return { data: { auth: authData, profile: profileData }, error: null };
}

//sign in function
export async function signIn(email, password) {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) return { error: authError };

  const userId = authData.user.id;

  // fetch the profile from profiles table
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (!profileError) {
    console.log("Log In Success!");
  }

  return {
    data: { auth: authData, profile: profileData },
    error: profileError,
  };
}

//sign out function
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

//get user
export async function getUser() {
  return supabase.auth.getUser();
}
