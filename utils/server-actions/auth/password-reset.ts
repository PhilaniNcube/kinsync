"use server";

import { createClient } from "@/utils/supabase/server";
import { resetPasswordSchema } from "@/utils/types/validation";

export async function passwordResetAction(prevState: unknown, formData: FormData) {
  const supabase = createClient();

  const validatedFields = resetPasswordSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (!validatedFields.success) {
    return {
      status: 400,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data;

  // update the user's password
		const { error } = await supabase.auth.updateUser({ email, password });

    if (error) {
      return {
        status: 403,
        error: error.message,
      };
    }

    return {
      status: 200,
      message: "Password reset successfully",
    };

}
