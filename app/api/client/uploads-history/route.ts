import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken, extractTokenFromRequest } from '@/lib/validation/token-validator';
import { getClientUploads, getClientUploadCount } from '@/lib/db/uploads';

/**
 * GET /api/client/uploads-history
 * Get client upload history with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    const result = await validateClientToken(token);

    if (!result.valid || !result.client) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 401 }
      );
    }

    // Get pagination parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Get uploads and total count
    const [uploads, totalCount] = await Promise.all([
      getClientUploads(result.client.id, limit, offset),
      getClientUploadCount(result.client.id),
    ]);

    return NextResponse.json({
      uploads,
      pagination: {
        limit,
        offset,
        total: totalCount,
        hasMore: offset + limit < totalCount,
      },
    });
  } catch (error) {
    console.error('Uploads history API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
