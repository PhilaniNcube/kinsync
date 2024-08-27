"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, ChevronDown } from "lucide-react";
import { startTransition, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Group } from "@/utils/data/groups";



type Props = {
	groups: Group[];
  orgId: string;
};

const GroupSwitcher = ({groups, orgId }:Props) => {



const selectedOrg = groups.find((org) => org.tenant_id === orgId);

const [currentOrg, setCurrentOrg] = useState(selectedOrg?.tenant?.name || "");
const router = useRouter();

const handleOrgChange = (org: Group) => {

  startTransition(() => {
    setCurrentOrg(org.tenant?.name || "");
    router.push(`/dashboard/${org.tenant?.id}`);
  });

};

  return (
			<div className="p-4 border-b dark:border-gray-700">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="justify-between w-full">
							<div className="flex items-center">
								<Building className="w-4 h-4 mr-2" />
								<span>{currentOrg}</span>
							</div>
							<ChevronDown className="w-4 h-4 opacity-50" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Switch organization</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{groups.map((org) => (
							<DropdownMenuItem
								key={org.tenant?.name}
								onSelect={() => handleOrgChange(org)}
							>
								<Avatar className="w-6 h-6 mr-2">
									{/* <AvatarImage src={org.logo} alt={org.name} /> */}
									<AvatarFallback>{org.tenant?.name[0]}</AvatarFallback>
								</Avatar>
								<span>{org.tenant?.name}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
};
export default GroupSwitcher;
