"use client";

import {useState} from "react";
import axios from "axios";

type EmailType = "testator" | "witness";

export interface SendEmailParams {
  recipientEmail: string;
  code: string;
  type: EmailType;
  recipientName?: string;
  senderName?: string;
}

const useSendEmail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const sendEmail = async (emailParams: SendEmailParams) => {
    console.log("emailParams", emailParams);
    console.log("json email data", JSON.stringify(emailParams));

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://will-on-the-blockchain-frontend.vercel.app/api/emails",
        emailParams,
        {
          headers: {"Content-Type": "application/json"},
        }
      );
      const data = await response.data;
      setData(data);
    } catch (error) {
      console.log("error", error);

      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {data, isLoading, isError, sendEmail};
};

export default useSendEmail;
