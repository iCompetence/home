'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';
import { Accordion } from './Accordion';
import { AnimatedSection } from './ScrollAnimations';

// Import campaign-tool components
import { CTHero } from './campaign-tool/CTHero';
import { CTValueCards } from './campaign-tool/CTValueCards';
import { CTDemoPreview } from './campaign-tool/CTDemoPreview';
import { CTTestimonials } from './campaign-tool/CTTestimonials';
import { CTFeatures } from './campaign-tool/CTFeatures';
import { CTUseCases } from './campaign-tool/CTUseCases';
import { CTProblemSolution } from './campaign-tool/CTProblemSolution';
import { CTWhyNow } from './campaign-tool/CTWhyNow';
import { CTPricing } from './campaign-tool/CTPricing';
import { CTCTA } from './campaign-tool/CTCTA';
import { CTTrialModal } from './campaign-tool/CTTrialModal';

const logoImage = '/iCompetence_logo.svg';

function CampaignParameterToolPageContent() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showAnchorDropdown, setShowAnchorDropdown] = useState(false);
  const [isAnchorDropdownOpen, setIsAnchorDropdownOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'trial' | 'demo'>('trial');
  const closeMenuRef = useRef<(() => void) | null>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect mobile devices
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section based on scroll position
  useEffect(() => {
    if (!mounted) return;

    const handleScrollForActiveSection = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('section') },
        { id: 'values-section', element: document.getElementById('values-section') },
        { id: 'features-section', element: document.getElementById('features-section') },
        { id: 'pricing-section', element: document.getElementById('pricing-section') },
        { id: 'faq-section', element: document.getElementById('faq-section') },
        { id: 'cta-footer-section', element: document.getElementById('cta-footer-section') }
      ];

      // Check if user has scrolled to bottom of page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isAtBottom) {
        setActiveSection('cta-footer-section');
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('hero');
      }

      const anchorNavSection = document.querySelector('.anchor-nav-section');
      if (anchorNavSection) {
        const rect = anchorNavSection.getBoundingClientRect();
        setShowAnchorDropdown(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScrollForActiveSection, { passive: true });
    handleScrollForActiveSection();

    return () => window.removeEventListener('scroll', handleScrollForActiveSection);
  }, [mounted]);

  // FAQ items
  const faqItems = [
    { title: t('ct.faq.item1.question'), content: t('ct.faq.item1.answer') },
    { title: t('ct.faq.item2.question'), content: t('ct.faq.item2.answer') },
    { title: t('ct.faq.item3.question'), content: t('ct.faq.item3.answer') },
    { title: t('ct.faq.item4.question'), content: t('ct.faq.item4.answer') },
    { title: t('ct.faq.item5.question'), content: t('ct.faq.item5.answer') }
  ];

  const anchorNavItems = [
    { id: 'hero', label: t('ct.anchor.intro'), number: '01' },
    { id: 'values-section', label: t('ct.anchor.values'), number: '02' },
    { id: 'features-section', label: t('ct.anchor.features'), number: '03' },
    { id: 'pricing-section', label: t('ct.anchor.pricing'), number: '04' },
    { id: 'faq-section', label: t('ct.anchor.faq'), number: '05' },
    { id: 'cta-footer-section', label: t('ct.anchor.contact'), number: '06' }
  ];

  // Loading state
  if (!mounted) {
    return (
      <div
        className="relative"
        style={{
          backgroundColor: '#012332',
          minHeight: '100vh',
          overflowX: 'clip',
          width: '100%'
        }}
      />
    );
  }

  return (
    <div
      className="relative"
      style={{
        backgroundColor: '#012332',
        minHeight: '100vh',
        overflowX: 'clip',
        width: '100%'
      }}
    >
      {/* Hero Section */}
      <CTHero onLearnMoreClick={() => scrollToSection('values-section')} onTrialClick={() => { setModalMode('trial'); setIsTrialModalOpen(true); }} />

      {/* Header Background - appears on scroll (mobile only) */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            backgroundColor: '#012332',
            opacity: scrollY > 50 ? 1 : 0,
            zIndex: 40,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Logo - Top Left */}
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

      {/* Anchor Dropdown - Below Header */}
      {showAnchorDropdown && (
        <div
          className="fixed z-40"
          style={{
            top: isMobile ? '80px' : '100px',
            left: '36px',
            opacity: 0,
            animation: 'fadeIn 0.3s ease-out forwards'
          }}
        >
          <div className="relative">
            <button
              onClick={() => setIsAnchorDropdownOpen(!isAnchorDropdownOpen)}
              className="px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2"
              style={{
                background: 'linear-gradient(90deg, #0b99cc 0%, #31a4af 100%)',
                border: 'none',
                color: 'var(--gray-white)',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <span>
                {anchorNavItems.find(item => item.id === activeSection)?.label || 'Intro'}
              </span>
              <ChevronDown
                size={16}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: isAnchorDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {isAnchorDropdownOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#012332] border border-white/20 overflow-hidden"
                style={{
                  minWidth: '200px',
                  animation: 'fadeIn 0.2s ease-out forwards'
                }}
              >
                {anchorNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'hero') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        scrollToSection(item.id);
                      }
                      setIsAnchorDropdownOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                    style={{
                      color: 'var(--gray-white)',
                      opacity: activeSection === item.id ? 1 : 0.6,
                      fontSize: '14px',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    ({item.number}) {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Language Switcher - Mobile only */}
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

      {/* Header Right Side - Desktop only */}
      {!isMobile && (
        <div
          className="fixed top-10 right-6 z-50 flex items-center gap-6"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards'
          }}
        >
          {/* Contact us Button */}
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

          {/* Language Switcher - Hide when scrolled */}
          {scrollY < 50 && <LanguageSwitcher />}

          {/* Burger Menu / Close Button - Desktop */}
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

      {/* CTA Button - Bottom Right - Floating - Mobile only */}
      {isMobile && (
        <button
          onClick={() => {
            window.open('/contact', '_blank');
          }}
          className="fixed right-4 z-50 p-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer flex items-center justify-center"
          style={{
            bottom: '84px',
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards'
          }}
        >
          <Mail size={20} style={{ color: 'var(--gray-white)' }} />
        </button>
      )}

      {/* Burger Menu */}
      <BurgerMenu
        showHeroText={true}
        scrollY={scrollY}
        onMenuStateChange={setIsBurgerMenuOpen}
        onCloseMenuRef={(closeFunc) => { closeMenuRef.current = closeFunc; }}
      />

      {/* Anchor Navigation Section */}
      <section
        className="relative anchor-nav-section"
        style={{
          backgroundColor: '#012332',
          background: 'linear-gradient(90deg, #0b99cc 0%, #31a4af 100%)'
        }}
      >
        <div className="py-16 anchor-nav-padding">
          <div
            className="border-t border-white/10 pt-8 anchor-nav-border-container"
            style={{
              maxWidth: 'calc(1152px + 36px + 24px)',
              margin: '0 auto'
            }}
          >
            <div
              className="anchor-nav-scroll-container"
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <nav
                className="flex flex-row flex-nowrap items-start gap-0 anchor-nav-container"
                style={{
                  width: 'max-content',
                  minWidth: '100%'
                }}
              >
                {anchorNavItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'hero') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className={`anchor-nav-link ${index === 0 ? 'anchor-nav-first' : ''} ${index === anchorNavItems.length - 1 ? 'anchor-nav-last' : ''} group text-left flex-shrink-0`}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      paddingLeft: index === 0 ? '36px' : '32px',
                      paddingRight: index === anchorNavItems.length - 1 ? '24px' : '32px'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="group-hover:text-[#012332] transition-colors"
                        style={{
                          color: 'var(--gray-white)',
                          opacity: activeSection === item.id ? 1 : 0.4,
                          fontSize: '14px',
                          fontWeight: '500',
                          minWidth: '32px'
                        }}
                      >
                        ({item.number})
                      </span>
                      <span
                        className="group-hover:text-[#012332] transition-colors mobile-anchor-text"
                        style={{
                          color: 'var(--gray-white)',
                          opacity: activeSection === item.id ? 1 : 0.4,
                          fontSize: '16px',
                          fontWeight: '500',
                          lineHeight: '140%',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <CTValueCards />
      <CTDemoPreview />
      <CTTestimonials />
      <CTFeatures />
      <CTUseCases />
      <CTProblemSolution />
      <CTWhyNow />
      <CTPricing onTrialClick={() => { setModalMode('trial'); setIsTrialModalOpen(true); }} />

      {/* FAQ Section */}
      <div style={{ backgroundColor: '#012332' }}>
        <Accordion
          id="faq-section"
          title={t('ct.faq.title')}
          items={faqItems}
        />
      </div>

      {/* CTA & Footer Section */}
      <CTCTA onTrialClick={() => { setModalMode('demo'); setIsTrialModalOpen(true); }} />

      {/* Trial Modal */}
      <CTTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        mode={modalMode}
      />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .anchor-nav-border-container {
          padding-left: 36px;
          padding-right: 24px;
        }

        .anchor-nav-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .anchor-nav-scroll-container::-webkit-scrollbar {
          height: 4px;
        }

        .anchor-nav-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .anchor-nav-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .anchor-nav-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .anchor-nav-link {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .anchor-nav-link:last-child {
          border-right: none;
        }

        @media (max-width: 1470px) {
          .anchor-nav-padding {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          .anchor-nav-border-container {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .anchor-nav-link {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .anchor-nav-first {
            padding-left: 16px !important;
          }

          .anchor-nav-last {
            padding-right: 16px !important;
          }

          .mobile-anchor-text {
            font-size: 14px !important;
          }

          .mobile-footer-tagline {
            font-size: 40px !important;
          }
        }

        @media (max-width: 640px) {
          .anchor-nav-link {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .anchor-nav-first {
            padding-left: 16px !important;
          }

          .anchor-nav-last {
            padding-right: 16px !important;
          }

          .mobile-anchor-text {
            font-size: 14px !important;
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
      `}</style>
    </div>
  );
}

export default function CampaignParameterToolPage() {
  return (
    <LanguageProvider>
      <CampaignParameterToolPageContent />
    </LanguageProvider>
  );
}
