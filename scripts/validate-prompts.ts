#!/usr/bin/env tsx
/**
 * Validates every prompt MDX file against prompt-schema.ts
 * Usage: npm run validate:prompts
 */
import { discoverPromptFiles, loadPrompt } from "../src/lib/prompt-loader";

let errors = 0;
let ok = 0;

for (const file of discoverPromptFiles()) {
  try {
    loadPrompt(file);
    console.log(`✓ ${file}`);
    ok++;
  } catch (e: any) {
    console.error(`✗ ${file}\n  ${e.message}`);
    errors++;
  }
}

console.log(`\n${ok} passed, ${errors} failed out of ${ok + errors} files.`);
process.exit(errors > 0 ? 1 : 0);
