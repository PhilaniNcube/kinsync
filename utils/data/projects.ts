import { createClient } from "../supabase/server";

export async function getGroupProjects(group_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("tenant_id", group_id);

  if (error) {
   throw new Error(error.message);
  }

  return data;
}
