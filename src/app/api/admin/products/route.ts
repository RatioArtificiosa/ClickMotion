import { withAdmin, parseJsonBody, jsonOk } from "@/lib/cms/http";
import { createProduct, listProducts } from "@/lib/cms/service";
import type { CmsProductInput } from "@/lib/cms/types";
import { isAdminAuthenticated } from "@/lib/cms/auth";

export async function GET() {
  const admin = await isAdminAuthenticated();
  const products = await listProducts({ includeUnpublished: admin });
  return jsonOk({ products });
}

export async function POST(req: Request) {
  return withAdmin(async () => {
    const body = await parseJsonBody<CmsProductInput>(req);
    if (!body.title?.trim()) {
      throw Object.assign(new Error("title is required"), { status: 400 });
    }
    const product = await createProduct(body);
    return { product };
  });
}
