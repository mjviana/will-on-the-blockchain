import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import WitnessEmail from "../../../emails/WitnessEmail";
import TestatorEmail from "../../../emails/TestatorEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

type EmailType = "testator" | "witness";

interface SendEmailParams {
  recipientEmail: string;
  code: string;
  type: EmailType;
  recipientName?: string;
  senderName?: string;
}

export async function POST(request: NextRequest) {
  console.log("request", request);

  const {recipientEmail, code, type, recipientName, senderName} =
    await request.json();

  // Construct the parameters object conforming to SendEmailParams interface
  const params: SendEmailParams = {
    recipientEmail,
    code,
    type,
    recipientName,
    senderName,
  };

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: params.recipientEmail,
      subject:
        params.type === "witness"
          ? "Witness Request Code"
          : "Will Confirmation Code",
      react:
        params.type === "witness"
          ? WitnessEmail({
              code: params.code,
              senderName: params.senderName,
              recipientName: params.recipientName,
            })
          : TestatorEmail({
              code: params.code,
              senderName: params.senderName!,
            }),
    });
    return await NextResponse.json(data);
  } catch (error) {
    return await NextResponse.json({error});
  }
}
