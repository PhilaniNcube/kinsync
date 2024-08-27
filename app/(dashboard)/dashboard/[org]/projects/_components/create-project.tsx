"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createProjectSchema } from "@/utils/types/validation";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { createProjectAction } from "@/utils/server-actions/projects/create-project-action";
import SubmitButton from "@/components/submit-button";

const CreateProjectDialog = ({ group_id }: { group_id: string }) => {
	const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

	const [state, formAction] = useFormState(createProjectAction, null);

	const form = useForm<z.infer<typeof createProjectSchema>>({
		resolver: zodResolver(createProjectSchema),
		defaultValues: {
			group_id: group_id,
		},
		mode: "onBlur",
	});

	return (
		<Dialog
			open={isAddProjectDialogOpen}
			onOpenChange={setIsAddProjectDialogOpen}
		>
			<DialogTrigger asChild>
				<Button size="sm">
					<PlusCircle className="w-4 h-4 mr-2" />
					Add Project
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Project</DialogTitle>
					<DialogDescription>
						Enter the name of the new project for this group.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					{state?.status === 401 && (
						<p className="text-xs text-red-600">{state.user_error}</p>
					)}
					{state?.status === 400 && (
						<p className="text-xs text-red-600">Invalid form fields</p>
					)}
					{state?.status === 500 && (
						<p className="text-xs text-red-600">{state.server}</p>
					)}
					<form action={formAction} className="grid gap-5 py-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>
										This is display name for the project.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
									<FormDescription>
										Enter the product description.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="budget"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Budget</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="group_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="hidden" defaultValue={group_id} {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid gap-3 md:grid-cols-2">
							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project Start Date</FormLabel>
										<FormControl>
											<Input {...field} type="date" />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project End Date</FormLabel>
										<FormControl>
											<Input {...field} type="date" />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<SubmitButton className="w-1/2">Add Project</SubmitButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default CreateProjectDialog;
