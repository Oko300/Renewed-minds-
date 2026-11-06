-- ============================================================
-- Renewed Minds International — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.resources (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  filename    TEXT NOT NULL,
  file_url    TEXT NOT NULL,
  uploaded_at DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SPOTIFY LINKS TABLE
CREATE TABLE IF NOT EXISTS public.spotify_links (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  url         TEXT NOT NULL,
  embed_url   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TEAM INFO TABLE (single row, upserted on id = 1)
CREATE TABLE IF NOT EXISTS public.team_info (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  name        TEXT DEFAULT 'Jeremiah E. Chukwuike',
  title       TEXT DEFAULT 'Coordinator',
  bio         TEXT DEFAULT 'A passionate kingdom-builder and youth advocate.',
  photo       TEXT DEFAULT '/logo/founder.jpeg',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spotify_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_info ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ (public site reads these)
CREATE POLICY "Public can read resources"
  ON public.resources FOR SELECT USING (true);

CREATE POLICY "Public can read spotify_links"
  ON public.spotify_links FOR SELECT USING (true);

CREATE POLICY "Public can read team_info"
  ON public.team_info FOR SELECT USING (true);

-- Allow anon key to INSERT / UPDATE / DELETE
-- (Auth is enforced at the Next.js middleware layer via JWT)
CREATE POLICY "Anon can write resources"
  ON public.resources FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anon can write spotify_links"
  ON public.spotify_links FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anon can write team_info"
  ON public.team_info FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- SEED — default team row
-- ============================================================
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
-- STORAGE BUCKETS
-- Run these separately in Supabase SQL Editor if needed,
-- OR create them in Storage > New Bucket in the dashboard:
--   • "resources"  → Public bucket  (for PDF uploads)
--   • "logos"      → Public bucket  (for photo uploads)
-- ============================================================

-- Storage policy: allow anon to upload
-- (Set via Dashboard → Storage → Policies if SQL approach doesn't work)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read resources bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resources');

CREATE POLICY "Allow anon upload resources bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resources');

CREATE POLICY "Allow anon delete resources bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'resources');

CREATE POLICY "Allow public read logos bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');

CREATE POLICY "Allow anon upload logos bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'logos');
