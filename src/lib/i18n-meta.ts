import type { Metadata } from 'next';

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
