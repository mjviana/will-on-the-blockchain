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
  recipientName?: string;
  senderName?: string;
}

const WitnessEmail = ({code, recipientName, senderName}: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Please confirm that you are a witness.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}></Section>
          <Heading style={h1}>Confirm that you are a witness</Heading>
          <Text style={heroText}>
            Dear {recipientName}, {senderName} is requesting for your testimony
            to create a blockchain will. Please confirm that you are a witness.
            Your confirmation code is below - share it order to confirm that you
            are a witness.
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

export default WitnessEmail;

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
