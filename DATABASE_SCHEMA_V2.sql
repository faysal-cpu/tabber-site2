-- FRESH INSTALLATION SCHEMA (Version 2 - Simplified Upload Workflow)
-- Use this if you're setting up the database from scratch

-- Clients table (unchanged)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  folder_name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  access_token VARCHAR(255) NOT NULL UNIQUE,
  client_type VARCHAR(50) DEFAULT 'FMHC',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_clients_access_token ON clients(access_token);

-- Uploads table (NEW VERSION - simplified)
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  filename VARCHAR(500) NOT NULL,
  original_name VARCHAR(500) NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_url TEXT,
  notes TEXT,
  processed BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Category kept nullable for backward compatibility but no longer required
  category VARCHAR(100),
  onedrive_path TEXT,

  CONSTRAINT chk_file_size CHECK (file_size > 0 AND file_size <= 52428800)
);

CREATE INDEX idx_uploads_client_id ON uploads(client_id);
CREATE INDEX idx_uploads_processed ON uploads(processed);
CREATE INDEX idx_uploads_upload_date ON uploads(uploaded_at);

COMMENT ON TABLE uploads IS 'Client file uploads - no category required';
COMMENT ON COLUMN uploads.notes IS 'Optional client notes about the upload';
COMMENT ON COLUMN uploads.processed IS 'Admin flag: has this upload been reviewed?';
COMMENT ON COLUMN uploads.file_url IS 'OneDrive URL or path to the file';
COMMENT ON COLUMN uploads.category IS 'DEPRECATED: Optional, kept for backward compatibility';

-- Checklists table (unchanged - informational only)
CREATE TABLE checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_type VARCHAR(50) NOT NULL DEFAULT 'FMHC',
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  required BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

COMMENT ON TABLE checklists IS 'Template checklist items - informational only, not linked to uploads';

-- Client checklist status table (UPDATED - admin controlled)
CREATE TABLE client_checklist_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  checklist_item_id UUID NOT NULL REFERENCES checklists(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
  upload_id UUID REFERENCES uploads(id) ON DELETE SET NULL,
  admin_notes TEXT,
  last_uploaded_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT unique_client_checklist UNIQUE (client_id, checklist_item_id)
);

COMMENT ON TABLE client_checklist_status IS 'Checklist status - admin assigns uploads to items manually';
COMMENT ON COLUMN client_checklist_status.upload_id IS 'Admin-assigned upload that fulfills this checklist item';
COMMENT ON COLUMN client_checklist_status.admin_notes IS 'Internal admin notes';

-- Seed default FMHC checklist items
INSERT INTO checklists (client_type, item_name, description, category, display_order) VALUES
  ('FMHC', 'Monthly Bank Statements', 'Upload bank statements for all business accounts', 'Bank Statements', 1),
  ('FMHC', 'Expense Receipts', 'All business-related receipts and invoices', 'Receipts', 2),
  ('FMHC', 'Payroll Records', 'Employee timesheets and payroll summaries', 'Payroll', 3),
  ('FMHC', 'CRA Correspondence', 'Any letters or notices from CRA', 'CRA', 4);

-- Example: Create a test client
INSERT INTO clients (name, folder_name, email, access_token, client_type, active)
VALUES (
  'Test Family',
  'TestFamily',
  'test@example.com',
  'test-token-' || gen_random_uuid()::text,
  'FMHC',
  true
);
