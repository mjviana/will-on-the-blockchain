import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface Props {
  code: string;
  senderName: string;
}

const TestatorEmail = ({code, senderName}: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Save your secret code </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}></Section>
          <Heading style={h1}>Save your secret code</Heading>
          <Text style={heroText}>
            Dear {senderName} your will was created successfully. Save this code
            in a safe place, this code is necessary to see the details of your
            will and to revoke it. You can share it with someone you trust.
          </Text>

          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{code}</Text>
          </Section>

          <Text style={text}>
            If you didn't request this email, there's nothing to worry about,
            you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TestatorEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
