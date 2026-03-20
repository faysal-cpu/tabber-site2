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

const ADMIN_EMAIL = 'felmasri@tabber.ca';

/**
 * Send upload notification email to admin
 */
export async function sendAdminNotification(
  params: SendAdminNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { clientEmail, clientName, filename, fileSize, notes } = params;

    // Format upload date
    const uploadDate = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
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

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: ADMIN_EMAIL,
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
