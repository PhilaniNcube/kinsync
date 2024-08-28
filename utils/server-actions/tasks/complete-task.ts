"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function completeTaskAction(completedState:boolean, task_id: string, tenant_id: string, project_id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("project_tasks")
    .update({ completed: completedState }).eq("id", task_id).select("*");


    revalidatePath(`/dashboard/${tenant_id}/projects/${project_id}`);

   return data;

}
