

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Menu, XIcon } from "lucide-react";
import MenuToggle from "./menu-toggle";
import { getCurrentProfile } from "@/utils/data/users";
import ProfileDropDown from "./profile-dropdown";

const DashboardHeader = async () => {

  const currentProfile = await getCurrentProfile();

	return (
		<header className="flex items-center justify-between h-20 px-6 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<div className="flex items-center">
				<MenuToggle />
			</div>
			<div className="flex items-center">
				<Button variant="ghost" size="icon">
					<Bell className="w-5 h-5" />
					<span className="sr-only">View notifications</span>
				</Button>
				{currentProfile !== null && <ProfileDropDown profile={currentProfile}/>}
			</div>
		</header>
	);
};
export default DashboardHeader;
