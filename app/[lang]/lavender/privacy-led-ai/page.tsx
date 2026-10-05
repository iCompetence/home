import type { Metadata } from 'next'
import PrivacyLedLavender from '@/components/lavender/PrivacyLedLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles and descriptions as the live page (app/[lang]/privacy-led-ai/page.tsx).
const meta = {
  de: {
    title: 'Privacy-Led AI | iCompetence',
    description: 'KI-Implementierung mit Datenschutz und DSGVO-Konformität im Kern.',
  },
  en: {
    title: 'Privacy-Led AI | iCompetence',
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
    title: meta[lang].title,
    description: meta[lang].description,
    alternates: alternates('lavender/privacy-led-ai', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function PrivacyLedPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <PrivacyLedLavender />
}
