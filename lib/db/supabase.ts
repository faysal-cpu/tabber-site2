import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Database types for type safety
export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          name: string;
          folder_name: string;
          email: string;
          access_token: string;
          client_type: string;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['clients']['Insert']>;
      };
      uploads: {
        Row: {
          id: string;
          client_id: string;
          filename: string;
          original_name: string;
          file_size: number;
          mime_type: string;
          file_url: string | null;
          notes: string | null;
          processed: boolean;
          uploaded_at: string;
          deleted_at: string | null;
          // Deprecated fields (kept for backward compatibility)
          category: string | null;
          onedrive_path: string | null;
        };
        Insert: Omit<Database['public']['Tables']['uploads']['Row'], 'id' | 'uploaded_at' | 'processed' | 'deleted_at'>;
        Update: Partial<Database['public']['Tables']['uploads']['Insert']> & { deleted_at?: string | null };
      };
      checklists: {
        Row: {
          id: string;
          client_type: string;
          item_name: string;
          description: string | null;
          category: string;
          required: boolean;
          display_order: number;
        };
        Insert: Omit<Database['public']['Tables']['checklists']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['checklists']['Insert']>;
      };
      client_checklist_status: {
        Row: {
          id: string;
          client_id: string;
          checklist_item_id: string;
          status: string;
          upload_id: string | null;
          admin_notes: string | null;
          last_uploaded_at: string | null;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['client_checklist_status']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['client_checklist_status']['Insert']>;
      };
    };
  };
}

// Create Supabase client
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Create Supabase client with service role key (for admin operations)
export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase service role environment variables');
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
