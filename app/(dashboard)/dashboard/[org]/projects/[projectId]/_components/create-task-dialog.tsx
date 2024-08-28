"use client";

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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { startTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createTaskSchema } from "@/utils/types/validation";
import { useFormState } from "react-dom";
import { createTaskAction } from "@/utils/server-actions/tasks/create-task-action";
import SubmitButton from "@/components/submit-button";

const CreateTaskDialog = ({
	tenant_id,
	project_id,
}: { tenant_id: string; project_id: string }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const form = useForm<z.infer<typeof createTaskSchema>>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			tenant_id: tenant_id,
			project_id: project_id,
		},
		mode: "onBlur",
	});

	const [state, formAction] = useFormState(createTaskAction, null);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button className="">
					<PlusCircle className="mr-3" /> Create Task
				</Button>
			</DialogTrigger>
			<DialogContent>
				<Form {...form}>
					<form
						action={(formData: FormData) => {
							startTransition(async () => {
								await formAction(formData);
								setIsDialogOpen(false);
							});
						}}
						className="grid gap-y-2"
					>
						<FormField
							control={form.control}
							name="tenant_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="hidden" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="project_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="hidden" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Task description</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="cost"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Task cost</FormLabel>
									<FormControl>
										<Input type="number" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="due_date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Due Date</FormLabel>
									<FormControl>
										<Input type="date" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<SubmitButton className="mt-3">Save Task</SubmitButton>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default CreateTaskDialog;
