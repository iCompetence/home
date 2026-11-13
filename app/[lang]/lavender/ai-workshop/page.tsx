import type { Metadata } from 'next'
import AIWorkshopLavender from '@/components/lavender/AIWorkshopLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title on the search phrase (approved 13.11.2026); description as on the live
// page (app/[lang]/ai-workshop/page.tsx), German in "du" as in the redesign.
const meta = {
  de: {
    title: 'KI-Workshop für Unternehmen | iCompetence',
    description:
      'Der KI-Workshop von iCompetence zeigt, wie du KI sicher und gewinnbringend einsetzt und wie viel KI deine Marke braucht. Mit den Köpfen hinter EmpCo Audit und iKnow.',
  },
  en: {
    title: 'AI workshop for companies | iCompetence',
    description:
      'AI workshop by iCompetence: guidance for introducing and safeguarding AI. From the people behind the EmpCo Audit and iKnow.',
  },
}

// The course's name as the page's h1 (workshop.hero.title).
const COURSE_NAME = { de: 'Der KI-Workshop', en: 'The AI Workshop' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('ai-workshop'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function AIWorkshopPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('ai-workshop')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['ai-workshop'],
          breadcrumb: productCrumbs(lang, previewRoute(''), COURSE_NAME[lang]),
          subject: { kind: 'course', name: COURSE_NAME[lang], description: meta[lang].description, free: true },
        })}
      />
      <AIWorkshopLavender />
    </>
  )
}
