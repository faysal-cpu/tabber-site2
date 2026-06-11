import { BlobServiceClient, StorageSharedKeyCredential, BlobSASPermissions, generateBlobSASQueryParameters } from '@azure/storage-blob';

/**
 * Azure Blob Storage client for file uploads
 */

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = 'client-uploads';

if (!accountName || !accountKey) {
  throw new Error('Azure Storage credentials are not configured');
}

// Create credential
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

// Create BlobServiceClient
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

// Get container client
export const containerClient = blobServiceClient.getContainerClient(containerName);

/**
 * Upload a file to Azure Blob Storage
 */
export async function uploadToBlob(
  blobName: string,
  fileBuffer: Buffer,
  contentType: string
): Promise<{ url: string; success: boolean; error?: string }> {
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
      blobHTTPHeaders: {
        blobContentType: contentType,
      },
    });

    return {
      success: true,
      url: blockBlobClient.url,
    };
  } catch (error) {
    console.error('Blob upload error:', error);
    return {
      success: false,
      url: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get blob URL
 */
export function getBlobUrl(blobName: string): string {
  return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
}

/**
 * Sanitize filename for Content-Disposition header
 * Replaces characters that can break SAS signatures
 * Uses only ASCII-safe characters
 */
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/&/g, ' and ')    // Replace & with ' and ' (with spaces)
    .replace(/[<>:"\/\\|?*#%]/g, '-')  // Replace invalid chars with dash
    .replace(/[^\x20-\x7E]/g, '')  // Remove non-ASCII characters
    .replace(/\s+/g, ' ')      // Normalize whitespace
    .replace(/\s*-\s*/g, ' - ') // Normalize dashes with spaces
    .trim();
}

/**
 * Generate a SAS URL for downloading a blob (valid for 1 hour)
 */
export function generateDownloadUrl(blobName: string, filename: string): string {
  const blobClient = containerClient.getBlobClient(blobName);

  const startsOn = new Date();
  startsOn.setMinutes(startsOn.getMinutes() - 5); // Start 5 minutes ago to account for clock skew

  const expiresOn = new Date();
  expiresOn.setHours(expiresOn.getHours() + 1); // Valid for 1 hour

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse('r'), // Read only
      startsOn,
      expiresOn,
      // Removed contentDisposition from SAS to avoid signature issues
      // File will download with the blob name instead
    },
    sharedKeyCredential
  ).toString();

  return `${blobClient.url}?${sasToken}`;
}

/**
 * Delete a blob from Azure Blob Storage
 */
export async function deleteBlob(blobName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
    return { success: true };
  } catch (error) {
    console.error('Blob delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
