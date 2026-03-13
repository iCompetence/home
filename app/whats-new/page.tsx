import type { Metadata } from 'next'
import WhatsNewPage from '../../src/components/WhatsNewPage'

export const metadata: Metadata = {
  title: "What's New | iCompetence",
  description: 'Discover the latest products, features and updates from iCompetence — your Data & AI consulting partner.',
  alternates: {
    canonical: '/whats-new/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function WhatsNew() {
  return <WhatsNewPage />
}
