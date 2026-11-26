'use client';

import { Fragment, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaqList } from '@/design-system';
import snapshot from '@/data/consent-services.json';

type Cmp = {
  isInitialized?: () => Promise<boolean> | boolean;
  getActiveLanguage?: () => Promise<string>;
  changeLanguage?: (lang: string) => Promise<void>;
  hydrateEmbeddings?: () => Promise<void>;
};

const icon = (path: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='${path}'/%3E%3C/svg%3E`;
const PLUS = icon('M5 12h14M12 5v14');
const MINUS = icon('M5 12h14');

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
  /* The h3 step of the page, with its trimmed text box (.lav-h3 in globals.css). */
  .uc-embeddings .embeddings-list .embedding-list-item-header-title {
    font-size: 22px;
    line-height: 25.3px;
    font-weight: 500;
    text-box: trim-both cap alphabetic;
  }
  /* Plus and minus at 24 px as in FaqList (the embed's own: a chevron at 32 px that turns). */
  .uc-embeddings .embeddings-list .embedding-list-item-header-expander {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    -webkit-mask-image: url("${PLUS}");
    mask-image: url("${PLUS}");
  }
  .uc-embeddings .embeddings-list .embedding-list-item.expanded .embedding-list-item-header-expander {
    transform: none;
    -webkit-mask-image: url("${MINUS}");
    mask-image: url("${MINUS}");
  }
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

type Section = { id: string; title: string; description?: string; text?: string; link?: string; items?: string[] };
type Service = { id: string; name: string; category: string; needsConsent: boolean; sections: Section[] };
const SNAPSHOT = snapshot.languages as Record<string, Service[] | undefined>;

/** The services of the snapshot in the language of the page (Usercentrics is set up in German only). */
export function consentServices(language: string): Service[] {
  return SNAPSHOT[language] ?? SNAPSHOT.de ?? [];
}

const linkClass = 'lav-star-text text-inherit underline underline-offset-2';
const address = (value: string) => (/^[a-z]+:/i.test(value) ? value : value.includes('@') ? `mailto:${value}` : value);

/**
 * One service of the snapshot as a FaqList answer: per block its title, the
 * explanation and the values, blocks separated by a blank line (the answer
 * is one pre-line paragraph). A link without explanation carries its title.
 */
function details(sections: Section[]): ReactNode {
  return sections.map((part, i) => {
    const link = part.link && (
      <a href={address(part.link)} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {part.description ? part.link : part.title}
      </a>
    );
    const lines: ReactNode[] = [
      ...(part.description || !link ? [<strong key="title" className="font-medium text-lav-navy">{part.title}</strong>] : []),
      ...(part.description ? [part.description] : []),
      ...(part.text ? [part.text] : []),
      ...(part.items ? [part.items.join(', ')] : []),
      ...(link ? [link] : []),
    ];
    return (
      <Fragment key={i}>
        {i > 0 && '\n\n'}
        {lines.map((line, j) => (
          <Fragment key={j}>
            {j > 0 && '\n'}
            {line}
          </Fragment>
        ))}
      </Fragment>
    );
  });
}

/**
 * The services the site uses, as configured in Usercentrics.
 *
 * Two sources for the same list. In the exported HTML and on first paint it
 * is the snapshot that `scripts/consent-services.mjs` takes at every build
 * (src/data/consent-services.json), rendered with the page's own FaqList.
 * Once the consent script has loaded in the browser, the page shows the live
 * list of Usercentrics instead (its "embedding": a `.uc-embed` element the
 * script fills), so a change made in Usercentrics shows without a deploy.
 * Where the script never arrives (blocked by the browser, as in Dia; no
 * JavaScript; crawlers), the snapshot simply stays. Before 26.11.2026 the
 * list was kept by hand and had fallen behind (six of eight services).
 *
 * The texts are the ones of Usercentrics, in "Sie", and not ours to edit.
 * Collapsed, both lists look the same; someone who has already opened an
 * entry of the snapshot keeps it.
 *
 * The embed part is based on UsercentricsEmbed.tsx of the branch
 * fix/imprint-usercentrics-embed (unknwnlnl, 20.07.2026). It is rendered
 * after mount only: the consent script may fill a `.uc-embed` it finds
 * before React hydrates, which would break hydration.
 */
export function ConsentServices() {
  const { language } = useLanguage();
  const box = useRef<HTMLDivElement>(null);
  // False in the exported HTML and while hydrating, true from then on.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  // The live list has arrived; and whether someone already used the snapshot.
  const [live, setLive] = useState(false);
  const [touched, setTouched] = useState(false);

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

    // Also when the list arrives late.
    const observer = new MutationObserver(() => {
      if (dress()) setLive(true);
    });
    if (box.current) observer.observe(box.current, { childList: true, subtree: true });

    // Ask the consent script to fill the embed, then watch for the list
    // itself. The script's own promises are not waited for without a limit:
    // its first hydrateEmbeddings() was seen never to settle although the
    // list had long been drawn.
    const within = <T,>(value: Promise<T> | T, ms: number) =>
      Promise.race([
        Promise.resolve(value),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
      ]);
    const ask = async (cmp: Cmp) => {
      try {
        if (cmp.isInitialized && !(await within(cmp.isInitialized(), 1500))) return false;
        try {
          // The list in the language of the page, not of the browser.
          if (cmp.getActiveLanguage && cmp.changeLanguage && (await within(cmp.getActiveLanguage(), 1500)) !== language) {
            await within(cmp.changeLanguage(language), 1500);
          }
        } catch {
          // best effort: otherwise the list comes in the consent tool's language
        }
        void Promise.resolve(cmp.hydrateEmbeddings?.()).catch(() => {});
        return true;
      } catch {
        return false; // not ready yet
      }
    };
    const fill = async () => {
      // Half a minute for the consent script, which loads on its own
      // schedule; asked again every few seconds while no list shows.
      let asked = 0;
      for (let i = 0; i < 150 && !cancelled; i++) {
        if (dress()) return setLive(true);
        const cmp = (window as unknown as { __ucCmp?: Cmp }).__ucCmp;
        if (cmp?.hydrateEmbeddings && Date.now() - asked > 3000 && (await ask(cmp))) asked = Date.now();
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };
    fill();

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [mounted, language]);

  const showLive = live && !touched;
  return (
    // data-snapshot: the version of the Usercentrics settings the snapshot was
    // taken from, readable in the exported HTML. Compare it with "version" at
    // v1.api.service.cmp.usercentrics.eu/latest/core/<settings id> to see
    // whether the last build refreshed the snapshot.
    <div ref={box} data-ds="ConsentServices" data-snapshot={snapshot.version} className="w-full">
      <div hidden={showLive} onClickCapture={() => setTouched(true)}>
        <FaqList
          defaultOpen={null}
          items={consentServices(language).map((service) => ({
            question: service.name,
            answer: details(service.sections),
          }))}
        />
      </div>
      {/* Kept in the layout while it fills (the embed reads its width), but
          without height and out of reach until it replaces the snapshot. */}
      {mounted && (
        <div className={showLive ? undefined : 'invisible h-0 overflow-hidden'} aria-hidden={!showLive}>
          <div className="uc-embed" {...{ 'uc-data': 'all' }} />
        </div>
      )}
    </div>
  );
}
