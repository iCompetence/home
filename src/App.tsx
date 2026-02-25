'use client'

import { useRef, useState, useEffect } from 'react';
const logoImage = '/iCompetence_logo.svg';
import { Target, BarChart3, Shield, Map, User, Zap, ChevronDown } from 'lucide-react';
import Aurora1 from "./imports/Aurora1";
import AuroraFooter from "./components/AuroraFooter";
import { Home } from "./components/Home";
import { ScrollRevealText } from "./components/ScrollRevealText";
import { TwoColumnOfferWithAccordion } from "./components/TwoColumnOfferWithAccordion";
import { Carousel } from "./components/Carousel";
import { ProcessList } from "./components/ProcessList";
import { StatisticsGrid } from "./components/StatisticsGrid";
import { ImageText } from "./components/ImageText";
import { BrandBanner } from "./components/BrandBanner";
import { Accordion } from "./components/Accordion";
import { AnimatedSection } from "./components/ScrollAnimations";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

function AppContent() {
  const { t } = useLanguage();
  // const [showFooterAurora, setShowFooterAurora] = useState(false);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll functions
  const scrollToIntro = () => {
    const introSection = document.getElementById('intro-section');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer-section');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTools = () => {
    const toolsSection = document.getElementById('context-tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detect when user scrolls near the bottom to show footer aurora
  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Exit early if aurora is already shown
  //     // if (showFooterAurora) return;
  //
  //     const scrollTop = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const docHeight = document.documentElement.scrollHeight;
  //
  //     // Show aurora when near the bottom (within 200px)
  //     if (docHeight - (scrollTop + windowHeight) < 200) {
  //       // setShowFooterAurora(true);
  //       // Remove listener after showing aurora to prevent further calls
  //       window.removeEventListener('scroll', handleScroll);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //
  //   // Cleanup
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div
      className="relative"
      style={{
        backgroundColor: '#012332',
        overflowX: 'hidden',
        width: '100%'
      }}
    >
      {/* 1. Hero/Bühne Section */}
      <Home
        logoImage={logoImage}
        headline="We enable companies for the Agentic Era on a trustworthy data foundation."
        scrollText="Erfahre mehr über uns"
        onScrollClick={scrollToIntro}
        onScrollToPrinciples={scrollToOffer}
        onScrollToToolsServices={scrollToTools}
        entranceTiming={{ logoDelay: 500, heroDelay: 3000 }}
        isFooterVisible={isFooterVisible}
      />

      {/* 2. Be Among Section */}
      <div
        id="intro-section"
        ref={introSectionRef}
        style={{
          backgroundColor: '#012332'
        }}
      >
        <ScrollRevealText
          style={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '110%',
            textAlign: 'left',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {t('beAmong.title')}
          <br /><br />
          {t('beAmong.text')}
          <br /><br />
          <span className="reveal-on-complete" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gray-white)', transition: 'opacity 0.3s ease' }}>
            (*<a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gray-white)', textDecoration: 'none' }}>MIT, 2025, State of AI in Business 2025</a>)
          </span>
        </ScrollRevealText>
      </div>

      {/* 3. Offer Section */}
      <TwoColumnOfferWithAccordion
        id="offer-section"
        label={t('offer.label')}
        title={t('offer.title')}
        subline={t('offer.subline')}
        leftColumn={{
          subHeadline: t('offer.left.headline'),
          introText: t('offer.left.intro'),
          copyText: t('offer.left.copy'),
          outcome: t('offer.left.outcome'),
          accordionTitle: t('offer.left.accordionTitle'),
          services: [
            t('offer.left.service1'),
            t('offer.left.service2'),
            t('offer.left.service3'),
            t('offer.left.service4'),
            t('offer.left.service5'),
            t('offer.left.service6'),
            t('offer.left.service7')
          ]
        }}
        rightColumn={{
          subHeadline: t('offer.right.headline'),
          introText: t('offer.right.intro'),
          copyText: t('offer.right.copy'),
          outcome: t('offer.right.outcome'),
          accordionTitle: t('offer.right.accordionTitle'),
          services: [
            t('offer.right.service1'),
            t('offer.right.service2'),
            t('offer.right.service3'),
            t('offer.right.service4'),
            t('offer.right.service5'),
            t('offer.right.service6')
          ]
        }}
      />

      {/* 4. Context Data Tool Stack Carousel */}
      <Carousel
        id="context-tools-section"
        title={t('contextTools.title')}
        slidesToShowDesktop={2}
        slidesToShowMobile={1}
        items={[
          {
            title: t('contextTools.tool1.title'),
            description: t('contextTools.tool1.description'),
            icon: Target,
            color: "var(--brand-accent-1)",
            link: "https://icompetence.de/campaign-parameter-tool/"
          },
          {
            title: t('contextTools.tool2.title'),
            description: t('contextTools.tool2.description'),
            icon: BarChart3,
            color: "var(--brand-accent-2)"
          },
          {
            title: t('contextTools.tool3.title'),
            description: t('contextTools.tool3.description'),
            icon: Shield,
            color: "var(--brand-primary-light)"
          }
        ]}
      />

      {/* 5. How We Work - Process Steps */}
      <ProcessList
        id="how-we-work-section"
        title={t('howWeWork.title')}
        layout="horizontal"
        steps={[
          {
            label: t('howWeWork.step1.label'),
            description: t('howWeWork.step1.description')
          },
          {
            label: t('howWeWork.step2.label'),
            description: t('howWeWork.step2.description')
          },
          {
            label: t('howWeWork.step3.label'),
            description: t('howWeWork.step3.description')
          },
          {
            label: t('howWeWork.step4.label'),
            description: t('howWeWork.step4.description')
          }
        ]}
      />

      {/* 6. Metrics That Matter */}
      <StatisticsGrid
        id="metrics-section"
        title={t('metrics.title')}
        description={t('metrics.description')}
        statistics={[
          {
            value: t('metrics.stat1.value'),
            label: t('metrics.stat1.label'),
            isPositive: true
          },
          {
            value: t('metrics.stat2.value'),
            label: t('metrics.stat2.label'),
            isPositive: true
          }
        ]}
      />

      {/* 7. Agentic Era Tool Stack Carousel */}
      <Carousel
        id="agentic-tools-section"
        title={t('agenticTools.title')}
        slidesToShowDesktop={2}
        slidesToShowMobile={1}
        items={[
          {
            title: t('agenticTools.tool1.title'),
            description: t('agenticTools.tool1.description'),
            color: "var(--brand-accent-1)",
            link: "https://icompetence.de/icu-user-journey-explorer"
          },
          {
            title: t('agenticTools.tool2.title'),
            description: t('agenticTools.tool2.description'),
            color: "var(--brand-accent-2)",
            link: "https://icompetence.de/intelligentic-search/"
          }
          {
            title: t('agenticTools.tool3.title'),
            description: t('agenticTools.tool3.description'),
            color: "var(--brand-primary-light)",
            link: "https://icompetence.de/iknow/"
          }
        ]}
      />

      {/* 8. Privacy-Led Setups */}
      <ImageText
        id="privacy-led-section"
        title={t('privacyLed.title')}
        copyText={t('privacyLed.copy')}
        description={[
          t('privacyLed.description1'),
          t('privacyLed.description2'),
          t('privacyLed.description3')
        ]}
        image="/images/privacy-led.jpg"
        imageAlt="Privacy and data security"
        layout="image-left"
        cta={{
          text: t('privacyLed.cta'),
          url: "https://icompetence.de/privacy-led-ai/"
        }}
      />

      {/* 8.5 Brand Banner */}
      <BrandBanner
        id="brand-banner-section"
        title={t('brandBanner.title')}
      />

      {/* 9. FAQ Section */}
      <Accordion
        id="faq-section"
        title={t('faq.title')}
        items={[
          {
            title: t('faq.question1.title'),
            content: t('faq.question1.content')
          },
          {
            title: t('faq.question2.title'),
            content: t('faq.question2.content')
          },
          {
            title: t('faq.question3.title'),
            content: t('faq.question3.content')
          },
          {
            title: t('faq.question4.title'),
            content: t('faq.question4.content')
          },
          {
            title: t('faq.question5.title'),
            content: t('faq.question5.content')
          },
          {
            title: t('faq.question6.title'),
            content: t('faq.question6.content')
          },
          {
            title: t('faq.question7.title'),
            content: t('faq.question7.content')
          }
        ]}
      />

      {/* Footer Aurora Background - DISABLED FOR DEBUGGING */}
      {/* <div
        className="fixed w-full"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <Aurora2 />
      </div> */}

      {/* 10. CTA & Footer Section */}
      <div ref={footerRef}>
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
              {t('cta.headline')}
            </p>

            <button
              onClick={() => {
                window.open('/contact', '_blank');
              }}
              className="px-6 sm:px-8 py-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer text-sm sm:text-base"
              style={{
                color: 'var(--gray-white)',
                fontWeight: '500'
              }}
            >
              {t('cta.button')}
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
      </AnimatedSection>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
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
          .mobile-cta-text {
            font-size: 24px !important;
          }
          .mobile-footer-tagline {
            font-size: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}