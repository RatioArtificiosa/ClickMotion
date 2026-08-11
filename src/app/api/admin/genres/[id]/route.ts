import { withAdmin, parseJsonBody } from "@/lib/cms/http";
import { deleteGenre, updateGenre } from "@/lib/cms/service";
import type { CmsGenreInput } from "@/lib/cms/types";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  return withAdmin(async () => {
    const body = await parseJsonBody<Partial<CmsGenreInput>>(req);
    const genre = await updateGenre(id, body);
    return { genre };
  });
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  return withAdmin(async () => {
    let reassignTo: string | undefined;
    try {
      const body = (await req.json()) as { reassignTo?: string };
      reassignTo = body.reassignTo;
    } catch {
      /* no body */
    }
    await deleteGenre(id, reassignTo);
    return { ok: true };
  });
}
