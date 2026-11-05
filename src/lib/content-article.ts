// ---------------------------------------------------------------------------
// Content model + helpers for content article pages (guides that answer one
// search question and link back to a tool landing page, the "pillar").
//
// Used by src/components/ContentArticlePage.tsx (rendering) and by the route's
// page.tsx (metadata + JSON-LD). This file has no 'use client' directive, so
// server components can call the helpers: visible text and structured data are
// generated from the same content object and therefore stay identical.
//
// Inline markup allowed in every text field (paragraphs, bullets, key facts,
// FAQ answers, table cells):
//   **bold**            answer-first emphasis
//   [label](/path/)     internal link (trailing slash!)
//   [^1] or [^1,3]      reference to entry 1 (and 3) of `sources`, rendered as
//                       superscript number linking to #quellen
// ---------------------------------------------------------------------------

import type { Lang } from './i18n-meta';

export interface ArticleSubsection {
  /** H3 heading */
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ArticleTable {
  /** Header of the first column (row labels) */
  featureHeader?: string;
  primaryHeader: string;
  secondaryHeader: string;
  rows: { feature: string; primary: string; secondary: string }[];
}

export interface ArticleSection {
  /** Anchor id (kebab-case) */
  id: string;
  /** H2 heading */
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: ArticleSubsection[];
  /** Optional table rendered after the text (ComparisonTable module) */
  table?: ArticleTable;
}

export interface ArticleSource {
  title: string;
  url: string;
  publisher?: string;
  /** Publication date of the source, ISO yyyy-mm-dd (other text is shown as is) */
  published?: string;
  /** Retrieval date, ISO yyyy-mm-dd */
  retrieved?: string;
}

export interface ContentArticleContent {
  /** H1 */
  title: string;
  /** Line above the H1 after the pillar link, e.g. "Ratgeber" */
  kicker: string;
  /** Tool landing page this article belongs to (breadcrumb, kicker link) */
  pillar: { label: string; href: string };
  /** Lead paragraphs under the H1 (answer first) */
  intro: string[];
  /** Optional short fact list under the intro */
  keyFacts?: string[];
  sections: ArticleSection[];
  faqTitle: string;
  /** Rendered always visible (crawlable) and as FAQPage JSON-LD */
  faq: { q: string; a: string }[];
  relatedTitle: string;
  related: { label: string; href: string }[];
  /** Conversion module at the end of the article */
  cta: { headline: string; text?: string; button: string; href: string };
  /** Stable prefix for CTA tracking ids, e.g. 'empco_strafe' */
  ctaIdPrefix: string;
  /** Numbered source list, order = first reference in the text */
  sources: ArticleSource[];
  /** ISO yyyy-mm-dd */
  published: string;
  /** ISO yyyy-mm-dd, shown as "Zuletzt aktualisiert" */
  updated: string;
}

/** Splits text into plain parts and source references ([^1] / [^1,2]). */
export const SOURCE_REF_PATTERN = /(\[\^\d+(?:\s*,\s*\d+)*\])/g;

export function parseSourceRef(part: string): number[] | null {
  const match = part.match(/^\[\^(\d+(?:\s*,\s*\d+)*)\]$/);
  if (!match) return null;
  return match[1].split(',').map((n) => parseInt(n.trim(), 10));
}

/** Text without inline markup — for JSON-LD, meta tags and aria labels. */
export function toPlainText(text: string): string {
  return text
    .replace(SOURCE_REF_PATTERN, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** ISO yyyy-mm-dd → "04.11.2026" (de) / "4 November 2026" (en). No Intl, so server and client render identically. */
export function formatArticleDate(iso: string, lang: Lang): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split('-').map((v) => parseInt(v, 10));
  if (lang === 'de') return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`;
  return `${d} ${MONTHS_EN[m - 1]} ${y}`;
}

const SITE_URL = 'https://icompetence.de';

/**
 * Article, BreadcrumbList and FAQPage structured data, built from the same
 * content object the page renders (texts identical to the visible content).
 * `path` is the article path incl. language and trailing slash, e.g.
 * '/de/empco-audit/greenwashing-strafe/'.
 */
export function buildArticleJsonLd(content: ContentArticleContent, path: string, lang: Lang) {
  const url = `${SITE_URL}${path}`;
  const organization = { '@type': 'Organization', name: 'iCompetence', url: `${SITE_URL}/` };
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      inLanguage: lang,
      headline: content.title,
      description: toPlainText(content.intro[0] ?? ''),
      datePublished: content.published,
      dateModified: content.updated,
      author: organization,
      publisher: organization,
      mainEntityOfPage: url,
      citation: content.sources.map((s) => s.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'iCompetence', item: `${SITE_URL}/${lang}/` },
        { '@type': 'ListItem', position: 2, name: content.pillar.label, item: `${SITE_URL}${content.pillar.href}` },
        { '@type': 'ListItem', position: 3, name: content.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: content.faq.map((f) => ({
        '@type': 'Question',
        name: toPlainText(f.q),
        acceptedAnswer: { '@type': 'Answer', text: toPlainText(f.a) },
      })),
    },
  ];
}
