import type { Metadata } from 'next'
import HomeNightLavender from '@/components/lavender/HomeNightLavender'

// Design study: the home page as a night sky ("Licht und Linie"). Lives next
// to the current preview home (/lavender/) so both can be compared; noindex
// comes from ../layout.tsx.
export const metadata: Metadata = {
  title: 'iCompetence — Separate the signal from the noise.',
}

export default function HomeNightPreview() {
  // LanguageProvider comes from ../layout.tsx.
  return <HomeNightLavender />
}
