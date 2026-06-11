import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * DELETE /api/client/delete
 * Hide file from client portal (soft delete - file remains in Azure)
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const uploadId = searchParams.get('uploadId');

    if (!token || !uploadId) {
      return NextResponse.json(
        { error: 'Missing token or uploadId' },
        { status: 400 }
      );
    }

    // Verify token and get client info
    const { data: authData, error: authError } = await supabase
      .from('client_access_tokens')
      .select('client_id, expires_at')
      .eq('token', token)
      .single();

    if (authError || !authData) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check token expiration
    if (new Date(authData.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 401 }
      );
    }

    // Verify upload ownership before deleting
    const { data: upload, error: uploadError } = await supabase
      .from('uploads')
      .select('id, client_id')
      .eq('id', uploadId)
      .eq('client_id', authData.client_id)
      .single();

    if (uploadError || !upload) {
      console.error('Upload lookup error:', uploadError);
      return NextResponse.json(
        { error: 'Upload not found or access denied' },
        { status: 404 }
      );
    }

    // Mark as deleted in database (soft delete - file stays in Azure)
    const { error: deleteError } = await supabase
      .from('uploads')
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq('id', uploadId);

    if (deleteError) {
      console.error('Failed to mark as deleted:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'File removed from portal'
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
