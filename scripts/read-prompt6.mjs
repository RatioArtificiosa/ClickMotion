import fs from 'fs';
const p = 'C:/Users/Usuario/.grok/sessions/E%3A%5CProducts%5CMS/019fde97-c4b7-7d81-9804-355851cc0c6d/prompts/prompt_6.txt';
let raw = '';
try { raw = fs.readFileSync(p, 'utf-8'); } catch(e){ console.error('read error', e.message); process.exit(1); }
console.log('FILE SIZE', raw.length);
console.log('--- FIRST 300 chars ---');
console.log(raw.slice(0,300).replace(/\n/g,'\\n\n'));
console.log('\n--- RAW DUMP (first 18000 chars) ---');
console.log(raw.slice(0,18000));
console.log('\n--- END DUMP ---');
// try to find frontmatter blocks
const blocks = [...raw.matchAll(/---\n([\s\S]*?)\n---/g)];
console.log('\nFOUND frontmatter blocks:', blocks.length);
blocks.forEach((m,i)=>{
  console.log(`\n== BLOCK ${i+1} frontmatter preview (first 800 chars) ==`);
  console.log(m[1].slice(0,800));
});
