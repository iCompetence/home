import type { Metadata } from 'next'
import { ImprintLavender } from '@/components/lavender/LegalLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'

// Same titles and descriptions as the live page (app/[lang]/imprint/page.tsx).
const meta = {
  de: { title: 'Impressum | iCompetence', description: 'Rechtliche Informationen und Impressum der iCompetence GmbH.' },
  en: { title: 'Imprint | iCompetence', description: 'Legal information and imprint for iCompetence GmbH.' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('imprint'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function ImprintPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <ImprintLavender />
}
