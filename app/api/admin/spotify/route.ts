import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("spotify_links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { title, description, url, embedUrl } = await req.json();
    if (!title?.trim() || !url?.trim()) {
      return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
    }
    const { data, error } = await supabase
      .from("spotify_links")
      .insert({
        id: genId(),
        title: title.trim(),
        description: description?.trim() || "",
        url: url.trim(),
        embed_url: embedUrl?.trim() || "",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  } catch {
    return NextResponse.json({ error: "Failed to add link" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id, title, description, url, embedUrl } = await req.json();
    const { error } = await supabase
      .from("spotify_links")
      .update({
        title,
        description,
        url,
        embed_url: embedUrl || "",
      })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    const { error } = await supabase.from("spotify_links").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
