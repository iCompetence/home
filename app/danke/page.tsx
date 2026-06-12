import type { Metadata } from 'next'
import ThankYouPage from '../../src/components/ThankYouPage'

export const metadata: Metadata = {
  title: 'Danke | iCompetence',
  description: 'Vielen Dank für Ihre Nachricht.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Danke() {
  return <ThankYouPage language="de" />
}
