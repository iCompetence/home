import type { Metadata } from 'next'
import MediaMonitoringLegalLavender from '@/components/lavender/MediaMonitoringLegalLavender'
import { legalDocs } from '@/components/mediaMonitoringLegalContent'
import { alternates, toLang } from '@/lib/i18n-meta'

const doc = legalDocs.privacy

// For the platforms' app review these pages exist in German and English,
// also while the site itself is German only (SITE_LANGS).
const APP_LANGS = ['de', 'en'] as const
export async function generateStaticParams() {
  return APP_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: doc.meta[lang].title,
    description: doc.meta[lang].description,
    alternates: alternates(doc.route, lang, APP_LANGS),
    // Reachable for platform reviewers, but kept out of search results.
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  }
}

export default function Page() {
  // The language comes from the layout's provider.
  return <MediaMonitoringLegalLavender docId="privacy" />
}
