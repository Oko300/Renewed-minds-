import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabaseAdmin, BUCKETS } from "@/lib/supabase";

interface TeamRow {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo_url: string;
}

// GET team info
export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("team_info")
    .select("*")
    .eq("id", 1)
    .returns<TeamRow>()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT — update team/coordinator info + optional photo
export async function PUT(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name     = (formData.get("name")  as string) || "";
    const title    = (formData.get("title") as string) || "";
    const bio      = (formData.get("bio")   as string) || "";
    const photoFile = formData.get("photo") as File | null;

    // Get current row so we keep existing values when fields are blank
    const { data: current } = await supabaseAdmin
      .from("team_info")
      .select("name, title, bio, photo_url")
      .eq("id", 1)
      .returns<Pick<TeamRow, "name" | "title" | "bio" | "photo_url">>()
      .single();

    let photoUrl: string = current?.photo_url ?? "/logo/founder.jpeg";

    // Handle photo upload to Supabase Storage
    if (photoFile && photoFile.size > 0) {
      const ext = photoFile.name.split(".").pop() || "jpg";
      const storagePath = `coordinator-${Date.now()}.${ext}`;

      const buffer = await photoFile.arrayBuffer();
      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKETS.PHOTOS)
        .upload(storagePath, buffer, {
          contentType: photoFile.type || "image/jpeg",
          upsert: true,
        });

      if (!uploadError) {
        const { data: urlData } = supabaseAdmin.storage
          .from(BUCKETS.PHOTOS)
          .getPublicUrl(storagePath);
        photoUrl = urlData.publicUrl;
      } else {
        console.error("Photo upload error:", uploadError.message);
      }
    }

    // Update DB
    const { data, error } = await supabaseAdmin
      .from("team_info")
      .update({
        name:      name  || current?.name  || "",
        title:     title || current?.title || "",
        bio:       bio   || current?.bio   || "",
        photo_url: photoUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .returns<TeamRow>()
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, team: data });
  } catch (err) {
    console.error("Team update error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
