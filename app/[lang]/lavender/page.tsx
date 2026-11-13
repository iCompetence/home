import type { Metadata, Viewport } from 'next'
import { preload } from 'react-dom'
import HomeNightLavender from '@/components/lavender/HomeNightLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

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
    // Own canonical, hreflang and Open Graph. The path is /<lang>/lavender/
    // today and becomes /<lang>/ once PREVIEW_BASE is '' (previewRoute).
    ...pageMetadata({ path: previewRoute(''), lang, ...meta[lang] }),
    // Soft-launch preview — keep out of search indexes until go-live.
    // Flip both this and the sitemap entry (public/sitemap.xml) to publish.
    robots: { index: false, follow: false },
  }
}

// The page starts on the night sky: the phone browser's bar takes its colour.
export const viewport: Viewport = { themeColor: '#0b2231' }

export default async function LavenderPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  // The glass city is half the first view and a CSS background, which the
  // browser finds late: fetch it with the page, so it does not pop in after the text.
  preload('/images/hamburg-glas-dunkel.webp', { as: 'image', fetchPriority: 'high' })

  return (
    <>
      {/* Server-rendered JSON-LD (in the static HTML): Organization, WebSite
          and this page; see src/lib/structured-data.tsx. */}
      <JsonLd
        data={pageGraph({
          lang,
          path: previewRoute(''),
          ...meta[lang],
          dateModified: PAGE_UPDATED[''],
          aboutOrganization: true,
        })}
      />
      {/* The night home ("Licht und Linie"). LanguageProvider comes from
          ./layout.tsx (shared by all preview pages). */}
      <HomeNightLavender />
    </>
  )
}
