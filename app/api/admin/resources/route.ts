import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// GET — list resources
export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — upload PDF to Supabase Storage + save record
export async function POST(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || "";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    const id = genId();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const storagePath = `${id}-${safeFilename}`;

    // Upload to Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadErr } = await supabase.storage
      .from("rmi-resources")
      .upload(storagePath, buffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadErr) {
      console.error("Storage upload error:", uploadErr);
      return NextResponse.json({ error: `Storage error: ${uploadErr.message}` }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("rmi-resources")
      .getPublicUrl(storagePath);

    // Insert into DB
    const { data: record, error: dbErr } = await supabase
      .from("resources")
      .insert({
        id,
        title,
        description,
        filename: file.name,
        file_url: urlData.publicUrl,
        storage_path: storagePath,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbErr) {
      // Cleanup storage if DB insert fails
      await supabase.storage.from("rmi-resources").remove([storagePath]);
      return NextResponse.json({ error: dbErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, resource: record });
  } catch (err) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// DELETE — remove from Storage + DB
export async function DELETE(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    // Fetch the record first to get storage_path
    const { data: record } = await supabase
      .from("resources")
      .select("storage_path")
      .eq("id", id)
      .single();

    if (record?.storage_path) {
      await supabase.storage.from("rmi-resources").remove([record.storage_path]);
    }

    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
