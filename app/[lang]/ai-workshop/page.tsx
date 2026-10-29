import type { Metadata } from 'next'
import AIWorkshopPage from '@/components/AIWorkshopPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Der KI-Workshop | iCompetence", description: "Der KI-Workshop von iCompetence zeigt, wie Sie KI sicher und gewinnbringend einsetzen und wie viel KI Ihre Marke braucht. Mit den Köpfen hinter EmpCo Audit und iKnow." },
  en: { title: "The AI Workshop | iCompetence", description: "AI workshop by iCompetence: guidance for introducing and safeguarding AI. From the people behind the EmpCo Audit and iKnow." },
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
