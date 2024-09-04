"server only";

import { createClient } from "../supabase/server";
import { getCurrentUser } from "./users";

// only allow project members to select images/documents from projects that they are members of

export async function getProjectDocuments(project_id: string) {

  const supabase = createClient();

  const user = await getCurrentUser();

  if (!user) {
    return null
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
    return null
  }

  // if the user is not a project member, return an error
  if (!project_member) {
    console.log("User is not a project member");
    return null
  }

  const { data: documents, error } = await supabase
    .from("project_documents")
    .select("*")
    .eq("project_id", project_id);


  if (error) {
    console.log(error.message);
    return null
  }

  return documents
}

export async function getProjectImages(project_id:string) {

    const supabase = createClient();

    const user = await getCurrentUser();

    if (!user) {
      return null
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
      return null
    }

    // if the user is not a project member, return an error
    if (!project_member) {
      console.log("User is not a project member");
      return null
    }

    const { data: images, error } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", project_id);

    if (error) {
      console.log(error.message);
      return null
    }

    return images
}
