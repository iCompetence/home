import type { Metadata } from 'next'
import { PrivacyPolicyLavender } from '@/components/lavender/LegalLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// New page (live, the privacy text is part of the imprint). Titles as the
// page heading in Figma; descriptions in the style of the imprint's.
const meta = {
  de: {
    title: 'Datenschutzerklärung | iCompetence',
    description:
      'Datenschutzerklärung der iCompetence GmbH: wie wir personenbezogene Daten verarbeiten – beim EmpCo-Audit und bei den Diensten dieser Website.',
  },
  en: {
    title: 'Privacy policy | iCompetence',
    description:
      'Privacy policy of iCompetence GmbH: how we process personal data — for the EmpCo Audit and the services used on this website.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('privacy-policy'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function PrivacyPolicyPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('privacy-policy')
  // LanguageProvider comes from ../layout.tsx.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['privacy-policy'],
        })}
      />
      <PrivacyPolicyLavender />
    </>
  )
}
