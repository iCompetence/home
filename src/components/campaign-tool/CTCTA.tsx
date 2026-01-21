'use client'

import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';
import AuroraFooter from '../AuroraFooter';

interface CTCTAProps {
  onTrialClick: () => void;
}

export const CTCTA = ({ onTrialClick }: CTCTAProps) => {
  const { t } = useLanguage();

  return (
    <AnimatedSection
      id="cta-footer-section"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
      animationType="fadeInUp"
      duration={0}
    >
      {/* Footer Aurora Background */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <AuroraFooter />
      </div>

      {/* CTA */}
      <div className="container mx-auto relative z-10" style={{ marginBottom: '120px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="mobile-cta-text"
            style={{
              color: 'var(--gray-white)',
              fontSize: '32px',
              fontWeight: '600',
              lineHeight: '140%',
              marginBottom: '2.5rem',
              letterSpacing: '-0.01em'
            }}
          >
            {t('ct.cta.title')}
          </p>

          <button
            onClick={onTrialClick}
            className="px-6 sm:px-8 py-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer text-sm sm:text-base"
            style={{
              color: 'var(--gray-white)',
              fontWeight: '500'
            }}
          >
            {t('ct.cta.button')}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-24">
              {/* Left Side - Tagline */}
              <div>
                <p className="mobile-footer-tagline" style={{
                  color: 'var(--gray-white)',
                  fontSize: '64px',
                  fontWeight: '700',
                  lineHeight: '110%'
                }}>
                  {t('footer.tagline')}
                </p>
              </div>

              {/* Right Side - Contact & Social */}
              <div className="lg:text-right">
                {/* Social Media Icons */}
                <div className="flex gap-4 lg:justify-end mb-8">
                  <button
                    onClick={() => window.open('https://www.linkedin.com/company/icompetence/posts/?feedView=all', '_blank')}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                    style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none' }}
                    onMouseEnter={(e) => {
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as SVGElement).style.color = '#0B99CC';
                    }}
                    onMouseLeave={(e) => {
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as SVGElement).style.color = 'var(--gray-white)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--gray-white)', transition: 'color 0.3s ease' }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div>
                    <p style={{
                      color: 'var(--gray-light)',
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      {t('footer.inquiries')}
                    </p>
                    <button
                      onClick={() => window.open('mailto:info@icompetence.de', '_blank')}
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '18px',
                        fontWeight: '500',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'right',
                        padding: '0',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = '#0B99CC'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-white)'}
                    >
                      info@icompetence.de
                    </button>
                  </div>
                  <div>
                    <p style={{
                      color: 'var(--gray-light)',
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      {t('footer.phone')}
                    </p>
                    <button
                      onClick={() => window.open('tel:+494060945510', '_blank')}
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '18px',
                        fontWeight: '500',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'right',
                        padding: '0',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = '#0B99CC'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-white)'}
                    >
                      +49 40 609 45 51-0
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
              <div className="flex gap-8 mb-4 sm:mb-0">
                <button
                  onClick={() => window.open('/imprint', '_blank')}
                  style={{
                    color: 'var(--gray-light)',
                    fontSize: '16px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = '#FCFCFC'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-light)'}
                >
                  {t('footer.imprint')}
                </button>
                <button
                  onClick={() => window.open('/imprint', '_blank')}
                  style={{
                    color: 'var(--gray-light)',
                    fontSize: '16px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = '#FCFCFC'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-light)'}
                >
                  {t('footer.privacy')}
                </button>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 group"
                style={{
                  color: 'var(--gray-light)',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#FCFCFC';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) (icon as SVGElement).style.color = '#FCFCFC';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-light)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) (icon as SVGElement).style.color = 'var(--gray-light)';
                }}
              >
                {t('footer.backToTop')}
                <ChevronDown
                  size={16}
                  className="transform rotate-180 group-hover:translate-y-[-2px] transition-transform"
                  style={{ color: 'var(--gray-light)', transition: 'color 0.3s ease' }}
                />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1280px) {
          .mobile-footer-tagline {
            font-size: 48px !important;
          }
        }
        @media (max-width: 1024px) {
          .mobile-cta-text {
            font-size: 28px !important;
          }
          .mobile-footer-tagline {
            font-size: 40px !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-cta-text {
            font-size: 22px !important;
          }
          .mobile-footer-tagline {
            font-size: 32px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
