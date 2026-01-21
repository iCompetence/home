'use client'

import { Megaphone, LineChart, Building2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

export const CTUseCases = () => {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: Megaphone,
      title: t('ct.useCases.card1.title'),
      description: t('ct.useCases.card1.description')
    },
    {
      icon: LineChart,
      title: t('ct.useCases.card2.title'),
      description: t('ct.useCases.card2.description')
    },
    {
      icon: Building2,
      title: t('ct.useCases.card3.title'),
      description: t('ct.useCases.card3.description')
    }
  ];

  return (
    <AnimatedSection
      id="usecases-section"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-[#012332]"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto py-24">
        <div className="max-w-6xl mx-auto" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="ct-usecases-h2"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1.5rem'
              }}
            >
              {t('ct.useCases.title')}
            </h2>
            <p
              className="ct-usecases-desc"
              style={{
                color: 'var(--gray-white)',
                fontSize: '18px',
                lineHeight: '170%',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              {t('ct.useCases.description')}
            </p>
          </div>

          {/* Cards Grid - 1x3 */}
          <div
            className="ct-usecases-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}
          >
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <div
                  key={index}
                  className="ct-usecase-card border border-white/10 hover:bg-white/[0.02] transition-colors duration-200"
                  style={{
                    padding: '24px 24px 40px 24px'
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(11, 153, 204, 0.15)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '24px'
                    }}
                  >
                    <IconComponent
                      size={24}
                      style={{ color: '#0b99cc' }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="ct-usecase-title"
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '24px',
                      fontWeight: '600',
                      lineHeight: '110%',
                      marginBottom: '16px'
                    }}
                  >
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="ct-usecase-desc"
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '18px',
                      lineHeight: '160%'
                    }}
                  >
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) {
          .ct-usecases-grid {
            gap: 12px !important;
          }
          .ct-usecase-card {
            padding: 20px 20px 32px 20px !important;
          }
        }
        @media (max-width: 1024px) {
          .ct-usecases-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        @media (max-width: 768px) {
          .ct-usecases-h2 {
            font-size: 28px !important;
          }
          .ct-usecases-desc {
            font-size: 16px !important;
          }
          .ct-usecase-title {
            font-size: 20px !important;
          }
          .ct-usecase-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
