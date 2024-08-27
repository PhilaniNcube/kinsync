"use server";

import { getCurrentUser } from "@/utils/data/users";
import { createClient } from "@/utils/supabase/server";
import { createProjectSchema } from "@/utils/types/validation";
import { revalidatePath } from "next/cache";

export async function createProjectAction(
	prevState: unknown,
	formData: FormData,
) {
	// get the current user
	const user = await getCurrentUser();
	if (!user) {
		return {
			status: 401,
			user_error: "User not found",
		};
	}

	const supabase = createClient();

	const validatedFileds = createProjectSchema.safeParse({
		group_id: formData.get("group_id") as string,
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		start_date: formData.get("start_date") as string,
		end_date: formData.get("end_date") as string,
		budget: Number(formData.get("budget")),
	});

	if (!validatedFileds.success) {
		return {
			status: 400,
			errors: validatedFileds.error.flatten().fieldErrors,
		};
	}

	const { data, error } = await supabase.from("projects").insert([
		{
			tenant_id: validatedFileds.data.group_id,
			name: validatedFileds.data.name,
			description: validatedFileds.data.description,
			start_date: validatedFileds.data.start_date,
			end_date: validatedFileds.data.end_date,
			created_by: user.id,
			budget: validatedFileds.data.budget,
		},
	]).select("*").single();

  console.log({data, error})

	if (error) {
		return {
			status: 500,
			server: error.message,
		};
	}



  // add this user to the project_members table
  const { data: project_members, error: project_members_error } = await supabase.from("project_members").insert([{
    project_id: data.id,
    user_id: user.id,
  }]).select("*");

  console.log({project_members, project_members_error})

  	revalidatePath(`/dashboard/${validatedFileds.data.group_id}`, "layout");
	revalidatePath(`/dashboard/${validatedFileds.data.group_id}/projects`);

	return {
		status: 200,
		data: data,
	};
}
