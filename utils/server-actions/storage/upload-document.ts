"use server";

import { getCurrentUser } from "@/utils/data/users";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadDocumentAction(
  prevState: unknown,
  formData:FormData
) {
  const supabase = createClient();

  // get current user
  const user = await getCurrentUser();



  // if there is no user return an error
  if (!user) {
    console.log("No user found");
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  // get the project id from the form data
  const project_id = formData.get("project_id") as string;

  // get the files from the form data
  const document_url = formData.get("document_url") as string;
  const description = formData.get("description") as string;



  // if there is no project id, return an error
  if (!project_id) {
    console.log("No project id provided");
    return {
      status: 400,
      message: "No project id provided",
    };
  }

  // check if the user is a project_member
  const { data: project_member, error: projectMemberError } = await supabase
    .from("project_members")
    .select("user_id")
    .eq("project_id", project_id)
    .eq("user_id", user.id)
    .single();

  if (projectMemberError) {
    console.log(projectMemberError);
    return {
      status: 500,
      message: projectMemberError.message,
    };
  }

  // if the user is not a project member, return an error
  if (!project_member) {
    console.log("User is not a project member");
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  // fetch the org/tenant id from the project id
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", project_id)
    .single();

  if (projectError) {
    console.log(projectError);
    return {
      status: 500,
      message: projectError.message,
    };
   }

  // if the project does not exist, return an error
  if (!project) {
    console.log("Project not found");
    return {
      status: 404,
      message: "Project not found",
    };
  }

  const org_id = project.tenant_id;

  // add a row to the project_documents table
  const { data, error } = await supabase.from("project_documents").insert([
    {
      project_id,
      document_url,
      description,
    }])

  if (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
    };
  }


  // revalidate the data on the client
  revalidatePath(`/dashboard/${org_id}/projects/${project_id}`);



  return {
    status: 200,
    data,
  };


  }



