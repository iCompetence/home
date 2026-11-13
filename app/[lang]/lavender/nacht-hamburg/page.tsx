import type { Metadata, Viewport } from 'next'
import HomeNightLavender from '@/components/lavender/HomeNightLavender'

// Variant of the night home study (/lavender/nacht/): the glass city of
// Hamburg stands in the hero instead of at the end of the page. To compare;
// noindex comes from ../layout.tsx.
export const metadata: Metadata = {
  title: 'iCompetence — Separate the signal from the noise.',
}

// The page starts on the night sky: the phone browser's bar takes its colour.
export const viewport: Viewport = { themeColor: '#0b2231' }

export default function HomeNightHamburgPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <HomeNightLavender city="hero" />
}
