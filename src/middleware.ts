import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GALLERY_VID_COOKIE,
  GALLERY_VID_HEADER,
} from "@/lib/gallery-order";

function newVisitorId(): string {
  // crypto.randomUUID is available in Edge middleware
  return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
}

/**
 * Ensure every browser has a long-lived gallery visitor id so browse order
 * can seed as browse:{UTC-day}:{visitorId} (stable within a day, new deck daily).
 */
export function middleware(req: NextRequest) {
  const existing = req.cookies.get(GALLERY_VID_COOKIE)?.value;
  const vid =
    existing && /^[a-zA-Z0-9]{8,32}$/.test(existing)
      ? existing
      : newVisitorId();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(GALLERY_VID_HEADER, vid);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!existing || existing !== vid) {
    res.cookies.set(GALLERY_VID_COOKIE, vid, {
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Browse + product pages need the visitor id on first paint.
     * Skip static assets and most APIs.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|glb|pdf|zip)$).*)",
  ],
};
