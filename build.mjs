#!/usr/bin/env node
/*
  Keeps the two things that silently rot in sync with the source files:

    1. the ?v= cache-busting tokens on style.css / script.js — previously hand
       edited, and already once left behind while script.js changed underneath
       it, so returning visitors kept a stale cached copy;
    2. the 'sha256-...' script hashes in the _headers CSP — these must match the
       inline scripts byte for byte or the page stops booting.

  Run it before committing whenever index.html, style.css or script.js changes:

      node build.mjs

  Zero dependencies, and it only rewrites the two generated fragments.
*/

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const read = (name) => readFileSync(join(root, name), 'utf8');
const write = (name, text) => writeFileSync(join(root, name), text);

const shortHash = (text) =>
  createHash('sha256').update(text, 'utf8').digest('hex').slice(0, 10);

const cspHash = (text) =>
  "'sha256-" + createHash('sha256').update(text, 'utf8').digest('base64') + "'";

let html = read('index.html');

// ---------- 0. Bake the derived year counts into the markup ----------
// These spans used to ship empty and were filled by applyAutoYears() at
// runtime. Crawlers that do not execute JS therefore read "年跨境电商经验"
// with no number in front of it, and search engines reassembled the leftover
// fragments into nonsense snippets. Writing the current value into the HTML
// gives every crawler a complete sentence; the script still overwrites it on
// load, so the page stays correct between builds and across new year.
const experienceYears = Math.max(new Date().getFullYear() - 2020, 0);

html = html
  .replace(
    /(<span class="auto-years-inline">)[^<]*(<\/span>)/g,
    '$1' + experienceYears + '$2'
  )
  .replace(
    /(<div class="stat-num auto-years-plus" data-count-target="0">)[^<]*(<\/div>)/g,
    '$1' + experienceYears + '+$2'
  );

// ---------- 1. Cache-busting tokens ----------
const assetVersions = {};

for (const asset of ['style.css', 'script.js']) {
  const version = shortHash(read(asset));
  assetVersions[asset] = version;
  const pattern = new RegExp(asset.replace('.', '\\.') + '\\?v=[\\w.]+', 'g');
  const replaced = html.replace(pattern, asset + '?v=' + version);
  if (replaced === html && !html.includes(asset + '?v=' + version)) {
    throw new Error('No ?v= reference found for ' + asset + ' in index.html');
  }
  html = replaced;
}

// ---------- 2. CSP hashes for inline scripts ----------
// Only classic scripts are executed, so only those are subject to script-src.
// application/ld+json is a data block and is never hashed.
const EXECUTABLE_TYPES = new Set(['', 'text/javascript', 'application/javascript', 'module']);
const inlineScript = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const hashes = [];

let match;
while ((match = inlineScript.exec(html)) !== null) {
  const [, attrs, body] = match;
  if (/\bsrc\s*=/i.test(attrs)) continue;

  const typeMatch = attrs.match(/\btype\s*=\s*["']?([^"'\s>]*)/i);
  const type = (typeMatch ? typeMatch[1] : '').toLowerCase();
  if (!EXECUTABLE_TYPES.has(type)) continue;

  hashes.push(cspHash(body));
}

if (!hashes.length) throw new Error('No inline scripts found — refusing to write an empty hash list');

let headers = read('_headers');
const scriptSrcMatch = headers.match(/script-src ([^;]*);/);
if (!scriptSrcMatch) throw new Error('Could not locate the script-src directive in _headers');

// Keep whatever origins _headers already allows and only swap the hash list,
// so adding a source there is not silently undone by the next build.
const keptSources = scriptSrcMatch[1]
  .trim()
  .split(/\s+/)
  .filter((token) => !/^'sha(256|384|512)-/.test(token) && token !== "'unsafe-inline'");

const selfIndex = keptSources.indexOf("'self'");
const insertAt = selfIndex === -1 ? 0 : selfIndex + 1;
keptSources.splice(insertAt, 0, ...hashes);

headers = headers.replace(/script-src [^;]*;/, 'script-src ' + keptSources.join(' ') + ';');

write('index.html', html);
write('_headers', headers);

console.log('baked experience years: ' + experienceYears);
console.log('asset versions:');
for (const [name, version] of Object.entries(assetVersions)) {
  console.log('  ' + name + '?v=' + version);
}
console.log('inline script hashes: ' + hashes.length);
for (const h of hashes) console.log('  ' + h);
