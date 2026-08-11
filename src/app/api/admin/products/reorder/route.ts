import { withAdmin, parseJsonBody } from "@/lib/cms/http";
import { reorderProducts } from "@/lib/cms/service";

export async function POST(req: Request) {
  return withAdmin(async () => {
    const body = await parseJsonBody<{ orderedIds?: string[] }>(req);
    if (!Array.isArray(body.orderedIds)) {
      throw Object.assign(new Error("orderedIds array required"), { status: 400 });
    }
    const products = await reorderProducts(body.orderedIds.map(String));
    return { products };
  });
}
