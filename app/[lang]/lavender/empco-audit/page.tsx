import type { Metadata } from 'next'
import EmpCoAuditLavender from '@/components/lavender/EmpCoAuditLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph, productCrumbs } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Same title as the live page (app/[lang]/empco-audit/page.tsx, 26.10.2026):
// it targets the product searches ("EmpCo Audit", "EmpCo Check", "Website auf
// Greenwashing prüfen") like the h1, and the description says the directive
// already applies. German in "du" in line with the redesign's wording.
const meta = {
  de: {
    title: 'EmpCo Audit & Check: Website auf Greenwashing prüfen | iCompetence',
    description:
      'EmpCo (EU 2024/825) gilt seit 27.09.2026: Prüf deine Website auf Greenwashing. KI-Audit mit Zitat, Regelverweis und Zweitprüfung – Probeseite kostenlos.',
  },
  en: {
    title: 'EmpCo Audit & Check: Scan your website for greenwashing | iCompetence',
    description:
      'EmpCo (EU 2024/825) applies since 27 Sep 2026: check your website for greenwashing. AI audit with verbatim quotes, legal references and a second review – free sample page.',
  },
}

const SERVICE_TYPE = {
  de: 'Prüfung von Website-Umweltaussagen nach der EmpCo-Richtlinie',
  en: 'Website audit of environmental claims under the EmpCo Directive',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('empco-audit'), lang, ...meta[lang] }),
    // robots: inherited from ../layout.tsx (noindex while this is a preview).
  }
}

export default async function EmpCoAuditPreview({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('empco-audit')
  // LanguageProvider comes from ../layout.tsx. The FAQPage/HowTo structured
  // data is emitted by the page component itself (it needs the same strings
  // the page shows, which live in the client-side i18n module) and is still
  // part of the statically exported HTML; it links to this graph by @id.
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['empco-audit'],
          breadcrumb: productCrumbs(lang, previewRoute(''), 'EmpCo Audit'),
          subject: { kind: 'service', name: 'EmpCo Audit', description: meta[lang].description, serviceType: SERVICE_TYPE[lang] },
        })}
      />
      <EmpCoAuditLavender />
    </>
  )
}
