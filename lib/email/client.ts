import { Resend } from 'resend';

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
// Using Resend's test address until tabber.ca domain is verified
export const EMAIL_CONFIG = {
  from: 'Tabber Portal <onboarding@resend.dev>',
  replyTo: 'info@tabber.ca',
};
