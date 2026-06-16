import type { Metadata } from 'next'
import PrivacyLedAIPage from '@/components/PrivacyLedAIPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Privacy-Led AI | iCompetence", description: "KI-Implementierung mit Datenschutz und DSGVO-Konformität im Kern." },
  en: { title: "Privacy-Led AI | iCompetence", description: "AI implementation with privacy and GDPR compliance at its core." },
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
    alternates: alternates('privacy-led-ai', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <PrivacyLedAIPage initialLanguage={lang} />
}
