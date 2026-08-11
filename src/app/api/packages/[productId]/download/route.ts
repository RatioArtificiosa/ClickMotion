import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { auth } from "@/lib/auth/config";
import { packageByProductId } from "@/lib/product-packages";
import {
  ensureMember,
  evaluatePackageAccess,
  getMember,
  recordPackageDownload,
} from "@/lib/members/store";
import { getCmsStore } from "@/lib/cms/service";

export const dynamic = "force-dynamic";

/**
 * Member package PDF download.
 * Enforces free vs paid product access + silent quotas (not shown on marketing site).
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ productId: string }> }
) {
  const { productId } = await ctx.params;
  const session = await auth();
  const email = session?.user?.email?.toLowerCase().trim();

  if (!email) {
    return NextResponse.json(
      { error: "Sign in required", code: "SIGN_IN_REQUIRED" },
      { status: 401 }
    );
  }

  const pack = packageByProductId(productId);
  if (!pack?.pdfHref || !pack.checklist.packagePdf) {
    return NextResponse.json(
      { error: "Package not available", code: "NO_PACKAGE" },
      { status: 404 }
    );
  }

  // Product free/paid from CMS when present, else package registry tier
  let productIsFree = pack.tier === "free";
  try {
    const store = await getCmsStore();
    const cms = store.products.find((p) => p.id === productId);
    if (cms) productIsFree = cms.priceTier === "free";
  } catch {
    /* use pack tier */
  }

  let member = await getMember(email);
  if (!member) {
    member = await ensureMember({
      email,
      name: session?.user?.name ?? undefined,
      image: session?.user?.image ?? undefined,
    });
  }

  const access = evaluatePackageAccess(member, productIsFree);
  if (!access.ok) {
    const status =
      access.code === "PAID_REQUIRED"
        ? 402
        : access.code === "QUOTA"
          ? 429
          : 403;
    return NextResponse.json(
      { error: access.message, code: access.code },
      { status }
    );
  }

  const rel = pack.pdfHref.replace(/^\//, "");
  const abs = path.join(process.cwd(), "public", rel);
  let buf: Buffer;
  try {
    buf = await fs.readFile(abs);
  } catch {
    return NextResponse.json(
      { error: "Package file missing", code: "NO_PACKAGE" },
      { status: 404 }
    );
  }

  await recordPackageDownload(email, productId);

  const filename = path.basename(abs);
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
