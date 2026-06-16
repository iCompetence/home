import type { Metadata } from 'next'
import AnalyticsAgentPage from '@/components/AnalyticsAgentPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Analytics Agent | iCompetence", description: "Der KI-Agent für Ihre Daten. Verbinden Sie beliebige Datenquellen und interagieren Sie in natürlicher Sprache – Analysen, Visualisierungen und Insights auf Knopfdruck." },
  en: { title: "Analytics Agent | iCompetence", description: "The AI agent for your data. Connect any data source and interact in natural language – analyses, visualisations and insights at the touch of a button." },
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
    alternates: alternates('analytics-agent', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <AnalyticsAgentPage initialLanguage={lang} />
}
