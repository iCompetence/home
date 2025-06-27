import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"
import localFont from 'next/font/local'
import Script from 'next/script'

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
})

const theinhardt = localFont({
  src: [
    { path: '../public/fonts/Theinhardt-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Theinhardt-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Theinhardt-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Theinhardt-Light.otf', weight: '300', style: 'normal' },
  ],
  variable: '--font-theinhardt',
});

export const metadata: Metadata = {
  title: "iCompetence",
  description: "Wir sind Ihr Experience Orchestrator",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${theinhardt.variable} ${ebGaramond.variable}`} suppressHydrationWarning={true}>
        {/* Usercentrics Consent Management */}
        <Script
          id="usercentrics-suppression"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.pathname === "/impressum") {
                var UC_UI_SUPPRESS_CMP_DISPLAY = true;
              }
            `
          }}
        />
        
        <Script
          id="usercentrics-cmp"
          src="https://web.cmp.usercentrics.eu/ui/loader.js"
          data-settings-id="gRxSmB1lD"
          strategy="beforeInteractive"
        />
        
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WMTT46J');
            `
          }}
        />
        
        {children}
      </body>
    </html>
  )
}
