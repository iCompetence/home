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

/**
 * A reload starts at the top of the page (Dennis, 13.11.2026). Browsers put
 * you back where you were, which on the home page drops you onto the day layer
 * without the night stage; a #section in the address would jump there too.
 * Only reloads: back and forward keep the remembered position. Inline, so it
 * runs while the page is parsed, before the browser restores the position.
 */
const RELOAD_TO_TOP = `(function () {
  try {
    var nav = performance.getEntriesByType('navigation')[0];
    if (!nav || nav.type !== 'reload') return;
    history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    window.scrollTo(0, 0);
    window.addEventListener('load', function () { window.scrollTo(0, 0); }, { once: true });
    // Back on when leaving, so this entry remembers its position for back and
    // forward. (Earlier, at load, was too soon: the browser restores later.)
    window.addEventListener('pagehide', function () { history.scrollRestoration = 'auto'; });
  } catch (e) {}
})();`

export default async function LavenderLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
      <LanguageProvider initialLanguage={lang} variant="lavender">
        {children}
      </LanguageProvider>
    </>
  )
}
