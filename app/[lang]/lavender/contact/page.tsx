import type { Metadata } from 'next'
import ContactLavender from '@/components/lavender/ContactLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'

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
    ...pageMetadata({ path: previewRoute('contact'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function ContactPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <ContactLavender />
}
