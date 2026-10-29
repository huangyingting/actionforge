import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const base = (process.env.BASE_PATH ?? '/actionforge/').replace(/\/$/, '');
const types: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.webm': 'video/webm',
  '.svg': 'image/svg+xml',
};
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost');
    if (base && url.pathname === base) {
      response.writeHead(308, { location: `${base}/${url.search}` }).end();
      return;
    }
    if (base && !url.pathname.startsWith(`${base}/`)) throw new Error('Outside deployment base');
    const relative = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\/+/, '');
    let filename = path.resolve(root, relative || 'index.html');
    if (!filename.startsWith(`${root}${path.sep}`)) throw new Error('Invalid path');
    try {
      if ((await stat(filename)).isDirectory()) {
        const index = path.join(filename, 'index.html');
        try { await stat(index); filename = index; }
        catch { filename = filename.replace(/\/$/, '') + '.html'; }
      }
    } catch {
      if (!path.extname(filename)) filename += '.html';
    }
    const data = await readFile(filename);
    response
      .writeHead(200, {
        'content-type': types[path.extname(filename)] || 'application/octet-stream',
        'cache-control': 'no-cache',
      })
      .end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
  }
});
server.listen(Number(process.env.PORT || 4173), '0.0.0.0', () => {
  console.log(`ActionForge: http://localhost:${process.env.PORT || 4173}${base}/`);
});
