import {Resend} from "resend";
const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY || "";

console.log("RESEND_API_KEY", RESEND_API_KEY);

export const resend = new Resend(RESEND_API_KEY);
