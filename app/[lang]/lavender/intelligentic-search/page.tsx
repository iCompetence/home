import type { Metadata } from 'next'
import IntelligenticSearchLavender from '@/components/lavender/IntelligenticSearchLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles and descriptions as the live page
// (app/[lang]/intelligentic-search/page.tsx).
const meta = {
  de: {
    title: 'Intelligentic Search | iCompetence',
    description:
      'Moderne KI-gestützte Produkt- und Informationssuche. Natürliche Sprache, Bildsuche, Millisekunden-Antwortzeiten.',
  },
  en: {
    title: 'Intelligentic Search | iCompetence',
    description:
      'Modern AI-powered product and information search. Natural language, visual search, millisecond response times.',
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
    alternates: alternates('lavender/intelligentic-search', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function IntelligenticSearchPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <IntelligenticSearchLavender />
}
