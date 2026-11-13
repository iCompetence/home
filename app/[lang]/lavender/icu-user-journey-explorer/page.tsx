import type { Metadata } from 'next'
import UserJourneyExplorerLavender from '@/components/lavender/UserJourneyExplorerLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title: product name plus the search phrase (approved 13.11.2026). The
// description says what the page shows; the live one called ICU a
// "zero-party-data" explorer, but journeys are observed behaviour, not data
// people declare themselves.
const meta = {
  de: {
    title: 'ICU User Journey Explorer: Customer Journeys analysieren | iCompetence',
    description:
      'ICU rekonstruiert echte User Journeys automatisch aus deinen Tracking-Daten: Abbrüche, Schleifen und Pfade zur Conversion, auch per Frage in natürlicher Sprache.',
  },
  en: {
    title: 'ICU User Journey Explorer: analyze customer journeys | iCompetence',
    description:
      'ICU automatically reconstructs real user journeys from your tracking data: drop-offs, loops and paths to conversion, also answered in natural language.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('icu-user-journey-explorer'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function UserJourneyExplorerPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('icu-user-journey-explorer')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['icu-user-journey-explorer'],
          breadcrumb: productCrumbs(lang, previewRoute(''), 'ICU – User Journey Explorer'),
          subject: { kind: 'software', name: 'ICU – User Journey Explorer', description: meta[lang].description },
        })}
      />
      <UserJourneyExplorerLavender />
    </>
  )
}
