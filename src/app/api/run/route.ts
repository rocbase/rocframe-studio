import { NextResponse } from "next/server";

import { runStudioBrief, sanitizeBriefInput } from "@/lib/studio";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const brief = sanitizeBriefInput(body as Parameters<typeof sanitizeBriefInput>[0]);
  const result = runStudioBrief(brief);

  return NextResponse.json(result);
}
