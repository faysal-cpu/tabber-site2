import { MIME_TO_EXTENSION } from '../constants/file-types';

export interface FileNamingOptions {
  clientName: string;
  originalName: string;
}

/**
 * Generate a standardized filename for uploaded files
 * Format: {ClientName}_{YYYYMMDD}_{randomID}_{originalfilename}
 * Example: SmithFamily_20260321_a92f_payroll-hours.pdf
 */
export function generateFilename(options: FileNamingOptions): string {
  const { clientName, originalName } = options;

  // Get current date in YYYYMMDD format
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  // Sanitize client name (remove spaces, special chars, keep letters/numbers)
  const sanitizedClientName = clientName
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 50); // Limit length

  // Generate random ID (4 characters)
  const randomId = Math.random().toString(36).substring(2, 6);

  // Sanitize original filename (keep letters, numbers, hyphens, underscores, and extension)
  const sanitizedOriginal = originalName
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  return `${sanitizedClientName}_${dateStr}_${randomId}_${sanitizedOriginal}`;
}

/**
 * Sanitize a filename to remove potentially dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const match = filename.match(/\.[^.]+$/);
  return match ? match[0].toLowerCase() : '';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
