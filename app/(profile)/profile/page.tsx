import { getCurrentProfile } from "@/utils/data/users";
import ProfileComponent from "./_components/profile-component";
import { redirect } from "next/navigation";
import { getMyGroups } from "@/utils/data/groups";
import ProfileHeader from "./_components/profile-header";

const ProfilePage = async () => {

  const profile = await getCurrentProfile();
  const groups = await getMyGroups();

  if (!profile || profile === null) {
    redirect("/");
  }


  return (
			<div className="container max-w-4xl px-4 py-8 mx-auto">
				<ProfileHeader profile={profile} />
				{groups !== null && (
					<ProfileComponent profile={profile} groups={groups} />
				)}
			</div>
		);
};
export default ProfilePage;
