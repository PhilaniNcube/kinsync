"use server";

import { getCurrentUser } from "@/utils/data/users";
import { createClient } from "@/utils/supabase/server";
import { createGroupSchema } from "@/utils/types/validation";
import { revalidatePath } from "next/cache";

export async function createGroupAction(prevState: unknown, formData: FormData) {
  const supabase = createClient();

  const user = await getCurrentUser();

  if (!user) {
    return {
      status: 403,
      message: "User not found",
    }
  }

  const validatedFields = createGroupSchema.safeParse({
    name: formData.get("name"),
  })

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      status: 400,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name } = validatedFields.data;

  const {data, error} = await supabase.from("tenant").insert([{
    name,
    user_id: user.id,
  }]).select("*").single();

  if (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
    }
  }

  // insert this user as a member of the tenant
  const {data:tenant_member, error: tenant_error} = await supabase.from("tenant_members").insert([{
    tenant_id: data.id,
    user_id: user.id,
  }]);

  if (tenant_error) {
    console.log(tenant_error);
    return {
      status: 500,
      message: tenant_error.message,
    }
  }

  revalidatePath("/profile", "layout");

  return {
    status: 200,
    data,
  }


}
