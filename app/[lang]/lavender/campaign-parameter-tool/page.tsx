import type { Metadata } from 'next'
import CampaignParameterToolLavender from '@/components/lavender/CampaignParameterToolLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles and descriptions as the live page
// (app/[lang]/campaign-parameter-tool/page.tsx).
const meta = {
  de: {
    title: 'Campaign Parameter Tool | iCompetence',
    description:
      'UTM-Automatisierung für Marketing, Media & Analytics Teams. Professionelles UTM Parameter Management als SaaS-Lösung.',
  },
  en: {
    title: 'Campaign Parameter Tool | iCompetence',
    description:
      'UTM automation for marketing, media & analytics teams. Professional UTM parameter management as a SaaS solution.',
  },
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
    alternates: alternates('lavender/campaign-parameter-tool', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function CampaignParameterToolPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <CampaignParameterToolLavender />
}
