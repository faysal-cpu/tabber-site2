import { resend, EMAIL_CONFIG } from './client';
import {
  getUploadConfirmationHTML,
  getUploadConfirmationText,
  type UploadConfirmationData,
} from './templates';

export interface SendBatchUploadConfirmationParams {
  clientEmail: string;
  clientName: string;
  files: Array<{
    filename: string;
    notes?: string;
  }>;
}

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
 * Send batch upload confirmation email to client
 */
export async function sendBatchUploadConfirmation(
  params: SendBatchUploadConfirmationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { clientEmail, clientName, files } = params;

    // Format upload date (EST/EDT)
    const uploadDate = formatDateEST();

    // Prepare email data with all files
    const emailData: UploadConfirmationData = {
      clientName,
      files: files.map(file => ({
        filename: file.filename,
        uploadDate,
        notes: file.notes,
      })),
    };

    // Send email
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: clientEmail,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: 'Document Upload Confirmation',
      html: getUploadConfirmationHTML(emailData),
      text: getUploadConfirmationText(emailData),
    });

    if (error) {
      console.error('Failed to send upload confirmation email:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    console.log('Upload confirmation email sent:', data?.id);
    return { success: true };
  } catch (error) {
    console.error('Error sending upload confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
