import type { Metadata } from 'next'
import ThankYouPage from '../../src/components/ThankYouPage'

export const metadata: Metadata = {
  title: 'Thank you | iCompetence',
  description: 'Thank you for your message.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYou() {
  return <ThankYouPage language="en" />
}
