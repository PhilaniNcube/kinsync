"use server";

import { EmailTemplate } from "@/components/email-templates/invite-user";
import { createClient } from "@/utils/supabase/service";
import { inviteUserSchema } from "@/utils/types/validation";
import type { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function inviteUserAction(prevState: unknown, formData: FormData) {
	const supabase = createClient();

	const validatedFields = inviteUserSchema.safeParse({
		email: formData.get("email"),
		group_id: formData.get("group_id"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
	});

	if (!validatedFields.success) {
		return {
			status: 400,
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { email, group_id, first_name, last_name } = validatedFields.data;

	// check if the user already exists
	const {
		data: { users },
		error: user_error,
	} = await supabase.auth.admin.listUsers();

	if (user_error) {
		return {
			status: 500,
			message: user_error.message,
		};
	}

	const userExists = users.find((user: User) => user.email === email);

	// if the user does not exist, invite them and add them to the group/tenant_members table
	if (userExists === undefined) {
		const {
			data: { user },
			error,
		} = await supabase.auth.admin.createUser({
			email,
			password: "password",
			email_confirm: true,
      user_metadata: {
        first_name,
        last_name,
      },
		});


		if (error) {
			return {
				status: 500,
				message: error.message,
			};
		}

		if (!user) {
			return {
				status: 500,
				message: "User not found",
			};
		}



  		const { data: passwordReset, error: passwordResetError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `http://localhost:3000/update-password`,
        });

		// add this user to the tenant_members table
		await supabase
			.from("tenant_members")
			.insert([
				{
					tenant_id: group_id,
					user_id: user.id,
				},
			]);



		revalidatePath("/profile", "layout");
		revalidatePath("/dashboard", "layout");

		return {
			status: 200,
			message:
				"The user has been invited, they will need to accept the invitation before they can access the group",
		};
	}

	// if the user already exists, add them to the tenant_members table
	const { data: tenant_member, error: tenant_error } = await supabase
		.from("tenant_members")
		.insert([
			{
				tenant_id: group_id,
				user_id: userExists.id,
			},
		]);

	console.log({ tenant_member, tenant_error });

	revalidatePath("/profile", "layout");
	revalidatePath("/dashboard", "layout");

	return {
		status: 200,
		message: "The user has been added to the group",
	};
}
