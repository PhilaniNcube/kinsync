"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/utils/server-actions/auth/logout-action";
import type { Database } from "@/utils/types/schema";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

const ProfileDropDown = ({
	profile,
}: { profile: Database["public"]["Tables"]["profiles"]["Row"] }) => {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center ml-4">
					<Avatar className="w-8 h-8">
						<AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
						{profile?.first_name && (
							<AvatarFallback>{profile?.first_name[0]}</AvatarFallback>
						)}
					</Avatar>
					<span className="ml-2 text-sm font-medium">
						{profile.first_name} {profile.last_name}
					</span>
					<ChevronDown className="w-4 h-4 ml-2" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						startTransition(() => {
							router.push("/profile");
						});
					}}
				>
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
				<DropdownMenuItem
         className="cursor-pointer"
         onClick={() => {
          startTransition(() => {
            logoutAction();
          });
         }}
        >Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default ProfileDropDown;
