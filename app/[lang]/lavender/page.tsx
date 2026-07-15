import type { Metadata } from 'next'
import LavenderHome from '@/components/LavenderHome'
import { alternates, toLang } from '@/lib/i18n-meta'

const SITE_URL = 'https://icompetence.de'

// "Separate the signal from the noise." is the brand headline and stays in
// English in both languages; only the description is localised.
const meta = {
  de: {
    title: 'iCompetence — Separate the signal from the noise.',
    description:
      'Mit uns bekommen Teams den Überblick: So werden verstreute Daten zu klaren Entscheidungen, KI zu Produkten und Automatisierung liefert zuverlässige Ergebnisse.',
  },
  en: {
    title: 'iCompetence — Separate the signal from the noise.',
    description:
      'We help ambitious teams cut through complexity by turning scattered data into clear decisions and AI into the products & automated processes that deliver lasting results.',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: meta[lang].title,
    description: meta[lang].description,
    // Bilingual canonical + hreflang (de/en/x-default) — ready for go-live.
    alternates: alternates('lavender', lang),
    // Soft-launch preview — keep out of search indexes until go-live.
    // Flip both this and the sitemap entry (public/sitemap.xml) to publish.
    robots: { index: false, follow: false },
  }
}

export default async function LavenderPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const url = `${SITE_URL}/${lang}/lavender/`

  // Server-rendered JSON-LD (present in the static HTML). Organization is
  // already emitted site-wide in [lang]/layout.tsx; here we add page-level
  // WebSite + BreadcrumbList context.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'iCompetence',
      url: SITE_URL,
      inLanguage: lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'de' ? 'Start' : 'Home',
          item: `${SITE_URL}/${lang}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Separate the signal from the noise.',
          item: url,
        },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LavenderHome initialLang={lang} />
    </>
  )
}
