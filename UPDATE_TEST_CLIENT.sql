-- Update the test client to use your real email address
-- Run this in Supabase SQL Editor

UPDATE clients
SET email = 'YOUR_REAL_EMAIL@outlook.com'
WHERE email = 'test@example.com';

-- Verify the update
SELECT name, email, access_token
FROM clients
WHERE name = 'Test Family';
