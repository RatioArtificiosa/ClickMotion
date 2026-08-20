/**
 * Upsert MS-HERO-MIRA01 from content/prompts/heroes/MS-HERO-MIRA01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. No Scroller + pin freeing body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-MIRA01.mdx"),
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
const gold =
  "For ad agencies and brand studios. Morphic liquid-glass story cards pivot on scroll over free-playing desert film - subject on the right, heat-proof craft.";
if (desc !== gold) {
  throw new Error("description bar must stay the published gold line");
}
if (!/pin-until-complete/i.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / No Scroller");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX body missing pin freeing (page owns until dock)");
}
if (!/1\.55/.test(body)) {
  throw new Error("MDX missing 1.55 viewport earn");
}
if (/\bPSAVE\b/.test(body) && !/not PSAVE|Not PSAVE|Do not add PSAVE|no rewind/i.test(body)) {
  throw new Error("MDX teaches PSAVE as the Mirage method");
}
if (/\bgsap\b/i.test(fm) || /\blenis\b/i.test(fm)) {
  throw new Error("frontmatter still lists gsap or lenis as a dependency");
}
if (/useScroll/.test(body) && !/Hard ban/.test(body)) {
  throw new Error("MDX still teaches useScroll as the method");
}
if (!get("previewVideoFullscreen") || !/mirage-scroll-preview-fs-v1\.mp4/.test(get("previewVideoFullscreen"))) {
  throw new Error("MDX missing previewVideoFullscreen FS mp4");
}
if (!get("liveDemo") || !/cleanroom-mirage/.test(get("liveDemo"))) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-mirage");
}
if ((get("version") || "").split(".")[0] !== "2") {
  throw new Error("Mirage No Scroller pack must stay on version 2.x");
}
if ((get("status") || "") !== "published") {
  throw new Error("status must be published");
}
if ((get("priceTier") || "") !== "pro") {
  throw new Error("priceTier must be pro");
}
if (!/#mirage-hero/.test(body)) {
  throw new Error("MDX missing #mirage-hero");
}
if (!/MirageAgencyHero/.test(body)) {
  throw new Error("MDX missing MirageAgencyHero");
}
if (!/prefers-reduced-motion|reduced-motion/i.test(body)) {
  throw new Error("MDX missing reduced-motion path");
}
if (!/mirage-scroll-preview-v1\.mp4/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay mirage-scroll-preview-v1.mp4");
}
if (!/mirage-desert-v1\.mp4/.test(body)) {
  throw new Error("MDX missing client HD mirage-desert-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-HERO-MIRA01");
const requiredPack = [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/MirageAgencyHero.tsx",
  "files/assets/mirage-desert-v1.mp4",
  "files/assets/mirage-desert-v1.webp",
  "Mirage-files-m1r4ge8k2n9x-mg7k3p.zip",
  "Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf",
];
for (const rel of requiredPack) {
  const p = path.join(packDir, rel);
  if (!fs.existsSync(p)) throw new Error("missing pack file " + rel);
}
const buyerSrc = fs.readFileSync(
  path.join(packDir, "files/source/MirageAgencyHero.tsx"),
  "utf8"
);
if (/position:\s*sticky/.test(buyerSrc)) {
  throw new Error("buyer source still teaches position:sticky");
}
if (/Do NOT edit Folio|Do NOT edit Triada/.test(buyerSrc)) {
  throw new Error("buyer source still leaks sibling-product operator notes");
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
    get("previewVideoFullscreen") || "/assets/videos/mirage-scroll-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/mirage-desert-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: "/assets/videos/mirage-desert-v1.mp4",
      format: "mp4",
      duration: "18s",
      loop: true,
      sizeMb: 50,
      poster: "/assets/posters/mirage-desert-v1.webp",
    },
  ],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 13000),
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
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 7,
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
