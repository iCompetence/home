import type { Metadata } from 'next'
import IKnowPage from '@/components/IKnowPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "iKnow | iCompetence", description: "Die zentrale Wissensplattform für Unternehmen. KI-basiert, sicher, lokal – verwandeln Sie verteilte Informationen in eine strukturierte Wissensgrundlage." },
  en: { title: "iKnow | iCompetence", description: "The central knowledge platform for enterprises. AI-based, secure, local – turn scattered information into a structured knowledge base." },
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
    alternates: alternates('iknow', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <IKnowPage initialLanguage={lang} />
}
