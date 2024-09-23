import { Suspense } from "react";
import AcceptInvite from "../_components/accept-invite";

const AcceptInvitePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AcceptInvite />
      </Suspense>
    </div>
  );
};
export default AcceptInvitePage;
