"use client";

import { BarChart, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useDashboardStore } from "./dashboard-provider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import GroupSwitcher from "./group-switcher";
import type { Group } from "@/utils/data/groups";

type Props = {
	groups: Group[] | null;
};

const Aside = ({ groups }: Props) => {
	const { isOpen, toggle } = useDashboardStore((state) => state);
	const pathname = usePathname();

	// get the id from the pathname
	const id = pathname.split("/")[2];


	return (
		<aside
			className={`${isOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
		>
			<div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
				<span className="text-2xl font-semibold text-gray-800 dark:text-white">
					Dashboard
				</span>
			</div>
			<nav className="mt-5">
				{groups !== null && groups.length > 0 && <GroupSwitcher orgId={id} groups={groups} />}

				<Link
					className={cn(
						"flex items-center px-6 py-2",
						pathname === `/dashboard/${id}`
							? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
							: "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700",
					)}
					href={`/dashboard/${id}`}
				>
					<Home className="w-5 h-5" />
					<span className="mx-3">Dashboard</span>
				</Link>
				<Link
					className={cn(
						"flex items-center px-6 py-2 mt-2",
						pathname.startsWith(`/dashboard/${id}/members`)
							? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
							: "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700",
					)}
					href={`/dashboard/${id}/members`}
				>
					<Users className="w-5 h-5" />
					<span className="mx-3">Members</span>
				</Link>
				<Link
					className={cn(
						"flex items-center px-6 py-2 mt-2",
						pathname.startsWith(`/dashboard/${id}/projects`)
							? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
							: "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700",
					)}
					href={`/dashboard/${id}/projects`}
				>
					<BarChart className="w-5 h-5" />
					<span className="mx-3">Projects</span>
				</Link>
			</nav>
		</aside>
	);
};
export default Aside;
