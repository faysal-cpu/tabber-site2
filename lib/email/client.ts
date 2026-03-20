import { Resend } from 'resend';

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const EMAIL_CONFIG = {
  from: 'Tabber Portal <portal@tabber.ca>',
  replyTo: 'info@tabber.ca',
};
