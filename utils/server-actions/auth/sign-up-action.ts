"use server";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema } from "@/utils/types/validation";

export async function signUpAction(prevState:unknown, formData:FormData) {

  const supabase = createClient();

  const validatedFields = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
  })


  if (!validatedFields.success) {
    return {
      status: 400,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, first_name, last_name } = validatedFields.data;

  const { data:{user}, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
      }
    }
  });

  if (error) {
    return {
      status: 403,
      message: error.message,
    }
  }

  return {
    status: 200,
    data: {
      user,
    }
  }


}
