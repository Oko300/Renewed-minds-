import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET
export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("spotify_links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — add new Spotify link
export async function POST(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, url, embed_url } = await req.json();
    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and URL are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("spotify_links")
      .insert({ title, description: description || "", url, embed_url: embed_url || "" })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, item: data });
  } catch {
    return NextResponse.json({ error: "Failed to add link" }, { status: 500 });
  }
}

// PUT — update a Spotify link
export async function PUT(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, description, url, embed_url } = await req.json();
    const { error } = await supabaseAdmin
      .from("spotify_links")
      .update({ title, description, url, embed_url })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const { error } = await supabaseAdmin
      .from("spotify_links")
      .delete()
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
