import type { Metadata } from 'next'
import MediaMonitoringLegalPage from '@/components/MediaMonitoringLegalPage'
import { legalDocs } from '@/components/mediaMonitoringLegalContent'
import { alternates, toLang } from '@/lib/i18n-meta'

const doc = legalDocs.privacy

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: doc.meta[lang].title,
    description: doc.meta[lang].description,
    alternates: alternates(doc.route, lang),
    // Reachable for platform reviewers, but kept out of search results.
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <MediaMonitoringLegalPage docId="privacy" initialLanguage={lang} />
}
