import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'iCompetence - We enable companies for the Agentic Era',
  description: 'We enable companies for the Agentic Era on a trustworthy data foundation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
