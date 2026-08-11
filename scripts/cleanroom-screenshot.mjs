/**
 * One-shot visual capture for clean-room demos.
 * Usage: node scripts/cleanroom-screenshot.mjs <url> [outPath]
 * Example: node scripts/cleanroom-screenshot.mjs http://127.0.0.1:3004/demo/cleanroom-aether cleanroom/aether-from-prompt/qa-latest.png
 */
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const url = process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-aether";
const out =
  process.argv[3] ||
  path.join("cleanroom", "qa", `shot-${Date.now()}.png`);

fs.mkdirSync(path.dirname(out), { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const media = [];
page.on("response", (res) => {
  const u = res.url();
  const ct = res.headers()["content-type"] || "";
  if (ct.includes("video") || /\.(mp4|webm)(\?|$)/i.test(u)) {
    media.push({ url: u, status: res.status(), type: ct });
  }
});

await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: false });

const title = await page.title();
const h1 = await page.locator("h1").first().textContent().catch(() => null);

console.log(
  JSON.stringify(
    {
      url,
      out: path.resolve(out),
      title,
      h1: h1?.trim() ?? null,
      media,
    },
    null,
    2
  )
);

await browser.close();
