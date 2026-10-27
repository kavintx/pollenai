import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Browser-safe client: the publishable key can only insert into `waitlist` (see supabase/schema.sql).
// NEXT_PUBLIC_ values are baked in at build time, so after changing them in Vercel you must redeploy.
// Each one is referenced literally so Next.js can inline it.
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim()
const key = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || // also accept the common legacy name
  ""
).trim()

export const supabaseMissing = [!url && "NEXT_PUBLIC_SUPABASE_URL", !key && "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"].filter(
  Boolean,
) as string[]

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null
