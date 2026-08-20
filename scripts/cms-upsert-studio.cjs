/**
 * Upsert MS-SEC-STUDIO01 from content/prompts/sections/MS-SEC-STUDIO01.mdx into CMS store.
 * Keeps sortOrder/likes from prior row. No Scroller + pin freeing body must match MDX.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/sections/MS-SEC-STUDIO01.mdx"),
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

const GOLD_DESC =
  "Start inside a full-bleed film. Scroll draws the camera out until that same story lights a street billboard: cinematic, continuous, unforgettable.";
const desc = get("description");
if (desc !== GOLD_DESC) {
  throw new Error("Studio description bar drifted from gold");
}
if (!desc || desc.length > 230) {
  throw new Error(`description length ${desc?.length} exceeds 230`);
}
if (desc.includes("—") || desc.includes("–")) {
  throw new Error("description has em/en dash");
}
if (!/pin-until-complete/i.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / No Scroller");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX body missing pin freeing (page owns until dock)");
}
if (!/VIRTUAL_VIEWPORTS = 4/.test(body) || !/VIRTUAL_VIEWPORTS = 3/.test(body)) {
  throw new Error("MDX missing 4 / 3 viewport earn");
}
if (/\bPSAVE\b/.test(body) && !/not PSAVE|Not PSAVE|Do not add PSAVE|no rewind|never seek/i.test(body)) {
  throw new Error("MDX teaches PSAVE as the Studio method");
}
if (/\bgsap\b/i.test(fm) || /\blenis\b/i.test(fm)) {
  throw new Error("frontmatter still lists gsap or lenis as a dependency");
}
if (/ScrollTrigger/.test(body) && !/Hard ban/.test(body)) {
  throw new Error("MDX still teaches ScrollTrigger as the method");
}
if (!get("previewVideoFullscreen") || !/studio-sequence-preview-fs-v1\.mp4/.test(get("previewVideoFullscreen"))) {
  throw new Error("MDX missing previewVideoFullscreen FS mp4");
}
if (!get("liveDemo") || !/cleanroom-studio/.test(get("liveDemo"))) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-studio");
}
if ((get("version") || "") !== "2.1.0") {
  throw new Error("Studio Platinum backend pack must stay on version 2.1.0");
}
if ((get("status") || "") !== "published") {
  throw new Error("status must be published");
}
if ((get("priceTier") || "") !== "pro") {
  throw new Error("priceTier must be pro");
}
if (!/#studio-sequence/.test(body)) {
  throw new Error("MDX missing #studio-sequence");
}
if (!/StudioSequence/.test(body)) {
  throw new Error("MDX missing StudioSequence");
}
if (!/prefers-reduced-motion|reduced-motion/i.test(body)) {
  throw new Error("MDX missing reduced-motion path");
}
if (!/studio-sequence-preview-v1\.webm/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay studio-sequence-preview-v1.webm");
}
if (!/studio-surreal-v1\.mp4/.test(body)) {
  throw new Error("MDX missing client HD studio-surreal-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-SEC-STUDIO01");
const requiredPack = [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/StudioSequence.tsx",
  "files/source/studio-data.ts",
  "files/assets/billboard-film.mp4",
  "files/assets/street-plate.png",
  "Studio-files-s7u2d1o9q4x1-p8k2m1.zip",
  "Studio-package-s7u2d1o9q4x1-p8k2m1.pdf",
];
for (const rel of requiredPack) {
  const p = path.join(packDir, rel);
  if (!fs.existsSync(p)) throw new Error("missing pack file " + rel);
}
const studioSrc = fs.readFileSync(
  path.join(packDir, "files/source/StudioSequence.tsx"),
  "utf8"
);
if (!/pageOwns/.test(studioSrc) || !/pinDocked/.test(studioSrc)) {
  throw new Error("Studio source missing pin freeing (pageOwns / pinDocked)");
}
if (!/data-product="MS-SEC-STUDIO01"/.test(studioSrc)) {
  throw new Error("Studio source missing data-product");
}
if (/position:\s*sticky/.test(studioSrc)) {
  throw new Error("Studio source still uses position:sticky");
}
if (/\bgsap\b/i.test(studioSrc) || /ScrollTrigger/.test(studioSrc)) {
  throw new Error("Studio source still teaches gsap / ScrollTrigger");
}
const leftoverBanned = [
  path.join(root, "cleanroom/studio-from-prompt/gsap-register.ts"),
  path.join(root, "cleanroom/studio-from-prompt/SmoothScroll.tsx"),
  path.join(packDir, "files/source/gsap-register.ts"),
  path.join(packDir, "files/source/SmoothScroll.tsx"),
];
for (const p of leftoverBanned) {
  if (fs.existsSync(p)) {
    throw new Error("Studio still has banned leftover " + path.basename(p));
  }
}
const packPrompt = fs.readFileSync(
  path.join(packDir, "files/PROMPT.md"),
  "utf8"
);
if (!/page owns/i.test(packPrompt) || !/docks/i.test(packPrompt)) {
  throw new Error("Studio pack PROMPT missing pin freeing");
}
if (!/four-edge cover/i.test(packPrompt) || !/smootherstep/i.test(packPrompt)) {
  throw new Error("Studio pack PROMPT missing camera design system");
}
const llms = fs.readFileSync(path.join(root, "public/llms.txt"), "utf8");
if (!/studio-sequence-camera-pull-out-billboard-section/.test(llms) || !/Studio Sequence/.test(llms)) {
  throw new Error("llms.txt must list Studio Sequence as a paid / Pro product");
}
if (/Free listings[\s\S]*Studio Sequence[\s\S]*Flagship paid/i.test(llms)) {
  throw new Error("Studio Sequence must not appear in the free listings block");
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
    "/assets/videos/studio-sequence-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: get("poster") || "/assets/posters/studio-sequence-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 14000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: {
    cursor: 5,
    lovable: 4,
    bolt: 4,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [{ name: "tailwindcss", version: "^3.4.0", required: false }],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 24,
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
