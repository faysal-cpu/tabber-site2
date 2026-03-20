// Allowed MIME types for file uploads
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'text/csv',
] as const;

// Allowed file extensions
export const ALLOWED_EXTENSIONS = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.xlsx',
  '.csv',
] as const;

// Blocked file extensions for security
export const BLOCKED_EXTENSIONS = [
  '.exe',
  '.js',
  '.sh',
  '.bat',
  '.cmd',
  '.msi',
  '.app',
  '.deb',
  '.rpm',
  '.dmg',
  '.pkg',
  '.bin',
  '.dll',
  '.so',
  '.dylib',
] as const;

// Maximum file size: 50MB in bytes
export const MAX_FILE_SIZE = 52428800; // 50 * 1024 * 1024

// MIME type to extension mapping
export const MIME_TO_EXTENSION: Record<string, string> = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'text/csv': '.csv',
};
