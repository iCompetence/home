import type { Metadata } from 'next'
import ICUUserJourneyExplorerPage from '@/components/ICUUserJourneyExplorerPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "ICU – User Journey Explorer | iCompetence", description: "Zero-Party-Data Customer Journey Explorer für tiefe Nutzer-Insights." },
  en: { title: "ICU - User Journey Explorer | iCompetence", description: "Zero-party-data customer journey explorer for deep user insights." },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: meta[lang].title,
    description: meta[lang].description,
    alternates: alternates('icu-user-journey-explorer', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <ICUUserJourneyExplorerPage initialLanguage={lang} />
}
