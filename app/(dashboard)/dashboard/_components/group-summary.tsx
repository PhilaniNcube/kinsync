import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Database } from "@/utils/types/schema";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import CreateProjectDialog from "../[org]/projects/_components/create-project";
import { formatCurrency } from "@/lib/utils";
import ProjectSummaryCard from "./project-summary-card";
import { getGroupByID } from "@/utils/data/groups";
import { getGroupMembers } from "@/utils/data/members";
import { getGroupProjects } from "@/utils/data/projects";


const GroupSummary = async ({orgId}:{orgId:string}) => {

  const groupData =  getGroupByID(orgId);
  const groupMembersData =  getGroupMembers(orgId);
  const groupProjectsData =  getGroupProjects(orgId);

  const [ group, groupMembers, groupProjects] = await Promise.all([ groupData, groupMembersData, groupProjectsData]);

  if (!group) {
			return (
				<Card className="flex-1 w-full">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle>Group Not Found</CardTitle>
							<CardDescription>Projects and Members</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<div className="mb-4">
							<h3 className="mb-2 text-lg font-semibold">
								No group data available
							</h3>
						</div>
					</CardContent>
				</Card>
			);
		}

	return (
		<Card className="flex-1 w-full ">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>{group.name}</CardTitle>
					<CardDescription>Projects and Members</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<h3 className="mb-2 text-lg font-semibold">Members</h3>

					{groupMembers?.map((member, index) => (
						<div key={member.id} className="flex items-center mb-2 space-x-2">
							<Avatar>
								<AvatarFallback>{member?.first_name?.[0]}</AvatarFallback>
							</Avatar>
							<span>{member?.first_name}</span>
						</div>
					))}
				</div>
				<div>
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-lg font-semibold">Projects</h3>
						<CreateProjectDialog group_id={group.id} />
					</div>
					<div className="@container">
						<ScrollArea className="h-[200px]">
							{groupProjects.map((project) => (
								<ProjectSummaryCard key={project.id} project={project} />
							))}
						</ScrollArea>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
export default GroupSummary;
