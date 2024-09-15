"use server";

import { createClient } from "@/utils/supabase/server";
import { signInSchema } from "@/utils/types/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(prevState:unknown, formData:FormData) {

  const supabase = createClient();

  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      status: 400,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data;

  const { data: {user}, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: 403,
      message: error.message,
    }
  }

  revalidatePath("/", "layout");
  redirect("/profile");

}


export async function signInWithMagicLinkAction(prevState:unknown, formData:FormData) {

  const supabase = createClient();

  const email = formData.get("email") as string;

  if (!email || !email.includes("@") || typeof email !== "string") {
    return {
      status: 400,
      error: "Invalid email address",
    }
  }


  const {  error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.SITE_URL}/profile`,
    }
  })

  if (error) {
    return {
      status: 403,
      error: error.message,
    }
  }

  revalidatePath("/", "layout");
  redirect("/profile");

}
