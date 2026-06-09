import type { Metadata } from 'next';
import LavenderHome from '../../src/components/LavenderHome';

export const metadata: Metadata = {
  title: 'iCompetence — Separate the signal from the noise.',
  description:
    "We help ambitious teams cut through complexity — turning scattered data into clear decisions, and AI into the products and automated processes that deliver lasting results.",
  alternates: { canonical: '/lavender' },
  // Soft-launch preview with placeholder content — keep out of search indexes.
  robots: { index: false, follow: false },
};

export default function LavenderPage() {
  return <LavenderHome />;
}
