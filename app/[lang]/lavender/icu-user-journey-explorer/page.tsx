import type { Metadata } from 'next'
import UserJourneyExplorerLavender from '@/components/lavender/UserJourneyExplorerLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Same titles and descriptions as the live page
// (app/[lang]/icu-user-journey-explorer/page.tsx).
const meta = {
  de: {
    title: 'ICU – User Journey Explorer | iCompetence',
    description: 'Zero-Party-Data Customer Journey Explorer für tiefe Nutzer-Insights.',
  },
  en: {
    title: 'ICU - User Journey Explorer | iCompetence',
    description: 'Zero-party-data customer journey explorer for deep user insights.',
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
