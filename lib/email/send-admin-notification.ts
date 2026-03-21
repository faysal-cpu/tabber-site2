import { resend, EMAIL_CONFIG } from './client';
import {
  getAdminNotificationHTML,
  getAdminNotificationText,
  type AdminNotificationData,
} from './templates';
import { formatFileSize } from '../utils/file-naming';

export interface SendAdminNotificationParams {
  clientEmail: string;
  clientName: string;
  filename: string;
  fileSize: number;
  notes?: string;
}

const ADMIN_EMAILS = ['felmasri@tabber.ca', 'faysal.elmasri@outlook.com'];

/**
 * Send upload notification email to admin
 */
export async function sendAdminNotification(
  params: SendAdminNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { clientEmail, clientName, filename, fileSize, notes } = params;

    // Format upload date (EST/EDT)
    const uploadDate = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    });

    // Prepare email data
    const emailData: AdminNotificationData = {
      clientName,
      clientEmail,
      filename,
      uploadDate,
      fileSize: formatFileSize(fileSize),
      notes,
    };

    // Send email to admin (both addresses)
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: ADMIN_EMAILS,
      replyTo: clientEmail, // Reply goes to client
      subject: `New Upload: ${clientName} - ${filename}`,
      html: getAdminNotificationHTML(emailData),
      text: getAdminNotificationText(emailData),
    });

    if (error) {
      console.error('Failed to send admin notification email:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    console.log('Admin notification email sent:', data?.id);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
