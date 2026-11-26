import type { Metadata } from 'next'
import PiwikProLavender from '@/components/lavender/PiwikProLavender'
import { pageMetadata, previewRoute, toLang } from '@/lib/i18n-meta'
import { JsonLd, pageGraph } from '@/lib/structured-data'
import { PAGE_UPDATED } from '@/lib/page-dates'

// Title on the search phrases "Piwik PRO statt GA4" / "GA4 Alternative"; the
// description names only what the page proves in its comparison (sources at
// the end of the page).
const meta = {
  de: {
    title: 'Piwik PRO statt GA4: Einrichtung und Umzug | iCompetence',
    description:
      'Piwik PRO statt Google Analytics 4: Daten im EU-Rechenzentrum, Berichte ohne Stichproben. iCompetence richtet Piwik PRO ein und zieht deine Messung um.',
  },
  en: {
    title: 'Piwik PRO instead of GA4: setup and migration | iCompetence',
    description:
      'Piwik PRO instead of Google Analytics 4: data in an EU data center, reports without sampling. iCompetence sets up Piwik PRO and moves your tracking over.',
  },
}

// What the page offers, for the Service node of the structured data.
const SERVICE_NAME = {
  de: 'Piwik PRO einrichten und von GA4 umziehen',
  en: 'Piwik PRO setup and migration from GA4',
}
const SERVICE_TYPE = {
  de: 'Einrichtung von Piwik PRO und Umzug der Web-Analyse von Google Analytics 4',
  en: 'Piwik PRO implementation and web analytics migration from Google Analytics 4',
}
// The visible breadcrumb: "Leistungen › Piwik PRO" (topNav.services).
const SERVICES_CRUMB = { de: 'Leistungen', en: 'Services' }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    ...pageMetadata({ path: previewRoute('piwik-pro'), lang, ...meta[lang] }),
    // Preview until Dennis releases the page: not in search results, not in
    // the nav, the footer or public/sitemap.xml. To release it, remove this
    // line and the page's rules in public/_headers, add the page to the
    // sitemap and link it (docs/design-migration.md).
    robots: { index: false, follow: false },
  }
}

export default async function PiwikProPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const path = previewRoute('piwik-pro')
  // LanguageProvider comes from ../layout.tsx. The FAQPage structured data is
  // emitted by the page component itself (same strings as the visible FAQ).
  return (
    <>
      <JsonLd
        data={pageGraph({
          lang,
          path,
          ...meta[lang],
          dateModified: PAGE_UPDATED['piwik-pro'],
          breadcrumb: [
            { name: SERVICES_CRUMB[lang], path: previewRoute(''), hash: 'services' },
            { name: 'Piwik PRO' },
          ],
          subject: {
            kind: 'service',
            name: SERVICE_NAME[lang],
            description: meta[lang].description,
            serviceType: SERVICE_TYPE[lang],
          },
        })}
      />
      <PiwikProLavender />
    </>
  )
}
