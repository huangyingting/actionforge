import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.BASE_PATH || '/actionforge/',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: path.resolve('index.html'),
        lab: path.resolve('motion-lab.html'),
        support: path.resolve('support.html'),
      },
    },
  },
  plugins: [{
    name: 'recovered-offline-shell',
    async closeBundle() {
      const manifest = JSON.parse(await readFile('dist/manifest.webmanifest', 'utf8'));
      manifest.start_url = './';
      manifest.scope = './';
      await writeFile('dist/manifest.webmanifest', JSON.stringify(manifest, null, 2));
      const html = await readFile('dist/index.html', 'utf8');
      const bootstrap = html.match(/<script[^>]+src="([^"]+\.js)"/)?.[1];
      if (!bootstrap) throw new Error('No built TypeScript bootstrap found.');
      const base = process.env.BASE_PATH || '/actionforge/';
      const modulePath = bootstrap.startsWith(base) ? bootstrap.slice(base.length) : bootstrap;
      const worker = await readFile('dist/sw.js', 'utf8');
      const revision = modulePath.replace(/[^\w-]/g, '-');
      await writeFile('dist/sw.js', worker
        .replace(/const VERSION="[^"]+"/, `const VERSION="recovered-${revision}"`)
        .replace('SHELL=[', `SHELL=[${JSON.stringify(modulePath)},`));
      const version = { version: `recovered-${revision}` };
      await writeFile('dist/version.json', JSON.stringify(version));
      const entries = JSON.parse(await readFile('src/entries.json', 'utf8')) as Record<string, string>;
      const appPath = path.join('dist', entries['index.html']);
      const app = await readFile(appPath, 'utf8');
      const shareSignature = 'async function Vd({state:D3,clip:D4=null},{origin:D5,fetchImpl:D6=fetch}={}){';
      if (!app.includes(shareSignature)) throw new Error('The recovered share function changed; review its Pages adapter.');
      await writeFile(appPath, app.replace(shareSignature,
        `${shareSignature}if(globalThis.__actionforgePages)return globalThis.__actionforgePages.share(D3,D4);`));
      await writeFile('dist/.nojekyll', '');
    },
  }],
});
