import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InviteUser from "../_components/invite-user";
import { getGroupByID, isGroupOwner } from "@/utils/data/groups";
import GroupSummary from "../_components/group-summary";
import { getGroupMembers } from "@/utils/data/members";

const OrganizationPage = async ({
	params: { org },
}: { params: { org: string } }) => {
	const owner = await isGroupOwner(org);

  const group = await getGroupByID(org);
  const groupMembers = await getGroupMembers(org);

	return (
		<div>
			<div className="container px-6 py-8 mx-auto">
				<div className="flex flex-col w-full gap-4 md:flex-row">
					{owner && <InviteUser group_id={org} />}
          {group && groupMembers && (<GroupSummary group={group} members={groupMembers}  />)}
				</div>
			</div>
		</div>
	);
};
export default OrganizationPage;
