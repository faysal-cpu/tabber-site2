import { NextRequest, NextResponse } from 'next/server';
import { validateClientToken, extractTokenFromRequest } from '@/lib/validation/token-validator';
import { getClientChecklist } from '@/lib/db/checklists';

/**
 * GET /api/client/checklist
 * Get client checklist with completion status
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

    // Get checklist with status
    const checklist = await getClientChecklist(
      result.client.id,
      result.client.client_type
    );

    return NextResponse.json({
      checklist,
      clientType: result.client.client_type,
    });
  } catch (error) {
    console.error('Checklist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
