"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Users } from "lucide-react";
import type { Database } from "@/utils/types/schema";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { createGroupAction } from "@/utils/server-actions/groups/create-group";
import type { Group } from "@/utils/data/groups";
import { useRouter } from "next/navigation";

export default function ProfileComponent({
	profile,
	groups,
}: {
	profile: Database["public"]["Tables"]["profiles"]["Row"];
	groups: Group[];
}) {
	const [state, formAction] = useFormState(createGroupAction, null);

	const router = useRouter();

	return (
		<div className="container px-0 py-2 mx-auto">
			<div className="max-w-4xl mx-auto">
				<Card className="py-8">
					<CardContent>
						<h3 className="mb-4 text-xl font-semibold">Your Groups</h3>
						<ScrollArea className="h-[400px] pr-4">
							<div className="space-y-4">
								{groups !== null ? (
									groups.map((group) => (
										<Card
											key={group.tenant_id}
                      className="cursor-pointer hover:shadow-md"
											onClick={() => {
												startTransition(() => {
													router.push(`/dashboard/${group.tenant_id}`);
												});
											}}
										>
											<CardHeader className="flex flex-row items-center gap-4 p-4">
												<Avatar>
													<AvatarFallback>
														{group.tenant?.name.slice(0, 2).toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<CardTitle>{group.tenant?.name}</CardTitle>
													{/* <CardDescription>
													{group.memberCount} members
												</CardDescription> */}
												</div>
												<Badge variant="secondary">
													<Users className="w-3 h-3 mr-1" />
													{profile.id === group.tenant?.user_id
														? "Creater"
														: "Member"}
												</Badge>
											</CardHeader>
										</Card>
									))
								) : (
									<p>No groups found</p>
								)}
							</div>
						</ScrollArea>
					</CardContent>
					<CardFooter>
						<Dialog>
							<DialogTrigger asChild>
								<Button className="w-full">
									<PlusCircle className="w-4 h-4 mr-2" />
									Create New Group
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<form action={formAction}>
									<DialogHeader>
										<DialogTitle>Create New Group</DialogTitle>
										<DialogDescription>
											Enter a name for your new group. Click save when
											you&apos;re done.
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid items-center grid-cols-4 gap-2">
											<Label
												htmlFor="group-name"
												className="col-span-4 text-left"
											>
												Name
											</Label>
											<Input
												id="group-name"
												name="name"
												required
												className="col-span-4"
											/>
										</div>
									</div>
									<DialogFooter>
										<SubmitButton className="w-1/2">Save Group</SubmitButton>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
