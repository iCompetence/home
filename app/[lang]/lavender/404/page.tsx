import type { Metadata } from 'next'
import { NotFoundLavender } from '@/components/lavender/SimpleHeroLavender'

// Preview of the 404 design. Live, the 404 is app/[lang]/not-found.tsx; at
// go-live this content moves there.
export const metadata: Metadata = { title: '404 | iCompetence' }

export default function NotFoundPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <NotFoundLavender />
}
