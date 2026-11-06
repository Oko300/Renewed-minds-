-- =============================================================
-- RENEWED MINDS INTERNATIONAL — Supabase Database Setup
-- Run this ONCE in your Supabase project > SQL Editor
-- =============================================================

-- 1. RESOURCES TABLE (PDF downloads)
create table if not exists resources (
  id          uuid    primary key default gen_random_uuid(),
  title       text    not null,
  description text    not null default '',
  filename    text    not null,
  file_url    text    not null,
  uploaded_at date    not null default current_date,
  created_at  timestamptz default now()
);

-- 2. SPOTIFY LINKS TABLE
create table if not exists spotify_links (
  id          uuid    primary key default gen_random_uuid(),
  title       text    not null,
  description text    not null default '',
  url         text    not null,
  embed_url   text    not null default '',
  created_at  timestamptz default now()
);

-- 3. TEAM INFO TABLE (always a single row with id=1)
create table if not exists team_info (
  id          int     primary key default 1,
  name        text    not null default 'Jeremiah E. Chukwuike',
  title       text    not null default 'Coordinator',
  bio         text    not null default '',
  photo_url   text    not null default '/logo/founder.jpeg',
  updated_at  timestamptz default now()
);

-- Seed default team row
insert into team_info (id, name, title, bio, photo_url)
values (
  1,
  'Jeremiah E. Chukwuike',
  'Coordinator',
  'A passionate kingdom-builder and youth advocate committed to building, inspiring, and positively influencing young minds to know Jesus and impact their world for good. Based at Federal University Wukari.',
  '/logo/founder.jpeg'
)
on conflict (id) do nothing;

-- =============================================================
-- ROW LEVEL SECURITY
-- (Our API routes enforce their own auth via JWT cookie,
--  so we keep Supabase RLS open for server-side operations)
-- =============================================================

alter table resources     enable row level security;
alter table spotify_links enable row level security;
alter table team_info     enable row level security;

-- Allow public SELECT (landing page reads)
create policy "public_read_resources"
  on resources for select to anon using (true);

create policy "public_read_spotify"
  on spotify_links for select to anon using (true);

create policy "public_read_team"
  on team_info for select to anon using (true);

-- Allow anon to do all writes (our API routes gate access via JWT)
create policy "anon_write_resources"
  on resources for all to anon using (true) with check (true);

create policy "anon_write_spotify"
  on spotify_links for all to anon using (true) with check (true);

create policy "anon_write_team"
  on team_info for all to anon using (true) with check (true);

-- =============================================================
-- STORAGE BUCKETS
-- =============================================================

-- Create PDF resources bucket (public so users can download)
insert into storage.buckets (id, name, public)
values ('rmi-resources', 'rmi-resources', true)
on conflict (id) do nothing;

-- Create photos bucket (public so profile photos load)
insert into storage.buckets (id, name, public)
values ('rmi-photos', 'rmi-photos', true)
on conflict (id) do nothing;

-- Allow public reads on both buckets
create policy "public_read_rmi_resources"
  on storage.objects for select to anon
  using (bucket_id = 'rmi-resources');

create policy "public_read_rmi_photos"
  on storage.objects for select to anon
  using (bucket_id = 'rmi-photos');

-- Allow anon uploads (gated by our JWT auth at the API route level)
create policy "anon_upload_rmi_resources"
  on storage.objects for insert to anon
  with check (bucket_id = 'rmi-resources');

create policy "anon_delete_rmi_resources"
  on storage.objects for delete to anon
  using (bucket_id = 'rmi-resources');

create policy "anon_upload_rmi_photos"
  on storage.objects for insert to anon
  with check (bucket_id = 'rmi-photos');

-- =============================================================
-- DONE! 
-- Your Supabase database is ready.
-- =============================================================
