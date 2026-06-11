import type { Metadata } from 'next'
import AnalyticsAgentPage from '../../src/components/AnalyticsAgentPage'

export const metadata: Metadata = {
  title: 'Analytics Agent | iCompetence',
  description: 'Der KI-Agent für Ihre Daten. Verbinden Sie beliebige Datenquellen und interagieren Sie in natürlicher Sprache – Analysen, Visualisierungen und Insights auf Knopfdruck.',
  alternates: {
    canonical: '/analytics-agent',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AnalyticsAgent() {
  return <AnalyticsAgentPage />
}
