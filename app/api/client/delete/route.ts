import { NextResponse } from 'next/server';
import { validateClientToken } from '@/lib/validation/token-validator';
import { createServiceClient } from '@/lib/db/supabase';

/**
 * DELETE /api/client/delete
 * Delete file from client portal (removes from database, file stays in Azure)
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const uploadId = searchParams.get('uploadId');

    console.log('DELETE request received:', { token: token?.substring(0, 10) + '...', uploadId });

    if (!token || !uploadId) {
      console.error('Missing parameters:', { token: !!token, uploadId: !!uploadId });
      return NextResponse.json(
        { error: 'Missing token or uploadId' },
        { status: 400 }
      );
    }

    // Validate token using the same method as other endpoints
    const tokenResult = await validateClientToken(token);

    if (!tokenResult.valid || !tokenResult.client) {
      console.error('Token validation failed:', tokenResult.error);
      return NextResponse.json(
        { error: tokenResult.error || 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const clientId = tokenResult.client.id;
    console.log('Token validated for client:', clientId);

    const supabase = createServiceClient();

    // Verify upload ownership before deleting
    const { data: upload, error: uploadError } = await supabase
      .from('uploads')
      .select('id, client_id')
      .eq('id', uploadId)
      .eq('client_id', clientId)
      .single();

    if (uploadError || !upload) {
      console.error('Upload lookup error:', uploadError);
      return NextResponse.json(
        { error: 'Upload not found or access denied' },
        { status: 404 }
      );
    }

    // Delete from database (file stays in Azure for admin access)
    console.log('Attempting to delete upload:', uploadId);
    const { error: deleteError, data: deleteData } = await supabase
      .from('uploads')
      .delete()
      .eq('id', uploadId)
      .select();

    if (deleteError) {
      console.error('Failed to delete upload:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete file', details: deleteError.message },
        { status: 500 }
      );
    }

    console.log('Delete successful, deleted rows:', deleteData);

    return NextResponse.json({
      success: true,
      message: 'File removed from portal',
      deletedCount: deleteData?.length || 0
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
