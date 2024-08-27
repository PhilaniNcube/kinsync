import { createClient } from "../supabase/server";

export async function getGroupMembers(groupID: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from("tenant_members").select("user_id").eq("tenant_id", groupID);

  if (error || !data) {
    console.log(error);
    return null;
  }

  const profiles = [];

  for (const member of data) {
    const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", member.user_id).single();

    if (profileError) {
      console.log(profileError);
      return null;
    }

    profiles.push(profile);
  }



  return profiles;
}
