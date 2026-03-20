import { createClient } from '../db/supabase';
import type { Database } from '../db/supabase';

type ClientRow = Database['public']['Tables']['clients']['Row'];

export interface TokenValidationResult {
  valid: boolean;
  client?: ClientRow;
  error?: string;
}

/**
 * Validate a client access token
 */
export async function validateClientToken(token: string): Promise<TokenValidationResult> {
  if (!token || token.trim() === '') {
    return {
      valid: false,
      error: 'Access token is required',
    };
  }

  try {
    const supabase = createClient();

    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('access_token', token)
      .eq('active', true)
      .single();

    if (error || !client) {
      return {
        valid: false,
        error: 'Invalid or expired access token',
      };
    }

    return {
      valid: true,
      client,
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return {
      valid: false,
      error: 'Failed to validate access token',
    };
  }
}

/**
 * Extract token from request URL search params
 */
export function extractTokenFromRequest(request: Request): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get('token');
}
