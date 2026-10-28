import { installPagesCompatibility } from './pages-compatibility';

installPagesCompatibility(import.meta.env.BASE_URL);
const entry = document.querySelector<HTMLMetaElement>('meta[name="recovered-entry"]')?.content;
if (!entry || !/^scripts\/[\w-]+\.js$/.test(entry)) {
  throw new Error('The recovered application entry is missing or invalid.');
}
await import(/* @vite-ignore */ new URL(entry, document.baseURI).href);
