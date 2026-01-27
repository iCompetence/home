'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import Aurora1 from "../imports/Aurora1";
import { LanguageSwitcher } from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';
import { StaticText } from './StaticText';
import { Carousel } from './Carousel';
import { ImageText } from './ImageText';
import { Accordion } from './Accordion';
import AuroraFooter from './AuroraFooter';
import { AnimatedSection } from './ScrollAnimations';

const logoImage = '/iCompetence_logo.svg';

function ICUUserJourneyExplorerPageContent() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showAnchorDropdown, setShowAnchorDropdown] = useState(false);
  const [isAnchorDropdownOpen, setIsAnchorDropdownOpen] = useState(false);
  const closeMenuRef = useRef<(() => void) | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

  // Scroll detection for Aurora fade
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setHasScrolled(currentScrollY > 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, [mounted]);

  // Detect active section based on scroll position and anchor nav visibility
  useEffect(() => {
    // Only run after mounted to avoid hydration mismatch
    if (!mounted) return;

    const handleScrollForActiveSection = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('section') },
        { id: 'offer-section', element: document.getElementById('offer-section') },
        { id: 'services-section', element: document.getElementById('services-section') },
        { id: 'guidance-section', element: document.getElementById('guidance-section') },
        { id: 'faq-section', element: document.getElementById('faq-section') },
        { id: 'cta-footer-section', element: document.getElementById('cta-footer-section') }
      ];

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

      // If at the very top, set to hero
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }

      // Check if anchor nav is out of viewport
      const anchorNavSection = document.querySelector('.anchor-nav-section');
      if (anchorNavSection) {
        const rect = anchorNavSection.getBoundingClientRect();
        setShowAnchorDropdown(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScrollForActiveSection, { passive: true });
    handleScrollForActiveSection(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScrollForActiveSection);
  }, [mounted]);

  // Don't render until mounted to avoid hydration mismatch
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
      >
        <section
          className="relative flex items-center justify-center"
          style={{ height: '80vh' }}
        >
          {/* Aurora Background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              zIndex: 0
            }}
          >
            <Aurora1 />
          </div>
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
                {t('icu.hero.title')}
              </h1>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(24px, 4vw, 48px)',
                  fontWeight: '500',
                  lineHeight: '130%'
                }}
              >
                {t('icu.hero.subline')}
              </p>
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
        overflowX: 'clip',
        width: '100%'
      }}
    >
      {/* Aurora Background - Fixed, fades on scroll */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          opacity: hasScrolled ? 0 : 1,
          transition: hasScrolled
            ? 'opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
            : 'opacity 1s ease-out 0.3s',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <Aurora1 />
      </div>

      {/* Hero + Anchor Nav Container */}
      <div className="relative">

        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center"
          style={{ height: '80vh', zIndex: 1 }}
        >
          {/* Hero Text */}
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
                {t('icu.hero.title')}
              </h1>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(24px, 4vw, 48px)',
                  fontWeight: '500',
                  lineHeight: '130%'
                }}
              >
                {t('icu.hero.subline')}
              </p>
            </div>
          </div>
        </section>

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
          opacity: scrollY < 100 || isFooterVisible ? 1 : 0,
          transform: scrollY < 100 || isFooterVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
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

      {/* Anchor Dropdown - Aligned with Contact button */}
      {showAnchorDropdown && (
        <div
          className="fixed z-40"
          style={{
            top: isMobile ? '80px' : (isFooterVisible ? '100px' : '40px'),
            left: '36px',
            transition: 'top 0.4s ease-out'
          }}
        >
          <div className="relative">
            <button
              onClick={() => setIsAnchorDropdownOpen(!isAnchorDropdownOpen)}
              className="px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2"
              style={{
                background: 'linear-gradient(90deg, #31A4AF 0%, #117FA9 100%)',
                border: 'none',
                color: 'var(--gray-white)',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <span>
                {activeSection === 'hero' && 'Intro'}
                {activeSection === 'offer-section' && 'Status Quo'}
                {activeSection === 'services-section' && 'Benefits'}
                {activeSection === 'guidance-section' && 'More about ICU'}
                {activeSection === 'faq-section' && 'FAQ'}
                {activeSection === 'cta-footer-section' && 'Contact'}
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
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsAnchorDropdownOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                  style={{
                    color: 'var(--gray-white)',
                    opacity: activeSection === 'hero' ? 1 : 0.6,
                    fontSize: '14px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (01) Intro
                </button>
                <button
                  onClick={() => {
                    scrollToSection('offer-section');
                    setIsAnchorDropdownOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                  style={{
                    color: 'var(--gray-white)',
                    opacity: activeSection === 'offer-section' ? 1 : 0.6,
                    fontSize: '14px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (02) Status Quo
                </button>
                <button
                  onClick={() => {
                    scrollToSection('services-section');
                    setIsAnchorDropdownOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                  style={{
                    color: 'var(--gray-white)',
                    opacity: activeSection === 'services-section' ? 1 : 0.6,
                    fontSize: '14px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (03) Benefits
                </button>
                <button
                  onClick={() => {
                    scrollToSection('guidance-section');
                    setIsAnchorDropdownOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                  style={{
                    color: 'var(--gray-white)',
                    opacity: activeSection === 'guidance-section' ? 1 : 0.6,
                    fontSize: '14px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (04) More about ICU
                </button>
                <button
                  onClick={() => {
                    scrollToSection('faq-section');
                    setIsAnchorDropdownOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                  style={{
                    color: 'var(--gray-white)',
                    opacity: activeSection === 'faq-section' ? 1 : 0.6,
                    fontSize: '14px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (05) FAQ
                </button>
                <button
                  onClick={() => {
                    scrollToSection('cta-footer-section');
                    setIsAnchorDropdownOpen(false);
                  }}
                  className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors"
                  style={{
                    color: 'var(--gray-white)',
                    opacity: activeSection === 'cta-footer-section' ? 1 : 0.6,
                    fontSize: '14px',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  (06) Contact
                </button>
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

          {/* Burger Menu / Close Button - Desktop */}
          {!isBurgerMenuOpen ? (
            <button
              onClick={() => {
                // Trigger burger menu
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
          zIndex: 1
        }}
      >
        <div className="py-16 relative">
          {/* Border container - respects padding on desktop */}
          <div
            className="border-t border-white/10 pt-8 anchor-nav-border-container"
            style={{
              maxWidth: 'calc(1152px + 36px + 24px)',
              margin: '0 auto'
            }}
          >
            {/* Scroll container - full width, handles horizontal scroll */}
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
                {/* Intro Link */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="anchor-nav-link anchor-nav-first group text-left flex-shrink-0"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    paddingLeft: '36px',
                    paddingRight: '32px'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'hero' ? 1 : 0.4,
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '32px'
                      }}
                    >
                      (01)
                    </span>
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'hero' ? 1 : 0.4,
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Intro
                    </span>
                  </div>
                </button>

                {/* Status Quo Link (Offer Section) */}
                <button
                  onClick={() => scrollToSection('offer-section')}
                  className="anchor-nav-link group text-left flex-shrink-0"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    paddingLeft: '32px',
                    paddingRight: '32px'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'offer-section' ? 1 : 0.4,
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '32px'
                      }}
                    >
                      (02)
                    </span>
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'offer-section' ? 1 : 0.4,
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Status Quo
                    </span>
                  </div>
                </button>

                {/* Benefits Link */}
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="anchor-nav-link group text-left flex-shrink-0"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    paddingLeft: '32px',
                    paddingRight: '32px'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'services-section' ? 1 : 0.4,
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '32px'
                      }}
                    >
                      (03)
                    </span>
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'services-section' ? 1 : 0.4,
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Benefits
                    </span>
                  </div>
                </button>

                {/* More about ICU Link */}
                <button
                  onClick={() => scrollToSection('guidance-section')}
                  className="anchor-nav-link group text-left flex-shrink-0"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    paddingLeft: '32px',
                    paddingRight: '32px'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'guidance-section' ? 1 : 0.4,
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '32px'
                      }}
                    >
                      (04)
                    </span>
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'guidance-section' ? 1 : 0.4,
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      More about ICU
                    </span>
                  </div>
                </button>

                {/* FAQ Link */}
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="anchor-nav-link group text-left flex-shrink-0"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    paddingLeft: '32px',
                    paddingRight: '32px'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'faq-section' ? 1 : 0.4,
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '32px'
                      }}
                    >
                      (05)
                    </span>
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'faq-section' ? 1 : 0.4,
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      FAQ
                    </span>
                  </div>
                </button>

                {/* Contact Link */}
                <button
                  onClick={() => scrollToSection('cta-footer-section')}
                  className="anchor-nav-link anchor-nav-last group text-left flex-shrink-0"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    paddingLeft: '32px',
                    paddingRight: '24px'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'cta-footer-section' ? 1 : 0.4,
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '32px'
                      }}
                    >
                      (06)
                    </span>
                    <span
                      className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
                      style={{
                        color: 'var(--gray-white)',
                        opacity: activeSection === 'cta-footer-section' ? 1 : 0.4,
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '140%',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Contact
                    </span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
      </div>
      {/* End of Hero + Anchor Nav Container */}

      {/* Offer Section */}
      <StaticText
        id="offer-section"
        enableScrollStop={false}
        style={{
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '110%',
          textAlign: 'left'
        }}
      >
        {t('icu.intro.text')}
      </StaticText>

      {/* Services Carousel */}
      <Carousel
        id="services-section"
        title={t('icu.carousel.title')}
        subline={t('icu.carousel.subline')}
        items={[
          {
            title: t('icu.carousel.item1.title'),
            description: t('icu.carousel.item1.description')
          },
          {
            title: t('icu.carousel.item2.title'),
            description: t('icu.carousel.item2.description')
          },
          {
            title: t('icu.carousel.item3.title'),
            description: t('icu.carousel.item3.description')
          }
        ]}
        slidesToShowDesktop={2}
        slidesToShowMobile={1}
      />

      {/* Guidance Section - Header */}
      <section id="guidance-section" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#012332' }}>
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <h2
              className="mobile-h2-title"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1.5rem',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%'
              }}
            >
              {t('icu.guidance.title')}
            </h2>
            <p
              className="mobile-subline"
              style={{
                color: 'var(--gray-light)',
                fontSize: '18px',
                lineHeight: '160%',
                maxWidth: '900px',
                margin: '0 auto'
              }}
            >
              {t('icu.guidance.subline')}
            </p>
          </div>
        </div>
      </section>

      {/* Card 1 - From overview to every detail */}
      <ImageText
        id="from-overview"
        title={t('icu.card1.title')}
        description={t('icu.card1.description')}
        video="/ic_layers.mov"
        imageAlt="From overview to every detail"
        layout="image-left"
      />

      {/* Card 2 - Complexity, simplified */}
      <ImageText
        id="complexity-simplified"
        title={t('icu.card2.title')}
        description={t('icu.card2.description')}
        video="/ic_komplexitaet.mov"
        imageAlt="Complexity, simplified"
        layout="image-right"
      />

      {/* Card 3 - How users actually reach conversion */}
      <ImageText
        id="reach-conversion"
        title={t('icu.card3.title')}
        description={t('icu.card3.description')}
        video="/ic_all_journeys.mov"
        imageAlt="How users actually reach conversion"
        layout="image-left"
      />

      {/* Card 4 - Answers instead of questions */}
      <ImageText
        id="answers-ai"
        title={t('icu.card4.title')}
        description={t('icu.card4.description')}
        image="/ddf0d19828db3a9bf12976f08e6ab6c523c84c0c.png"
        imageAlt="Answers instead of questions"
        layout="image-right"
      />

      {/* Card 5 - Interactive analysis */}
      <ImageText
        id="interactive-analysis"
        title={t('icu.card5.title')}
        description={t('icu.card5.description')}
        video="/ic_exploration.mov"
        imageAlt="Interactive analysis"
        layout="image-left"
      />

      {/* FAQ Section */}
      <Accordion
        id="faq-section"
        title={t('icu.faq.title')}
        items={[
          {
            title: t('icu.faq.q1.title'),
            content: t('icu.faq.q1.content')
          },
          {
            title: t('icu.faq.q2.title'),
            content: t('icu.faq.q2.content')
          },
          {
            title: t('icu.faq.q3.title'),
            content: t('icu.faq.q3.content')
          },
          {
            title: t('icu.faq.q4.title'),
            content: t('icu.faq.q4.content')
          },
          {
            title: t('icu.faq.q5.title'),
            content: t('icu.faq.q5.content')
          },
          {
            title: t('icu.faq.q6.title'),
            content: t('icu.faq.q6.content')
          }
        ]}
      />

      {/* CTA & Footer Section */}
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

export default function ICUUserJourneyExplorerPage() {
  return (
    <LanguageProvider>
      <ICUUserJourneyExplorerPageContent />
    </LanguageProvider>
  );
}
