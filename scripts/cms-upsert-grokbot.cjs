/**
 * Upsert MS-HERO-GROK01 from content/prompts/heroes/MS-HERO-GROK01.mdx.
 * Locks storefront page+gallery to operator GrokBot-VEGAS.webm (keep WebM).
 * Client HD must never leak into previewVideo.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-GROK01.mdx"),
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
  "A night-city pin narrative where scroll aims a Sphere-scale Grok Bot film and the picture never jumps. Ice glass HUD stays alive. Fully customizable copy, tokens, and film for your AI brand.";
const PAGE_WEBM = "/assets/videos/grokbot-preview-v1.webm";
const FS_MP4 = "/assets/videos/grokbot-preview-fs-v1.mp4";
const CLIENT_HD = "/assets/videos/grokbot-sphere-v1.mp4";

const desc = get("description");
if (desc !== GOLD_DESC) throw new Error("Grok Bot description bar drifted from gold");
if (!desc || desc.length > 230) throw new Error(`description length ${desc?.length}`);
if (desc.includes("—") || desc.includes("–")) throw new Error("description has em/en dash");
if (!/pin-until-complete/i.test(body) || !/VIRTUAL_VIEWPORTS = 12/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / 12 vh PSAVE gold");
}
if (!/\bPSAVE\b/.test(body) || !/Perfect Scroll Video Engine/.test(body)) {
  throw new Error("MDX missing PSAVE (Perfect Scroll Video Engine)");
}
if (!/No Scroller/.test(body) || !/Dual process/.test(body)) {
  throw new Error("MDX missing dual process / No Scroller");
}
if (!/PSAVE_COAST_SEC/.test(body) || !/PSAVE_EASE_SEC/.test(body)) {
  throw new Error("MDX missing leftover dest floor / rate ease");
}
if (!/PSAVE_FLIP_DEADZONE_PX/.test(body) || !/PSAVE_LIVE_MS = 280/.test(body)) {
  throw new Error("MDX missing bounce deadzone / 280ms live window");
}
if (!/GOP 3/.test(body) || !/-bf 0/.test(body)) {
  throw new Error("MDX missing PSAVE film encode (GOP 3 / no B-frames)");
}
if (!/\.webm$/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay WebM (operator screenshot law)");
}
if ((get("previewVideo") || "") !== PAGE_WEBM) {
  throw new Error("previewVideo must be grokbot-preview-v1.webm (GrokBot-VEGAS.webm)");
}
if ((get("previewVideoFullscreen") || "") !== FS_MP4) {
  throw new Error("previewVideoFullscreen must be grokbot-preview-fs-v1.mp4");
}
if ((get("liveDemo") || "").indexOf("cleanroom-grokbot") < 0) {
  throw new Error("MDX missing liveDemo /demo/cleanroom-grokbot");
}
if ((get("status") || "") !== "published") throw new Error("status must be published");
if ((get("priceTier") || "") !== "pro") throw new Error("priceTier must be pro");
if ((get("version") || "") !== "2.1.0") {
  throw new Error("Grok Bot Platinum backend pack must stay on version 2.1.0");
}

const packDir = path.join(root, "public/packages/MS-HERO-GROK01");
for (const rel of [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/GrokBotHero.tsx",
  "files/source/hero.css",
  "files/source/copy.ts",
  "files/assets/grokbot-sphere-v1.mp4",
  "files/assets/grokbot-sphere-v1.webp",
  "GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip",
  "GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf",
]) {
  if (!fs.existsSync(path.join(packDir, rel))) throw new Error("missing " + rel);
}

const src = fs.readFileSync(
  path.join(packDir, "files/source/GrokBotHero.tsx"),
  "utf8"
);
if (!/pageOwns/.test(src) || !/pinDocked/.test(src)) {
  throw new Error("GrokBotHero missing pin freeing");
}
if (!/PSAVE_FRAME = 1 \/ 25/.test(src)) {
  throw new Error("GrokBotHero must stay on 25fps PSAVE_FRAME");
}

const promptMd = fs.readFileSync(
  path.join(packDir, "files/PROMPT.md"),
  "utf8"
);
if (!/page owns/i.test(promptMd) || !/docks/i.test(promptMd)) {
  throw new Error("pack PROMPT missing pin freeing");
}
if (promptMd.split(/\r?\n/).length < 240) {
  throw new Error("pack PROMPT too thin for Platinum");
}
if (!/Rebuild algorithm/.test(promptMd) || !/Two clocks/.test(promptMd)) {
  throw new Error("pack PROMPT missing Still-class motion law");
}
if (!/2\.1\.0/.test(promptMd)) {
  throw new Error("pack PROMPT must stay on version 2.1.0");
}

const buyer = fs.readFileSync(
  path.join(root, "cleanroom/grokbot-from-prompt/BUYER_PROMPT.md"),
  "utf8"
);
if (!/gk4n8x/.test(buyer)) {
  throw new Error("BUYER_PROMPT missing salted pack names");
}
if (!/GrokBot-VEGAS\.webm/.test(buyer)) {
  throw new Error("BUYER_PROMPT missing operator WebM lock");
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
  previewVideo: PAGE_WEBM,
  previewVideoFullscreen: FS_MP4,
  thumbnail: get("thumbnail"),
  poster: "/assets/posters/grokbot-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [
    {
      file: CLIENT_HD,
      format: "mp4",
      duration: "63s",
      loop: false,
      sizeMb: 127,
      poster: "/assets/posters/grokbot-sphere-v1.webp",
    },
  ],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 17000),
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
  dependencies: [
    { name: "lucide-react", version: "^0.468.0", required: false },
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 29,
};

if (product.previewVideo === CLIENT_HD) {
  throw new Error("REFUSE: client HD leaked into previewVideo");
}
if (!product.previewVideo.endsWith(".webm")) {
  throw new Error("REFUSE: page+gallery preview must stay WebM");
}

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
  "preview",
  product.previewVideo,
  idx >= 0 ? "updated" : "added"
);
