'use client'

import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

export const CTWhyNow = () => {
  const { t } = useLanguage();

  const drivers = [
    {
      title: t('ct.whyNow.driver1.title'),
      description: t('ct.whyNow.driver1.description')
    },
    {
      title: t('ct.whyNow.driver2.title'),
      description: t('ct.whyNow.driver2.description')
    },
    {
      title: t('ct.whyNow.driver3.title'),
      description: t('ct.whyNow.driver3.description')
    }
  ];

  return (
    <AnimatedSection
      id="whynow-section"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2
              className="ct-whynow-h2"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '2rem'
              }}
            >
              {t('ct.whyNow.title')}
            </h2>
            <p
              className="ct-whynow-desc"
              style={{
                color: 'var(--gray-white)',
                fontSize: '18px',
                lineHeight: '170%',
                maxWidth: '700px'
              }}
            >
              {t('ct.whyNow.keyMessage')}
            </p>
          </div>

          {/* Drivers List */}
          <div className="space-y-0">
            {drivers.map((driver, index) => (
              <div
                key={index}
                className="border-b border-white/10 last:border-b-0"
              >
                <div className="py-6 sm:py-8 px-0 hover:bg-white/[0.02] transition-colors duration-200">
                  <div className="flex items-start gap-4 sm:gap-8">
                    {/* Step Number */}
                    <span
                      className="ct-driver-number"
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '40px',
                        paddingTop: '2px'
                      }}
                    >
                      ({String(index + 1).padStart(2, '0')})
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className="ct-driver-title"
                        style={{
                          color: 'var(--gray-white)',
                          fontSize: '24px',
                          fontWeight: '600',
                          lineHeight: '110%',
                          marginBottom: '0.75rem'
                        }}
                      >
                        {driver.title}
                      </h3>
                      <p
                        className="ct-driver-desc"
                        style={{
                          color: 'var(--gray-light)',
                          fontSize: '18px',
                          lineHeight: '160%',
                          maxWidth: '600px'
                        }}
                      >
                        {driver.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ct-driver-title {
            font-size: 22px !important;
          }
          .ct-driver-desc {
            font-size: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .ct-whynow-h2 {
            font-size: 24px !important;
          }
          .ct-driver-number {
            min-width: 36px !important;
            font-size: 12px !important;
          }
          .ct-driver-title {
            font-size: 18px !important;
          }
          .ct-driver-desc {
            font-size: 14px !important;
          }
          .ct-whynow-desc {
            font-size: 14px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
