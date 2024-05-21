import {Resend} from "resend";
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || "";

export const resend = new Resend(RESEND_API_KEY);
