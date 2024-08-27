import { createClient } from "../supabase/server";

export async function getGroupProjects(group_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("tenant_id", group_id);

  if (error) {
   throw new Error(error.message);
  }

  return data;
}


export async function searchProjects(group_id: string, query = "") {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("tenant_id", group_id).ilike("name", `%${query}%`);

  if (error) {
   throw new Error(error.message);
  }

  return data;
}
