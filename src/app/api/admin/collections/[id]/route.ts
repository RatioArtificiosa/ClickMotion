import { withAdmin, parseJsonBody } from "@/lib/cms/http";
import { deleteCollection, updateCollection } from "@/lib/cms/service";
import type { CmsCollectionInput } from "@/lib/cms/types";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  return withAdmin(async () => {
    const body = await parseJsonBody<Partial<CmsCollectionInput>>(req);
    const collection = await updateCollection(id, body);
    return { collection };
  });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  return withAdmin(async () => {
    await deleteCollection(id);
    return { ok: true };
  });
}
