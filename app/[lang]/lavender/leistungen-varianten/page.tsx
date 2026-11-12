import type { Metadata } from 'next'
import LeistungenVariantenLavender from '@/components/lavender/LeistungenVariantenLavender'

// Working page, not part of the site: ten ways to show "Unsere Leistungen" on
// the day layer of the night home, to choose from. Remove once the choice is
// made. noindex comes from ../layout.tsx.
export const metadata: Metadata = { title: 'Leistungen: zehn Varianten | iCompetence' }

export default function LeistungenVariantenPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <LeistungenVariantenLavender />
}
