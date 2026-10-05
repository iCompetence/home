import type { Metadata } from 'next'
import '@/styles/globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { toLang } from '@/lib/i18n-meta'

/**
 * Shell for the redesigned pages while they are rolled out next to the live
 * site: everything below /<lang>/lavender/ is a preview.
 *
 * - `noindex` for the whole subtree — a page must not opt back in before
 *   go-live (see docs/design-migration.md).
 * - The compiled design system (src/styles/globals.css) on top of the live
 *   pages' frozen src/index.css, so the live pages keep their exact CSS.
 *   The redesign only uses plain <a> links, so moving between preview and
 *   live is always a full page load and the two stylesheets never mix on a
 *   live page.
 * - One LanguageProvider with `variant="lavender"`, so the redesign's wording
 *   (src/contexts/lavender-overrides.ts) applies without touching the strings
 *   the live pages share.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function LavenderLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return (
    <LanguageProvider initialLanguage={lang} variant="lavender">
      {children}
    </LanguageProvider>
  )
}
