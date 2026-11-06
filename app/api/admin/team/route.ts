import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("team_info")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    // Return defaults if not seeded yet
    return NextResponse.json({
      coordinator: {
        name: "Jeremiah E. Chukwuike",
        title: "Coordinator",
        bio: "Kingdom builder and youth advocate.",
        photo: "/logo/founder.jpeg",
      },
    });
  }

  return NextResponse.json({
    coordinator: {
      name: data.name,
      title: data.title,
      bio: data.bio,
      photo: data.photo,
    },
  });
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const name = (formData.get("name") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const bio = (formData.get("bio") as string)?.trim();
    const photoFile = formData.get("photo") as File | null;

    // Get current photo
    const { data: current } = await supabase
      .from("team_info")
      .select("photo")
      .eq("id", 1)
      .single();

    let photoUrl = current?.photo || "/logo/founder.jpeg";

    // Upload new photo if provided
    if (photoFile && photoFile.size > 0) {
      const ext = photoFile.name.split(".").pop() || "jpg";
      const storagePath = `coordinator-${Date.now()}.${ext}`;
      const buffer = Buffer.from(await photoFile.arrayBuffer());

      const { error: uploadErr } = await supabase.storage
        .from("rmi-logos")
        .upload(storagePath, buffer, {
          contentType: photoFile.type || "image/jpeg",
          upsert: true,
        });

      if (!uploadErr) {
        const { data: urlData } = supabase.storage
          .from("rmi-logos")
          .getPublicUrl(storagePath);
        photoUrl = urlData.publicUrl;
      } else {
        console.warn("Photo upload failed:", uploadErr.message);
      }
    }

    // Upsert into team_info
    const { error } = await supabase.from("team_info").upsert({
      id: 1,
      name: name || "Jeremiah E. Chukwuike",
      title: title || "Coordinator",
      bio: bio || "",
      photo: photoUrl,
      updated_at: new Date().toISOString(),
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      success: true,
      team: { coordinator: { name, title, bio, photo: photoUrl } },
    });
  } catch (err) {
    console.error("Team update error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
