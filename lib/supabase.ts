import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client — for browser-safe reads (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — server-side only, uses service role key (bypasses RLS)
// Falls back to anon key if service role key not set yet
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Storage bucket names
export const BUCKETS = {
  RESOURCES: "rmi-resources",
  PHOTOS: "rmi-photos",
};
