import type { Metadata } from 'next'
import IntelligenticSearchPage from '../../src/components/IntelligenticSearchPage'

export const metadata: Metadata = {
  title: 'Intelligentic Search | iCompetence',
  description: 'Moderne KI-gestützte Produkt- und Informationssuche. Natürliche Sprache, Bildsuche, Millisekunden-Antwortzeiten.',
  alternates: {
    canonical: '/intelligentic-search',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function IntelligenticSearch() {
  return <IntelligenticSearchPage />
}
