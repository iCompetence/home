import type { Metadata } from 'next'
import ContactLavender from '@/components/lavender/ContactLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles as the live page (app/[lang]/contact/page.tsx); the German
// description says "du" in line with the redesign's wording.
const meta = {
  de: {
    title: 'Kontakt | iCompetence',
    description: 'Nimm Kontakt mit iCompetence auf – deinem Partner für Data und AI.',
  },
  en: {
    title: 'Contact | iCompetence',
    description: 'Get in touch with iCompetence - your partner for data and AI.',
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
    alternates: alternates('lavender/contact', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function ContactPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <ContactLavender />
}
