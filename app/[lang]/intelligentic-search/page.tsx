import type { Metadata } from 'next'
import IntelligenticSearchPage from '@/components/IntelligenticSearchPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Intelligentic Search | iCompetence", description: "Moderne KI-gestützte Produkt- und Informationssuche. Natürliche Sprache, Bildsuche, Millisekunden-Antwortzeiten." },
  en: { title: "Intelligentic Search | iCompetence", description: "Modern AI-powered product and information search. Natural language, visual search, millisecond response times." },
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
    alternates: alternates('intelligentic-search', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <IntelligenticSearchPage initialLanguage={lang} />
}
