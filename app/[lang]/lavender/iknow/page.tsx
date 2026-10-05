import type { Metadata } from 'next'
import IKnowLavender from '@/components/lavender/IKnowLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles as the live page (app/[lang]/iknow/page.tsx); the German
// description says "verwandle" in line with the redesign's wording.
const meta = {
  de: {
    title: 'iKnow | iCompetence',
    description:
      'Die zentrale Wissensplattform für Unternehmen. KI-basiert, sicher, lokal – verwandle verteilte Informationen in eine strukturierte Wissensgrundlage.',
  },
  en: {
    title: 'iKnow | iCompetence',
    description:
      'The central knowledge platform for enterprises. AI-based, secure, local – turn scattered information into a structured knowledge base.',
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
    alternates: alternates('lavender/iknow', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function IKnowPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <IKnowLavender />
}
