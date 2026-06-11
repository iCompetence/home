import type { Metadata } from 'next'
import EmpCoAuditPage from '../../src/components/EmpCoAuditPage'

export const metadata: Metadata = {
  title: 'EmpCo Audit | iCompetence',
  description: 'Der automatisierte Audit, der Sie vor EmpCo-Verstößen auf Ihrer Website schützt. Innerhalb weniger Stunden wissen Sie, welche Nachhaltigkeitsaussagen belegbar sind und welche zum Risiko werden.',
  alternates: {
    canonical: '/empco-audit',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function EmpCoAudit() {
  return <EmpCoAuditPage />
}
