import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: "Kontakt | iCompetence", description: "Nehmen Sie Kontakt mit iCompetence auf – Ihrem Partner für Data und AI." },
  en: { title: "Contact | iCompetence", description: "Get in touch with iCompetence - your partner for data and AI." },
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
    alternates: alternates('contact', lang),
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <ContactPage initialLanguage={lang} />
}
