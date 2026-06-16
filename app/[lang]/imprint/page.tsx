import type { Metadata } from 'next'
import ImpressumPage from '@/components/ImpressumPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Impressum | iCompetence", description: "Rechtliche Informationen und Impressum der iCompetence GmbH." },
  en: { title: "Imprint | iCompetence", description: "Legal information and imprint for iCompetence GmbH." },
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
    alternates: alternates('imprint', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <ImpressumPage initialLanguage={lang} />
}
