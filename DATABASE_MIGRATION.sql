-- DATABASE MIGRATION: Simplified Upload Workflow
-- Run this SQL in Supabase to update the existing schema

-- Step 1: Add new columns to uploads table
ALTER TABLE uploads
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS processed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS file_url TEXT;

-- Step 2: Make category nullable (it's no longer required for uploads)
ALTER TABLE uploads
ALTER COLUMN category DROP NOT NULL;

-- Step 3: Update checklist status to decouple from uploads
-- Add a new column to track manual assignment
ALTER TABLE client_checklist_status
ADD COLUMN IF NOT EXISTS upload_id UUID REFERENCES uploads(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Step 4: Create index for admin queries
CREATE INDEX IF NOT EXISTS idx_uploads_processed ON uploads(processed);
CREATE INDEX IF NOT EXISTS idx_uploads_upload_date ON uploads(uploaded_at);

-- Step 5: Update existing records (optional - run only if you have existing data)
-- Set processed = false for all existing uploads
UPDATE uploads SET processed = false WHERE processed IS NULL;

-- Step 6: Add comments for documentation
COMMENT ON COLUMN uploads.notes IS 'Optional client notes about the upload';
COMMENT ON COLUMN uploads.processed IS 'Admin flag: has this upload been reviewed and assigned?';
COMMENT ON COLUMN uploads.file_url IS 'OneDrive URL or path to the file';
COMMENT ON COLUMN uploads.category IS 'DEPRECATED: No longer used in new uploads. Kept for historical data.';
COMMENT ON COLUMN client_checklist_status.upload_id IS 'Admin-assigned upload that fulfills this checklist item';
COMMENT ON COLUMN client_checklist_status.admin_notes IS 'Internal admin notes about checklist completion';

-- Verification query: Check the updated schema
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'uploads'
ORDER BY ordinal_position;
