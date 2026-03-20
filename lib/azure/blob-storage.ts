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
 * Generate a SAS URL for downloading a blob (valid for 1 hour)
 */
export function generateDownloadUrl(blobName: string): string {
  const blobClient = containerClient.getBlobClient(blobName);

  const expiresOn = new Date();
  expiresOn.setHours(expiresOn.getHours() + 1); // Valid for 1 hour

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse('r'), // Read only
      expiresOn,
    },
    sharedKeyCredential
  ).toString();

  return `${blobClient.url}?${sasToken}`;
}
