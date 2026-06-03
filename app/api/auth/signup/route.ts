import { NextResponse } from "next/server";
import { createUser, startSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password || String(password).length < 6) {
    return NextResponse.json({ error: "Email and a password (6+ chars) are required." }, { status: 400 });
  }
  try {
    await createUser(String(email).toLowerCase().trim(), String(password));
    await startSession(String(email).toLowerCase().trim());
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
