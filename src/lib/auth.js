import supabase from "./supabaseClient";

//sign up function
export async function signUp(email, password, userName, penName) {
  // Creating user by using original auth table
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return { error: authError };

  const userId = authData?.user?.id;

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
  });
  return { data, error };
}

//sign in function
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
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
