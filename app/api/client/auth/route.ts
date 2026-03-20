import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken, extractTokenFromRequest } from '@/lib/validation/token-validator';

/**
 * GET /api/client/auth
 * Validate client access token and return client information
 */
export async function GET(request: NextRequest) {
  try {
    // Extract token from query parameters
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    // Validate token
    const result = await validateClientToken(token);

    if (!result.valid || !result.client) {
      return NextResponse.json(
        { error: result.error || 'Invalid access token' },
        { status: 401 }
      );
    }

    // Return client information (excluding sensitive fields)
    return NextResponse.json({
      id: result.client.id,
      name: result.client.name,
      email: result.client.email,
      clientType: result.client.client_type,
      folderName: result.client.folder_name,
    });
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
