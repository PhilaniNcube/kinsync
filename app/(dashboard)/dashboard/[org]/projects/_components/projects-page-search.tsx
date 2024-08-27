"use client";

import {
	Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateProjectDialog from "./create-project";
import { Button } from "@/components/ui/button";
import type { FormEventHandler } from "react";


export default function ProjectsPageSearch({ group_id }: { group_id: string }) {



	return (
		<div className="flex flex-col ">
			<div className="flex items-center justify-between mb-2">
				<h1 className="text-2xl font-semibold">Projects</h1>
				<CreateProjectDialog group_id={group_id} />
			</div>
			<div className="">
				<form >
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
						<Input
              name="search"
							className="pl-8"
							placeholder="Search projects..."
							type="search"
						/>

					</div>
				</form>
			</div>
		</div>
	);
}
