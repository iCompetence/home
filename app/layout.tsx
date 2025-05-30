import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { EB_Garamond } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
})

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
      <body className={`${inter.variable} ${ebGaramond.variable} font-sans`}>{children}</body>
    </html>
  )
}
