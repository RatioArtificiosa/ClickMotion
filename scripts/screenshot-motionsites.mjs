import { chromium } from 'playwright';

const cdpUrl = 'wss://ip-3-101-26-194.tetra-data.production.tinyfish.io/tf-33af0d0c-1619-47cf-a023-01338e9de5fc';

try {
  const browser = await chromium.connectOverCDP(cdpUrl);
  const contexts = browser.contexts();
  const context = contexts[0] || await browser.newContext();
  let page = context.pages()[0];
  if (!page) page = await context.newPage();
  await page.goto('https://motionsites.ai', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  // Try to scroll to reveal gallery
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1500);
  const path = 'C:/Users/Usuario/.grok/sessions/E%3A%5CProducts%5CMS/019fde97-c4b7-7d81-9804-355851cc0c6d/motionsites-screenshot.png';
  await page.screenshot({ path, fullPage: true });
  console.log('Screenshot saved to', path);
  // Also get HTML structure
  const html = await page.content();
  console.log(html.slice(0, 3000));
  await browser.close();
} catch(e) {
  console.error('Failed:', e.message, e.stack);
}
