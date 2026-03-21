import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken } from '@/lib/validation/token-validator';
import { sendBatchUploadConfirmation } from '@/lib/email/send-upload-confirmation';

export interface BatchConfirmationRequest {
  token: string;
  files: Array<{
    filename: string;
    notes?: string;
  }>;
}

/**
 * POST /api/client/send-batch-confirmation
 * Send batch upload confirmation email after all files are uploaded
 */
export async function POST(request: NextRequest) {
  try {
    const body: BatchConfirmationRequest = await request.json();
    const { token, files } = body;

    // Validate token
    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
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

    // Send batch confirmation email
    await sendBatchUploadConfirmation({
      clientEmail: client.email,
      clientName: client.name,
      files,
    });

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent',
    });
  } catch (error) {
    console.error('Batch confirmation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
