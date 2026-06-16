import type { Metadata } from 'next'
import CampaignParameterToolPage from '@/components/CampaignParameterToolPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Campaign Parameter Tool | iCompetence", description: "UTM-Automatisierung für Marketing, Media & Analytics Teams. Professionelles UTM Parameter Management als SaaS-Lösung." },
  en: { title: "Campaign Parameter Tool | iCompetence", description: "UTM automation for marketing, media & analytics teams. Professional UTM parameter management as a SaaS solution." },
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
    alternates: alternates('campaign-parameter-tool', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <CampaignParameterToolPage initialLanguage={lang} />
}
