import type { Metadata } from 'next'
import UserJourneyExplorerLavender from '@/components/lavender/UserJourneyExplorerLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'

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

export default function UserJourneyExplorerPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <UserJourneyExplorerLavender />
}
