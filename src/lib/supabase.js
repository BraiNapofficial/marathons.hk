import { createClient } from '@supabase/supabase-js'

// Read from environment variables (public for browser usage)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fail fast if env vars are missing
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase env vars. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (for local dev) and in Vercel Project Settings (for deployment).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)