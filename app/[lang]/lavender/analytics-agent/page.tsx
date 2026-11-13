import type { Metadata } from 'next'
import AnalyticsAgentLavender from '@/components/lavender/AnalyticsAgentLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title: product name plus the search phrase (approved 13.11.2026); the
// descriptions use the redesign's wording ("deine", US "visualizations"), as
// in lavender.products.analyticsAgent.desc.
const meta = {
  de: {
    title: 'Analytics Agent: Daten in natürlicher Sprache analysieren | iCompetence',
    description:
      'Der KI-Agent für deine Daten. Verbinde beliebige Datenquellen und interagiere in natürlicher Sprache – Analysen, Visualisierungen und Insights auf Knopfdruck.',
  },
  en: {
    title: 'Analytics Agent: analyze your data in natural language | iCompetence',
    description:
      'The AI agent for your data. Connect any data source and interact in natural language – analyses, visualizations and insights at the touch of a button.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('analytics-agent'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function AnalyticsAgentPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('analytics-agent')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['analytics-agent'],
          breadcrumb: productCrumbs(lang, previewRoute(''), 'Analytics Agent'),
          subject: { kind: 'software', name: 'Analytics Agent', description: meta[lang].description },
        })}
      />
      <AnalyticsAgentLavender />
    </>
  )
}
