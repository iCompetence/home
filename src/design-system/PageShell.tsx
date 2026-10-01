'use client';

import { useEffect, type ReactNode } from 'react';

const PAGE_BG = '#fdfafe';

/**
 * Root wrapper of every page in the new design.
 *
 * `.lavender-page` is the scope the redesign's global rules hang on (link and
 * hover behaviour, focus ring, the h1 escape hatch in globals.css) — keeping
 * them scoped is what lets old and new pages coexist. The effect swaps the
 * document background, which the old design pins to navy.
 */
export function PageShell({ children }: { children: ReactNode }) {
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
.lavender-page :is(a, button, [role="button"], input, textarea):focus-visible { outline: 2px solid var(--color-lav-navy); outline-offset: 2px; }
.lavender-page :is(.bg-lav-navy, [data-surface="inverse"]) :is(a, button, [role="button"]):focus-visible { outline-color: var(--color-lav-white); }
`,
        }}
      />
      {children}
    </div>
  );
}
