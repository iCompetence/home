import type { Metadata } from 'next'
import { PrivacyPolicyLavender } from '@/components/lavender/LegalLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// New page (live, the privacy text is part of the imprint). Titles as the
// page heading in Figma; a description still has to be written.
const meta = {
  de: { title: 'Datenschutzerklärung | iCompetence' },
  en: { title: 'Privacy policy | iCompetence' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: meta[lang].title,
    alternates: alternates('lavender/privacy-policy', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function PrivacyPolicyPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <PrivacyPolicyLavender />
}
