-- RLS SECURITY MIGRATION
-- Run this SQL in Supabase to enable Row Level Security
-- This provides defense-in-depth even if the anon key is exposed

-- Step 1: Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_checklist_status ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop any existing policies (in case you're re-running this)
DROP POLICY IF EXISTS "Service role has full access to clients" ON clients;
DROP POLICY IF EXISTS "Service role has full access to uploads" ON uploads;
DROP POLICY IF EXISTS "Service role has full access to checklists" ON checklists;
DROP POLICY IF EXISTS "Service role has full access to client_checklist_status" ON client_checklist_status;

-- Step 3: Create policies that ONLY allow service role access
-- This prevents the anon key from accessing any data

-- Clients table: Service role only
CREATE POLICY "Service role has full access to clients"
  ON clients
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Uploads table: Service role only
CREATE POLICY "Service role has full access to uploads"
  ON uploads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Checklists table: Service role only
CREATE POLICY "Service role has full access to checklists"
  ON checklists
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Client checklist status: Service role only
CREATE POLICY "Service role has full access to client_checklist_status"
  ON client_checklist_status
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 4: Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('clients', 'uploads', 'checklists', 'client_checklist_status');

-- Expected output: All tables should show rowsecurity = true

-- Step 5: Verify policies exist
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Expected output: Should see 4 policies (one for each table), all for service_role
