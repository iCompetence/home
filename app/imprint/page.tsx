import type { Metadata } from 'next'
import ImpressumPage from '../../src/components/ImpressumPage'

export const metadata: Metadata = {
  title: 'Imprint | iCompetence',
  description: 'Legal information and imprint for iCompetence GmbH.',
  alternates: {
    canonical: '/imprint',
  },
}

export default function Impressum() {
  return <ImpressumPage />
}
