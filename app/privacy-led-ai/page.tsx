import type { Metadata } from 'next'
import PrivacyLedAIPage from '../../src/components/PrivacyLedAIPage'

export const metadata: Metadata = {
  title: 'Privacy-Led AI | iCompetence',
  description: 'AI implementation with privacy and GDPR compliance at its core.',
  alternates: {
    canonical: '/privacy-led-ai',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyLedAI() {
  return <PrivacyLedAIPage />
}
