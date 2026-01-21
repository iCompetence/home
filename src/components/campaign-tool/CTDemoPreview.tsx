'use client'

import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

export const CTDemoPreview = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection
      id="demo-section"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2
            className="ct-demo-h2"
            style={{
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '110%'
            }}
          >
            {t('ct.demo.title')}
          </h2>

          <p
            className="ct-demo-desc"
            style={{
              color: 'var(--gray-white)',
              fontSize: '18px',
              lineHeight: '170%',
              marginBottom: '3rem'
            }}
          >
            {t('ct.demo.description')}
          </p>

          {/* Tool Preview Image */}
          <div
            className="relative w-full overflow-hidden"
            style={{ borderRadius: '16px' }}
          >
            <img
              src="/assets/how-it-works.png"
              alt="How it works"
              className="ct-demo-image"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ct-demo-h2 {
            font-size: 28px !important;
          }
          .ct-demo-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
