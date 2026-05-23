const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return base + (path.startsWith('/') ? path : '/' + path);
}

export function langUrl(lang: string, path: string): string {
  return url(`/${lang}${path}`);
}
