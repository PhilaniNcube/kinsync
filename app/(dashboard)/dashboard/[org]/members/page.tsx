import { isGroupOwner } from "@/utils/data/groups";
import { getGroupMembers } from "@/utils/data/members";
import GroupMembersList from "./_components/members-component";

const page = async ({params:{org}}:{params:{org:string}}) => {

  const members = await getGroupMembers(org);
  const owner = await isGroupOwner(org);

  return <div>
    {members &&
    <GroupMembersList isOwner={owner} members={members} />
    }
  </div>;
};
export default page;
