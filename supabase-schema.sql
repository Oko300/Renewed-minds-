-- ============================================================
-- Renewed Minds International — Supabase Schema
-- Run this ONCE in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. RESOURCES TABLE (PDF downloads)
CREATE TABLE IF NOT EXISTS public.resources (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  filename    TEXT NOT NULL,
  file_url    TEXT NOT NULL DEFAULT '',
  storage_path TEXT NOT NULL DEFAULT '',
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SPOTIFY LINKS TABLE
CREATE TABLE IF NOT EXISTS public.spotify_links (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  url         TEXT NOT NULL,
  embed_url   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TEAM INFO TABLE (single row)
CREATE TABLE IF NOT EXISTS public.team_info (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  name        TEXT NOT NULL DEFAULT 'Jeremiah E. Chukwuike',
  title       TEXT NOT NULL DEFAULT 'Coordinator',
  bio         TEXT DEFAULT '',
  photo       TEXT DEFAULT '/logo/founder.jpeg',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default coordinator record
INSERT INTO public.team_info (id, name, title, bio, photo)
VALUES (
  1,
  'Jeremiah E. Chukwuike',
  'Coordinator',
  'A passionate kingdom-builder and youth advocate committed to building, inspiring, and positively influencing young minds to know Jesus and impact their world for good. Based at Federal University Wukari.',
  '/logo/founder.jpeg'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- DISABLE ROW LEVEL SECURITY
-- (Auth is handled by Next.js JWT middleware, not Supabase RLS)
-- ============================================================
ALTER TABLE public.resources    DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.spotify_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_info    DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- STORAGE BUCKETS
-- Run these separately if the SQL Editor supports it,
-- OR create them manually in Storage > New Bucket
-- ============================================================

-- Bucket for PDF resources (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rmi-resources',
  'rmi-resources',
  true,
  10485760,   -- 10 MB limit
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket for logo/photos (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rmi-logos',
  'rmi-logos',
  true,
  5242880,    -- 5 MB limit
  ARRAY['image/jpeg','image/png','image/webp','image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: allow all operations (server handles auth)
CREATE POLICY "Public read resources"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'rmi-resources');

CREATE POLICY "Service write resources"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'rmi-resources');

CREATE POLICY "Service delete resources"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'rmi-resources');

CREATE POLICY "Public read logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'rmi-logos');

CREATE POLICY "Service write logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'rmi-logos');

CREATE POLICY "Service delete logos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'rmi-logos');

-- ============================================================
-- DONE! Tables and buckets are ready.
-- ============================================================
