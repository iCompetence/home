import type { Metadata } from 'next';
import { PREVIEW_BASE } from '@/design-system/routes';

export type Lang = 'en' | 'de';

export const toLang = (l: string): Lang => (l === 'de' ? 'de' : 'en');

/**
 * Build canonical + hreflang alternates for a page that exists in both
 * languages under /de/<route>/ and /en/<route>/.
 * Pass route='' for the homepage. x-default points at German (site default).
 */
export function alternates(route: string, lang: Lang): Metadata['alternates'] {
  const path = (l: Lang | 'x-default'): string =>
    route ? `/${l}/${route}/` : `/${l}/`;
  return {
    canonical: path(lang),
    languages: {
      de: path('de'),
      en: path('en'),
      'x-default': path('de'),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Redesigned pages (preview under /<lang>/lavender/ until go-live)    */
/* ------------------------------------------------------------------ */

export const SITE_URL = 'https://icompetence.de';
export const SITE_NAME = 'iCompetence';

/** Shared social image until pages get their own (1200 × 630). */
const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'iCompetence - Data & AI Consulting',
} as const;

/**
 * Where a redesigned page is served, relative to /<lang>/.
 *
 * Today that is below PREVIEW_BASE ('lavender/empco-audit'); once
 * PREVIEW_BASE is '' (go-live, src/design-system/routes.ts) it is the final
 * route ('empco-audit'). Canonical, hreflang, og:url and the JSON-LD URLs
 * all come from here, so they flip together with the internal links.
 *
 * `previewSlug` is for a page whose preview slug differs from its final
 * route: the night home is previewed at 'nacht-hamburg' and becomes ''.
 */
export function previewRoute(route: string, previewSlug: string = route): string {
  const base = PREVIEW_BASE.replace(/^\/+|\/+$/g, '');
  return base ? [base, previewSlug].filter(Boolean).join('/') : route;
}

/** Absolute URL of a page path below /<lang>/ ('' = the language home). */
export function pageUrl(path: string, lang: Lang): string {
  return `${SITE_URL}/${lang}/${path ? `${path}/` : ''}`;
}

/**
 * Metadata of a redesigned page: title, description, self-referencing
 * absolute canonical + hreflang, and its own Open Graph / Twitter card.
 * Without the latter, a page inherits og:title/og:url of the home page from
 * app/[lang]/layout.tsx. `path` comes from previewRoute().
 */
export function pageMetadata({
  path,
  lang,
  title,
  description,
}: {
  path: string;
  lang: Lang;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: alternates(path, lang),
    openGraph: {
      title,
      description,
      url: pageUrl(path, lang),
      siteName: SITE_NAME,
      locale: lang === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: lang === 'de' ? ['en_US'] : ['de_DE'],
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
