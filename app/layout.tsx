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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GTM_ID = 'GTM-WMTT46J';
  const USERCENTRICS_ID = 'gRxSmB1lD';

  return (
    <html lang="de">
      <head>
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