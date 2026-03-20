import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken } from '@/lib/validation/token-validator';
import { validateFile } from '@/lib/validation/file-validator';
import { uploadFileToBlobStorage } from '@/lib/azure/upload';
import { createUpload } from '@/lib/db/uploads';
import { sendUploadConfirmation } from '@/lib/email/send-upload-confirmation';

/**
 * POST /api/client/upload
 * Handle file upload from client portal
 * Simplified workflow: no category selection required
 */
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const token = formData.get('token') as string;
    const file = formData.get('file') as File;
    const notes = formData.get('notes') as string | null;

    // Validate required fields
    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
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

    // Validate file
    const fileValidation = validateFile(file);

    if (!fileValidation.valid) {
      return NextResponse.json(
        { error: fileValidation.error },
        { status: 400 }
      );
    }

    // Upload file to Azure Blob Storage
    const uploadResult = await uploadFileToBlobStorage(client, file);

    if (!uploadResult.success || !uploadResult.filename) {
      return NextResponse.json(
        { error: uploadResult.error || 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Create upload record in database
    const uploadRecord = await createUpload({
      clientId: client.id,
      filename: uploadResult.filename,
      originalName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      fileUrl: uploadResult.fileUrl || '',
      notes: notes || undefined,
      onedrivePath: uploadResult.blobPath,
    });

    if (!uploadRecord) {
      return NextResponse.json(
        { error: 'Failed to create upload record' },
        { status: 500 }
      );
    }

    // Send email confirmation (non-blocking)
    sendUploadConfirmation({
      clientEmail: client.email,
      clientName: client.name,
      filename: uploadResult.filename,
      fileSize: file.size,
      notes: notes || undefined,
    }).catch((error) => {
      console.error('Failed to send upload confirmation email:', error);
      // Don't fail the upload if email fails
    });

    // Return success response
    return NextResponse.json({
      success: true,
      upload: {
        id: uploadRecord.id,
        filename: uploadRecord.filename,
        originalName: uploadRecord.original_name,
        notes: uploadRecord.notes,
        uploadedAt: uploadRecord.uploaded_at,
      },
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
