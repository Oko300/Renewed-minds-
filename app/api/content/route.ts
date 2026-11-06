import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const [resourcesRes, spotifyRes] = await Promise.all([
      supabase
        .from("resources")
        .select("id, title, description, filename, file_url, uploaded_at")
        .order("uploaded_at", { ascending: false }),
      supabase
        .from("spotify_links")
        .select("id, title, description, url, embed_url")
        .order("created_at", { ascending: false }),
    ]);

    return NextResponse.json({
      resources: (resourcesRes.data || []).map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        filename: r.filename,
        fileUrl: r.file_url,
        uploadedAt: r.uploaded_at,
      })),
      spotify: (spotifyRes.data || []).map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        url: s.url,
        embedUrl: s.embed_url,
      })),
    });
  } catch (err) {
    console.error("Content fetch error:", err);
    return NextResponse.json({ resources: [], spotify: [] });
  }
}
