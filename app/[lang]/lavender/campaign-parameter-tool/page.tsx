import type { Metadata } from 'next'
import CampaignParameterToolLavender from '@/components/lavender/CampaignParameterToolLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

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
    ...pageMetadata({ path: previewRoute('campaign-parameter-tool'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function CampaignParameterToolPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('campaign-parameter-tool')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['campaign-parameter-tool'],
          breadcrumb: productCrumbs(lang, previewRoute(''), 'Campaign Parameter Tool'),
          subject: { kind: 'software', name: 'Campaign Parameter Tool', description: meta[lang].description },
        })}
      />
      <CampaignParameterToolLavender />
    </>
  )
}
