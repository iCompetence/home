import type { Metadata } from 'next'
import IKnowPage from '../../src/components/IKnowPage'

export const metadata: Metadata = {
  title: 'iKnow | iCompetence',
  description: 'Die zentrale Wissensplattform für Unternehmen. KI-basiert, sicher, lokal – verwandeln Sie verteilte Informationen in eine strukturierte Wissensgrundlage.',
  alternates: {
    canonical: '/iknow',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function IKnow() {
  return <IKnowPage />
}
