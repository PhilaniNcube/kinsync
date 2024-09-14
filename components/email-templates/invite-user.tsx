import * as React from "react";

interface EmailTemplateProps {
  first_name: string;
  last_name: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  first_name,
  last_name,
  email,
}) => (
  <div>
    <h1>Hi, {first_name}!</h1>
    <p>
      You have been invited to join our organization. Please click the link below to accept the invitation.
    </p>
    <a href={`http://localhost:3000/accept-invitation?email=${email}&first_name=${first_name}&last_name=${last_name}`}>Accept Invitation</a>
  </div>
);
