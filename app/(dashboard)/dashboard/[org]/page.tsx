import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InviteUser from "../_components/invite-user";
import { getGroupByID, isGroupOwner } from "@/utils/data/groups";
import GroupSummary from "../_components/group-summary";
import { getGroupMembers } from "@/utils/data/members";
import { getGroupProjects } from "@/utils/data/projects";
import { Suspense } from "react";
import SummaryLoading from "../_components/summary-loading";
import { redirect } from "next/navigation";

const OrganizationPage = async ({
	params: { org },
}: { params: { org: string } }) => {

	const owner = await isGroupOwner(org);



	return (
		<div>
			<div className="container px-6 py-8 mx-auto">
				<div className="flex flex-col w-full gap-4 md:flex-row">
					<div className="w-full max-w-md">
						{owner && <InviteUser group_id={org} />}
					</div>
					<Suspense fallback={<SummaryLoading />}>
						<GroupSummary orgId={org} />
					</Suspense>
				</div>
			</div>
		</div>
	);
};
export default OrganizationPage;
