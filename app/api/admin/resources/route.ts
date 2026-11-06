import { NextRequest, NextResponse } from "next/server";
import { checkAuthFromRequest } from "@/lib/auth";
import { supabaseAdmin, BUCKETS } from "@/lib/supabase";

// GET — list all resources
export async function GET(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — upload new PDF to Supabase Storage + save record
export async function POST(req: NextRequest) {
  if (!(await checkAuthFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";

    if (!file || !title) {
      return NextResponse.json(
        { error: "File and title are required" },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Build a safe filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const storagePath = `${timestamp}-${safeName}`;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKETS.RESOURCES)
      .upload(storagePath, fileBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get the public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKETS.RESOURCES)
      .getPublicUrl(storagePath);

    // Save record to DB
    const { data: record, error: dbError } = await supabaseAdmin
      .from("resources")
      .insert({
        title,
        description,
        filename: storagePath,
        file_url: urlData.publicUrl,
        uploaded_at: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, resource: record });
  } catch (err) {
    console.error("Upload error:", err);
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

    // Get the record first to get the filename
    const { data: record } = await supabaseAdmin
      .from("resources")
      .select("filename")
      .eq("id", id)
      .single();

    if (record?.filename) {
      // Delete from storage
      await supabaseAdmin.storage
        .from(BUCKETS.RESOURCES)
        .remove([record.filename]);
    }

    // Delete from DB
    const { error } = await supabaseAdmin
      .from("resources")
      .delete()
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
