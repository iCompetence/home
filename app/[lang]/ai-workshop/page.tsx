import type { Metadata } from 'next'
import AIWorkshopPage from '@/components/AIWorkshopPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Der KI-Workshop | iCompetence", description: "KI-Workshop von iCompetence: Orientierungshilfe bei Einführung und Absicherung von KI. Von den Machern von iKnow und Intelligentic Search." },
  en: { title: "The AI Workshop | iCompetence", description: "AI workshop by iCompetence: guidance for introducing and safeguarding AI. From the makers of iKnow and Intelligentic Search." },
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
    alternates: alternates('ai-workshop', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <AIWorkshopPage initialLanguage={lang} />
}
