import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Server-side: use service role key for full access (bypasses RLS)
// Falls back to anon key if service role not set yet
const serverKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Server-side Supabase client — full permissions */
export const supabase = createClient(supabaseUrl, serverKey, {
  auth: { persistSession: false },
});

/** Browser-safe Supabase client — anon permissions */
export const supabaseBrowser = createClient(supabaseUrl, anonKey);

// ── Type definitions matching the DB schema ──────────────────

export interface DbResource {
  id: string;
  title: string;
  description: string;
  filename: string;
  file_url: string;
  storage_path: string;
  uploaded_at: string;
}

export interface DbSpotifyLink {
  id: string;
  title: string;
  description: string;
  url: string;
  embed_url: string;
  created_at: string;
}

export interface DbTeamInfo {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo: string;
  updated_at: string;
}
