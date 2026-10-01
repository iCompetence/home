'use client';

import { useEffect, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PAGE_BG = '#fdfafe';

/**
 * Root wrapper of every page in the new design: skip link, the page's
 * `nav` (TopNav, itself the <header>), the content as <main>, then `footer`
 * (Footer or ClosingBlock, which ends in the <footer>). Every page gets the
 * same landmarks this way.
 *
 * `.lavender-page` is the scope the redesign's global rules hang on (link and
 * hover behaviour, focus ring, the h1 escape hatch in globals.css) — keeping
 * them scoped is what lets old and new pages coexist. The effect swaps the
 * document background, which the old design pins to navy.
 *
 * The nav must stay a direct child of `.lavender-page`: it is sticky, and a
 * wrapper only as tall as the nav would end the stickiness right away.
 */
export function PageShell({
  nav,
  footer,
  children,
}: {
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const { t } = useLanguage();
  useEffect(() => {
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = PAGE_BG;
    document.documentElement.style.backgroundColor = PAGE_BG;
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
    };
  }, []);

  return (
    <div className="lavender-page w-full bg-lav-page font-brand font-medium text-lav-navy">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.lavender-page a { text-decoration: none; }
.lavender-page * { box-sizing: border-box; }
html:has(.lavender-page), html:has(.lavender-page) body { overflow-x: clip; }
.lavender-page a, .lavender-page button { transition: opacity var(--duration-fast) ease; cursor: pointer; }
.lavender-page a:hover, .lavender-page button:hover { opacity: 0.75; }
/* Text fields show focus as a 2 px border (FormField), not as this ring. */
.lavender-page :is(a, button, [role="button"], input[type="checkbox"], input[type="radio"]):focus-visible { outline: 2px solid var(--color-lav-navy); outline-offset: 2px; }
.lavender-page :is(.bg-lav-navy, [data-surface="inverse"]) :is(a, button, [role="button"]):focus-visible { outline-color: var(--color-lav-white); }
`,
        }}
      />
      <a
        href="#main"
        // not-sr-only resets padding, hence the focus: padding.
        // Lavender, not navy: it opens on top of the navy nav pill.
        className="sr-only z-[100] rounded-pill bg-lav-lavender font-brand text-body font-medium text-lav-navy no-underline focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-5 focus:py-3"
      >
        {t('lavender.common.skipToContent')}
      </a>
      {nav}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      {footer}
    </div>
  );
}
