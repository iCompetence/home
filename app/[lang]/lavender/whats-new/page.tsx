import type { Metadata } from 'next'
import WhatsNewLavender from '@/components/lavender/WhatsNewLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles as the live page (app/[lang]/whats-new/page.tsx); the German
// description says "du" in line with the redesign's wording.
const meta = {
  de: {
    title: 'Neuigkeiten | iCompetence',
    description: 'Entdecke die neuesten Produkte, Features und Updates von iCompetence – deinem Partner für Data & AI Consulting.',
  },
  en: {
    title: "What's New | iCompetence",
    description: 'Discover the latest products, features and updates from iCompetence — your Data & AI consulting partner.',
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
    alternates: alternates('lavender/whats-new', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function WhatsNewPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <WhatsNewLavender />
}
