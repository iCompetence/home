'use client'

import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

export const CTTestimonials = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      logo: { name: 'Freudenberg', src: '/images/logos/freudenberg-white.png' },
      quote: t('ct.testimonials.item1.quote'),
      role: t('ct.testimonials.item1.role'),
      company: t('ct.testimonials.item1.company')
    },
    {
      logo: { name: 'Eventim', src: '/images/logos/eventim-white.png' },
      quote: t('ct.testimonials.item2.quote'),
      role: t('ct.testimonials.item2.role'),
      company: t('ct.testimonials.item2.company')
    },
    {
      logo: { name: 'PepXpress', src: '/images/logos/pepxpress-white.webp' },
      quote: t('ct.testimonials.item3.quote'),
      role: t('ct.testimonials.item3.role'),
      company: t('ct.testimonials.item3.company')
    }
  ];

  return (
    <AnimatedSection
      id="testimonials-section"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2
              className="ct-testimonials-h2"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%'
              }}
            >
              {t('ct.testimonials.title')}
            </h2>
          </div>

          {/* Logo Row */}
          <div
            className="ct-logos-row"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '64px',
              marginBottom: '64px',
              flexWrap: 'wrap'
            }}
          >
            {testimonials.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  opacity: activeIndex === index ? 1 : 0.4,
                  transition: 'opacity 0.3s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px'
                }}
                className="ct-logo-item"
              >
                <img
                  src={item.logo.src}
                  alt={item.logo.name}
                  style={{
                    height: '56px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Testimonial Card */}
          <div
            className="ct-testimonial-card border border-white/10 hover:bg-white/[0.02] transition-colors duration-200"
            style={{
              padding: '48px',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            {/* Quote Icon */}
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  color: '#0b99cc',
                  fontSize: '48px',
                  fontWeight: '700',
                  lineHeight: '1',
                  fontFamily: 'Georgia, serif'
                }}
              >
                &#8220;
              </span>
            </div>

            {/* Quote Text */}
            <p
              className="ct-testimonial-quote"
              style={{
                color: 'var(--gray-white)',
                fontSize: '24px',
                lineHeight: '160%',
                marginBottom: '32px',
                transition: 'opacity 0.3s ease'
              }}
            >
              {testimonials[activeIndex].quote}
            </p>

            {/* Attribution */}
            <div className="text-center">
              <p
                className="ct-testimonial-role"
                style={{
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}
              >
                {testimonials[activeIndex].role}
              </p>
              <p
                style={{
                  color: 'var(--gray-light)',
                  fontSize: '14px'
                }}
              >
                {testimonials[activeIndex].company}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ct-logo-item:hover {
          opacity: 0.8 !important;
        }

        @media (max-width: 1024px) {
          .ct-logos-row {
            gap: 48px !important;
          }
        }

        @media (max-width: 768px) {
          .ct-testimonials-h2 {
            font-size: 28px !important;
          }
          .ct-logos-row {
            gap: 24px !important;
          }
          .ct-logo-item img {
            height: 40px !important;
          }
          .ct-testimonial-card {
            padding: 24px !important;
          }
          .ct-testimonial-quote {
            font-size: 18px !important;
          }
          .ct-testimonial-role {
            font-size: 14px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
