import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
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
  <Html>
    <Head />
    <Preview>You have been invited to a KinSync Group!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>You have been invited to a KinSync Group!</Heading>
        <Text style={text}>
          Hi {first_name} {last_name},
        </Text>

        <Text style={text}>
          You have been invited to join a KinSync group. To get started, click
          the button below.
        </Text>
        <Button style={btn} href={`https://kinsync.vercel.app/accept-invite?email=${email}`}>
          Accept Invitation
        </Button>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
  textAlign: "center" as const,
};

const text = {
  color: "#4a4a4a",
  fontSize: "18px",
  lineHeight: "1.4",
  margin: "16px 0",
};

const btn = {
  backgroundColor: "#4CAF50",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const link = {
  color: "#8898aa",
  textDecoration: "underline",
};
