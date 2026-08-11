import fs from 'fs';
import path from 'path';

const sessionsRoot = 'C:/Users/Usuario/.grok/sessions';
const found = [];

function walk(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === 'prompt_1.txt') {
        const content = fs.readFileSync(full, 'utf-8');
        const urls = [...content.matchAll(/https:\/\/d8j0[^\s"'\)]+/g)].map(m => m[0]);
        // strip trailing punctuation like . , "
        const cleaned = urls.map(u => u.replace(/[",\)\.]+$/, ''));
        const uniq = [...new Set(cleaned)];
        console.log(`FILE: ${full}`);
        console.log(`  urls found: ${uniq.length}`);
        for (const u of uniq) console.log(`  URL: ${u}`);
        found.push({ file: full, urls: uniq });
      }
    }
  } catch {}
}

walk(sessionsRoot);

// also dump the newest MS session file specifically
const msFile = 'E:/Products/MS/prompts_backup.txt';
try {
  // try to read from current session if exists via env?
} catch {}

console.log(JSON.stringify(found, null, 2));
