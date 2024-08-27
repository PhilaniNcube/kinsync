import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/utils/types/schema";

const ProfileHeader = ({
	profile,

}: {
	profile: Database["public"]["Tables"]["profiles"]["Row"];

}) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center space-x-4">
					<Avatar className="w-12 h-12">
						<AvatarFallback>
							{profile?.first_name?.[0]}
							{profile.last_name?.[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-2xl">
							{profile.first_name} {profile.last_name}
						</CardTitle>
						{/* <CardDescription>user@example.com</CardDescription> */}
					</div>
				</div>
			</CardHeader>
		</Card>
	);
};
export default ProfileHeader;
