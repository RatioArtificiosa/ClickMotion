import { withAdmin, parseJsonBody, jsonOk } from "@/lib/cms/http";
import { createGenre, listGenres } from "@/lib/cms/service";
import type { CmsGenreInput } from "@/lib/cms/types";
import { isAdminAuthenticated } from "@/lib/cms/auth";

export async function GET() {
  const admin = await isAdminAuthenticated();
  const genres = await listGenres(admin);
  return jsonOk({ genres });
}

export async function POST(req: Request) {
  return withAdmin(async () => {
    const body = await parseJsonBody<CmsGenreInput>(req);
    if (!body.label?.trim()) {
      throw Object.assign(new Error("label is required"), { status: 400 });
    }
    const genre = await createGenre(body);
    return { genre };
  });
}
