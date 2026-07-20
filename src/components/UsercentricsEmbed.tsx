'use client'

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    __ucCmp?: {
      isInitialized?: () => Promise<boolean> | boolean;
      getActiveLanguage?: () => Promise<string>;
      changeLanguage?: (lang: string) => Promise<void>;
      hydrateEmbeddings?: () => Promise<void>;
    };
  }
}

interface UsercentricsEmbedProps {
  language: 'en' | 'de';
}

const OVERRIDE_STYLE_ID = 'uc-embed-dark-theme';

// Das Embed rendert im Shadow DOM mit dem hellen CMP-Theme (dunkler Text auf
// weißem Grund). Diese Overrides gleichen es ans dunkle Seitendesign an, im
// Stil der früheren hartcodierten Liste: cyanfarbene Überschrift, helle
// Schrift, dezente Trennlinien, transparenter Hintergrund. Fließtexte ohne
// eigene Farbe erben var(--gray-white) von der Seite und sind damit hell.
const OVERRIDE_CSS = `
  .uc-embeddings {
    --color-main-text: #fcfcfc;
    --color-links-anchor: #0b99cc;
    --color-cmp-background: transparent;
    --color-main-border: rgba(255, 255, 255, 0.2);
  }
  .uc-embeddings .list-header-title-container,
  .uc-embeddings .list-header-title,
  .uc-embeddings .uc-details-title {
    color: #0b99cc !important;
  }
  .uc-embeddings .embedding-list-item,
  .uc-embeddings .embedding-list-item-header,
  .uc-embeddings .list-header {
    border-color: rgba(255, 255, 255, 0.2);
  }
  .uc-embeddings .uc-details-title {
    font-weight: 700 !important;
    font-size: 1rem !important;
  }
  .uc-embeddings .embedding-list-item-header-title {
    font-weight: 600;
  }
  /* Chip-Schrift unabhängig vom Embed-Breakpoint (mobile/desktop) auf
     Fließtextgröße pinnen; 1rem = Seiten-Basisgröße wie der übrige Text */
  .uc-embeddings .details-tags li,
  .uc-embeddings .uc-details-tag {
    font-size: 1rem !important;
  }
`;

export const UsercentricsEmbed = ({ language }: UsercentricsEmbedProps) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    const ensureOverrideStyle = () => {
      const shadow = containerRef.current?.querySelector(
        '.embeddings-shadow-wrapper'
      )?.shadowRoot;
      if (shadow && !shadow.getElementById(OVERRIDE_STYLE_ID)) {
        const style = document.createElement('style');
        style.id = OVERRIDE_STYLE_ID;
        style.textContent = OVERRIDE_CSS;
        shadow.appendChild(style);
      }
    };

    // hydrateEmbeddings() ersetzt den Shadow-Wrapper bei jedem Aufruf (auch
    // CMP-intern), was injizierte Styles verwirft. Der Observer fängt
    // Wrapper-Ersetzungen im Light DOM ab; CMP-Re-Renders innerhalb des
    // Shadow DOM erzeugen dort aber keine Mutation, daher zusätzlich ein
    // dauerhafter Interval-Wächter (No-op solange der Style vorhanden ist).
    const observer = new MutationObserver(ensureOverrideStyle);
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }
    const styleGuard = setInterval(ensureOverrideStyle, 400);
    ensureOverrideStyle();

    const hydrate = async () => {
      // Bis zu 15s auf die CMP-Initialisierung warten (Loader lädt asynchron)
      for (let i = 0; i < 75 && !cancelled; i++) {
        const cmp = window.__ucCmp;
        if (cmp?.hydrateEmbeddings) {
          try {
            if (!cmp.isInitialized || (await cmp.isInitialized())) {
              try {
                if (
                  cmp.getActiveLanguage &&
                  cmp.changeLanguage &&
                  (await cmp.getActiveLanguage()) !== language
                ) {
                  await cmp.changeLanguage(language);
                }
              } catch {
                // Sprachabgleich ist best effort; Embed rendert sonst in CMP-Sprache
              }
              await cmp.hydrateEmbeddings();
              ensureOverrideStyle();
              return;
            }
          } catch {
            // CMP noch nicht bereit, weiter pollen
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };

    hydrate();
    return () => {
      cancelled = true;
      observer.disconnect();
      clearInterval(styleGuard);
    };
  }, [mounted, language]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} style={{ marginTop: '3rem' }}>
      <div className="uc-embed" {...{ 'uc-data': 'all' }} />
    </div>
  );
};
