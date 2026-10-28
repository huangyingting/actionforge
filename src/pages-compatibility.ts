const siteResources = /^\/(?:assets\/|scripts\/|styles\/|api\/|s\/|(?:index|motion-lab|support)\.html$|(?:faq|news|version|offline-library)\.json$|sw\.js$|manifest\.webmanifest$|THIRD-PARTY-NOTICES\.txt$)/;

declare global {
  var __actionforgePages: { share: (state: string, clip: string | null) => string } | undefined;
}

export function createShareURL(state: string, clip: string | null, baseURL: string): string {
  const url = new URL('./', baseURL);
  url.hash = [state, clip ? `clip=${encodeURIComponent(clip)}` : ''].filter(Boolean).join('&');
  return url.href;
}

export function resolvePagesURL(input: string, base: string, origin: string): string {
  const url = new URL(input, origin);
  if (url.origin !== origin || !siteResources.test(url.pathname) || base === '/') return input;
  return `${origin}${base}${url.pathname.slice(1)}${url.search}${url.hash}`;
}

export function installPagesCompatibility(base: string): void {
  globalThis.__actionforgePages = {
    share: (state, clip) => createShareURL(state, clip, `${location.origin}${base}`),
  };
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    if (typeof input === 'string') {
      input = resolvePagesURL(input, base, location.origin);
    } else if (input instanceof URL) {
      input = new URL(resolvePagesURL(input.href, base, location.origin));
    } else {
      const url = resolvePagesURL(input.url, base, location.origin);
      if (url !== input.url) input = new Request(url, input);
    }
    return originalFetch(input, init);
  };
  document.addEventListener('click', event => {
    const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && /^(?:\.\/|\/)?(?:index|motion-lab|support)\.html(?:[?#]|$)/.test(href)) {
      const target = new URL(href, location.href);
      const route = target.pathname.split('/').pop()!.replace('.html', '');
      anchor.href = `${location.origin}${base}${route === 'index' ? '' : route}${target.search}${target.hash}`;
    } else if (href === '/') anchor.href = `${location.origin}${base}`;
    else if (href?.startsWith('/')) anchor.href = resolvePagesURL(href, base, location.origin);
  }, { capture: true });
}
