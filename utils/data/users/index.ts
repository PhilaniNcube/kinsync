import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const supabase = createClient();

  const {data:{user}, error} = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
});

export const getCurrentProfile = cache(async () => {
  const supabase = createClient();

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const userID = user.id;

  const {data, error} = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userID).single();

  if (error) {
    return null;
  }

  return data;
});
