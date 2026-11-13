import type { Metadata } from 'next'
import PrivacyLedLavender from '@/components/lavender/PrivacyLedLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title on the search phrase (approved 13.11.2026), in the house spelling
// "Privacy-led"; descriptions as on the live page (app/[lang]/privacy-led-ai/page.tsx).
const meta = {
  de: {
    title: 'Privacy-led AI: DSGVO-konforme KI | iCompetence',
    description: 'KI-Implementierung mit Datenschutz und DSGVO-Konformität im Kern.',
  },
  en: {
    title: 'Privacy-led AI: GDPR-compliant AI | iCompetence',
    description: 'AI implementation with privacy and GDPR compliance at its core.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('privacy-led-ai'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function PrivacyLedPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('privacy-led-ai')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['privacy-led-ai'],
        })}
      />
      <PrivacyLedLavender />
    </>
  )
}
