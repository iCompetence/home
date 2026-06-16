import type { Metadata } from 'next'
import App from '@/App'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: {
    title: 'iCompetence – Wir befähigen Unternehmen für die Agentic Era',
    description:
      'Wir befähigen Unternehmen für die Agentic Era auf einer vertrauenswürdigen Datenbasis.',
  },
  en: {
    title: 'iCompetence - We enable companies for the Agentic Era',
    description:
      'We enable companies for the Agentic Era on a trustworthy data foundation.',
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
    alternates: alternates('', lang),
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return <App initialLanguage={lang} />
}
