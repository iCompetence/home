import type { Metadata, Viewport } from 'next'
import { preload } from 'react-dom'
import HomeNightLavender from '@/components/lavender/HomeNightLavender'

// The night home ("Licht und Linie"): the glass city of Hamburg stands in the
// hero. Next to the current preview home (/lavender/) until it becomes the home
// page; noindex comes from ../layout.tsx.
export const metadata: Metadata = {
  title: 'iCompetence — Separate the signal from the noise.',
}

// The page starts on the night sky: the phone browser's bar takes its colour.
export const viewport: Viewport = { themeColor: '#0b2231' }

export default function HomeNightHamburgPreview() {
  // The glass city is half the first view and a CSS background, which the
  // browser finds late: fetch it with the page, so it does not pop in after the text.
  preload('/images/hamburg-glas-dunkel.webp', { as: 'image', fetchPriority: 'high' })
  // LanguageProvider comes from ../layout.tsx.
  return <HomeNightLavender />
}
