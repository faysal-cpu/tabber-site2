# 🔒 Critical Security Fix - Server-Side Token Validation

## ⚠️ Vulnerabilities Discovered

### 1. **Anon Key Used for Server-Side Operations** (CRITICAL)
**Problem:**
- All database operations were using `createClient()` which uses the **public anon key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- This key is exposed in client-side JavaScript and can be extracted by anyone
- Server-side token validation was querying the database with this public key
- Without Row Level Security (RLS), this meant anyone could query all client access tokens

**Impact:**
- Any attacker with your anon key could:
  - Query all client records: `SELECT * FROM clients`
  - Extract all access tokens
  - Access any client portal
  - View/modify all uploads, checklists, etc.

**Files Affected:**
- `lib/validation/token-validator.ts` - Token validation
- `lib/db/clients.ts` - Client queries
- `lib/db/uploads.ts` - Upload queries
- `lib/db/checklists.ts` - Checklist queries

### 2. **No Row Level Security (RLS) Policies** (CRITICAL)
**Problem:**
- No RLS policies were configured on any tables
- All data was accessible to anyone with the anon key
- Defense-in-depth security layer was missing

**Tables Without Protection:**
- `clients` - Contains access tokens and client info
- `uploads` - Contains file URLs and client uploads
- `checklists` - Checklist definitions
- `client_checklist_status` - Client progress tracking

### 3. **Tokens in URL Query Parameters** (MEDIUM RISK)
**Problem:**
- Access tokens passed as `?token=xxx` in URLs
- Exposed in browser history, server logs, referrer headers
- Can be accidentally shared via screenshots/links

**Note:** This is lower priority than issues #1 and #2, but should be addressed eventually by moving to header-based authentication.

---

## ✅ Fixes Applied

### 1. **Switched All Server-Side Operations to Service Role Key**

**Changed:**
```typescript
// ❌ BEFORE (INSECURE)
import { createClient } from './supabase';
const supabase = createClient(); // Uses public anon key

// ✅ AFTER (SECURE)
import { createServiceClient } from './supabase';
const supabase = createServiceClient(); // Uses private service role key
```

**Files Updated:**
- ✅ `lib/validation/token-validator.ts`
- ✅ `lib/db/clients.ts`
- ✅ `lib/db/uploads.ts`
- ✅ `lib/db/checklists.ts`

**Why This Works:**
- Service role key (`SUPABASE_SERVICE_ROLE_KEY`) is:
  - Only stored on the server (never exposed to clients)
  - Has admin privileges to bypass RLS
  - Cannot be extracted from client-side code
- All token validation now happens server-side with the secure key

### 2. **Created RLS Migration Script**

**File:** `RLS_SECURITY_MIGRATION.sql`

**What It Does:**
1. Enables Row Level Security on all tables
2. Creates policies that ONLY allow service_role access
3. Blocks all access via the anon key

**To Apply:**
```bash
# Go to Supabase Dashboard → SQL Editor
# Copy/paste the contents of RLS_SECURITY_MIGRATION.sql
# Run the script
# Verify output shows RLS enabled and policies created
```

**Defense in Depth:**
- Even if someone gets your anon key, they can't query any data
- Service role operations still work (your API endpoints)
- Additional security layer independent of code changes

---

## 🚀 Deployment Steps

### 1. **Apply Code Changes** (COMPLETED)
```bash
git add lib/validation/token-validator.ts
git add lib/db/clients.ts
git add lib/db/uploads.ts
git add lib/db/checklists.ts
git commit -m "Fix: Use service role key for all server-side database operations"
git push
```

### 2. **Run RLS Migration in Supabase** (ACTION REQUIRED)
1. Open Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New query**
5. Copy entire contents of `RLS_SECURITY_MIGRATION.sql`
6. Paste into editor
7. Click **Run** or press `Ctrl+Enter`
8. **Verify output:**
   - Should see "ALTER TABLE" success messages
   - Query at end should show `rowsecurity = true` for all tables
   - Policy query should show 4 policies (one per table)

### 3. **Verify Environment Variables**
Ensure your deployment (Vercel/Netlify) has:
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **Critical:** The service role key must NEVER be prefixed with `NEXT_PUBLIC_` as that would expose it to clients.

### 4. **Test After Deployment**
1. Try accessing a client portal with a valid token → Should work
2. Try accessing with an invalid token → Should fail (401)
3. Open browser console → Verify no sensitive data in network requests
4. Check Supabase logs → Verify queries are using service role

---

## 📊 Verification Checklist

After deploying:

- [ ] Code changes pushed to production
- [ ] RLS migration run in Supabase
- [ ] All tables show `rowsecurity = true` in Supabase
- [ ] Service role key is in environment variables (not prefixed with NEXT_PUBLIC_)
- [ ] Client portal access works with valid tokens
- [ ] Client portal blocks access with invalid tokens
- [ ] No database errors in application logs
- [ ] No sensitive data visible in browser network tab

---

## 🔐 Security Best Practices Going Forward

1. **Never use `createClient()` for server-side operations**
   - Always use `createServiceClient()` in API routes and server functions
   - Reserve `createClient()` only for client-side Supabase Auth (if needed)

2. **Always enable RLS on new tables**
   - Default to service_role-only policies
   - Only grant broader access when specifically needed

3. **Protect service role key**
   - Never commit to git
   - Never use NEXT_PUBLIC_ prefix
   - Rotate if ever exposed

4. **Future Enhancement: Header-Based Auth**
   - Consider moving tokens from URL params to `Authorization` headers
   - Prevents token exposure in logs/history
   - More standard REST API practice

---

## 📝 Timeline

- **Vulnerability Discovered:** 2026-03-31
- **Code Fixes Applied:** 2026-03-31
- **RLS Migration Created:** 2026-03-31
- **Status:**
  - ✅ Code fixes committed and deployed
  - ⏳ RLS migration ready to run (requires manual Supabase dashboard action)

---

## 🆘 Rollback Plan

If issues occur after deployment:

1. **If API endpoints fail:**
   ```bash
   # Check service role key is set correctly
   echo $SUPABASE_SERVICE_ROLE_KEY

   # Check for "Missing Supabase service role environment variables" errors
   # in deployment logs
   ```

2. **If RLS blocks legitimate access:**
   ```sql
   -- Temporarily disable RLS on specific table
   ALTER TABLE clients DISABLE ROW LEVEL SECURITY;

   -- Debug by checking who is querying
   SELECT * FROM pg_stat_activity WHERE state = 'active';
   ```

3. **Full rollback of RLS:**
   ```sql
   -- Only if absolutely necessary
   ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
   ALTER TABLE uploads DISABLE ROW LEVEL SECURITY;
   ALTER TABLE checklists DISABLE ROW LEVEL SECURITY;
   ALTER TABLE client_checklist_status DISABLE ROW LEVEL SECURITY;
   ```

   **Note:** This returns you to vulnerable state. Fix code issues first, then re-enable RLS.

---

## 🙏 Credits

Security issue identified and fixed on 2026-03-31.

**Lesson Learned:**
Always use service role keys for server-side database operations and implement Row Level Security as a defense-in-depth measure.
