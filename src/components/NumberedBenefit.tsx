'use client'

import { AnimatedSection } from './ScrollAnimations';

interface NumberedBenefitProps {
  /** Section ID for scrolling */
  id?: string;
  /** The number to display prominently (e.g., "01", "02") */
  number: string;
  /** Main title/headline */
  title: string;
  /** Description text - can be multiple paragraphs */
  description: string | string[];
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  /** Custom className */
  className?: string;
}

export const NumberedBenefit = ({
  id,
  number,
  title,
  description,
  animationType = 'fadeInUp',
  className = ''
}: NumberedBenefitProps) => {
  const descriptionArray = Array.isArray(description) ? description : [description];

  return (
    <AnimatedSection
      id={id}
      className={`relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Large Number */}
          <div
            className="numbered-benefit-number"
            style={{
              fontSize: 'clamp(120px, 20vw, 200px)',
              fontWeight: '700',
              lineHeight: '1',
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              opacity: 0.9
            }}
          >
            {number}
          </div>

          {/* Divider Line */}
          <div
            style={{
              width: '100%',
              maxWidth: '200px',
              height: '2px',
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              marginBottom: '2rem'
            }}
          />

          {/* Title */}
          <h2
            className="numbered-benefit-title"
            style={{
              color: '#E19B74',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '700',
              lineHeight: '120%',
              marginBottom: '1.5rem'
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <div className="max-w-3xl">
            {descriptionArray.map((paragraph, index) => (
              <p
                key={index}
                className="numbered-benefit-desc"
                style={{
                  color: 'var(--gray-white)',
                  fontSize: '18px',
                  lineHeight: '170%',
                  marginBottom: index < descriptionArray.length - 1 ? '1rem' : '0'
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .numbered-benefit-number {
            font-size: 100px !important;
          }
          .numbered-benefit-title {
            font-size: 24px !important;
          }
          .numbered-benefit-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
