import type { Metadata } from 'next'
import { ThankYouLavender } from '@/components/lavender/SimpleHeroLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'

// Same titles as the live page (app/[lang]/thank-you/page.tsx); the German
// description says "deine" in line with the redesign's wording.
const meta = {
  de: { title: 'Danke | iCompetence', description: 'Vielen Dank für deine Nachricht.' },
  en: { title: 'Thank you | iCompetence', description: 'Thank you for your message.' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('thank-you'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function ThankYouPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <ThankYouLavender />
}
