"use client";

import { useState } from "react";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Database } from "@/utils/types/schema";

type Props = {
	members: {
		first_name: string | null;
		id: string;
		last_name: string | null;
		phone: string | null;
	}[];
  isOwner: boolean;
};

export default function GroupMembersList({ members, isOwner }: Props) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredMembers = members.filter(
		(member) =>
			(member.first_name?.toLowerCase() || "").includes(
				searchQuery.toLowerCase(),
			) ||
			(member.last_name?.toLowerCase() || "").includes(
				searchQuery.toLowerCase(),
			),
	);

	return (
		<div className="w-full max-w-4xl mx-auto mt-4">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold">Group Members</h2>
				{isOwner && (
					<Button>
						<UserPlus className="w-4 h-4 mr-2" />
						Add Member
					</Button>
				)}
			</div>
			<div className="mb-4">
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
					<Input
						className="pl-8"
						placeholder="Search members..."
						type="search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>
			<ul className="space-y-4">
				{filteredMembers.map((member) => (
					<li
						key={member.id}
						className="flex items-center justify-between p-4 rounded-lg shadow bg-card"
					>
						<div className="flex items-center space-x-4">
							<Avatar className="w-10 h-10">
								<AvatarFallback>
									{member.first_name
										?.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold">{member.first_name}</h3>
								<p className="text-sm text-muted-foreground">
									{member.last_name}
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							{/* <span className="text-sm font-medium">{member.role}</span> */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<MoreHorizontal className="w-4 h-4" />
										<span className="sr-only">Open menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuItem>View Profile</DropdownMenuItem>
									<DropdownMenuItem>Edit Member</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="text-red-600">
										Remove Member
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
