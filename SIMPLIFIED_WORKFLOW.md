# Simplified Client Upload Workflow

## Overview

The client portal has been redesigned to provide a **Dropbox-like upload experience** where clients can quickly upload documents without categorization or form-filling.

## Key Changes from V1

### CLIENT EXPERIENCE

**Before (V1):**
- Select file
- Choose category from dropdown
- Upload
- Checklist auto-updates

**After (V2 - Current):**
- Drag and drop file (or click to browse)
- Add optional notes
- Upload
- Done

### WHAT CLIENTS SEE

1. **Upload Area** (Primary Interface)
   - Large drag-and-drop zone
   - Optional notes field: "Notes about this file (optional)"
   - Single "Upload File" button
   - No category selection
   - No forms

2. **Upload History**
   - Lists all uploaded files
   - Shows optional notes if provided
   - Displays file size and upload date
   - No category badges

3. **Checklist** (Informational Only)
   - Still visible for reference
   - Shows document requirements
   - NOT linked to uploads
   - Admins update this manually

## Backend Architecture

### Database Schema (V2)

**uploads table:**
```sql
- id (UUID)
- client_id (UUID)
- filename (VARCHAR) -- Generated name
- original_name (VARCHAR) -- Client's filename
- file_size (BIGINT)
- mime_type (VARCHAR)
- file_url (TEXT) -- OneDrive URL
- notes (TEXT) -- Client's optional notes
- processed (BOOLEAN) -- Admin flag
- uploaded_at (TIMESTAMP)

-- Deprecated but kept for backward compatibility:
- category (VARCHAR) -- Nullable
- onedrive_path (TEXT) -- Nullable
```

**client_checklist_status table:**
```sql
- id (UUID)
- client_id (UUID)
- checklist_item_id (UUID)
- status (VARCHAR) -- pending | uploaded | complete
- upload_id (UUID) -- Admin-assigned upload
- admin_notes (TEXT) -- Internal notes
- last_uploaded_at (TIMESTAMP)
- completed_at (TIMESTAMP)
```

### File Storage

**OneDrive Structure:**
```
Tabber Clients/
└── {ClientFolderName}/
    ├── SmithFamily_20260321_a92f_payroll-hours.pdf
    ├── SmithFamily_20260321_b3k2_bank-statement.pdf
    └── SmithFamily_20260322_x7n1_receipt.jpg
```

**Filename Format:**
```
{ClientName}_{YYYYMMDD}_{randomID}_{originalfilename}
```

Examples:
- `SmithFamily_20260321_a92f_payroll-hours.pdf`
- `JohnsonFamily_20260322_k9m3_january-receipts.xlsx`

### Upload Flow

1. Client drags/drops file or clicks to browse
2. (Optional) Client adds notes: "January caregiver hours"
3. Client clicks "Upload File"
4. System validates file (type, size, extension)
5. File uploads to OneDrive (client root folder)
6. Database record created with:
   - Generated filename
   - Original filename
   - File URL
   - Notes
   - `processed = false` (for admin review)
7. Email confirmation sent to client
8. File appears in Upload History

**No automatic checklist updates**

## Admin Workflow (Future Dashboard)

The admin dashboard will allow:

1. **View All Uploads**
   - Filter by client
   - Filter by processed/unprocessed
   - See client notes
   - Preview files

2. **Assign Uploads to Checklist Items**
   - Drag upload to checklist item
   - Or select from dropdown
   - Add internal notes
   - Mark as processed

3. **Mark Checklist Items Complete**
   - When all requirements met
   - Add completion notes
   - Client sees status update

4. **Manage Unprocessed Uploads**
   - Queue of uploads needing review
   - Assign to checklist or mark as misc
   - Download/preview files

## Database Functions

### Client Functions (Existing)
```typescript
// lib/db/uploads.ts
createUpload(data) // Create upload record
getClientUploads(clientId, limit, offset) // Get paginated uploads
getClientUploadCount(clientId) // Count total uploads
```

### Admin Functions (New)
```typescript
// lib/db/uploads.ts
getUnprocessedUploads(clientId) // Get uploads needing review
markUploadAsProcessed(uploadId) // Mark as reviewed

// lib/db/checklists.ts
assignUploadToChecklistItem(clientId, checklistItemId, uploadId, notes)
completeChecklistItem(clientId, checklistItemId, notes)
```

## Migration from V1 to V2

If you have existing data from V1, run this migration:

```sql
-- Add new columns
ALTER TABLE uploads
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS processed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS file_url TEXT;

-- Make category nullable
ALTER TABLE uploads
ALTER COLUMN category DROP NOT NULL;

-- Update checklist status table
ALTER TABLE client_checklist_status
ADD COLUMN IF NOT EXISTS upload_id UUID REFERENCES uploads(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Mark existing uploads as processed (optional)
UPDATE uploads SET processed = false WHERE processed IS NULL;
```

## API Endpoints

### Client Endpoints

**POST /api/client/upload**
```typescript
// Request (FormData)
{
  token: string,
  file: File,
  notes?: string  // Optional
}

// Response
{
  success: true,
  upload: {
    id: string,
    filename: string,
    originalName: string,
    notes: string | null,
    uploadedAt: string
  },
  message: "File uploaded successfully"
}
```

**GET /api/client/uploads-history?token={token}**
```typescript
// Response
{
  uploads: [
    {
      id: string,
      filename: string,
      original_name: string,
      file_size: number,
      uploaded_at: string,
      notes: string | null,
      processed: boolean
    }
  ],
  pagination: {
    limit: number,
    offset: number,
    total: number,
    hasMore: boolean
  }
}
```

## Security (Unchanged)

All existing security features remain:
- ✅ Token authentication
- ✅ File type validation (PDF, JPG, PNG, XLSX, CSV)
- ✅ File size limit (50MB)
- ✅ Blocked extensions (.exe, .js, .sh, etc.)
- ✅ Rate limiting (20 requests/min per IP)

## Email Notifications

**Upload Confirmation Email:**
```
Subject: Document Upload Confirmation

✓ Document Uploaded Successfully

Hello {ClientName},

Your document has been successfully uploaded.

UPLOAD DETAILS:
- Document Name: january-receipts.pdf
- File Size: 2.4 MB
- Upload Date: March 21, 2026 at 2:30 PM
- Your Notes: January caregiver hours

Your document has been securely stored and our team will process it shortly.
```

## Benefits of Simplified Workflow

### For Clients
- **Faster**: No category selection needed
- **Simpler**: Like sending an email attachment
- **Flexible**: Optional notes for context
- **Less friction**: Upload in 2 clicks

### For Admins
- **Better control**: Manually organize uploads
- **More context**: Client notes provide intent
- **Flexibility**: Assign uploads to multiple items if needed
- **Audit trail**: Track who assigned what and when

### For Business
- **Higher adoption**: Simpler UX = more usage
- **Better data**: Client notes provide context
- **Scalability**: Admin dashboard can handle complexity
- **Professional**: Feels modern and user-friendly

## Testing the New Workflow

1. Navigate to portal: `/client/{clientId}?token={token}`
2. See simplified upload area with drag-and-drop
3. Drop a file or click to browse
4. (Optional) Add notes: "January payroll"
5. Click "Upload File"
6. See success toast
7. File appears in Upload History with notes
8. Receive email confirmation
9. Check OneDrive for file with new naming format

## Backward Compatibility

The system maintains backward compatibility:
- Old uploads with categories still display correctly
- Database keeps category and onedrive_path columns
- Admins can still see historical category assignments
- No data loss during migration
