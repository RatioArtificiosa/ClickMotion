/**
 * Isolated Playwright visual pass for Holt, Gilda, Pearl, Reel, Pike.
 * Fresh Chrome. Does not attach to the operator's Chrome.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.MS_DEMO_BASE || "http://127.0.0.1:3004";
const out = path.join(__dirname, "visual-pass-wow-group-4");
fs.mkdirSync(out, { recursive: true });

const SKUS = [
  { id: "holt", sel: ".holt-root", quote: ".holt-headline", pin: false, click: ".holt-cta" },
  { id: "gilda", sel: ".gilda-root", quote: ".gilda-name", pin: true },
  { id: "pearl", sel: ".pearl-root", quote: ".pearl-figure", pin: true },
  { id: "reel", sel: ".reel-root", quote: ".reel-quote", pin: true },
  { id: "pike", sel: ".pike-root", quote: ".pike-name", pin: true },
];

async function waitBoard(page, sel) {
  await page.waitForSelector(sel, { timeout: 45000 });
  await page.waitForFunction(
    (s) => {
      const el = document.querySelector(s);
      if (!el) return false;
      const bg = getComputedStyle(el).backgroundColor;
      const landed = el.getAttribute("data-landed") === "true";
      return landed && bg && bg !== "rgba(0, 0, 0, 0)";
    },
    sel,
    { timeout: 20000 },
  );
}

async function inspect(page, sel, extraSel) {
  return page.evaluate(
    ({ s, extra }) => {
      const el = document.querySelector(s);
      if (!el) return { missing: true, title: document.title, text: document.body.innerText.slice(0, 240) };
      const cs = getComputedStyle(el);
      return {
        title: document.title,
        entered: el.getAttribute("data-entered"),
        landed: el.getAttribute("data-landed"),
        bg: cs.backgroundColor,
        overflowX: document.documentElement.scrollWidth > innerWidth + 2,
        howTo: /scroll here|click a name|wheel to/i.test(document.body.innerText),
        siteNav: [...document.querySelectorAll("a")].some(
          (a) => /browse/i.test(a.textContent || "") && a.closest("nav"),
        ),
        extra: extra ? document.querySelector(extra)?.innerText : null,
        text: document.body.innerText.slice(0, 360),
      };
    },
    { s: sel, extra: extraSel },
  );
}

async function setPin(page, p) {
  await page.evaluate((n) => {
    window.__msScrollNarrative && window.__msScrollNarrative.setProgress(n);
  }, p);
  await page.waitForTimeout(700);
}

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const logs = [];

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await desktop.newPage();
  page.on("pageerror", (err) => logs.push("PAGEERROR " + err.message));

  for (const sku of SKUS) {
    await page.goto(`${BASE}/demo/cleanroom-${sku.id}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await waitBoard(page, sku.sel);
    await page.waitForTimeout(1200);
    const rest = await inspect(page, sku.sel, sku.quote);
    console.log(sku.id.toUpperCase() + "-REST", JSON.stringify(rest));
    await page.screenshot({ path: path.join(out, `${sku.id}-desktop-01.png`), fullPage: false });

    if (sku.pin) {
      await setPin(page, 0.5);
      const mid = await page.evaluate((s) => document.querySelector(s)?.innerText, sku.quote);
      console.log(sku.id.toUpperCase() + "-MID", mid);
      await page.screenshot({ path: path.join(out, `${sku.id}-desktop-02.png`), fullPage: false });
      await setPin(page, 0.92);
      const end = await page.evaluate((s) => document.querySelector(s)?.innerText, sku.quote);
      console.log(sku.id.toUpperCase() + "-END", end);
      await page.screenshot({ path: path.join(out, `${sku.id}-desktop-03.png`), fullPage: false });
    } else if (sku.click) {
      await page.click(sku.click);
      await page.waitForTimeout(250);
      const sent = await page.evaluate((s) => document.querySelector(s)?.innerText, sku.click);
      console.log(sku.id.toUpperCase() + "-SENT", sent);
      await page.screenshot({ path: path.join(out, `${sku.id}-desktop-sent.png`), fullPage: false });
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const sku of SKUS) {
    await page.goto(`${BASE}/demo/cleanroom-${sku.id}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await waitBoard(page, sku.sel);
    await page.waitForTimeout(600);
    const mobile = await inspect(page, sku.sel, sku.quote);
    console.log(sku.id.toUpperCase() + "-MOBILE", JSON.stringify({ overflowX: mobile.overflowX, extra: mobile.extra }));
    await page.screenshot({ path: path.join(out, `${sku.id}-mobile.png`), fullPage: false });
  }

  await desktop.close();

  const reduced = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rp = await reduced.newPage();
  for (const sku of SKUS) {
    await rp.goto(`${BASE}/demo/cleanroom-${sku.id}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await rp.waitForSelector(sku.sel, { timeout: 45000 });
    await rp.waitForTimeout(800);
    const info = await inspect(rp, sku.sel, sku.quote);
    console.log(sku.id.toUpperCase() + "-REDUCED", JSON.stringify({ extra: info.extra, overflowX: info.overflowX }));
    await rp.screenshot({ path: path.join(out, `${sku.id}-reduced.png`), fullPage: false });
  }
  await reduced.close();

  if (logs.length) console.log("ERRORS", logs);
  else console.log("NO-PAGE-ERRORS");
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
