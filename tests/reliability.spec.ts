import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';

declare global {
  interface Window {
    regressionStores: {
      library: typeof import('../src/engine/storage/library.js');
      poses: typeof import('../src/engine/storage/poses.js');
    };
    recordPreviewForTest: () => Promise<{
      made: string; type: string; magic: number[]; width: number; height: number;
    }>;
  }
}

let storageBundle: string;
test.beforeAll(async () => {
  const result = await build({
    stdin: {
      contents: `import * as library from './src/engine/storage/library.js';
        import * as poses from './src/engine/storage/poses.js';
        window.regressionStores = { library, poses };`,
      resolveDir: process.cwd(),
    },
    bundle: true, write: false, format: 'iife', platform: 'browser',
  });
  storageBundle = result.outputFiles[0].text;
});

test('aborted project writes reject instead of announcing success', async ({ page }) => {
  await page.goto('support');
  await page.addScriptTag({ content: storageBundle });
  const result = await page.evaluate(async () => {
    const { library } = window.regressionStores;
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (value, key) {
      const request = put.call(this, value, key);
      request.addEventListener('success', () => this.transaction.abort());
      return request;
    };
    let failed = false;
    try { await library.g(library.a, { name: 'Aborted project', state: 'a=test' }); }
    catch { failed = true; }
    finally { IDBObjectStore.prototype.put = put; }
    const missing = await library.i(library.a, 'Aborted project');
    await library.g(library.a, { name: 'Committed project', state: 'a=test' });
    const saved = await library.i(library.a, 'Committed project');
    return { failed, missing: missing == null, saved: saved?.name };
  });
  expect(result).toEqual({ failed: true, missing: true, saved: 'Committed project' });
});

test('failed pose writes leave memory unchanged and storage can recover', async ({ page }) => {
  await page.goto('support');
  await page.addScriptTag({ content: storageBundle });
  const result = await page.evaluate(async () => {
    const { poses } = window.regressionStores;
    const open = indexedDB.open.bind(indexedDB);
    indexedDB.open = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
    const store = poses.d();
    await store.ready;
    let addFailed = false;
    try { await store.add({ name: 'Unavailable', kind: 'body', pose: {} }); }
    catch { addFailed = true; }
    finally { indexedDB.open = open; }
    const countAfterFailure = store.all().length;
    const id = await store.add({ name: 'Original', kind: 'body', pose: {} });
    const put = IDBObjectStore.prototype.put;
    const remove = IDBObjectStore.prototype.delete;
    IDBObjectStore.prototype.put = function (value, key) {
      const request = put.call(this, value, key);
      request.addEventListener('success', () => this.transaction.abort());
      return request;
    };
    IDBObjectStore.prototype.delete = function (key) {
      const request = remove.call(this, key);
      request.addEventListener('success', () => this.transaction.abort());
      return request;
    };
    let renameFailed = false, removeFailed = false;
    try { await store.rename(id, 'Not committed'); } catch { renameFailed = true; }
    try { await store.remove(id); } catch { removeFailed = true; }
    IDBObjectStore.prototype.put = put;
    IDBObjectStore.prototype.delete = remove;
    const persisted = await poses.b(id);
    return { addFailed, countAfterFailure, renameFailed, removeFailed,
      memoryName: store.get(id)?.name, persistedName: persisted?.name };
  });
  expect(result).toEqual({
    addFailed: true, countAfterFailure: 0, renameFailed: true, removeFailed: true,
    memoryName: 'Original', persistedName: 'Original',
  });
});

