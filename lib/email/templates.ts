/**
 * Email templates for the client portal
 */

export interface UploadConfirmationData {
  clientName: string;
  filename: string;
  uploadDate: string;
  fileSize: string;
  notes?: string;
}

/**
 * Generate HTML email template for upload confirmation
 */
export function getUploadConfirmationHTML(data: UploadConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upload Confirmation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #ffffff;
      padding: 30px 20px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .info-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-table td:first-child {
      font-weight: 600;
      color: #6b7280;
      width: 140px;
    }
    .success-badge {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
      background: #f9fafb;
      border-radius: 0 0 8px 8px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✓ Document Uploaded Successfully</h1>
  </div>

  <div class="content">
    <p>Hello ${data.clientName},</p>

    <p>This email confirms that your document has been successfully uploaded to the Tabber Client Portal.</p>

    <div class="success-badge">Upload Confirmed</div>

    <table class="info-table">
      <tr>
        <td>Document Name:</td>
        <td><strong>${data.filename}</strong></td>
      </tr>
      <tr>
        <td>File Size:</td>
        <td>${data.fileSize}</td>
      </tr>
      <tr>
        <td>Upload Date:</td>
        <td>${data.uploadDate}</td>
      </tr>
      ${data.notes ? `<tr>
        <td>Your Notes:</td>
        <td>${data.notes}</td>
      </tr>` : ''}
    </table>

    <p>Your document has been securely stored and our team will process it shortly.</p>

    <p>If you have any questions or concerns, please don't hesitate to contact us.</p>

    <p>Best regards,<br><strong>The Tabber Team</strong></p>
  </div>

  <div class="footer">
    <p>This is an automated confirmation email from the Tabber Client Portal.</p>
    <p>&copy; ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for upload confirmation
 */
export function getUploadConfirmationText(data: UploadConfirmationData): string {
  return `
DOCUMENT UPLOADED SUCCESSFULLY

Hello ${data.clientName},

This email confirms that your document has been successfully uploaded to the Tabber Client Portal.

UPLOAD DETAILS:
- Document Name: ${data.filename}
- File Size: ${data.fileSize}
- Upload Date: ${data.uploadDate}${data.notes ? `\n- Your Notes: ${data.notes}` : ''}

Your document has been securely stored and our team will process it shortly.

If you have any questions or concerns, please don't hesitate to contact us.

Best regards,
The Tabber Team

---
This is an automated confirmation email from the Tabber Client Portal.
© ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.
  `.trim();
}
