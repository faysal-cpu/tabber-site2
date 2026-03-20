import {
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  BLOCKED_EXTENSIONS,
  MAX_FILE_SIZE,
} from '../constants/file-types';
import { getFileExtension } from '../utils/file-naming';

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate an uploaded file for size, type, and extension
 */
export function validateFile(file: File): FileValidationResult {
  // Check file size
  if (file.size === 0) {
    return {
      valid: false,
      error: 'File is empty',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of 50MB. Your file is ${formatBytes(file.size)}.`,
    };
  }

  // Check file extension
  const extension = getFileExtension(file.name);

  // Block dangerous extensions
  if (BLOCKED_EXTENSIONS.includes(extension as any)) {
    return {
      valid: false,
      error: `File type "${extension}" is not allowed for security reasons`,
    };
  }

  // Check if extension is allowed
  if (!ALLOWED_EXTENSIONS.includes(extension as any)) {
    return {
      valid: false,
      error: `File type "${extension}" is not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    return {
      valid: false,
      error: `File MIME type "${file.type}" is not allowed`,
    };
  }

  return { valid: true };
}

/**
 * Validate multiple files
 */
export function validateFiles(files: File[]): FileValidationResult {
  for (const file of files) {
    const result = validateFile(file);
    if (!result.valid) {
      return result;
    }
  }
  return { valid: true };
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
