import type { Metadata } from 'next';
import '../../src/index.css';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { usePathname } from 'next/navigation';

type Lang = 'en' | 'de';

const SITE_URL = 'https://icompetence.de';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}

// Only /en and /de exist; anything else 404s at build/export time.
export const dynamicParams = false;

const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'iCompetence – Wir befähigen Unternehmen für die Agentic Era',
    description:
      'Wir befähigen Unternehmen für die Agentic Era auf einer vertrauenswürdigen Datenbasis.',
  },
  en: {
    title: 'iCompetence - We enable companies for the Agentic Era',
    description:
      'We enable companies for the Agentic Era on a trustworthy data foundation.',
  },
};

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
    alternates: {
      canonical: `/${l}/`,
      languages: {
        de: '/de/',
        en: '/en/',
        'x-default': '/de/',
      },
    },
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
  
  const pathname = usePathname();
  const isImprint = pathname?.endsWith('/imprint') || pathname?.endsWith('/imprint/');
  
  const GTM_ID = 'GTM-WMTT46J';
  const USERCENTRICS_ID = 'gRxSmB1lD';

  // JSON-LD structured data for Organization (language-aware description)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'iCompetence',
    url: SITE_URL,
    logo: `${SITE_URL}/iCompetence_logo.svg`,
    description: meta[l].description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+494022636380',
      contactType: 'customer service',
      email: 'info@icompetence.de',
    },
    sameAs: ['https://www.linkedin.com/company/icompetence/'],
  };

  return (
    <html lang={l}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {isImprint && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.UC_UI_SUPPRESS_CMP_DISPLAY = true;`,
            }}
          />
        )}
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
        {children}
      </body>
    </html>
  );
}
