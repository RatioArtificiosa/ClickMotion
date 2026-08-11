import { withAdmin, parseJsonBody } from "@/lib/cms/http";
import { deleteProduct, updateProduct } from "@/lib/cms/service";
import type { CmsProductInput } from "@/lib/cms/types";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  return withAdmin(async () => {
    const body = await parseJsonBody<Partial<CmsProductInput>>(req);
    const product = await updateProduct(id, body);
    return { product };
  });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  return withAdmin(async () => {
    await deleteProduct(id);
    return { ok: true };
  });
}
