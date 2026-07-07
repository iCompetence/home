import type { Metadata } from 'next'
import LavenderHome from '@/components/LavenderHome'
import { toLang } from '@/lib/i18n-meta'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: 'iCompetence — Separate the signal from the noise.',
    description:
      'We help ambitious teams cut through complexity by turning scattered data into clear decisions and AI into the products & automated processes that deliver lasting results.',
    alternates: { canonical: `/${lang}/lavender/` },
    // Soft-launch preview with placeholder content — keep out of search indexes.
    robots: { index: false, follow: false },
  }
}

export default function LavenderPage() {
  return <LavenderHome />
}
