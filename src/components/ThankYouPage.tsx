'use client'

import { useEffect, useState } from 'react';
import Aurora1 from '../imports/Aurora1';
import { consumePendingFormSuccess, trackThankYouView } from '@/lib/tracking';

const logoImage = '/iCompetence_logo.svg';

const texts = {
  de: {
    title: 'Vielen Dank!',
    message: 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns schnellstmöglich bei Ihnen melden.',
    backToHome: 'Zurück zur Startseite',
  },
  en: {
    title: 'Thank you!',
    message: 'Your message has been sent successfully. We will get back to you as soon as possible.',
    backToHome: 'Back to homepage',
  },
};

interface ThankYouPageProps {
  language: 'de' | 'en';
}

// Gated thank-you page: only renders after submitNetlifyForm stored the
// one-time success flag. Direct visits and reloads are sent to the homepage,
// so a thank_you_view event (and any Ads conversion built on it) can only
// come from a real submission.
export default function ThankYouPage({ language }: ThankYouPageProps) {
  const [verified, setVerified] = useState(false);
  const t = texts[language];

  useEffect(() => {
    const submission = consumePendingFormSuccess();
    if (!submission) {
      window.location.replace('/');
      return;
    }
    trackThankYouView(submission.formId, submission.language ?? language);
    setVerified(true);
  }, [language]);

  if (!verified) {
    return <div style={{ backgroundColor: '#012332', minHeight: '100vh' }} />;
  }

  return (
    <div
      className="relative"
      style={{
        backgroundColor: '#012332',
        minHeight: '100vh',
        overflowX: 'clip',
        width: '100%'
      }}
    >
      <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 py-6">
        <a href="/" aria-label="iCompetence">
          <img src={logoImage} alt="iCompetence" style={{ height: '32px', width: 'auto' }} />
        </a>
      </header>

      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <Aurora1 />
        </div>

        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h1
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '1.5rem'
              }}
            >
              {t.title}
            </h1>
            <p
              style={{
                color: 'var(--gray-white)',
                fontSize: '18px',
                lineHeight: '170%',
                marginBottom: '2.5rem'
              }}
            >
              {t.message}
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: '#0b99cc',
                color: 'var(--gray-white)',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0a88b8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0b99cc'; }}
            >
              {t.backToHome}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
