import { graphClient } from './graph-client';
import { generateFilename } from '../utils/file-naming';
import type { Database } from '../db/supabase';

type ClientRow = Database['public']['Tables']['clients']['Row'];

export interface UploadResult {
  success: boolean;
  filename?: string;
  onedrivePath?: string;
  fileUrl?: string;
  error?: string;
}

/**
 * Upload a file to OneDrive for a specific client
 * Files are stored in the client's root folder (no category subfolders)
 */
export async function uploadFileToOneDrive(
  client: ClientRow,
  file: File
): Promise<UploadResult> {
  try {
    // Generate standardized filename
    const filename = generateFilename({
      clientName: client.name,
      originalName: file.name,
    });

    // Store in client's root folder (simplified structure)
    const folderPath = `Tabber Clients/${client.folder_name}`;
    const fullPath = `${folderPath}/${filename}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload to OneDrive
    const result = await graphClient.uploadFile(fullPath, fileBuffer, file.type);

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Failed to upload file to OneDrive',
      };
    }

    // Extract web URL from response if available
    const fileUrl = result.data?.webUrl || fullPath;

    return {
      success: true,
      filename,
      onedrivePath: fullPath,
      fileUrl,
    };
  } catch (error) {
    console.error('OneDrive upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during upload',
    };
  }
}

/**
 * Ensure client folder structure exists in OneDrive
 */
export async function ensureClientFolderStructure(
  folderName: string,
  categories: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const basePath = `Tabber Clients/${folderName}`;

    // Check if base folder exists
    const baseExists = await graphClient.folderExists(basePath);

    if (!baseExists) {
      // Create base client folder
      const result = await graphClient.createFolder('Tabber Clients', folderName);
      if (!result.success) {
        return { success: false, error: 'Failed to create client folder' };
      }
    }

    // Create category folders
    for (const category of categories) {
      const categoryPath = `${basePath}/${category}`;
      const exists = await graphClient.folderExists(categoryPath);

      if (!exists) {
        const result = await graphClient.createFolder(basePath, category);
        if (!result.success) {
          console.warn(`Failed to create category folder: ${category}`);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Folder structure creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
