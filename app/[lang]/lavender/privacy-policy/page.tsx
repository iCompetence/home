import type { Metadata } from 'next'
import { PrivacyPolicyLavender } from '@/components/lavender/LegalLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

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
    title: meta[lang].title,
    description: meta[lang].description,
    alternates: alternates('lavender/privacy-policy', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function PrivacyPolicyPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <PrivacyPolicyLavender />
}
