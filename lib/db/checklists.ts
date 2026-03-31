import { createServiceClient } from './supabase';
import type { Database } from './supabase';

type ChecklistRow = Database['public']['Tables']['checklists']['Row'];
type ChecklistStatusRow = Database['public']['Tables']['client_checklist_status']['Row'];

export interface ChecklistItemWithStatus extends ChecklistRow {
  status: string;
  lastUploadedAt: string | null;
}

/**
 * Get checklist items for a client type with their completion status
 */
export async function getClientChecklist(
  clientId: string,
  clientType: string = 'FMHC'
): Promise<ChecklistItemWithStatus[]> {
  const supabase = createServiceClient();

  // Get all checklist items for the client type
  const { data: checklistItems, error: checklistError } = await supabase
    .from('checklists')
    .select('*')
    .eq('client_type', clientType)
    .order('display_order');

  if (checklistError) {
    console.error('Error fetching checklist items:', checklistError);
    return [];
  }

  if (!checklistItems || checklistItems.length === 0) {
    return [];
  }

  // Get status for each checklist item
  const { data: statusItems, error: statusError } = await supabase
    .from('client_checklist_status')
    .select('*')
    .eq('client_id', clientId);

  if (statusError) {
    console.error('Error fetching checklist status:', statusError);
  }

  // Create a map of checklist item ID to status
  const statusMap = new Map<string, ChecklistStatusRow>();
  if (statusItems) {
    statusItems.forEach((status) => {
      statusMap.set(status.checklist_item_id, status);
    });
  }

  // Combine checklist items with their status
  const itemsWithStatus: ChecklistItemWithStatus[] = checklistItems.map((item) => {
    const status = statusMap.get(item.id);
    return {
      ...item,
      status: status?.status || 'pending',
      lastUploadedAt: status?.last_uploaded_at || null,
    };
  });

  return itemsWithStatus;
}

/**
 * ADMIN: Assign an upload to a checklist item
 * This is now a manual admin operation, not automatic
 */
export async function assignUploadToChecklistItem(
  clientId: string,
  checklistItemId: string,
  uploadId: string,
  adminNotes?: string
): Promise<boolean> {
  const supabase = createServiceClient();

  try {
    const { error } = await supabase
      .from('client_checklist_status')
      .upsert(
        {
          client_id: clientId,
          checklist_item_id: checklistItemId,
          upload_id: uploadId,
          status: 'uploaded',
          admin_notes: adminNotes || null,
          last_uploaded_at: new Date().toISOString(),
        },
        {
          onConflict: 'client_id,checklist_item_id',
        }
      );

    if (error) {
      console.error('Error assigning upload to checklist item:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in assignUploadToChecklistItem:', error);
    return false;
  }
}

/**
 * ADMIN: Mark a checklist item as complete
 */
export async function completeChecklistItem(
  clientId: string,
  checklistItemId: string,
  adminNotes?: string
): Promise<boolean> {
  const supabase = createServiceClient();

  try {
    const { error } = await supabase
      .from('client_checklist_status')
      .update({
        status: 'complete',
        completed_at: new Date().toISOString(),
        admin_notes: adminNotes || null,
      })
      .eq('client_id', clientId)
      .eq('checklist_item_id', checklistItemId);

    if (error) {
      console.error('Error completing checklist item:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in completeChecklistItem:', error);
    return false;
  }
}

/**
 * Initialize checklist status for a new client
 */
export async function initializeClientChecklist(
  clientId: string,
  clientType: string = 'FMHC'
): Promise<boolean> {
  const supabase = createServiceClient();

  try {
    // Get all checklist items for the client type
    const { data: checklistItems, error: itemsError } = await supabase
      .from('checklists')
      .select('id')
      .eq('client_type', clientType);

    if (itemsError || !checklistItems) {
      console.error('Error fetching checklist items:', itemsError);
      return false;
    }

    // Create status entries for all checklist items
    const statusEntries = checklistItems.map((item) => ({
      client_id: clientId,
      checklist_item_id: item.id,
      status: 'pending',
      last_uploaded_at: null,
    }));

    const { error: insertError } = await supabase
      .from('client_checklist_status')
      .insert(statusEntries);

    if (insertError) {
      console.error('Error initializing checklist status:', insertError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in initializeClientChecklist:', error);
    return false;
  }
}
