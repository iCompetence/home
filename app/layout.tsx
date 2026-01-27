import type { Metadata } from 'next';
import '../src/index.css';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.icompetence.de'),
  title: 'iCompetence - We enable companies for the Agentic Era',
  description: 'We enable companies for the Agentic Era on a trustworthy data foundation.',
  alternates: {
    canonical: '/',
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
    title: 'iCompetence - We enable companies for the Agentic Era',
    description: 'We enable companies for the Agentic Era on a trustworthy data foundation.',
    url: 'https://www.icompetence.de',
    siteName: 'iCompetence',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'iCompetence - Data & AI Consulting',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iCompetence - We enable companies for the Agentic Era',
    description: 'We enable companies for the Agentic Era on a trustworthy data foundation.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

// JSON-LD structured data for Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'iCompetence',
  url: 'https://www.icompetence.de',
  logo: 'https://www.icompetence.de/iCompetence_logo.svg',
  description: 'We enable companies for the Agentic Era on a trustworthy data foundation.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-40-609-45-51-0',
    contactType: 'customer service',
    email: 'info@icompetence.de',
  },
  sameAs: [
    'https://www.linkedin.com/company/icompetence/',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GTM_ID = 'GTM-WMTT46J';
  const USERCENTRICS_ID = 'gRxSmB1lD';

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://tpol.icompetence.de/ajwjejean.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','59gltp=BwVYLTEnWj0jNTFeUyBRHFNTS1tDDhlXBwIKBxUPAw8AAgBEAQ8%3D');
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