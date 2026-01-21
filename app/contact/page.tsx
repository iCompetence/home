import type { Metadata } from 'next'
import ContactPage from '../../src/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact | iCompetence',
  description: 'Get in touch with iCompetence - your partner for data and AI.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Contact() {
  return <ContactPage />
}
