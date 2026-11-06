import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const [resourcesRes, spotifyRes, teamRes] = await Promise.all([
      supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("spotify_links")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("team_info")
        .select("*")
        .eq("id", 1)
        .single(),
    ]);

    return NextResponse.json({
      resources: resourcesRes.data ?? [],
      spotify: spotifyRes.data ?? [],
      team: teamRes.data ?? null,
    });
  } catch {
    return NextResponse.json({ resources: [], spotify: [], team: null });
  }
}
