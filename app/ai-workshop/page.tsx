import type { Metadata } from 'next'
import AIWorkshopPage from '../../src/components/AIWorkshopPage'

export const metadata: Metadata = {
  title: 'Der KI-Workshop | iCompetence',
  description: 'KI-Workshop von iCompetence: Orientierungshilfe bei Einführung und Absicherung von KI. Von den Machern von iKnow und Intelligentic Search.',
  alternates: {
    canonical: '/ai-workshop',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function AIWorkshop() {
  return <AIWorkshopPage />
}
