import {useState} from "react";

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
    setIsLoading(true);
    console.log("emailParams", emailParams);

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        body: JSON.stringify(emailParams), // Include the code parameter in the request body
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {data, isLoading, isError, sendEmail};
};

export default useSendEmail;
