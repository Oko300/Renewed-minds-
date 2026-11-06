import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const [resourcesRes, spotifyRes, teamRes] = await Promise.all([
      supabase
        .from("resources")
        .select("*")
        .order("uploaded_at", { ascending: false }),
      supabase
        .from("spotify_links")
        .select("*")
        .order("id", { ascending: false }),
      supabase
        .from("team_info")
        .select("*")
        .eq("id", 1)
        .single(),
    ]);

    if (resourcesRes.error) console.error("resources error:", resourcesRes.error);
    if (spotifyRes.error) console.error("spotify error:", spotifyRes.error);
    if (teamRes.error) console.error("team error:", teamRes.error);

    return NextResponse.json({
      resources: resourcesRes.data ?? [],
      spotify: spotifyRes.data ?? [],
      team: teamRes.data ?? null,
    });
  } catch (err) {
    console.error("content API error:", err);
    return NextResponse.json({ resources: [], spotify: [], team: null });
  }
}
