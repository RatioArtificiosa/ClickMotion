import { chromium } from 'playwright';

const cdpUrl = 'wss://ip-3-101-26-194.tetra-data.production.tinyfish.io/tf-33af0d0c-1619-47cf-a023-01338e9de5fc';

try {
  const browser = await chromium.connectOverCDP(cdpUrl);
  const contexts = browser.contexts();
  const context = contexts[0] || await browser.newContext({ viewport: { width: 1440, height: 900 } });
  let page = context.pages()[0];
  if (!page) page = await context.newPage();
  await page.goto('https://motionsites.ai', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(4000);
  // Check what's on page
  const title = await page.title();
  console.log('Title:', title);
  const html = await page.content();
  console.log('HTML len:', html.length);
  console.log(html.slice(0, 4000));
  // Try to find gallery elements
  const count = await page.locator('img, video, [class*="card"], [class*="gallery"]').count();
  console.log('Card-like elements:', count);
  const text = await page.locator('body').innerText().then(t => t.slice(0, 3000)).catch(() => 'no text');
  console.log('BODY TEXT:', text);
  await page.waitForTimeout(1000);
  const out = 'E:/Products/MS/motionsites-screenshot.png';
  await page.screenshot({ path: out, fullPage: true });
  console.log('Screenshot saved to', out);
  const snap = await page.evaluate(() => {
    const els = document.querySelectorAll('*');
    const seen = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width > 200 && r.height > 100 && r.width < 600 && r.height < 800) {
        seen.push({ tag: el.tagName, cls: el.className?.toString().slice(0,80) || '', w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) });
        if (seen.length > 15) break;
      }
    }
    return seen;
  });
  console.log('Layout snapshot:', JSON.stringify(snap, null, 2));
  await browser.close();
} catch(e) {
  console.error('Failed:', e.message, e.stack?.slice(0,2000));
}
