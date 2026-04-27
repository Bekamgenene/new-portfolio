import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET || "portfolio-assets";

function sanitizeSegment(value: string) {
  return value
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        error:
          "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.",
      },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "uploads");
  const assetType = String(formData.get("assetType") || "image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  const isImage = assetType === "image";
  const isPdf = assetType === "pdf";

  if (isImage && !file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Please upload an image file." },
      { status: 400 },
    );
  }

  if (isPdf && file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Please upload a PDF file." },
      { status: 400 },
    );
  }

  const fileExtension = file.name.includes(".")
    ? file.name.split(".").pop()
    : "";
  const safeFolder = sanitizeSegment(folder) || "uploads";
  const safeName = `${Date.now()}-${crypto.randomUUID()}${fileExtension ? `.${sanitizeSegment(fileExtension)}` : ""}`;
  const storagePath = `${safeFolder}/${safeName}`;

  const uploadResponse = await fetch(
    `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/${SUPABASE_STORAGE_BUCKET}/${storagePath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: await file.arrayBuffer(),
    },
  );

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    return NextResponse.json(
      { error: `Upload failed: ${errorText}` },
      { status: uploadResponse.status },
    );
  }

  const publicUrl = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${storagePath}`;

  return NextResponse.json({
    url: publicUrl,
    path: storagePath,
    bucket: SUPABASE_STORAGE_BUCKET,
  });
}
