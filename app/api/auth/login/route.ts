import { NextResponse } from "next/server";
import { checkUser, startSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  const e = String(email || "").toLowerCase().trim();
  if (!(await checkUser(e, String(password || "")))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }
  await startSession(e);
  return NextResponse.json({ ok: true });
}
