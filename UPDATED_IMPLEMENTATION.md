# Client Portal - V2 Simplified Upload Workflow

## 🎯 What Changed

The client portal has been **completely redesigned** to provide a Dropbox-like upload experience. No more category selection, no more forms - just drag, drop, and upload.

### Before vs After

| Feature | V1 (Original) | V2 (Simplified) |
|---------|---------------|-----------------|
| **Category Selection** | Required dropdown | Removed entirely |
| **Upload Flow** | Select file → Choose category → Upload | Drag & drop → Upload |
| **Notes Field** | None | Optional text field |
| **File Storage** | `/Client/{Category}/file.pdf` | `/Client/file.pdf` |
| **Filename Format** | `Client_2026_Category_123.pdf` | `Client_20260321_a92f_originalname.pdf` |
| **Checklist Updates** | Automatic on upload | Manual (admin only) |
| **Database Schema** | Required category field | Optional category, new notes/processed fields |

## 📦 Files Modified

### Core Changes
- ✅ `lib/db/supabase.ts` - Updated TypeScript types for new schema
- ✅ `lib/db/uploads.ts` - Added notes, processed, file_url fields
- ✅ `lib/db/checklists.ts` - Changed to admin-controlled functions
- ✅ `lib/utils/file-naming.ts` - New filename format with date + random ID
- ✅ `lib/onedrive/upload.ts` - Upload to client root folder (no categories)
- ✅ `app/api/client/upload/route.ts` - Removed category requirement, added notes
- ✅ `lib/email/templates.ts` - Removed category, added notes display
- ✅ `components/client-portal/upload-section.tsx` - **Complete redesign** with drag-and-drop
- ✅ `components/client-portal/upload-history.tsx` - Show notes instead of categories
- ✅ `components/client-portal/checklist-section.tsx` - Made informational only
- ✅ `app/client/[clientId]/page.tsx` - Removed checklist refresh trigger

### New Files
- ✅ `DATABASE_MIGRATION.sql` - Migration script for existing databases
- ✅ `DATABASE_SCHEMA_V2.sql` - Fresh installation schema
- ✅ `SIMPLIFIED_WORKFLOW.md` - Complete documentation of new workflow

## 🚀 Quick Start

### 1. Update Database

If you already have a V1 database, run the migration:

```bash
# Run in Supabase SQL Editor
cat DATABASE_MIGRATION.sql
```

For fresh installations, use:

```bash
cat DATABASE_SCHEMA_V2.sql
```

### 2. No Code Changes Needed

All dependencies and environment variables remain the same. The changes are backward compatible.

### 3. Test the New Experience

```bash
npm run dev
# Navigate to: http://localhost:3000/client/test-client?token={token}
```

## 📋 New Upload Flow

### Client Experience

1. **Open Portal**
   - Visit secure link: `/client/{clientId}?token={token}`
   - See clean, simple interface

2. **Upload Files**
   - Drag and drop files into the large drop zone
   - OR click to browse and select
   - Files instantly show with name and size

3. **Add Optional Notes**
   - Text field appears: "Notes about this file (optional)"
   - Examples: "January caregiver hours", "Bank statement - March"
   - Helps provide context

4. **Click Upload**
   - Single button: "Upload File"
   - Progress bar shows upload status
   - Success toast: "✓ File uploaded successfully!"

5. **See Confirmation**
   - File appears in Upload History with notes
   - Email confirmation sent
   - Ready to upload next file

### Admin Experience (Future)

Admins will use a separate dashboard to:
- View all unprocessed uploads
- Read client notes for context
- Assign uploads to checklist items
- Mark items as complete
- Add internal notes

## 🗂️ Database Schema Changes

### uploads Table (NEW FIELDS)

```sql
-- New required fields
notes TEXT                    -- Client's optional notes
processed BOOLEAN DEFAULT false    -- Admin review flag
file_url TEXT                 -- OneDrive web URL

-- Deprecated fields (kept for compatibility)
category VARCHAR(100)         -- Now nullable
onedrive_path TEXT           -- Now nullable
```

### client_checklist_status Table (NEW FIELDS)

```sql
upload_id UUID               -- Admin-assigned upload
admin_notes TEXT            -- Internal notes
completed_at TIMESTAMP      -- Completion timestamp
```

## 📝 Filename Changes

### Old Format (V1)
```
SmithFamily_2026_Receipts_162345.pdf
```

### New Format (V2)
```
SmithFamily_20260321_a92f_january-receipts.pdf
```

**Components:**
- `SmithFamily` - Sanitized client name
- `20260321` - Date (YYYYMMDD)
- `a92f` - Random 4-char ID for uniqueness
- `january-receipts.pdf` - Original filename (sanitized)

**Benefits:**
- Preserves original filename for context
- Date sorting is easier
- No category in filename (flexible categorization later)

## 🔧 API Changes

### POST /api/client/upload

**Before (V1):**
```typescript
FormData {
  token: string
  file: File
  category: string  // Required!
}
```

**After (V2):**
```typescript
FormData {
  token: string
  file: File
  notes?: string    // Optional!
  // No category field
}
```

