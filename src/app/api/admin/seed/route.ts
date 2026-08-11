import { withAdmin } from "@/lib/cms/http";
import { ensureCmsSeeded } from "@/lib/cms/seed";

/** Re-seed from MDX/taxonomy. force=true overwrites empty-only by default; body.force overwrites all. */
export async function POST(req: Request) {
  return withAdmin(async () => {
    let force = false;
    try {
      const body = (await req.json()) as { force?: boolean };
      force = Boolean(body.force);
    } catch {
      /* empty */
    }
    const store = await ensureCmsSeeded(force);
    return {
      ok: true,
      force,
      counts: {
        genres: store.genres.length,
        products: store.products.length,
        collections: store.collections.length,
      },
      seededAt: store.seededAt,
    };
  });
}
