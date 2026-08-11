import { NextResponse } from "next/server";
import {
  adminPasswordConfigured,
  setAdminSessionCookie,
  verifyPassword,
} from "@/lib/cms/auth";

export async function POST(req: Request) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json(
      { error: "Set ADMIN_PASSWORD in the environment before using admin." },
      { status: 503 }
    );
  }
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password = String(body.password ?? "");
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  await setAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
