import type { Metadata } from 'next'
import { NotFoundLavender } from '@/components/lavender/SimpleHeroLavender'

// The page Netlify shows for addresses that do not exist: public/_redirects
// sends everything unknown to /de/404/ with status 404. (not-found.tsx beside
// it only answers notFound() calls inside the app.)
export const metadata: Metadata = {
  title: '404 | iCompetence',
  robots: { index: false, follow: false },
  // No canonical and no hreflang: the layout's defaults would point at the home page.
  alternates: {},
}

export default function NotFoundPage() {
  // LanguageProvider comes from ../layout.tsx.
  return <NotFoundLavender />
}
