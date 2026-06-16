import type { Metadata } from 'next'
import ThankYouPage from '@/components/ThankYouPage'
import { toLang } from '@/lib/i18n-meta'

const meta = {
  de: { title: 'Danke | iCompetence', description: 'Vielen Dank für Ihre Nachricht.' },
  en: { title: 'Thank you | iCompetence', description: 'Thank you for your message.' },
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
    robots: { index: false, follow: false },
  }
}

export default async function ThankYou({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <ThankYouPage language={lang} />
}
