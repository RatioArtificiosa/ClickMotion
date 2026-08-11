# MS Admin CMS

Premium content control for products (components), genres, and collections.

## Access

- URL: `/admin`
- Login: `/admin/login`
- Dev password (when `ADMIN_PASSWORD` unset): `ms-admin-dev`
- Production: set `ADMIN_PASSWORD` (and optionally `ADMIN_SECRET` for cookie HMAC)

## What you can do

| Area | Actions |
|------|---------|
| **Products** | Create, edit, publish/unpublish, delete, **drag reorder**, upload video/poster/thumbnail; **production readiness** panel (sale gate) |
| **Original designs** | `/admin/designs` — owner vault: live demo, **client B-roll**, storefront previews, **backgrounds small encode**, cleanroom/MDX paths (internal only) |
| **Product packages** | `/admin/packages` — client delivery PDFs (golden rule), publish completeness + backgrounds small path |
| **Backgrounds** | `/admin/backgrounds` — mirror of public `/backgrounds` feed (small encodes only; role leak alerts) |
| **Genres** | Create, rename, hide/show, delete (reassigns products), **drag reorder** |
| **Collections** | Create, edit members, delete, **drag reorder** |

Public site reads `data/cms/store.json` first. Gallery order = product `sortOrder`. Product page template is shared; media is the uploaded **storefront** video (non-interactive).

## Media (roles — do not mix)

| CMS / form field | Must point at |
|------------------|---------------|
| **previewVideo** | **Storefront** capture only (`videos/storefront/` or legacy `*-preview*.mp4`) — burnt UI proof for MS |
| **poster / thumbnail** | Still for product/gallery (often from capture mid-frame or client poster) |
| Prompt body `videoBackgrounds` | **Client HD** B-roll only (`videos/client/` or legacy client paths) — never the storefront capture |

**Law:** After client HD is prepped, **do not move, rename, or edit that file in place**. Recaptures and densify write **new** paths under the correct role folder. Full vault + **future naming** (`Product-Purpose-OpaqueId[-PaidSalt]`) + grandfather table: [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) · summary in [`PRODUCT_LAW.md`](./PRODUCT_LAW.md).

**Find a file without hunting:** Admin → Original designs (`owner-designs.ts`) lists `broll` / previews / demo / prompt / `backgroundsPreview` per flagship. MDX + CMS must match.

**When taking a product to production/sale — always update Admin registries:**  
`owner-designs.ts` · `product-packages.ts` · `backgrounds.ts` (if listed on `/backgrounds`) · then verify Admin → Products / Packages / Designs / **Backgrounds**.

Upload via product form → files go to `public/uploads/` (treat as work until promoted into role folders with protocol names).

## Seed

First request seeds from MDX + taxonomy if the store is empty. Admin API `POST /api/admin/seed` with `{ "force": true }` re-imports from MDX (**overwrites** store).

## Data location

- Store: `data/cms/store.json` (gitignored)
- Uploads: `public/uploads/` (gitignored)
- Client HD / masters / storefront videos: `public/assets/videos/` (see ASSET_PIPELINE roles)
- Owner design registry: `src/lib/owner-designs.ts`

For multi-instance production, plan a shared volume or migrate this store to Supabase (schema already partially exists).
