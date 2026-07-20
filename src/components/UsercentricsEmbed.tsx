'use client'

import { useEffect, useState } from 'react';

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

// Rendert die Service-Liste des Usercentrics-CMP (Settings-ID aus dem Layout-Loader)
// über das offizielle uc-embed-Element. Der CMP-v3-Loader scannt nur beim Init nach
// .uc-embed-Divs; ein von React nach der Hydration gerendertes Div muss daher explizit
// per __ucCmp.hydrateEmbeddings() befüllt werden. Das Div darf nicht im Server-HTML
// stehen, sonst schreibt der CMP vor der React-Hydration hinein (Mismatch #418,
// gleiches Muster wie bei den Netlify-reCAPTCHA-Divs).
export const UsercentricsEmbed = ({ language }: UsercentricsEmbedProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

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
    };
  }, [mounted, language]);

  if (!mounted) return null;

  return (
    <div
      style={{
        marginTop: '3rem',
        background: 'var(--gray-white)',
        borderRadius: '12px',
        padding: '1.5rem 2rem'
      }}
    >
      {/* Embed rendert mit CMP-Theme-Farben (dunkler Text) und braucht hellen Grund */}
      <div className="uc-embed" {...{ 'uc-data': 'all' }} />
    </div>
  );
};
