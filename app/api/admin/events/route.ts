import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabaseAdmin, BUCKETS } from "@/lib/supabase";

// GET — list all events (newest first)
export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST — create event (optional logo upload)
export async function POST(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const title = (formData.get("title") as string)?.trim() || "";
    const description = (formData.get("description") as string)?.trim() || "";
    const eventDate = (formData.get("event_date") as string)?.trim() || "";
    const location = (formData.get("location") as string)?.trim() || "";
    const logoFile = formData.get("logo") as File | null;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    let logoUrl = "";
    let storagePath = "";

    if (logoFile && logoFile.size > 0) {
      const ext = (logoFile.name.split(".").pop() || "jpg").toLowerCase();
      const allowed = ["jpg", "jpeg", "png", "webp"];
      if (!allowed.includes(ext)) {
        return NextResponse.json(
          { error: "Logo must be JPEG, PNG, or WebP" },
          { status: 400 }
        );
      }

      storagePath = `events/${id}-${Date.now()}.${ext}`;
      const buffer = await logoFile.arrayBuffer();
      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKETS.PHOTOS)
        .upload(storagePath, buffer, {
          contentType: logoFile.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
          upsert: false,
        });

      if (uploadError) {
        console.error("Event logo upload error:", uploadError);
        return NextResponse.json(
          { error: `Logo upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }

      const { data: urlData } = supabaseAdmin.storage
        .from(BUCKETS.PHOTOS)
        .getPublicUrl(storagePath);
      logoUrl = urlData.publicUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("events")
      .insert({
        id,
        title,
        description,
        event_date: eventDate,
        location,
        logo_url: logoUrl,
        storage_path: storagePath,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, event: data });
  } catch (err) {
    console.error("Create event error:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

// PUT — update event (optional new logo)
export async function PUT(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const id = (formData.get("id") as string)?.trim();
    const title = (formData.get("title") as string)?.trim() || "";
    const description = (formData.get("description") as string)?.trim() || "";
    const eventDate = (formData.get("event_date") as string)?.trim() || "";
    const location = (formData.get("location") as string)?.trim() || "";
    const logoFile = formData.get("logo") as File | null;

    if (!id || !title) {
      return NextResponse.json(
        { error: "Id and title are required" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabaseAdmin
      .from("events")
      .select("logo_url, storage_path")
      .eq("id", id)
      .single();

    let logoUrl = existing?.logo_url || "";
    let storagePath = existing?.storage_path || "";

    if (logoFile && logoFile.size > 0) {
      const ext = (logoFile.name.split(".").pop() || "jpg").toLowerCase();
      const newPath = `events/${id}-${Date.now()}.${ext}`;
      const buffer = await logoFile.arrayBuffer();

      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKETS.PHOTOS)
        .upload(newPath, buffer, {
          contentType: logoFile.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
          upsert: true,
        });

      if (!uploadError) {
        if (storagePath) {
          await supabaseAdmin.storage.from(BUCKETS.PHOTOS).remove([storagePath]);
        }
        const { data: urlData } = supabaseAdmin.storage
          .from(BUCKETS.PHOTOS)
          .getPublicUrl(newPath);
        logoUrl = urlData.publicUrl;
        storagePath = newPath;
      }
    }

    const { data, error } = await supabaseAdmin
      .from("events")
      .update({
        title,
        description,
        event_date: eventDate,
        location,
        logo_url: logoUrl,
        storage_path: storagePath,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, event: data });
  } catch (err) {
    console.error("Update event error:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// DELETE — remove event + logo from storage
export async function DELETE(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const { data: record } = await supabaseAdmin
      .from("events")
      .select("storage_path")
      .eq("id", id)
      .single();

    if (record?.storage_path) {
      await supabaseAdmin.storage
        .from(BUCKETS.PHOTOS)
        .remove([record.storage_path]);
    }

    const { error } = await supabaseAdmin.from("events").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
