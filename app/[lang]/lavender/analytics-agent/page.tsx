import type { Metadata } from 'next'
import AnalyticsAgentLavender from '@/components/lavender/AnalyticsAgentLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles as the live page (app/[lang]/analytics-agent/page.tsx); the
// descriptions use the redesign's wording ("deine", US "visualizations"), as
// in lavender.products.analyticsAgent.desc.
const meta = {
  de: {
    title: 'Analytics Agent | iCompetence',
    description:
      'Der KI-Agent für deine Daten. Verbinde beliebige Datenquellen und interagiere in natürlicher Sprache – Analysen, Visualisierungen und Insights auf Knopfdruck.',
  },
  en: {
    title: 'Analytics Agent | iCompetence',
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
    title: meta[lang].title,
    description: meta[lang].description,
    alternates: alternates('lavender/analytics-agent', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function AnalyticsAgentPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <AnalyticsAgentLavender />
}
