/// <reference lib="webworker" />

declare const __BUILD_VERSION__: string;
declare const __SHELL_FILES__: string[];
declare const __LIBRARY_SEED__: string[];
const worker = globalThis as unknown as ServiceWorkerGlobalScope;
const shellCache = `af-shell-${__BUILD_VERSION__}`;
const libraryCache = 'af-library';
const resolve = (resource: string) => new URL(resource, worker.registration.scope).href;

async function precache(cacheName: string, resources: string[], required: boolean) {
  const cache = await caches.open(cacheName);
  for (let offset = 0; offset < resources.length; offset += 8) {
    await Promise.all(
      resources.slice(offset, offset + 8).map(async (resource) => {
        try {
          const url = resolve(resource);
          const response = await fetch(url, { cache: 'reload' });
          if (!response.ok) throw new Error(`Could not cache ${resource}: ${response.status}`);
          await cache.put(url, response);
        } catch (error) {
          if (required) throw error;
        }
      }),
    );
  }
}

worker.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      await precache(shellCache, __SHELL_FILES__, true);
      await precache(libraryCache, __LIBRARY_SEED__, false);
    })(),
  );
});
worker.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys()) {
        if (name.startsWith('af-shell-') && name !== shellCache) await caches.delete(name);
      }
      await worker.clients.claim();
    })(),
  );
});
worker.addEventListener('message', (event) => {
  if (event.data === 'af:load') void worker.skipWaiting();
  if (event.data?.type === 'af:version')
    event.ports[0]?.postMessage({ version: __BUILD_VERSION__ });
});

async function respond(request: Request, relative: string) {
  const shell = await caches.open(shellCache);
  if (request.mode === 'navigate') {
    const page =
      !relative || relative.endsWith('/')
        ? `${relative}index.html`
        : /\.[a-z\d]+$/i.test(relative)
          ? relative
          : `${relative}.html`;
    const cached = await shell.match(resolve(page));
    if (cached) return cached;
  }
  const cached = await shell.match(request.url);
  if (cached) return cached;
  const library = await caches.open(libraryCache);
  const stored = await library.match(request.url);
  if (stored) return stored;
  const response = await fetch(request);
  if (response.ok && response.status === 200) {
    void library.put(request.url, response.clone()).catch(() => undefined);
  } else if (response.status === 206) {
    void fetch(request.url)
      .then((full) => (full.status === 200 ? library.put(request.url, full) : undefined))
      .catch(() => undefined);
  }
  return response;
}

worker.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const scope = new URL(worker.registration.scope);
  if (
    event.request.method !== 'GET' ||
    url.origin !== scope.origin ||
    !url.pathname.startsWith(scope.pathname)
  )
    return;
  const relative = url.pathname.slice(scope.pathname.length);
  if (/^(?:api\/|s\/|sw\.js$|version\.json$)/.test(relative)) return;
  event.respondWith(respond(event.request, relative));
});
