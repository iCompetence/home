'use client'

import { Link2, Users, Clock, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

export const CTValueCards = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Link2,
      title: t('ct.values.card1.title'),
      description: t('ct.values.card1.description')
    },
    {
      icon: Users,
      title: t('ct.values.card2.title'),
      description: t('ct.values.card2.description')
    },
    {
      icon: Clock,
      title: t('ct.values.card3.title'),
      description: t('ct.values.card3.description')
    },
    {
      icon: BarChart3,
      title: t('ct.values.card4.title'),
      description: t('ct.values.card4.description')
    }
  ];

  return (
    <AnimatedSection
      id="values-section"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-[#012332]"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto py-24">
        <div className="max-w-6xl mx-auto" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="ct-benefits-h2"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('ct.values.title')}
            </h2>
          </div>

          {/* Cards Grid */}
          <div
            className="ct-benefits-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="ct-benefit-card border border-white/10 hover:bg-white/[0.02] transition-colors duration-200"
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
                    className="ct-benefit-title"
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '24px',
                      fontWeight: '600',
                      lineHeight: '110%',
                      marginBottom: '16px'
                    }}
                  >
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="ct-benefit-desc"
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '18px',
                      lineHeight: '160%'
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) {
          .ct-benefits-grid {
            gap: 12px !important;
          }
          .ct-benefit-card {
            padding: 20px 20px 32px 20px !important;
          }
        }
        @media (max-width: 768px) {
          .ct-benefits-grid {
            grid-template-columns: 1fr !important;
          }
          .ct-benefits-h2 {
            font-size: 28px !important;
          }
          .ct-benefit-title {
            font-size: 20px !important;
          }
          .ct-benefit-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
