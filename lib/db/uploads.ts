import { createClient } from './supabase';
import type { Database } from './supabase';

type UploadRow = Database['public']['Tables']['uploads']['Row'];
type UploadInsert = Database['public']['Tables']['uploads']['Insert'];

export interface CreateUploadData {
  clientId: string;
  filename: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  fileUrl: string;
  notes?: string;
  // Deprecated fields (kept for backward compatibility)
  onedrivePath?: string;
  category?: string;
}

/**
 * Create a new upload record
 */
export async function createUpload(data: CreateUploadData): Promise<UploadRow | null> {
  const supabase = createClient();

  const uploadData: UploadInsert = {
    client_id: data.clientId,
    filename: data.filename,
    original_name: data.originalName,
    file_size: data.fileSize,
    mime_type: data.mimeType,
    file_url: data.fileUrl,
    notes: data.notes || null,
    // Deprecated fields
    onedrive_path: data.onedrivePath || null,
    category: data.category || null,
  };

  const { data: upload, error } = await supabase
    .from('uploads')
    .insert(uploadData)
    .select()
    .single();

  if (error) {
    console.error('Error creating upload record:', error);
    return null;
  }

  return upload;
}

/**
 * Get uploads for a specific client
 */
export async function getClientUploads(
  clientId: string,
  limit: number = 50,
  offset: number = 0
): Promise<UploadRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('client_id', clientId)
    .order('uploaded_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching client uploads:', error);
    return [];
  }

  return data || [];
}

/**
 * Get unprocessed uploads for a client (for admin review)
 */
export async function getUnprocessedUploads(clientId: string): Promise<UploadRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('client_id', clientId)
    .eq('processed', false)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching unprocessed uploads:', error);
    return [];
  }

  return data || [];
}

/**
 * Mark an upload as processed (admin function)
 */
export async function markUploadAsProcessed(uploadId: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('uploads')
    .update({ processed: true })
    .eq('id', uploadId);

  if (error) {
    console.error('Error marking upload as processed:', error);
    return false;
  }

  return true;
}

/**
 * Get total upload count for a client
 */
export async function getClientUploadCount(clientId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from('uploads')
    .select('*', { count: 'exact', head: true })
    .eq('client_id', clientId);

  if (error) {
    console.error('Error counting uploads:', error);
    return 0;
  }

  return count || 0;
}
