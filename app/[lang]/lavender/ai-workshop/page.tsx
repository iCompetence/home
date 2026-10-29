import type { Metadata } from 'next'
import AIWorkshopLavender from '@/components/lavender/AIWorkshopLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles and descriptions as the live page (app/[lang]/ai-workshop/page.tsx);
// the German description says "du" in line with the redesign's wording.
const meta = {
  de: {
    title: 'Der KI-Workshop | iCompetence',
    description:
      'Der KI-Workshop von iCompetence zeigt, wie du KI sicher und gewinnbringend einsetzt und wie viel KI deine Marke braucht. Mit den Köpfen hinter EmpCo Audit und iKnow.',
  },
  en: {
    title: 'The AI Workshop | iCompetence',
    description:
      'AI workshop by iCompetence: guidance for introducing and safeguarding AI. From the people behind the EmpCo Audit and iKnow.',
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
