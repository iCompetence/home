import type { Metadata } from 'next'
import IntelligenticSearchLavender from '@/components/lavender/IntelligenticSearchLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title: product name plus the search phrase (approved 13.11.2026); description as
// on the live page (app/[lang]/intelligentic-search/page.tsx).
const meta = {
  de: {
    title: 'Intelligentic Search: KI-Produktsuche für Onlineshops | iCompetence',
    description:
      'Moderne KI-gestützte Produkt- und Informationssuche. Natürliche Sprache, Bildsuche, Millisekunden-Antwortzeiten.',
  },
  en: {
    title: 'Intelligentic Search: AI product search for online shops | iCompetence',
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
    ...pageMetadata({ path: previewRoute('intelligentic-search'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function IntelligenticSearchPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('intelligentic-search')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['intelligentic-search'],
          breadcrumb: productCrumbs(lang, previewRoute(''), 'Intelligentic Search'),
          subject: { kind: 'software', name: 'Intelligentic Search', description: meta[lang].description },
        })}
      />
      <IntelligenticSearchLavender />
    </>
  )
}
