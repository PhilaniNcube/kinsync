import { getCurrentUser } from "@/utils/data/users";
import type { ReactNode } from "react";

const PublicLayout = ({children}:{children:ReactNode}) => {

  return <div>{children}</div>;
};
export default PublicLayout;
