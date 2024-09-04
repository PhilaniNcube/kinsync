import type { ReactNode } from "react";
import Aside from "./_components/aside";
import DashboardHeader from "./_components/header";
import { DashboardStoreProvider } from "./_components/dashboard-provider";
import { getMyGroups } from "@/utils/data/groups";


export default async function DashboardLayout({children}:{children:ReactNode}) {

  const groups = await getMyGroups();

	return (
		<DashboardStoreProvider>
			<div className="flex h-screen bg-gray-100 dark:bg-gray-900">
				{/* Sidebar */}
				<Aside groups={groups} />

				{/* Main Content */}
				<div className="flex flex-col flex-1 overflow-hidden">
					{/* Header */}
					<DashboardHeader />

					{/* Main Content */}
					<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
						{children}
					</main>
				</div>
			</div>
		</DashboardStoreProvider>
	);
}
