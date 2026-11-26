import type { Language } from '@/contexts/LanguageContext';

/**
 * The redesign was built next to the old site under /<lang>/lavender/<route>/
 * and went live on the real routes on 26.11.2026. PREVIEW_BASE was
 * '/lavender' until then; it stays as the one switch that paths, canonicals,
 * structured data and the tracking check read (previewRoute in
 * src/lib/i18n-meta.ts), in case a preview area is needed again.
 */
export const PREVIEW_BASE: string = '';

/**
 * The languages the site is published in. English is switched off since the
 * go-live of the redesign (Dennis, 26.11.2026): the English pages have not
 * been reviewed yet. While 'en' is missing here, no /en/ page is exported
 * (app/[lang]/layout.tsx), no hreflang names one, the nav shows no language
 * switch, links go to the German page and public/_redirects sends /en/… to
 * /de/…. To bring English back: add 'en' here, remove that redirect, point
 * the old un-prefixed addresses in _redirects at /en/ again and add the pages
 * to the sitemap. The three Media Monitoring legal pages stay in both
 * languages (app review).
 */
export const SITE_LANGS: readonly Language[] = ['de'];

/**
 * Language-prefixed internal link. `path` is the un-prefixed route with or
 * without slashes ('/', 'contact', '/empco-audit/'); an optional #hash is kept.
 */
export function siteHref(language: Language, path: string): string {
  const [route, hash] = path.split('#');
  const slug = route.replace(/^\/+|\/+$/g, '');
  // From a page in a language the site is not published in (the English
  // Media Monitoring pages) links lead to the German site.
  const lang = SITE_LANGS.includes(language) ? language : 'de';
  return `/${lang}${PREVIEW_BASE}/${slug ? `${slug}/` : ''}${hash ? `#${hash}` : ''}`;
}
