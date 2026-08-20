/**
 * Upsert MS-SEC-FOLI01 from content/prompts/sections/MS-SEC-FOLI01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. Pin freeing body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/sections/MS-SEC-FOLI01.mdx"),
  "utf8"
);
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) throw new Error("no frontmatter");
const fm = fmMatch[1];
const body = fmMatch[2].trim();

function get(key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"));
  return m ? m[1].replace(/^"|"$/g, "") : null;
}
function getArr(key) {
  const m = fm.match(new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`));
  if (!m) return [];
  return m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
}

const desc = get("description");
if (!desc || desc.length > 230) {
  throw new Error(`description length ${desc?.length} exceeds 230`);
}
if (desc.includes("—") || desc.includes("–")) {
  throw new Error("description has em/en dash");
}
if (!/pin-until-complete/i.test(body)) {
  throw new Error("MDX body missing pin-until-complete");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX body missing pin freeing (page owns until dock)");
}
if (!/1\.55/.test(body)) {
  throw new Error("MDX missing 1.55 viewport earn");
}
if ((get("version") || "").split(".")[0] !== "1") {
  throw new Error("Folio pack must stay on version 1.x");
}
if ((get("status") || "") !== "published") {
  throw new Error("status must be published");
}
if ((get("priceTier") || "") !== "pro") {
  throw new Error("priceTier must be pro");
}
if (!get("liveDemo") || !/cleanroom-folio/.test(get("liveDemo"))) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-folio");
}
if (!/folio-scroll-preview-v1\.mp4/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay folio-scroll-preview-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-SEC-FOLI01");
const requiredPack = [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/FolioPivotSection.tsx",
  "files/assets/folio-blurry-v1.mp4",
  "Folio-files-f0l1o9x4k7m2-fl8n3q.zip",
  "Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
];
for (const rel of requiredPack) {
  const p = path.join(packDir, rel);
  if (!fs.existsSync(p)) throw new Error("missing pack file " + rel);
}
const folioSrc = fs.readFileSync(
  path.join(packDir, "files/source/FolioPivotSection.tsx"),
  "utf8"
);
if (!/pageOwns/.test(folioSrc) || !/pinDocked/.test(folioSrc)) {
  throw new Error("Folio source missing pin freeing (pageOwns / pinDocked)");
}

const product = {
  id: get("id"),
  slug: get("slug"),
  title: get("title"),
  description: desc,
  type: get("type"),
  genreId: get("category"),
  styleTags: getArr("styleTags"),
  motionIntensity: get("motionIntensity"),
  difficulty: get("difficulty"),
  priceTier: get("priceTier"),
  status: get("status"),
  body,
  previewVideo: get("previewVideo"),
  previewVideoFullscreen:
    get("previewVideoFullscreen") ||
    "/assets/videos/folio-scroll-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/folio-scroll-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: "/assets/videos/folio-blurry-v1.mp4",
      format: "mp4",
      duration: "15s",
      loop: true,
      sizeMb: 50,
      poster: "/assets/posters/folio-scroll-preview-v1.webp",
    },
  ],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 11200),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: {
    cursor: 5,
    lovable: 4,
    bolt: 3,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [
    { name: "framer-motion", version: "^11.0.0", required: true },
    { name: "tailwindcss", version: "^3.4.0", required: true },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 8,
};

const storePath = path.join(root, "data/cms/store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
const idx = store.products.findIndex((p) => p.id === product.id);
if (idx >= 0) {
  const prev = store.products[idx];
  store.products[idx] = {
    ...prev,
    ...product,
    sortOrder: prev.sortOrder ?? product.sortOrder,
    likes: prev.likes,
    poster: prev.poster || product.poster,
  };
} else {
  store.products.push(product);
}
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log(
  "CMS",
  product.id,
  product.priceTier,
  "desc",
  product.description.length,
  "body",
  product.body.length,
  idx >= 0 ? "updated" : "added"
);
