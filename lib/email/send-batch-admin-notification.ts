import { resend, EMAIL_CONFIG } from './client';
import {
  getBatchAdminNotificationHTML,
  getBatchAdminNotificationText,
  type BatchAdminNotificationData,
} from './templates';

export interface SendBatchAdminNotificationParams {
  clientEmail: string;
  clientName: string;
  files: Array<{
    filename: string;
    notes?: string;
  }>;
}

const ADMIN_EMAILS = ['felmasri@tabber.ca', 'faysal.elmasri@outlook.com'];

/**
 * Format date in EST/EDT timezone
 */
function formatDateEST(): string {
  return new Date().toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  });
}

/**
 * Send batch upload notification email to admin
 */
export async function sendBatchAdminNotification(
  params: SendBatchAdminNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { clientEmail, clientName, files } = params;

    // Format upload date (EST/EDT)
    const uploadDate = formatDateEST();

    // Prepare email data with all files
    const emailData: BatchAdminNotificationData = {
      clientName,
      clientEmail,
      files: files.map(file => ({
        filename: file.filename,
        uploadDate,
        notes: file.notes,
      })),
    };

    // Send email to both admin addresses
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: ADMIN_EMAILS,
      replyTo: clientEmail, // Reply goes to client
      subject: `Client Portal Upload: ${clientName} - ${files.length} file${files.length > 1 ? 's' : ''}`,
      html: getBatchAdminNotificationHTML(emailData),
      text: getBatchAdminNotificationText(emailData),
    });

    if (error) {
      console.error('Failed to send batch admin notification email:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    console.log('Batch admin notification email sent:', data?.id);
    return { success: true };
  } catch (error) {
    console.error('Error sending batch admin notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
