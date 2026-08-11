import fs from 'fs';
const p = 'C:/Users/Usuario/.grok/sessions/E%3A%5CProducts%5CMS/019fde97-c4b7-7d81-9804-355851cc0c6d/prompts/prompt_7.txt';
const raw = fs.readFileSync(p, 'utf-8');
console.log('SIZE', raw.length);
// Extract first hero block
const heroNames = [...raw.matchAll(/MS-HERO-[A-Z0-9]+/g)].map(m=>m[0]);
console.log('HERO IDs found:', [...new Set(heroNames)].join(', '));
console.log('--- RAW TAIL (last 2000 chars) ---');
console.log(raw.slice(-2000));
// split by file markers
const files = raw.split(/MS-HERO-/);
console.log('\nFILES split:', files.length);
for(let i=0;i<files.length;i++){
  const chunk = files[i].slice(0,800).replace(/\n/g,'\\n');
  console.log(`\n[CHUNK ${i}] ${chunk.slice(0,600)}`);
}
