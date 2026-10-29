export function sitePath(path = ''): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '/actionforge';
  return `${base}/${path.replace(/^\/+/, '')}`;
}
