import { createClient } from './supabase';
import type { Database } from './supabase';

type ClientRow = Database['public']['Tables']['clients']['Row'];

/**
 * Get client by access token
 */
export async function getClientByToken(token: string): Promise<ClientRow | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('access_token', token)
    .eq('active', true)
    .single();

  if (error) {
    console.error('Error fetching client by token:', error);
    return null;
  }

  return data;
}

/**
 * Get client by ID
 */
export async function getClientById(id: string): Promise<ClientRow | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('active', true)
    .single();

  if (error) {
    console.error('Error fetching client by ID:', error);
    return null;
  }

  return data;
}

/**
 * Get all active clients
 */
export async function getAllClients(): Promise<ClientRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }

  return data || [];
}
