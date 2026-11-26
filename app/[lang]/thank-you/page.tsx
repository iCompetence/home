import type { Metadata } from 'next'
import { ThankYouLavender } from '@/components/lavender/SimpleHeroLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'

// The page after a form: not for search results.
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
    robots: { index: false, follow: false },
  }
}

export default function ThankYouPage() {
  // LanguageProvider comes from ../layout.tsx.
  return <ThankYouLavender />
}
