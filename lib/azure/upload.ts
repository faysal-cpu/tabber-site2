import { uploadToBlob, getBlobUrl } from './blob-storage';
import { generateFilename } from '../utils/file-naming';
import type { Database } from '../db/supabase';

type ClientRow = Database['public']['Tables']['clients']['Row'];

export interface UploadResult {
  success: boolean;
  filename?: string;
  blobPath?: string;
  fileUrl?: string;
  error?: string;
}

/**
 * Upload a file to Azure Blob Storage for a specific client
 * Files are stored in client folders within the container
 */
export async function uploadFileToBlobStorage(
  client: ClientRow,
  file: File
): Promise<UploadResult> {
  try {
    // Generate standardized filename
    const filename = generateFilename({
      clientName: client.name,
      originalName: file.name,
    });

    // Construct blob path: ClientFolder/filename
    const blobPath = `${client.folder_name}/${filename}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload to Azure Blob Storage
    const result = await uploadToBlob(blobPath, fileBuffer, file.type);

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Failed to upload file to Azure Blob Storage',
      };
    }

    return {
      success: true,
      filename,
      blobPath,
      fileUrl: result.url,
    };
  } catch (error) {
    console.error('Azure Blob upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during upload',
    };
  }
}
