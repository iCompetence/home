import type { Metadata } from 'next'
import CampaignParameterToolPage from '../../src/components/CampaignParameterToolPage'

export const metadata: Metadata = {
  title: 'Campaign Parameter Tool | iCompetence',
  description: 'UTM-Automatisierung für Marketing, Media & Analytics Teams. Professionelles UTM Parameter Management als SaaS-Lösung.',
  alternates: {
    canonical: '/campaign-parameter-tool',
  },
}

export default function CampaignParameterTool() {
  return <CampaignParameterToolPage />
}
