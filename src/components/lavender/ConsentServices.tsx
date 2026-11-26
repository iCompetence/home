'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { RichBody } from '@/design-system';

type Cmp = {
  isInitialized?: () => Promise<boolean> | boolean;
  getActiveLanguage?: () => Promise<string>;
  changeLanguage?: (lang: string) => Promise<void>;
  hydrateEmbeddings?: () => Promise<void>;
};

/**
 * The look of the embed in the design of the page, close to FaqList: rows
 * with a rule above, the name in the h3 step, text in the body step. Set on
 * top of the embed's own stylesheet (same selectors, adopted later). If
 * Usercentrics renames a class, that part falls back to its own light look.
 */
const CSS = `
  .uc-embeddings {
    --color-main-text: #0b2231;
    --color-links-anchor: #0b2231;
    --color-cmp-background: transparent;
    --color-main-border: rgb(11 34 49 / 0.2);
    margin-top: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--color-main-border);
    color: #0b2231;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
  .uc-embeddings .embeddings-list { padding-top: 0; }
  /* The section has its title; the embed's own says "Services" in every language. */
  .uc-embeddings .embeddings-list .list-header { display: none; }
  .uc-embeddings .embeddings-list .embedding-list-item { border-top: 1px solid var(--color-main-border); }
  .uc-embeddings .embeddings-list .embedding-list-item-header {
    box-sizing: border-box;
    min-height: 74px;
    padding: 24px 0;
    gap: 24px;
    cursor: pointer;
  }
  .uc-embeddings .embeddings-list .embedding-list-item-header-title {
    font-size: 22px;
    line-height: 25.3px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
  .uc-embeddings .embeddings-list .embedding-list-item-header-expander { cursor: pointer; border-radius: 4px; }
  .uc-embeddings .embeddings-list .embedding-list-item-header-expander:focus-visible {
    outline: 2px solid #0b2231;
    outline-offset: 4px;
  }
  .uc-embeddings .embeddings-list .embedding-list-item-body { border-top: 0; padding: 4px 0 8px; }
  .uc-embeddings .embedding-list-item-body .details-section { max-width: 44rem; }
  .uc-embeddings .embedding-list-item-body .details-section .details-title { font-size: 14px; line-height: 21px; }
  .uc-embeddings .embedding-list-item-body .details-section .details-description,
  .uc-embeddings .embedding-list-item-body .details-section .details-text { color: rgb(11 34 49 / 0.8); }
  /* A long address breaks where it must, not between any two letters. */
  .uc-embeddings .embedding-list-item-body .details-section a { word-break: normal; overflow-wrap: anywhere; }
  .uc-embeddings .embedding-list-item-body .details-section .details-tags li {
    border-radius: 999px;
    padding-inline: 12px;
    font-size: 14px;
    line-height: 21px;
  }
  @media (min-width: 1024px) {
    .uc-embeddings .embeddings-list .embedding-list-item-header { min-height: 76px; }
    .uc-embeddings .embeddings-list .embedding-list-item-header-title { font-size: 24px; line-height: 27.6px; }
  }
`;

const EXPANDER = '.embedding-list-item-header-expander';

/**
 * The services the site uses, read live from Usercentrics (its "embedding":
 * a `.uc-embed` element that the consent script fills with one expandable
 * entry per service). Before 26.11.2026 the page rendered a list kept by
 * hand in ServiceAccordion.tsx, which had fallen behind the Usercentrics
 * settings (six of eight services); this list cannot. The texts are the ones
 * of Usercentrics, in "Sie", and not ours to edit.
 *
 * Based on UsercentricsEmbed.tsx of the branch fix/imprint-usercentrics-embed
 * (unknwnlnl, 20.07.2026), restyled for the light design.
 *
 * Rendered after mount only: the consent script may fill a `.uc-embed` it
 * finds before React hydrates, which would break hydration. If the script
 * never arrives (blocked by the browser, no JavaScript), a short note stands
 * in for the list.
 */
export function ConsentServices() {
  const { t, language } = useLanguage();
  const box = useRef<HTMLDivElement>(null);
  // False in the exported HTML and while hydrating, true from then on.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    let sheet: CSSStyleSheet | null = null;
    try {
      sheet = new CSSStyleSheet();
      sheet.replaceSync(CSS);
    } catch {
      sheet = null;
    }
    const watched = new WeakSet<ShadowRoot>();

    // The entries open on a click only. Give their arrow a place in the tab
    // order, the open state, and Enter and Space.
    const describe = (root: ShadowRoot) => {
      root.querySelectorAll<HTMLElement>(EXPANDER).forEach((arrow) => {
        if (!arrow.hasAttribute('tabindex')) arrow.tabIndex = 0;
        const open = String(!!arrow.closest('.embedding-list-item')?.classList.contains('expanded'));
        if (arrow.getAttribute('aria-expanded') !== open) arrow.setAttribute('aria-expanded', open);
      });
    };

    // Usercentrics replaces the embed's shadow host when it fills it again;
    // every new root gets the stylesheet and the keyboard handling once.
    const dress = () => {
      const root = box.current?.querySelector('.embeddings-shadow-wrapper')?.shadowRoot;
      if (!root) return false;
      if (sheet) {
        if (!root.adoptedStyleSheets.includes(sheet)) root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      } else if (!root.querySelector('style[data-ic-services]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ic-services', '');
        style.textContent = CSS;
        root.appendChild(style);
      }
      if (!watched.has(root)) {
        watched.add(root);
        root.addEventListener('keydown', (event) => {
          const key = (event as KeyboardEvent).key;
          const arrow = (event.target as HTMLElement | null)?.closest?.(EXPANDER) as HTMLElement | null;
          if (!arrow || (key !== 'Enter' && key !== ' ')) return;
          event.preventDefault();
          arrow.click();
        });
        new MutationObserver(() => describe(root)).observe(root, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class'],
        });
      }
      describe(root);
      return root.querySelector('.embedding-list-item') !== null;
    };

    // Also when the list arrives late, after the note was shown.
    const observer = new MutationObserver(() => {
      if (dress()) setMissing(false);
    });
    if (box.current) observer.observe(box.current, { childList: true, subtree: true });

    const fill = async () => {
      // Up to 10 s for the consent script, which loads on its own schedule.
      let asked = false;
      for (let i = 0; i < 50 && !cancelled; i++) {
        const cmp = (window as unknown as { __ucCmp?: Cmp }).__ucCmp;
        if (!asked && cmp?.hydrateEmbeddings) {
          try {
            if (!cmp.isInitialized || (await cmp.isInitialized())) {
              try {
                // The list in the language of the page, not of the browser.
                if (cmp.getActiveLanguage && cmp.changeLanguage && (await cmp.getActiveLanguage()) !== language) {
                  await cmp.changeLanguage(language);
                }
              } catch {
                // best effort: otherwise the list comes in the consent tool's language
              }
              await cmp.hydrateEmbeddings();
              asked = true;
            }
          } catch {
            // not ready yet, keep trying
          }
        }
        if (cancelled) return;
        if (asked && dress()) return;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      if (!cancelled && !dress()) setMissing(true);
    };
    fill();

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [mounted, language]);

  const note = <RichBody text={t('privacyPolicy.services.unavailable')} />;
  return (
    <div ref={box} data-ds="ConsentServices" className="w-full">
      {mounted && <div className="uc-embed" {...{ 'uc-data': 'all' }} />}
      {missing && note}
      <noscript>{note}</noscript>
    </div>
  );
}
