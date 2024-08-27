import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Database } from "@/utils/types/schema";
import Link from "next/link";

type Props = {
	project: Database["public"]["Tables"]["projects"]["Row"];
};

const ProjectSummaryCard = ({ project }: Props) => {
	return (
		<Link
			href={`/dashboard/${project.tenant_id}/projects/${project.id}`}
			className="cursor-pointer group"
			prefetch={false}
		>
			<Card className="mb-2 group-hover:shadow-md group-hover:bg-slate-100">
				<CardHeader>
					<CardTitle className="text-base">{project.name}</CardTitle>
					<CardDescription className="text-zinc-800">
						Budget:{" "}
						<strong>{project.budget && formatCurrency(project.budget)}</strong>
					</CardDescription>
					<p className="text-sm text-slate-500 line-clamp-1">
						{project.description}
					</p>
				</CardHeader>
			</Card>
		</Link>
	);
};
export default ProjectSummaryCard;
