import { NextResponse } from "next/server";
import { isAdminAuthenticated, adminPasswordConfigured } from "@/lib/cms/auth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    authenticated,
    configured: adminPasswordConfigured(),
  });
}
