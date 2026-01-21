import type { Metadata } from 'next'
import ICUUserJourneyExplorerPage from '../../src/components/ICUUserJourneyExplorerPage'

export const metadata: Metadata = {
  title: 'ICU - User Journey Explorer | iCompetence',
  description: 'Zero-Party-Data Customer Journey Explorer for deep user insights.',
  alternates: {
    canonical: '/icu-user-journey-explorer',
  },
}

export default function ICUUserJourneyExplorer() {
  return <ICUUserJourneyExplorerPage />
}
