'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';
import AuroraFooter from './AuroraFooter';
import { AnimatedSection } from './ScrollAnimations';
import { ServiceAccordion } from './ServiceAccordion';

const logoImage = '/iCompetence_logo.svg';

function ImpressumPageContent() {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeMenuRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile, { passive: true });

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div
        className="relative"
        style={{
          backgroundColor: '#012332',
          minHeight: '100vh',
          overflowX: 'hidden',
          width: '100%'
        }}
      >
        <section
          className="relative flex items-center justify-center"
          style={{
            height: '80vh',
            minHeight: '400px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0b99cc 0%, #012332 100%)',
              opacity: 1.0,
              zIndex: 0
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
            <div className="text-center max-w-4xl mx-auto">
              <h1
                className="hero-headline"
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(48px, 8vw, 96px)',
                  fontWeight: '700',
                  lineHeight: '110%',
                  marginBottom: '1.5rem'
                }}
              >
                {t('imprint.hero.title')}
              </h1>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className="relative"
      style={{
        backgroundColor: '#012332',
        minHeight: '100vh',
        overflowX: 'hidden',
        width: '100%'
      }}
    >
      <section
        className="relative flex items-center justify-center"
        style={{
          height: '80vh',
          minHeight: '400px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0b99cc 0%, #012332 100%)',
            opacity: 1.0,
            zIndex: 0
          }}
        />

        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            position: 'relative',
            zIndex: 1,
            opacity: 0,
            animation: 'fadeInUp 1s ease-out 0.3s forwards'
          }}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="hero-headline"
              style={{
                color: 'var(--gray-white)',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '1.5rem'
              }}
            >
              {t('imprint.hero.title')}
            </h1>
          </div>
        </div>
      </section>

      <div
        className="fixed z-50 cursor-pointer"
        style={{
          top: '40px',
          left: '36px',
          opacity: 0,
          animation: 'fadeIn 0.8s ease-out 0.6s forwards'
        }}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        <ImageWithFallback
          src={logoImage}
          alt="Logo"
          className="h-6"
          style={{ width: 'auto' }}
        />
      </div>

      {isMobile && scrollY < 50 && (
        <div
          className="fixed top-8 z-50"
          style={{
            right: '80px',
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards',
            transform: 'scale(0.9)'
          }}
        >
          <LanguageSwitcher />
        </div>
      )}

      {!isMobile && (
        <div
          className="fixed top-10 right-6 z-50 flex items-center gap-6"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards'
          }}
        >
          <button
            onClick={() => {
              window.open('/contact', '_blank');
            }}
            className="px-6 py-2.5 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer"
            style={{
              color: 'var(--gray-white)',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {t('header.contact')}
          </button>

          {scrollY < 50 && <LanguageSwitcher />}

          {!isBurgerMenuOpen ? (
            <button
              onClick={() => {
                const burgerButton = document.querySelector('[data-burger-menu]') as HTMLButtonElement;
                if (burgerButton) burgerButton.click();
              }}
              className="p-3 rounded-full transition-all duration-300 hover:bg-white/10 cursor-pointer"
              style={{
                background: 'transparent',
                border: 'none'
              }}
              data-burger-trigger-desktop
            >
              <svg
                width="28"
                height="16"
                viewBox="0 0 28 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="2"
                  x2="28"
                  y2="2"
                  stroke="var(--gray-white)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="0"
                  y1="14"
                  x2="28"
                  y2="14"
                  stroke="var(--gray-white)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                if (closeMenuRef.current) closeMenuRef.current();
              }}
              className="rounded-full transition-all duration-300 hover:bg-white/10 cursor-pointer flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                padding: '10px',
                width: '44px',
                height: '44px'
              }}
            >
              <X size={20} style={{ color: 'var(--gray-white)' }} />
            </button>
          )}
        </div>
      )}

      {isMobile && (
        <button
          onClick={() => {
            window.open('/contact', '_blank');
          }}
          className="fixed bottom-6 right-4 z-50 p-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer flex items-center justify-center"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards'
          }}
        >
          <Mail size={20} style={{ color: 'var(--gray-white)' }} />
        </button>
      )}

      <BurgerMenu
        showHeroText={true}
        scrollY={scrollY}
        onMenuStateChange={setIsBurgerMenuOpen}
        onCloseMenuRef={(closeFunc) => { closeMenuRef.current = closeFunc; }}
      />

      <section id="content-section" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#012332' }}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div
              style={{
                color: 'var(--gray-white)',
                fontSize: '16px',
                lineHeight: '180%'
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#0b99cc'
                  }}
                >
                  {t('imprint.section1.title')}
                </h2>
                <p><strong>{t('imprint.section1.company')}</strong></p>
                <p>Weidenallee 10c<br />20357 Hamburg</p>
                <p><strong>{t('imprint.section1.director')}</strong> Matthias Postel</p>
                <p>
                  {t('footer.phone')}: +49 40 609 45 51-0<br />
                  Fax: +49 40 609 45 51-99<br />
                  Email: <a href="mailto:info@iCompetence.de" style={{ color: '#0b99cc', textDecoration: 'none' }}>info@iCompetence.de</a>
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#0b99cc'
                  }}
                >
                  {t('imprint.section2.title')}
                </h2>
                <p>{t('imprint.section2.content')}</p>
                <p>
                  {t('imprint.section2.court')}<br />
                  {t('imprint.section2.number')}<br />
                  {t('imprint.section2.taxNumber')}<br />
                  {t('imprint.section2.vatId')}
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#0b99cc'
                  }}
                >
                  {t('imprint.section3.title')}
                </h2>
                <p>KREMS<br />Das Gute Bild</p>
                <p>
                  Hamburg.Berlin.<br />
                  <a href="http://www.FrankKrems.de" style={{ color: '#0b99cc', textDecoration: 'none' }}>www.FrankKrems.de</a><br />
                  +49 172 851 15 20
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#0b99cc'
                  }}
                >
                  {t('imprint.section4.title')}
                </h2>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '1.5rem',
                    marginBottom: '0.75rem',
                    color: 'var(--gray-white)'
                  }}
                >
                  {t('imprint.section4.content.title')}
                </h3>
                <p>
                  {t('imprint.section4.content.text')}
                </p>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '1.5rem',
                    marginBottom: '0.75rem',
                    color: 'var(--gray-white)'
                  }}
                >
                  {t('imprint.section4.links.title')}
                </h3>
                <p>
                  {t('imprint.section4.links.text')}
                </p>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '1.5rem',
                    marginBottom: '0.75rem',
                    color: 'var(--gray-white)'
                  }}
                >
                  {t('imprint.section4.copyright.title')}
                </h3>
                <p>
                  {t('imprint.section4.copyright.text')}
                </p>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginTop: '1.5rem',
                    marginBottom: '0.75rem',
                    color: 'var(--gray-white)'
                  }}
                >
                  {t('imprint.section4.privacy.title')}
                </h3>
                <p>
                  {t('imprint.section4.privacy.text1')}
                </p>
                <p>
                  {t('imprint.section4.privacy.text2')}
                </p>
                <p>
                  {t('imprint.section4.privacy.text3')}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--gray-light)', marginTop: '1rem' }}>
                  {t('imprint.source')}
                </p>

                {/* Service Details Accordions */}
                <ServiceAccordion language={language} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection
        id="cta-footer-section"
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        animationType="fadeInUp"
        duration={0}
      >
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

        <footer className="relative z-10">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-24">
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

                <div className="lg:text-right">
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

              <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
                <div className="flex gap-8 mb-4 sm:mb-0">
                  <button
                    onClick={() => window.location.href = '/imprint'}
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
                    onClick={() => window.location.href = '/imprint'}
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
      </AnimatedSection>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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

        @media (max-width: 768px) {
          .mobile-footer-tagline {
            font-size: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ImpressumPage() {
  return (
    <LanguageProvider>
      <ImpressumPageContent />
    </LanguageProvider>
  );
}
