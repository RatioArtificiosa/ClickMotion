import { withAdmin, parseJsonBody, jsonOk } from "@/lib/cms/http";
import { createCollection, listCollections } from "@/lib/cms/service";
import type { CmsCollectionInput } from "@/lib/cms/types";
import { isAdminAuthenticated } from "@/lib/cms/auth";

export async function GET() {
  const admin = await isAdminAuthenticated();
  const collections = await listCollections(admin);
  return jsonOk({ collections });
}

export async function POST(req: Request) {
  return withAdmin(async () => {
    const body = await parseJsonBody<CmsCollectionInput>(req);
    if (!body.title?.trim()) {
      throw Object.assign(new Error("title is required"), { status: 400 });
    }
    const collection = await createCollection(body);
    return { collection };
  });
}
