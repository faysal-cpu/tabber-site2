import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken, extractTokenFromRequest } from '@/lib/validation/token-validator';

/**
 * GET /api/client/profile
 * Get client profile information
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

    // Return client profile (excluding sensitive data)
    return NextResponse.json({
      name: result.client.name,
      email: result.client.email,
      clientType: result.client.client_type,
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