test('preview recording uses frame-by-frame VP9 and produces a playable WebM', async ({ page }) => {
  await page.goto('support');
  const result = await build({
    stdin: {
      contents: `import * as THREE from 'three';
        import { c as createStage } from './src/engine/viewport/previews.js';
        window.recordPreviewForTest = async () => {
          const rig = new THREE.Group();
          const bone = new THREE.Bone();
          bone.name = 'root';
          bone.add(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial()));
          rig.add(bone);
          const clip = new THREE.AnimationClip('Turn', 1, [
            new THREE.NumberKeyframeTrack('root.rotation[y]', [0, 1], [0, 1]),
          ]);
          const stage = createStage({ THREE, clone: rig => rig.clone(true) });
          try {
            stage.show(rig, clip, { width: 120, height: 120, fps: 10, seconds: 1, inPlace: false });
            const blob = await stage.record();
            if (!blob) throw new Error('No recorded preview');
            const magic = Array.from(new Uint8Array(await blob.slice(0, 4).arrayBuffer()));
            const url = URL.createObjectURL(blob);
            try {
              const video = document.createElement('video');
              await new Promise((resolve, reject) => {
                video.onloadeddata = resolve;
                video.onerror = () => reject(new Error('Recorded preview cannot be decoded'));
                video.src = url;
              });
              return { made: stage.made, type: blob.type, magic,
                width: video.videoWidth, height: video.videoHeight };
            } finally { URL.revokeObjectURL(url); }
          } finally {
            stage.dispose();
            bone.children[0].geometry.dispose();
            bone.children[0].material.dispose();
          }
        };`,
      resolveDir: process.cwd(),
    },
    bundle: true, write: false, format: 'iife', platform: 'browser',
  });
  await page.addScriptTag({ content: result.outputFiles[0].text });
  expect(await page.evaluate(() => window.recordPreviewForTest())).toEqual({
    made: 'frame by frame', type: 'video/webm', magic: [0x1a, 0x45, 0xdf, 0xa3],
    width: 120, height: 120,
  });
});

test('service worker upgrades invalidate changed assets but preserve unchanged offline files', async ({ page, context }) => {
  const scripts: Record<string, string> = {};
  const catalog = 'assets/animation-library/manifests/library.json';
  const clip = 'assets/animation-library/animations/unchanged.glb';
  for (const version of ['v1', 'v2']) {
    const result = await build({
      entryPoints: ['src/offline/service-worker.ts'],
      bundle: true, write: false,
      define: {
        __BUILD_VERSION__: JSON.stringify(version),
        __SHELL_FILES__: JSON.stringify(['index.html']),
        __LIBRARY_SEED__: '[]',
        __LIBRARY_HASHES__: JSON.stringify({ [catalog]: version, [clip]: 'unchanged' }),
      },
    });
    scripts[version] = result.outputFiles[0].text;
  }
  let version = 'v1';
  let clipRequests = 0;
  const server = createServer((request, response) => {
    const url = new URL(request.url!, 'http://localhost');
    response.setHeader('cache-control', 'no-store');
    if (url.pathname === '/app/sw.js') {
      response.setHeader('content-type', 'text/javascript');
      response.end(scripts[url.searchParams.get('v')!]);
    } else if (url.pathname.endsWith(catalog)) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ version }));
    } else if (url.pathname.endsWith(clip)) {
      clipRequests++;
      response.end('unchanged clip');
    } else {
      response.setHeader('content-type', 'text/html');
      response.end('<!doctype html><title>Upgrade fixture</title><p>App</p>');
    }
  });
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  try {
    await page.goto(`${origin}/app/`);
    await page.evaluate(async () => {
      await navigator.serviceWorker.register('sw.js?v=v1');
      await navigator.serviceWorker.ready;
    });
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await page.evaluate(async ({ catalog, clip }) => {
      await fetch(catalog);
      await fetch(clip);
    }, { catalog, clip });
    await page.waitForFunction(async clip => !!await (await caches.open('af-library'))
      .match(new URL(clip, location.href)), clip);
    version = 'v2';
    await page.evaluate(() => navigator.serviceWorker.register('sw.js?v=v2'));
    await page.waitForFunction(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      registration?.waiting?.postMessage('af:load');
      return registration?.active?.scriptURL.endsWith('v=v2');
    });
    await page.close();
    const updated = await context.newPage();
    await updated.goto(`${origin}/app/`);
    await updated.waitForFunction(() => navigator.serviceWorker.controller?.scriptURL.endsWith('v=v2'));
    const result = await updated.evaluate(async ({ catalog, clip }) => ({
      catalog: await (await fetch(catalog, { cache: 'no-cache' })).json(),
      clip: await (await fetch(clip)).text(),
    }), { catalog, clip });
    expect(result).toEqual({ catalog: { version: 'v2' }, clip: 'unchanged clip' });
    expect(clipRequests).toBe(1);
    await context.setOffline(true);
    expect(await updated.evaluate(async catalog => (await fetch(catalog)).json(), catalog))
      .toEqual({ version: 'v2' });
  } finally {
    await context.setOffline(false);
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
