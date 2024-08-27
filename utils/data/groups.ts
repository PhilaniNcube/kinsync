import { createClient } from "../supabase/server";
import { getCurrentUser } from "./users";


export type Group = {
  tenant_id: string;
  tenant: {
    id: string;
    user_id: string;
    name: string;
  } | null;
};

export async function getMyGroups() {
  const supabase = createClient();

//  get the users id
const user = await getCurrentUser();

if (!user) {
  return null;
}

const userID = user.id;

// get the groups that the user is a member of
const {data, error} =  await supabase.from("tenant_members").select("tenant_id, tenant(id, user_id, name)").eq("user_id", userID);

if (error) {
  console.log(error);
  return null;
}

return data;


}


// write a function to get a group by id
export async function getGroupByID(groupID: string) {
  const supabase = createClient();

  const {data, error} = await supabase.from("tenant").select("*").eq("id", groupID).single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}


// write a function to check if if the current user is the create of a group
export async function isGroupOwner(groupID: string) {
  const supabase = createClient();

  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const userID = user.id;

  const {data, error} = await supabase.from("tenant").select("user_id").eq("id", groupID).single();

  if (error) {
    console.log(error);
    return false;
  }

  return data.user_id === userID;
}
