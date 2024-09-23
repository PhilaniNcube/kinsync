import { isGroupOwner } from "@/utils/data/groups";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const OrgLayout = async({params:{org}, children}:{params:{org:string}, children:ReactNode}) => {

    const groupMember = await isGroupOwner(org);

    if (!groupMember) {
      console.log("Not a group member");
      redirect("/profile");
    }

  return <div>{children}</div>;
};
export default OrgLayout;
