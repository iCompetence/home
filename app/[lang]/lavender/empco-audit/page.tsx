import type { Metadata } from 'next'
import EmpCoAuditLavender from '@/components/lavender/EmpCoAuditLavender'
import { alternates, toLang } from '@/lib/i18n-meta'

// Same titles as the live page (app/[lang]/empco-audit/page.tsx); the German
// description says "deine" in line with the redesign's wording.
const meta = {
  de: {
    title: 'EmpCo-Richtlinie 2026: Was Unternehmen wissen müssen | EmpCo Audit',
    description:
      'EmpCo-Richtlinie (EU 2024/825) einfach erklärt: gilt ab 27.09.2026, verbotene Green Claims, Bußgelder, FAQ. Plus automatischer EmpCo-Audit für deine Website.',
  },
  en: {
    title: 'EmpCo Directive 2026: What companies need to know | EmpCo Audit',
    description:
      'The EmpCo Directive (EU 2024/825) explained: applies from 27 Sep 2026, banned green claims, fines, FAQ. Plus an automated EmpCo audit for your website.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: meta[lang].title,
    description: meta[lang].description,
    alternates: alternates('lavender/empco-audit', lang),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default function EmpCoAuditPreview() {
  // LanguageProvider comes from ../layout.tsx. The FAQPage/HowTo structured
  // data is emitted by the page component itself (it needs the same strings
  // the page shows, which live in the client-side i18n module) and is still
  // part of the statically exported HTML.
  return <EmpCoAuditLavender />
}
