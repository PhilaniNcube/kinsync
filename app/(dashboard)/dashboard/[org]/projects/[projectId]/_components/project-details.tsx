"use client";

import { useState } from "react";
import { Calendar, FileText, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { Database } from "@/utils/types/schema";

type Props = {
  projectInfo: Database['public']['Tables']['projects']['Row'];
  tasks: Database['public']['Tables']["project_tasks"]['Row'][];
}

export default function ProjectDetails({ projectInfo, tasks }: Props) {
	const [project, setProject] = useState({
		id: 1,
		name: "Website Redesign",
		description:
			"Redesign and develop the company website to improve user experience and increase conversions.",
		startDate: new Date("2023-06-01"),
		endDate: new Date("2023-12-31"),
		tasks: [
			{ id: 1, name: "Research and Planning", cost: 2000, completed: true },
			{ id: 2, name: "UI/UX Design", cost: 5000, completed: true },
			{ id: 3, name: "Frontend Development", cost: 8000, completed: false },
			{ id: 4, name: "Backend Development", cost: 10000, completed: false },
			{ id: 5, name: "Testing and QA", cost: 3000, completed: false },
			{ id: 6, name: "Deployment", cost: 2000, completed: false },
		],
		documents: [
			{ id: 1, name: "Project Brief.pdf", type: "document" },
			{ id: 2, name: "Design Mockups.sketch", type: "document" },
		],
		images: [
			{
				id: 1,
				name: "Homepage Wireframe",
				url: "/placeholder.svg?height=100&width=200",
			},
			{
				id: 2,
				name: "Mobile Design",
				url: "/placeholder.svg?height=100&width=200",
			},
		],
	});

	const toggleTaskCompletion = (taskId: number) => {
		setProject((prevProject) => ({
			...prevProject,
			tasks: prevProject.tasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task,
			),
		}));
	};

	const totalCost = project.tasks.reduce((sum, task) => sum + task.cost, 0);
	const completedTasks = project.tasks.filter((task) => task.completed).length;
	const progress = (completedTasks / project.tasks.length) * 100;

	return (
		<div className="container p-6 mx-auto space-y-8">
			<Card>
				<CardHeader>
					<div className="flex items-start justify-between">
						<div>
							<CardTitle className="text-3xl font-bold">
								{projectInfo.name}
							</CardTitle>
							<CardDescription className="mt-2">
								{projectInfo.description}
							</CardDescription>
						</div>
						<Badge variant="outline" className="text-sm">
							{progress.toFixed(0)}% Complete
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex items-center mb-4 space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center">
							<Calendar className="w-4 h-4 mr-2" />
							Start: {format(projectInfo.start_date, "MMM d, yyyy")}
						</div>
						<div className="flex items-center">
							<Calendar className="w-4 h-4 mr-2" />
							End: {projectInfo.end_date && format(projectInfo.end_date, "MMM d, yyyy")}
						</div>
					</div>
					<Progress value={progress} className="mb-4" />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Project Tasks</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-4">
						{project.tasks.map((task) => (
							<li
								key={task.id}
								className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
							>
								<div className="flex items-center space-x-2">
									<Checkbox
										checked={task.completed}
										onCheckedChange={() => toggleTaskCompletion(task.id)}
									/>
									<span
										className={
											task.completed ? "line-through text-muted-foreground" : ""
										}
									>
										{task.name}
									</span>
								</div>
								<Badge variant="secondary">${task.cost.toLocaleString()}</Badge>
							</li>
						))}
					</ul>
					<div className="mt-4 font-semibold text-right">
						Total Cost: ${totalCost.toLocaleString()}
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Project Documents</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{project.documents.map((doc) => (
								<li key={doc.id} className="flex items-center space-x-2">
									<FileText className="w-4 h-4" />
									<span>{doc.name}</span>
									<Button variant="ghost" size="sm">
										View
									</Button>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Project Images</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-4">
							{project.images.map((image) => (
								<div key={image.id} className="space-y-2">
									<Image
										src={image.url}
										alt={image.name}
										width={200}
										height={100}
										className="object-cover rounded-lg"
									/>
									<p className="text-sm text-center">{image.name}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
