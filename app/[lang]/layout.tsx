import type { Metadata } from 'next';
// Both stylesheets, in this order, exactly as the redesign was reviewed in its
// preview (the old site's frozen snapshot, then the compiled design system on
// top). The snapshot goes in the cleanup after go-live, with a visual
// comparison of every page; until then removing it could shift details.
// Inter from our own server; neither stylesheet imports it from Google any more.
import '@/styles/fonts.css';
import '../../src/index.css';
import '@/styles/globals.css';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { DevDials } from '@/design-system';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SITE_LANGS, alternates } from '@/lib/i18n-meta';
import { organizationNode } from '@/lib/structured-data';

type Lang = 'en' | 'de';

const SITE_URL = 'https://icompetence.de';

// The published languages (SITE_LANGS in src/lib/i18n-meta.ts): German only
// while English is switched off. Pages that exist in more languages (the
// Media Monitoring legal pages) name them in their own generateStaticParams.
export async function generateStaticParams() {
  return SITE_LANGS.map((lang) => ({ lang }));
}

// Only these exist; anything else 404s at build/export time.
export const dynamicParams = false;

// Defaults for pages without their own metadata (every content page sets its
// own through pageMetadata()): the home page's wording.
const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'KI-Beratung & Data Consulting aus Hamburg | iCompetence',
    description:
      'iCompetence ist eine Beratung für Daten und KI aus Hamburg: Datenstrategie, Web-Analytics, Dashboards, KI-Agenten und KI-Workshops, remote oder bei dir vor Ort.',
  },
  en: {
    title: 'AI and data consulting from Hamburg | iCompetence',
    description:
      'iCompetence is a data and AI consultancy from Hamburg: data strategy, web analytics, dashboards, AI agents and AI workshops, remotely or on site.',
  },
};

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
})();`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: Lang = lang === 'de' ? 'de' : 'en';
  return {
    metadataBase: new URL(SITE_URL),
    title: meta[l].title,
    description: meta[l].description,
    alternates: alternates('', l),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: meta[l].title,
      description: meta[l].description,
      url: `${SITE_URL}/${l}/`,
      siteName: 'iCompetence',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'iCompetence - Data & AI Consulting',
        },
      ],
      locale: l === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta[l].title,
      description: meta[l].description,
      images: ['/og-image.jpg'],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'de') notFound();
  const l: Lang = lang === 'de' ? 'de' : 'en';
  
  const GTM_ID = 'GTM-WMTT46J';
  const USERCENTRICS_ID = 'gRxSmB1lD';

  // The company once per page, the same node the pages link their own
  // structured data to (@id, src/lib/structured-data.tsx).
  const jsonLd = { '@context': 'https://schema.org', ...organizationNode() };

  return (
    <html lang={l}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              /* No consent banner over the legal pages: imprint, (redesign) privacy policy and the
                 Media Monitoring app pages (Meta/LinkedIn reviewers must read them without consent). */
              if (['/imprint', '/imprint/', '/privacy-policy', '/privacy-policy/',
                   '/privacy-media-monitoring', '/privacy-media-monitoring/',
                   '/data-deletion-media-monitoring', '/data-deletion-media-monitoring/',
                   '/terms-media-monitoring', '/terms-media-monitoring/'].some((p) => window.location.pathname.endsWith(p))) {
                window.UC_UI_SUPPRESS_CMP_DISPLAY = true;
              }
              ${
                process.env.NODE_ENV === 'production'
                  ? ''
                  : `/* Local development only: the consent overlay blocks the page
                       until it is answered, which makes every dev reload a chore.
                       This clause is not emitted in production builds. */
                     if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
                       window.UC_UI_SUPPRESS_CMP_DISPLAY = true;
                     }`
              }
            `,
          }}
        />        
        <Script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id={USERCENTRICS_ID}
          strategy="beforeInteractive"
        />
        <Script
          id="gtm-data-layer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://tpol.icompetence.de/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WMTT46J');
            `,
          }}
        />
      </head>

      <body>
        <noscript>
          <iframe
            src={`https://tpol.icompetence.de/ns.html?id=${GTM_ID}`}
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
        {/* One provider for every page; variant "lavender" applies the
            redesign's wording (src/contexts/lavender-overrides.ts and the
            files beside it) over the old site's strings. */}
        <LanguageProvider initialLanguage={l} variant="lavender">
          {children}
        </LanguageProvider>
        {/* Dev-only design/copy panel — compiled out of production. */}
        <DevDials />
      </body>
    </html>
  );
}
