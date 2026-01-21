'use client'

import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CTHeroProps {
  onLearnMoreClick: () => void;
  onTrialClick: () => void;
}

export const CTHero = ({ onLearnMoreClick, onTrialClick }: CTHeroProps) => {
  const { t } = useLanguage();

  const bullets = [
    t('ct.hero.bullet1'),
    t('ct.hero.bullet2'),
    t('ct.hero.bullet3'),
    t('ct.hero.bullet4'),
  ];

  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        height: '80vh',
        minHeight: '600px',
        paddingTop: '120px',
        paddingBottom: '40px'
      }}
    >
      {/* Gradient Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #0b99cc 0%, #31a4af 100%)',
          opacity: 1.0,
          zIndex: 0
        }}
      />

      {/* Content */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: 0,
          animation: 'fadeInUp 1s ease-out 0.3s forwards'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="max-w-xl">
            <h1
              className="ct-hero-headline"
              style={{
                color: 'var(--gray-white)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '1.5rem'
              }}
            >
              {t('ct.hero.headline')}
            </h1>
            <p
              className="ct-hero-subheadline"
              style={{
                color: 'var(--gray-white)',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                fontWeight: '400',
                lineHeight: '150%',
                marginBottom: '2rem',
                opacity: 0.9
              }}
            >
              {t('ct.hero.subheadline')}
            </p>

            {/* Bullet Points */}
            <ul className="ct-hero-bullets space-y-3 mb-8">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <Check size={12} style={{ color: 'var(--gray-white)' }} />
                  </div>
                  <span
                    className="ct-hero-bullet-text"
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '16px',
                      lineHeight: '150%',
                      opacity: 0.9
                    }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onTrialClick}
                className="px-8 py-3 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: '#e19b74',
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d18a63';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e19b74';
                }}
              >
                {t('ct.hero.cta1')}
              </button>
              <button
                onClick={onLearnMoreClick}
                className="px-8 py-3 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {t('ct.hero.cta2')}
              </button>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="ct-hero-image-container">
            <img
              src="/assets/hero.png"
              alt="Campaign Parameter Tool"
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
                borderRadius: '16px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ct-hero-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1470px) {
          .ct-hero-image-container > div {
            max-width: 420px !important;
            height: 315px !important;
          }
          .ct-hero-headline {
            font-size: 40px !important;
            margin-bottom: 1rem !important;
          }
          .ct-hero-subheadline {
            font-size: 18px !important;
            margin-bottom: 1.25rem !important;
          }
          .ct-hero-bullets {
            margin-bottom: 1.25rem !important;
          }
          .ct-hero-bullets li {
            margin-bottom: 0.25rem !important;
          }
          .ct-hero-bullet-text {
            font-size: 14px !important;
          }
        }

        @media (max-width: 1280px) {
          .ct-hero-image-container > div {
            max-width: 380px !important;
            height: 285px !important;
          }
          .ct-hero-headline {
            font-size: 36px !important;
          }
          .ct-hero-subheadline {
            font-size: 16px !important;
          }
        }

        @media (max-width: 1023px) {
          .ct-hero-image-container {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .ct-hero-headline {
            font-size: 28px !important;
          }
          .ct-hero-subheadline {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
