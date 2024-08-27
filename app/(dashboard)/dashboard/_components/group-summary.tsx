"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Database } from "@/utils/types/schema";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateProjectDialog from "../[org]/projects/_components/create-project";

const projects = [
	  { id: 3, name: "Monthly Book Selection", status: "In Progress" },
	  { id: 4, name: "Author Meet and Greet", status: "Completed" }
	];

const GroupSummary = ({group, members}:{group:Database['public']['Tables']['tenant']['Row'], members: Database['public']['Tables']['profiles']['Row'][]}) => {

  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
		const [newProjectName, setNewProjectName] = useState("");

		const handleAddProject = () => {
			if (newProjectName.trim() !== "") {
				const newProject = {
					id: Date.now(),
					name: newProjectName,
					status: "Not Started",
				};

				setNewProjectName("");
				setIsAddProjectDialogOpen(false);
			}
		};

		return (
			<Card className="flex-1 w-full ">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>{group.name}</CardTitle>
						<CardDescription>Projects and Members</CardDescription>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="w-4 h-4" />
								<span className="sr-only">More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Edit Group</DropdownMenuItem>
							<DropdownMenuItem>Delete Group</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<h3 className="mb-2 text-lg font-semibold">Members</h3>
						<div className="flex items-center mb-2 space-x-2">
							<Avatar>
								<AvatarFallback>M</AvatarFallback>
							</Avatar>
							<span>Me (Creator)</span>
						</div>
						{members.map((member, index) => (
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
						<ScrollArea className="h-[200px]">
							{projects.map((project) => (
								<Card key={project.id} className="mb-2">
									<CardHeader>
										<CardTitle className="text-base">{project.name}</CardTitle>
										<CardDescription>Status: {project.status}</CardDescription>
									</CardHeader>
								</Card>
							))}
						</ScrollArea>
					</div>
				</CardContent>
			</Card>
		);
};
export default GroupSummary;
