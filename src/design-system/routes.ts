import type { Language } from '@/contexts/LanguageContext';

/**
 * Where the new design lives while it is being rolled out.
 *
 * The redesigned pages are built next to the live ones under
 * /<lang>/lavender/<route>/ so the existing site stays untouched. Every link
 * emitted by the design system goes through `siteHref`, which keeps a visitor
 * inside the preview for routes that already exist there and falls back to the
 * live page for the rest.
 *
 * Go-live: move app/[lang]/lavender/<route> up one level, set PREVIEW_BASE to
 * '' and drop PREVIEW_ROUTES — nothing else needs to change.
 */
export const PREVIEW_BASE = '/lavender';

/** Routes (without slashes) that already exist in the preview. '' = home. */
const PREVIEW_ROUTES: ReadonlySet<string> = new Set(['', 'ai-workshop', 'analytics-agent', 'empco-audit', 'icu-user-journey-explorer', 'iknow', 'intelligentic-search']);

/**
 * Language-prefixed internal link. `path` is the un-prefixed route with or
 * without slashes ('/', 'contact', '/empco-audit/'); an optional #hash is kept.
 */
export function siteHref(language: Language, path: string): string {
  const [route, hash] = path.split('#');
  const slug = route.replace(/^\/+|\/+$/g, '');
  const base = PREVIEW_BASE && PREVIEW_ROUTES.has(slug) ? PREVIEW_BASE : '';
  return `/${language}${base}/${slug ? `${slug}/` : ''}${hash ? `#${hash}` : ''}`;
}