**Response (unchanged):**
```typescript
{
  success: true,
  upload: {
    id: string,
    filename: string,
    uploadedAt: string
  }
}
```

## 🎨 UI Component Changes

### Upload Section

**V1 Interface:**
```
┌─────────────────────────┐
│ Upload Document         │
├─────────────────────────┤
│ [Select File]           │
│ [Category Dropdown ▼]   │  ← Required!
│ [Upload Button]         │
└─────────────────────────┘
```

**V2 Interface:**
```
┌─────────────────────────┐
│ Upload Documents        │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │  Drag & Drop Here   │ │  ← Big, obvious
│ │  or click to browse │ │
│ └─────────────────────┘ │
│                         │
│ Notes (optional):       │  ← New!
│ [________________]      │
│                         │
│ [Upload File]           │
└─────────────────────────┘
```

### Upload History

**V1:**
```
filename.pdf
🏷️ Category Badge  •  2.4 MB  •  Mar 21
```

**V2:**
```
filename.pdf
"January caregiver hours"  ← Client notes
2.4 MB  •  Mar 21, 2026
```

## ✅ Testing Checklist

### Client Portal Tests

- [ ] Drag and drop a PDF file
- [ ] Click to browse and select a file
- [ ] Upload without adding notes (optional field works)
- [ ] Upload with notes added
- [ ] See success toast after upload
- [ ] File appears in Upload History
- [ ] Notes display correctly in history
- [ ] Email confirmation received
- [ ] Email shows notes if provided
- [ ] Checklist still displays (but doesn't change after upload)

### File Storage Tests

- [ ] Check OneDrive file location: `/Tabber Clients/{ClientName}/filename.pdf`
- [ ] Verify filename format: `ClientName_YYYYMMDD_xxxx_originalname.pdf`
- [ ] Confirm no category subfolders created
- [ ] Multiple uploads create unique filenames (random ID works)

### Database Tests

- [ ] Upload record created with notes
- [ ] `processed` field defaults to `false`
- [ ] `file_url` populated
- [ ] `category` is null (not required)
- [ ] Checklist status NOT automatically updated

## 🔐 Security (Unchanged)

All V1 security features remain:
- ✅ Token authentication (URL parameter)
- ✅ File validation (PDF, JPG, PNG, XLSX, CSV only)
- ✅ Size limit (50MB max)
- ✅ Extension blocking (.exe, .js, .sh, etc.)
- ✅ Rate limiting (20 requests/min per IP)
- ✅ HTTPS required in production

## 📧 Email Template Changes

**V1 Email:**
```
Document Name: receipt.pdf
Category: Receipts          ← Removed
File Size: 2.4 MB
Upload Date: March 21, 2026
```

**V2 Email:**
```
Document Name: receipt.pdf
File Size: 2.4 MB
Upload Date: March 21, 2026
Your Notes: January office supplies  ← New (if provided)
```

## 🎯 Benefits

### For FMHC Families
- **Faster uploads**: 2 clicks instead of 4
- **Less thinking**: No category selection
- **More context**: Can add notes about files
- **Feels familiar**: Like email attachments

### For Tabber Admins
- **Better context**: Client notes explain files
- **More control**: Manually organize later
- **Flexibility**: Assign one file to multiple categories
- **Quality**: Process uploads thoughtfully

### For Development
- **Simpler API**: Fewer required fields
- **Future-ready**: Admin dashboard can add complexity
- **Backward compatible**: Old data still works
- **Scalable**: Handles any file type without predefined categories

## 🚨 Breaking Changes

**None!** The system is backward compatible:

- Old uploads with categories still display
- Database migration is additive (no data loss)
- API endpoints maintain same routes
- Email system still works
- All security features intact

**Migration is safe and reversible.**

## 📚 Documentation

- `SIMPLIFIED_WORKFLOW.md` - Complete workflow documentation
- `DATABASE_MIGRATION.sql` - Migration script
- `DATABASE_SCHEMA_V2.sql` - Fresh install schema
- `IMPLEMENTATION_NOTES.md` - Original setup guide (still valid)

## 🛠️ Next Steps

1. **Run Database Migration**
   ```sql
   -- Copy from DATABASE_MIGRATION.sql and run in Supabase
   ```

2. **Test Locally**
   ```bash
   npm run dev
   # Test upload flow with drag-and-drop
   ```

3. **Deploy**
   ```bash
   # No new environment variables needed
   # Deploy as normal to Netlify
   ```

4. **Create Admin Dashboard** (Future)
   - View unprocessed uploads
   - Assign to checklist items
   - Add internal notes
   - Mark as complete

## 💡 Future Enhancements

- **Multi-file upload**: Upload multiple files at once
- **File preview**: Preview PDFs/images before upload
- **Admin dashboard**: Manage and organize uploads
- **Bulk actions**: Process multiple uploads together
- **Upload analytics**: Track upload patterns
- **Mobile app**: Native mobile upload experience

## 🤝 Support

For questions or issues:
- Check `SIMPLIFIED_WORKFLOW.md` for detailed workflow
- Review `DATABASE_MIGRATION.sql` for schema changes
- Test locally before deploying to production
