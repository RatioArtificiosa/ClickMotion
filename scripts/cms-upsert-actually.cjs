/**
 * Upsert MS-HERO-ACTU01 from content/prompts/heroes/MS-HERO-ACTU01.mdx.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-ACTU01.mdx"),
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
  "Your product becomes the stage: a living 3D object, a pointer that opens a window into the brand, and scroll that reveals all, your product and presentation - restage it for any offer.";
const desc = get("description");
if (desc !== GOLD_DESC) throw new Error("Actually description bar drifted from gold");
if (!desc || desc.length > 230) throw new Error(`description length ${desc?.length}`);
if (desc.includes("—") || desc.includes("–")) throw new Error("description has em/en dash");
if (!/pin-until-complete/i.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX missing No Scroller");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX missing pin freeing");
}
if (!/Responsive Behavior/.test(body) || !/Accessibility/.test(body)) {
  throw new Error("MDX missing Responsive / Accessibility sections");
}
if (/\blenis\b/i.test(fm)) throw new Error("frontmatter still lists lenis");
if ((get("version") || "") !== "2.1.0") {
  throw new Error("Actually Platinum backend pack must stay on version 2.1.0");
}
if ((get("status") || "") !== "published") throw new Error("status must be published");
if ((get("priceTier") || "") !== "pro") throw new Error("priceTier must be pro");
if (!/actually-hero-preview-v1\.mp4/.test(get("previewVideo") || "")) {
  throw new Error("preview must stay actually-hero-preview-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-HERO-ACTU01");
for (const rel of [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/ActuallyHero.tsx",
  "files/assets/can.glb",
  "Actually-files-a9ct7u4l2y1x-r5m4x9.zip",
  "Actually-package-a9ct7u4l2y1x-r5m4x9.pdf",
]) {
  if (!fs.existsSync(path.join(packDir, rel))) throw new Error("missing " + rel);
}

const promptMd = fs.readFileSync(
  path.join(packDir, "files/PROMPT.md"),
  "utf8"
);
if (!/page owns/i.test(promptMd) || !/docks/i.test(promptMd)) {
  throw new Error("pack PROMPT missing pin freeing");
}
if (promptMd.split(/\r?\n/).length < 120) {
  throw new Error("pack PROMPT too thin for Platinum");
}
if (/scroll pin scrub/i.test(promptMd)) {
  throw new Error("pack PROMPT still teaches scroll pin scrub");
}

const src = fs.readFileSync(path.join(packDir, "files/source/ActuallyHero.tsx"), "utf8");
if (!/pageOwns/.test(src) || !/pinDocked/.test(src)) {
  throw new Error("ActuallyHero missing pin freeing");
}
if (/from ["']gsap\/ScrollTrigger["']/.test(src) || /ScrollTrigger\.create/.test(src)) {
  throw new Error("ActuallyHero still pins with ScrollTrigger");
}

const leftoverBanned = [
  path.join(packDir, "files/source/SmoothScroll.tsx"),
  path.join(packDir, "files/source/gsap-register.ts"),
  path.join(packDir, "files/source/lenis-bridge.ts"),
  path.join(root, "cleanroom/actually-from-prompt/SmoothScroll.tsx"),
  path.join(root, "cleanroom/actually-from-prompt/gsap-register.ts"),
  path.join(root, "cleanroom/actually-from-prompt/lenis-bridge.ts"),
];
for (const p of leftoverBanned) {
  if (fs.existsSync(p)) throw new Error("banned leftover " + path.basename(p));
}
const can3d = fs.readFileSync(
  path.join(packDir, "files/source/Can3D.tsx"),
  "utf8"
);
if (/ScrollTrigger/.test(can3d)) {
  throw new Error("Can3D still imports or uses ScrollTrigger");
}

const buyer = fs.readFileSync(
  path.join(root, "cleanroom/actually-from-prompt/BUYER_PROMPT.md"),
  "utf8"
);
if (/scroll pin scrub/i.test(buyer)) {
  throw new Error("BUYER_PROMPT still teaches scroll pin scrub");
}
if (!/r5m4x9/.test(buyer) || /Actually-package-a9ct7u4l2y1x\.pdf/.test(buyer)) {
  throw new Error("BUYER_PROMPT missing salted PDF / zip names");
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
    get("previewVideoFullscreen") || "/assets/videos/actually-hero-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: get("poster") || "/assets/posters/actually-hero-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 16000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: { cursor: 5, lovable: 3, bolt: 3, claude: 5, "grok-build": 5 },
  dependencies: [
    { name: "gsap", version: "^3.12.0", required: true },
    { name: "three", version: "^0.170.0", required: true },
    { name: "@react-three/fiber", version: "^9.0.0", required: true },
    { name: "@react-three/drei", version: "^10.0.0", required: true },
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 20,
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
} else store.products.push(product);
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log("CMS", product.id, "desc", product.description.length, "body", product.body.length);
