import type { Metadata } from 'next'
import IKnowLavender from '@/components/lavender/IKnowLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title: product name plus the search phrase (approved 13.11.2026); the German
// description says "verwandle" in line with the redesign's wording.
const meta = {
  de: {
    title: 'iKnow: KI-Wissensmanagement, lokal im Unternehmen | iCompetence',
    description:
      'Die zentrale Wissensplattform für Unternehmen. KI-basiert, sicher, lokal – verwandle verteilte Informationen in eine strukturierte Wissensgrundlage.',
  },
  en: {
    title: 'iKnow: AI knowledge management that stays in-house | iCompetence',
    description:
      'The central knowledge platform for enterprises. AI-based, secure, local – turn scattered information into a structured knowledge base.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('iknow'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function IKnowPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('iknow')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED.iknow,
          breadcrumb: productCrumbs(lang, previewRoute(''), 'iKnow'),
          subject: { kind: 'software', name: 'iKnow', description: meta[lang].description },
        })}
      />
      <IKnowLavender />
    </>
  )
}
