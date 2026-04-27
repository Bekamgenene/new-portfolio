import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.SUPABASE_URL;

function isAllowedUrl(url: URL) {
  if (url.origin === new URL("http://localhost").origin) {
    return false;
  }

  if (url.pathname.startsWith("/")) {
    return true;
  }

  if (!SUPABASE_URL) {
    return true;
  }

  try {
    const supabaseHost = new URL(SUPABASE_URL).hostname;
    return (
      url.hostname === supabaseHost || url.hostname.endsWith(".supabase.co")
    );
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");
  const filename =
    request.nextUrl.searchParams.get("filename") || "download.pdf";

  if (!target) {
    return NextResponse.json(
      { error: "Missing url parameter." },
      { status: 400 },
    );
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(target, request.url);
  } catch {
    return NextResponse.json(
      { error: "Invalid url parameter." },
      { status: 400 },
    );
  }

  if (!isAllowedUrl(targetUrl)) {
    return NextResponse.json({ error: "Url not allowed." }, { status: 400 });
  }

  const fileResponse = await fetch(targetUrl.toString());
  if (!fileResponse.ok || !fileResponse.body) {
    return NextResponse.json(
      { error: "Failed to fetch file." },
      { status: 502 },
    );
  }

  const contentType =
    fileResponse.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(fileResponse.body, {
    headers: {
      "content-type": contentType,
      "content-disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
      "cache-control": "no-store",
    },
  });
}
