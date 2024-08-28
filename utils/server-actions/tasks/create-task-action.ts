"use server";

import { createClient } from "@/utils/supabase/server";
import { createTaskSchema } from "@/utils/types/validation";
import { revalidatePath } from "next/cache";

export async function createTaskAction(prevState: unknown, formData: FormData) {
	const supabase = createClient();

	const validatedFields = createTaskSchema.safeParse({
		description: formData.get("description"),
		cost: formData.get("cost"),
		due_date: formData.get("due_date"),
		project_id: formData.get("project_id"),
    tenant_id: formData.get("tenant_id"),
	});



	if (!validatedFields.success) {
		return { status: 400, error: validatedFields.error.flatten().fieldErrors };
	}

  const { data, error } = await supabase.from("project_tasks").insert([
    {
      description: validatedFields.data.description,
      cost: validatedFields.data.cost,
      due_date: validatedFields.data.due_date,
      project_id: validatedFields.data.project_id,
      completed: false,
      paid: false,
      tenant_id: validatedFields.data.tenant_id,
    },
  ]);


  if (error) {
    return { status: 500, error: error.message };
  }

  revalidatePath(`/dashboard/${validatedFields.data.tenant_id}/projects/${validatedFields.data.project_id}`);

  return { status: 200, data: data };

}
