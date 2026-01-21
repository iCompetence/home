'use client'

import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

interface CTPricingProps {
  onTrialClick: () => void;
}

export const CTPricing = ({ onTrialClick }: CTPricingProps) => {
  const { t } = useLanguage();

  const tiers = [
    {
      name: t('ct.pricing.tier1.name'),
      rooms: t('ct.pricing.tier1.rooms'),
      price: '35',
      yearly: '420',
      highlighted: true,
      badge: t('ct.pricing.trialBadge')
    },
    {
      name: t('ct.pricing.tier2.name'),
      rooms: t('ct.pricing.tier2.rooms'),
      price: '30',
      yearly: '360',
      highlighted: false,
      badge: null
    },
    {
      name: t('ct.pricing.tier3.name'),
      rooms: t('ct.pricing.tier3.rooms'),
      price: '25',
      yearly: '300',
      highlighted: false,
      badge: null
    }
  ];

  return (
    <AnimatedSection
      id="pricing-section"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#012332]"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="ct-pricing-h2"
              style={{
                color: 'var(--gray-white)',
                fontSize: '40px',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '2rem'
              }}
            >
              {t('ct.pricing.title')}
            </h2>
            <p
              className="ct-pricing-desc"
              style={{
                color: 'var(--gray-light)',
                fontSize: '18px',
                lineHeight: '170%',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {t('ct.pricing.description')}
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div
            className="ct-pricing-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '48px'
            }}
          >
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="ct-pricing-card"
                style={{
                  position: 'relative',
                  border: tier.highlighted
                    ? '1px solid #0b99cc'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '40px 24px',
                  textAlign: 'center'
                }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#0b99cc',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 16px',
                      borderRadius: '20px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Tier Name */}
                <h3
                  className="ct-tier-name"
                  style={{
                    color: 'var(--gray-white)',
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}
                >
                  {tier.name}
                </h3>

                {/* Rooms */}
                <p
                  className="ct-tier-rooms"
                  style={{
                    color: 'var(--gray-light)',
                    fontSize: '16px',
                    marginBottom: '24px'
                  }}
                >
                  {tier.rooms}
                </p>

                {/* Price */}
                <div style={{ marginBottom: '12px' }}>
                  <span
                    className="ct-tier-price"
                    style={{
                      color: '#0b99cc',
                      fontSize: '40px',
                      fontWeight: '700'
                    }}
                  >
                    {tier.price}€
                  </span>
                  <span
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '16px'
                    }}
                  >
                    /{t('ct.pricing.perMonth')}
                  </span>
                </div>

                {/* Yearly Billing */}
                <p
                  style={{
                    color: 'var(--gray-light)',
                    fontSize: '14px'
                  }}
                >
                  {t('ct.pricing.yearly')} {tier.yearly}€
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
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
              {t('ct.pricing.cta')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) {
          .ct-pricing-grid {
            gap: 12px !important;
          }
          .ct-pricing-card {
            padding: 32px 16px !important;
          }
        }
        @media (max-width: 1024px) {
          .ct-pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            gap: 24px !important;
          }
          .ct-pricing-card {
            padding: 40px 24px !important;
          }
        }
        @media (max-width: 768px) {
          .ct-pricing-h2 {
            font-size: 28px !important;
          }
          .ct-pricing-desc {
            font-size: 16px !important;
          }
          .ct-tier-name {
            font-size: 20px !important;
          }
          .ct-tier-price {
            font-size: 32px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
