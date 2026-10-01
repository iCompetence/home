import type { Metadata } from 'next'
import AIWorkshopLavender from '@/components/lavender/AIWorkshopLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles and descriptions as the live page (app/[lang]/ai-workshop/page.tsx).
const meta = {
  de: {
    title: 'Der KI-Workshop | iCompetence',
    description:
      'KI-Workshop von iCompetence: Orientierungshilfe bei Einführung und Absicherung von KI. Von den Machern von iKnow und Intelligentic Search.',
  },
  en: {
    title: 'The AI Workshop | iCompetence',
    description:
      'AI workshop by iCompetence: guidance for introducing and safeguarding AI. From the makers of iKnow and Intelligentic Search.',
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
    alternates: alternates('lavender/ai-workshop', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function AIWorkshopPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <AIWorkshopLavender />
}
