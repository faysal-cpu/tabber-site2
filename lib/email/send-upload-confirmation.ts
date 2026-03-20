import { resend, EMAIL_CONFIG } from './client';
import {
  getUploadConfirmationHTML,
  getUploadConfirmationText,
  type UploadConfirmationData,
} from './templates';
import { formatFileSize } from '../utils/file-naming';

export interface SendUploadConfirmationParams {
  clientEmail: string;
  clientName: string;
  filename: string;
  fileSize: number;
  notes?: string;
}

/**
 * Send upload confirmation email to client
 */
export async function sendUploadConfirmation(
  params: SendUploadConfirmationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const { clientEmail, clientName, filename, fileSize, notes } = params;

    // Format upload date
    const uploadDate = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    // Prepare email data
    const emailData: UploadConfirmationData = {
      clientName,
      filename,
      uploadDate,
      fileSize: formatFileSize(fileSize),
      notes,
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
