import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { EB_Garamond } from "next/font/google"
import localFont from 'next/font/local';

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
      <body className={`${theinhardt.variable} ${ebGaramond.variable}`} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
