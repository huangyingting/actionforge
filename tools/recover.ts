import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const origin = new URL(process.env.RECOVERY_ORIGIN || 'https://actionforge.app/');
const pending = new Set<string>();
const completed = new Set<string>();
const inventory: { path: string; bytes: number; sha256: string }[] = [];
const failures: string[] = [];
const pageEntries: Record<string, string> = {};

function enqueue(value: string, relativeTo = origin.href) {
  if (!value || /^(data:|blob:|#|mailto:|javascript:)/i.test(value)) return;
  const url = new URL(value.replaceAll('&amp;', '&'), relativeTo);
  if (url.origin !== origin.origin || url.pathname.includes('..')) return;
  if (!/\.(?:js|css|json|html|txt|webmanifest|woff2?|ttf|png|jpe?g|webp|svg|ico|glb|gltf|fbx|blend|webm|mp4|wasm|bin|hdr|exr)$/i.test(url.pathname)) return;
  url.search = '';
  url.hash = '';
  if (!completed.has(url.href)) pending.add(url.href);
}

function scanJSON(value: unknown, parentKey = '') {
  if (Array.isArray(value)) {
    for (const child of value) scanJSON(child, parentKey);
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) scanJSON(child, key);
  } else if (typeof value === 'string') {
    if (/^(?:assets|scripts|styles)\//.test(value)) enqueue(value);
    if (/^(?:file|preview|icon|thumbnail|model|rig|url|template)$/i.test(parentKey) &&
      !/^(?:https?:|#)/.test(value)) {
      enqueue(value, `${origin}assets/animation-library/`);
    }
  }
}

async function download(url: string) {
  completed.add(url);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(90000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    const relative = decodeURIComponent(new URL(url).pathname).replace(/^\/+/, '');
    const target = path.join('public', relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, data);
    inventory.push({ path: relative, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
    if (/\.(js|css|html|json|webmanifest)$/.test(relative)) {
      const text = data.toString('utf8');
      if (/\.(json|webmanifest)$/.test(relative)) {
        try { scanJSON(JSON.parse(text)); } catch { /* Not every endpoint returns JSON. */ }
      }
      for (const match of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) enqueue(match[1], url);
      for (const match of text.matchAll(/url\(\s*["']?([^)"'\s]+)["']?\s*\)/g)) enqueue(match[1], url);
      for (const match of text.matchAll(/(?:from\s*|import\s*\(?\s*)["'](\.[^"']+)["']/g)) enqueue(match[1], url);
      for (const match of text.matchAll(/["']((?:assets|scripts|styles)\/[^"'\s]+)["']/g)) enqueue(match[1]);
      if (relative === 'sw.js') {
        const shell = text.match(/SHELL=(\[[\s\S]*?\]),SEED=(\[[\s\S]*?\]),/);
        if (!shell) throw new Error('Unrecognized service worker inventory');
        for (const resource of [...JSON.parse(shell[1]), ...JSON.parse(shell[2])]) enqueue(resource);
      }
      if (relative.endsWith('.html')) {
        const entry = text.match(/<script type="module" src="\.\/(scripts\/[^"]+)"><\/script>/);
        if (entry) {
          pageEntries[relative] = entry[1];
          let html = text
            .replace(entry[0], '<script type="module" src="/src/main.ts"></script>')
            .replace(/href="styles\//g, 'href="/styles/')
            .replace(/<script[^>]+src="https:\/\/static\.cloudflareinsights\.com\/[\s\S]*?<\/script>/g, '')
            .replace(/href="\/"/g, 'href="./"')
            .replace(/href="\/THIRD-PARTY-NOTICES.txt"/g, 'href="./THIRD-PARTY-NOTICES.txt"');
          html = html.replace('<head>', `<head>\n<meta name="recovered-entry" content="${entry[1]}"/>`);
          await writeFile(relative, html);
        }
      }
    }
    console.log(`${relative} (${data.length})`);
  } catch (error) {
    failures.push(`${url}: ${String(error)}`);
    console.error('UNAVAILABLE', url, String(error));
  }
}

for (const resource of [
  'index.html', 'motion-lab.html', 'support.html', 'sw.js', 'version.json',
  'manifest.webmanifest', 'THIRD-PARTY-NOTICES.txt', 'faq.json', 'news.json',
  'assets/animation-library/manifests/library.json',
  'assets/animation-library/manifests/bone-maps.json',
  'assets/animation-library/manifests/characters.json',
  'assets/animation-library/manifests/rigs.json',
  'assets/animation-library/preview-look.json',
]) enqueue(resource);

while (pending.size) {
  const batch = [...pending].slice(0, 8);
  for (const url of batch) pending.delete(url);
  await Promise.all(batch.filter(url => !completed.has(url)).map(download));
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
});
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  page.on('response', response => {
    if (response.ok()) enqueue(response.url());
  });
  for (const route of ['', 'motion-lab.html', 'support.html']) {
    await page.goto(new URL(route, origin).href, { waitUntil: 'networkidle', timeout: 120000 });
    if (!route) {
      await page.locator('#lib-playpause').waitFor({ state: 'visible', timeout: 60000 });
      for (const tool of ['rig', 'camera', 'stage', 'compose', 'adjust', 'props', 'ik', 'pose', 'picker', 'import', 'presets']) {
        await page.locator(`button[data-tool="${tool}"]`).click();
      }
    }
    for (const href of await page.locator('a[href]').evaluateAll(nodes =>
      nodes.map(node => (node as HTMLAnchorElement).href))) enqueue(href);
  }
} finally {
  await browser.close();
}
while (pending.size) {
  const batch = [...pending].slice(0, 8);
  for (const url of batch) pending.delete(url);
  await Promise.all(batch.filter(url => !completed.has(url)).map(download));
}
const optionalAnimals = 'assets/animation-library/animals/list.json';
if (!inventory.some(file => file.path === optionalAnimals)) {
  await mkdir(path.join('public', path.dirname(optionalAnimals)), { recursive: true });
  await writeFile(path.join('public', optionalAnimals), '{"items":[]}\n');
}
await mkdir('src', { recursive: true });
await writeFile('public/recovery-inventory.json', JSON.stringify({
  origin: origin.href, recoveredAt: new Date().toISOString(),
  files: inventory.sort((a, b) => a.path.localeCompare(b.path)),
  unavailable: failures,
}, null, 2));
await writeFile('src/entries.json', JSON.stringify(pageEntries, null, 2));
console.log(`Recovered ${inventory.length} files, ${(inventory.reduce((n, file) => n + file.bytes, 0) / 1048576).toFixed(1)} MB; ${failures.length} unavailable.`);
if (failures.some(failure => /(?:scripts\/|styles\/|index\.html)/.test(failure))) process.exitCode = 1;
