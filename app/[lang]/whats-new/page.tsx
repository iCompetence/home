import type { Metadata } from 'next'
import WhatsNewPage from '@/components/WhatsNewPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Neuigkeiten | iCompetence", description: "Entdecken Sie die neuesten Produkte, Features und Updates von iCompetence – Ihrem Partner für Data & AI Consulting." },
  en: { title: "What's New | iCompetence", description: "Discover the latest products, features and updates from iCompetence — your Data & AI consulting partner." },
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
    alternates: alternates('whats-new', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <WhatsNewPage initialLanguage={lang} />
}
