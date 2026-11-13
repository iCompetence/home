import type { Metadata } from 'next'
import BausteineLavender from '@/components/lavender/BausteineLavender'

// Working page, not part of the site: library components (Magic UI,
// Aceternity, shadcn) as installed, filled with the home page's content, to
// choose from. Remove once the choice is made. noindex comes from ../layout.tsx.
export const metadata: Metadata = { title: 'Bausteine zur Auswahl | iCompetence' }

export default function BausteinePreview() {
  return <BausteineLavender />
}
