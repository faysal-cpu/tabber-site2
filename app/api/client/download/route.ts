import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken } from '@/lib/validation/token-validator';
import { getUploadById } from '@/lib/db/uploads';
import { generateDownloadUrl } from '@/lib/azure/blob-storage';

/**
 * GET /api/client/download
 * Generate a temporary download URL for a client's uploaded file
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const uploadId = searchParams.get('uploadId');

    // Validate required fields
    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    if (!uploadId) {
      return NextResponse.json(
        { error: 'Upload ID is required' },
        { status: 400 }
      );
    }

    // Validate token and get client
    const tokenResult = await validateClientToken(token);

    if (!tokenResult.valid || !tokenResult.client) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 401 }
      );
    }

    const client = tokenResult.client;

    // Get upload record
    const upload = await getUploadById(uploadId);

    if (!upload) {
      return NextResponse.json(
        { error: 'Upload not found' },
        { status: 404 }
      );
    }

    // Verify the upload belongs to this client
    if (upload.client_id !== client.id) {
      return NextResponse.json(
        { error: 'Unauthorized access to this file' },
        { status: 403 }
      );
    }

    // Generate download URL with SAS token (valid for 1 hour)
    const downloadUrl = generateDownloadUrl(upload.onedrive_path, upload.original_name);

    return NextResponse.json({
      success: true,
      downloadUrl,
      filename: upload.original_name,
      expiresIn: '1 hour',
    });
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
