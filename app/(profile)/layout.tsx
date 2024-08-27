
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Edit, MoreHorizontal, UserPlus } from "lucide-react";
import type { ReactNode } from "react";

export default function ProfileLayout({children}:{children:ReactNode}) {


	return (
		<div className="w-full bg-white shadow dark:bg-gray-800">
			<div className="container px-4 py-4 mx-auto">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<div className="flex items-center space-x-4">
						<Avatar className="w-16 h-16">
							<AvatarImage
								src="/placeholder.svg?height=64&width=64"
								alt="Jane Doe"
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div>
							<h1 className="text-2xl font-bold">Jane Doe</h1>
							<p className="text-gray-500 dark:text-gray-400">@janedoe</p>
						</div>
					</div>
					<div className="flex items-center space-x-2">

						<Button variant="outline">
							Message
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreHorizontal className="w-4 h-4" />
									<span className="sr-only">More options</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem>
									<Edit className="w-4 h-4 mr-2" />
									<span>Edit Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Bell className="w-4 h-4 mr-2" />
									<span>Notification Settings</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<UserPlus className="w-4 h-4 mr-2" />
									<span>Add to Group</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="flex flex-wrap items-center justify-between mt-4">


				</div>

			</div>
      {children}
		</div>
	);
}
