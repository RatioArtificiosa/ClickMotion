import { NextResponse } from "next/server";
import { updateProduct, getProductBySlugOrId } from "@/lib/cms/service";

/**
 * Public like toggle for product social proof.
 * - like: +1 (client also tracks per-browser via localStorage)
 * - unlike: -1 (floor 250 so social-proof baseline never collapses to zero)
 */
export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
    };
    const action = body.action === "unlike" ? "unlike" : "like";

    const current = await getProductBySlugOrId(id);
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const delta = action === "like" ? 1 : -1;
    const next = Math.max(250, Math.min(999_999, (current.likes || 250) + delta));

    const updated = await updateProduct(current.id, {
      likes: next,
      title: current.title,
    });
    return NextResponse.json({ ok: true, likes: updated.likes, action });
  } catch (e) {
    const err = e as Error & { status?: number };
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: err.status || 500 }
    );
  }
}
