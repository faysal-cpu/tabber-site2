/**
 * Email templates for the client portal
 */

export interface UploadConfirmationData {
  clientName: string;
  files: Array<{
    filename: string;
    uploadDate: string;
    notes?: string;
  }>;
}

export interface AdminNotificationData {
  clientName: string;
  clientEmail: string;
  filename: string;
  uploadDate: string;
  fileSize: string;
  notes?: string;
}

export interface BatchAdminNotificationData {
  clientName: string;
  clientEmail: string;
  files: Array<{
    filename: string;
    uploadDate: string;
    notes?: string;
  }>;
}

/**
 * Generate HTML email template for upload confirmation (batch support)
 */
export function getUploadConfirmationHTML(data: UploadConfirmationData): string {
  const filesHTML = data.files.map(file => `
          <div class="document-item">
            <div class="file-name">📄 ${file.filename}</div>
            <div class="upload-date">Uploaded: ${file.uploadDate}</div>
            ${file.notes ? `<div class="notes">${file.notes}</div>` : ''}
          </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Upload Confirmation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f9fafb;
    }
    .email-container {
      background: #ffffff;
      margin: 20px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: #2B4C7E;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px 5px 20px;
    }
    .content p {
      margin: 0 0 15px 0;
    }
    .documents-section {
      margin: 25px 0;
    }
    .documents-section h2 {
      font-size: 16px;
      font-weight: 600;
      color: #2B4C7E;
      margin: 0 0 15px 0;
    }
    .documents-list {
      background: #FAF9F7;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0 20px 0;
    }
    .document-item {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 12px 15px;
      margin-bottom: 10px;
    }
    .document-item:last-child {
      margin-bottom: 0;
    }
    .file-name {
      font-weight: 600;
      color: #1A2A44;
      margin-bottom: 4px;
      font-size: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .upload-date {
      font-size: 13px;
      color: #6B7280;
      margin-bottom: 4px;
    }
    .notes {
      font-size: 13px;
      color: #6B7280;
      font-style: italic;
      margin-top: 6px;
    }
    .signature {
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px solid #E5E7EB;
    }
    .logo-section {
      margin-top: 8px;
      margin-bottom: -10px;
      text-align: left;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background: #F9FAFB;
      border-top: 1px solid #E5E7EB;
      color: #6B7280;
      font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
      body { padding: 0; }
      .email-container { margin: 0; border-radius: 0; }
      .content { padding: 20px 15px; }
      .header { padding: 20px 15px; }
      .header h1 { font-size: 20px; }
      .document-item { padding: 10px 12px; }
      .file-name { font-size: 14px; word-wrap: break-word; overflow-wrap: break-word; }
      .documents-list { padding: 12px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>✓ Document Upload Confirmation</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>This email confirms receipt of your uploaded document(s) via the Tabber Client Portal.</p>
      <div class="documents-section">
        <h2>Files Received</h2>
        <div class="documents-list">
          ${filesHTML}
        </div>
      </div>
      <p>Your information has been securely stored. If you have any questions or concerns, please don't hesitate to contact us.</p>
      <div class="signature">
        <p style="margin-bottom: 5px;">Best regards,<br><strong>The Tabber Team</strong></p>
        <div class="logo-section">
          <img src="https://tabber.ca/tabber-og2.png" alt="Tabber - Bookkeeping | Compliance | Advisory" width="250" style="display: block; margin-top: 15px; max-width: 100%; height: auto;">
        </div>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0 0 5px 0;">This is an automated confirmation email from the Tabber Client Portal.</p>
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for upload confirmation
 */
export function getUploadConfirmationText(data: UploadConfirmationData): string {
  const filesText = data.files.map(file =>
    `- ${file.filename}\n  Uploaded: ${file.uploadDate}${file.notes ? `\n  Notes: ${file.notes}` : ''}`
  ).join('\n\n');

  return `
DOCUMENT UPLOAD CONFIRMATION

Hello,

This email confirms receipt of your uploaded document(s) via the Tabber Client Portal.

FILES RECEIVED:
${filesText}

Your information has been securely stored. If you have any questions or concerns, please don't hesitate to contact us.

Best regards,
The Tabber Team

---
This is an automated confirmation email from the Tabber Client Portal.
© ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.
  `.trim();
}

/**
 * Generate HTML email template for admin notification
 */
export function getAdminNotificationHTML(data: AdminNotificationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Document Upload</title>
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
      background: #2B4C7E;
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
      background: #FAF9F7;
      border-radius: 8px;
    }
    .info-table td {
      padding: 12px;
      border-bottom: 1px solid #D8D4CC;
    }
    .info-table tr:last-child td {
      border-bottom: none;
    }
    .info-table td:first-child {
      font-weight: 600;
      color: #2B4C7E;
      width: 140px;
    }
    .alert-badge {
      display: inline-block;
      background: #2B4C7E;
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
    <h1>📄 New Document Upload</h1>
  </div>

  <div class="content">
    <p><strong>A client has uploaded a new document to the portal.</strong></p>

    <div class="alert-badge">New Upload Alert</div>

    <table class="info-table">
      <tr>
        <td>Client Name:</td>
        <td><strong>${data.clientName}</strong></td>
      </tr>
      <tr>
        <td>Client Email:</td>
        <td>${data.clientEmail}</td>
      </tr>
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
        <td>Client Notes:</td>
        <td><em>${data.notes}</em></td>
      </tr>` : ''}
    </table>

    <p>The document has been uploaded to Azure Blob Storage and is ready for processing.</p>

    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
      This is an automated notification from the Tabber Client Portal.
    </p>
  </div>

  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for admin notification
 */
export function getAdminNotificationText(data: AdminNotificationData): string {
  return `
NEW DOCUMENT UPLOAD

A client has uploaded a new document to the portal.

UPLOAD DETAILS:
- Client Name: ${data.clientName}
- Client Email: ${data.clientEmail}
- Document Name: ${data.filename}
- File Size: ${data.fileSize}
- Upload Date: ${data.uploadDate}${data.notes ? `\n- Client Notes: ${data.notes}` : ''}

The document has been uploaded to Azure Blob Storage and is ready for processing.

---
This is an automated notification from the Tabber Client Portal.
© ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.
  `.trim();
}

/**
 * Generate HTML email template for batch admin notification
 */
export function getBatchAdminNotificationHTML(data: BatchAdminNotificationData): string {
  const filesHTML = data.files.map(file => `
          <div class="document-item">
            <div class="file-name">📄 ${file.filename}</div>
            <div class="upload-date">Uploaded: ${file.uploadDate}</div>
            ${file.notes ? `<div class="notes">Note: ${file.notes}</div>` : ''}
          </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Client Portal Upload Notification</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f9fafb;
    }
    .email-container {
      background: #ffffff;
      margin: 20px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: #2B4C7E;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px 5px 20px;
    }
    .content p {
      margin: 0 0 15px 0;
    }
    .client-info {
      background: #F3F4F6;
      border-left: 4px solid #2B4C7E;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .client-info p {
      margin: 5px 0;
      font-size: 14px;
    }
    .client-info strong {
      color: #2B4C7E;
    }
    .documents-section {
      margin: 25px 0;
    }
    .documents-section h2 {
      font-size: 16px;
      font-weight: 600;
      color: #2B4C7E;
      margin: 0 0 15px 0;
    }
    .documents-list {
      background: #FAF9F7;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0 20px 0;
    }
    .document-item {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 12px 15px;
      margin-bottom: 10px;
    }
    .document-item:last-child {
      margin-bottom: 0;
    }
    .file-name {
      font-weight: 600;
      color: #1A2A44;
      margin-bottom: 4px;
      font-size: 15px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .upload-date {
      font-size: 13px;
      color: #6B7280;
      margin-bottom: 4px;
    }
    .notes {
      font-size: 13px;
      color: #6B7280;
      font-style: italic;
      margin-top: 6px;
    }
    .signature {
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px solid #E5E7EB;
    }
    .logo-section {
      margin-top: 8px;
      margin-bottom: -10px;
      text-align: left;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background: #F9FAFB;
      border-top: 1px solid #E5E7EB;
      color: #6B7280;
      font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
      body { padding: 0; }
      .email-container { margin: 0; border-radius: 0; }
      .content { padding: 20px 15px; }
      .header { padding: 20px 15px; }
      .header h1 { font-size: 20px; }
      .document-item { padding: 10px 12px; }
      .file-name { font-size: 14px; word-wrap: break-word; overflow-wrap: break-word; }
      .documents-list { padding: 12px; }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>📥 Client Portal Upload</h1>
    </div>
    <div class="content">
      <p><strong>A client has uploaded files into the portal.</strong></p>

      <div class="client-info">
        <p><strong>Client:</strong> ${data.clientName}</p>
        <p><strong>Email:</strong> ${data.clientEmail}</p>
        <p><strong>Files Uploaded:</strong> ${data.files.length}</p>
      </div>

      <div class="documents-section">
        <h2>Files Received</h2>
        <div class="documents-list">
          ${filesHTML}
        </div>
      </div>

      <p style="font-size: 14px; color: #6B7280;">The files have been securely stored in Azure Blob Storage and are ready for processing.</p>

      <div class="signature">
        <p style="margin-bottom: 5px; font-size: 14px; color: #6B7280;">Tabber Client Portal</p>
        <div class="logo-section">
          <img src="https://tabber.ca/tabber-og2.png" alt="Tabber - Bookkeeping | Compliance | Advisory" width="250" style="display: block; margin-top: 15px; max-width: 100%; height: auto;">
        </div>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0 0 5px 0;">This is an automated notification from the Tabber Client Portal.</p>
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for batch admin notification
 */
export function getBatchAdminNotificationText(data: BatchAdminNotificationData): string {
  const filesText = data.files.map(file =>
    `- ${file.filename}\n  Uploaded: ${file.uploadDate}${file.notes ? `\n  Note: ${file.notes}` : ''}`
  ).join('\n\n');

  return `
CLIENT PORTAL UPLOAD NOTIFICATION

A client has uploaded files into the portal.

CLIENT INFORMATION:
- Client: ${data.clientName}
- Email: ${data.clientEmail}
- Files Uploaded: ${data.files.length}

FILES RECEIVED:
${filesText}

The files have been securely stored in Azure Blob Storage and are ready for processing.

---
This is an automated notification from the Tabber Client Portal.
© ${new Date().getFullYear()} Tabber Bookkeeping Services. All rights reserved.
  `.trim();
}
