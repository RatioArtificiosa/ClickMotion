import { handlers } from "@/lib/auth/config";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Harden Auth.js handlers so a misconfigured env never 500s the whole site
 * (Next.js would paint the pink "1 error" toast over demos/product pages).
 * Unauthenticated clients get an empty session; sign-in still fails closed
 * when Google OAuth keys are missing.
 */
async function safe(
  method: "GET" | "POST",
  req: NextRequest
): Promise<Response> {
  try {
    const res = await handlers[method](req);
    return res;
  } catch (err) {
    console.error("[auth] handler error:", err);
    const url = new URL(req.url);
    // Session probe must stay 200 + null so useSession does not throw.
    if (url.pathname.endsWith("/session") || url.pathname.includes("/session")) {
      return NextResponse.json(null);
    }
    if (url.pathname.includes("/providers")) {
      return NextResponse.json({});
    }
    if (url.pathname.includes("/csrf")) {
      return NextResponse.json({ csrfToken: "unavailable" });
    }
    return NextResponse.json(
      { error: "Auth temporarily unavailable" },
      { status: 503 }
    );
  }
}

export async function GET(req: NextRequest) {
  return safe("GET", req);
}

export async function POST(req: NextRequest) {
  return safe("POST", req);
}
