'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import Aurora1 from "../imports/Aurora1";
import { LanguageSwitcher } from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';
import AuroraFooter from './AuroraFooter';
import { AnimatedSection } from './ScrollAnimations';
import { StaticText } from './StaticText';
import Script from 'next/script';

const logoImage = '/iCompetence_logo.svg';

const experts = [
  { name: 'Dennis Breuer', initials: 'DB', role: 'aiworkshop.expert.dennis.role' },
  { name: 'Marc-André Lampe', initials: 'ML', role: 'aiworkshop.expert.marc.role' },
  { name: 'Matthias Postel', initials: 'MP', role: 'aiworkshop.expert.matthias.role' },
  { name: 'Lionel Schulz', initials: 'LS', role: 'aiworkshop.expert.lionel.role' },
];

function AIWorkshopPageContent() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeMenuRef = useRef<(() => void) | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showAnchorDropdown, setShowAnchorDropdown] = useState(false);
  const [isAnchorDropdownOpen, setIsAnchorDropdownOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const anchorItems = [
    { id: 'hero', label: t('aiworkshop.anchor.intro'), number: '01' },
    { id: 'intro-section', label: t('aiworkshop.anchor.about'), number: '02' },
    { id: 'experts-section', label: t('aiworkshop.anchor.experts'), number: '03' },
    { id: 'form-section', label: t('aiworkshop.anchor.apply'), number: '04' },
    { id: 'cta-footer-section', label: t('aiworkshop.anchor.contact'), number: '05' },
  ];

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

  useEffect(() => {
    if (!mounted) return;

    const handleScrollForActiveSection = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('section') },
        { id: 'intro-section', element: document.getElementById('intro-section') },
        { id: 'experts-section', element: document.getElementById('experts-section') },
        { id: 'form-section', element: document.getElementById('form-section') },
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

  useEffect(() => {
    if (mounted) {
      const initRecaptcha = () => {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.render) {
          const container = document.querySelector('[data-netlify-recaptcha="true"]');
          if (container && container.innerHTML === "") {
            // @ts-ignore
            window.grecaptcha.render(container, {
              'sitekey': '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61',
              'theme': 'light'
            });
          }
        }
      };
      const timer = setTimeout(initRecaptcha, 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

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
                {t('aiworkshop.hero.title')}
              </h1>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" />

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

        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center"
          style={{ height: '80vh', zIndex: 1 }}
        >
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
                {t('aiworkshop.hero.title')}
              </h1>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(20px, 3vw, 36px)',
                  fontWeight: '500',
                  lineHeight: '130%'
                }}
              >
                {t('aiworkshop.hero.subline')}
              </p>
            </div>
          </div>
        </section>

        {/* Logo */}
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

        {/* Language Switcher + Navigation */}
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
            {scrollY < 50 && <LanguageSwitcher />}

            <button
              onClick={() => scrollToSection('form-section')}
              className="px-6 py-2.5 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer"
              style={{
                color: 'var(--gray-white)',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {t('header.contact')}
            </button>

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
                  <line x1="0" y1="2" x2="28" y2="2" stroke="var(--gray-white)" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="0" y1="14" x2="28" y2="14" stroke="var(--gray-white)" strokeWidth="2.5" strokeLinecap="round" />
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

        <BurgerMenu
          showHeroText={true}
          scrollY={scrollY}
          onMenuStateChange={setIsBurgerMenuOpen}
          onCloseMenuRef={(closeFunc) => { closeMenuRef.current = closeFunc; }}
        />

        {/* Anchor Dropdown - Floating */}
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
                  background: 'linear-gradient(90deg, #0B99CC 0%, #0678A0 100%)',
                  border: 'none',
                  color: 'var(--gray-white)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <span>
                  {anchorItems.find(item => item.id === activeSection)?.label || 'Intro'}
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: isAnchorDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>

              {isAnchorDropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#012332] border border-white/20 overflow-hidden"
                  style={{
                    minWidth: '200px',
                    animation: 'fadeIn 0.2s ease-out forwards'
                  }}
                >
                  {anchorItems.map((item) => (
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

        {/* CTA Button - Bottom Right - Floating - Mobile only */}
        {isMobile && (
          <button
            onClick={() => scrollToSection('form-section')}
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

        {/* Anchor Navigation Section */}
        <section
          className="relative anchor-nav-section"
          style={{ zIndex: 1 }}
        >
          <div className="py-16 relative">
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
                  {anchorItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'hero') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          scrollToSection(item.id);
                        }
                      }}
                      className={`anchor-nav-link group text-left flex-shrink-0 ${index === 0 ? 'anchor-nav-first' : ''} ${index === anchorItems.length - 1 ? 'anchor-nav-last' : ''}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        paddingLeft: index === 0 ? '36px' : '32px',
                        paddingRight: index === anchorItems.length - 1 ? '24px' : '32px'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="group-hover:text-[#0B99CC] transition-colors"
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
                          className="group-hover:text-[#0B99CC] transition-colors mobile-anchor-text"
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

        {/* Intro Section */}
        <StaticText
          id="intro-section"
          enableScrollStop={false}
          style={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '130%',
            textAlign: 'left'
          }}
        >
          <span style={{ color: '#0b99cc', fontStyle: 'italic' }}>
            {t('aiworkshop.intro.makers')}
          </span>
          <br /><br />
          {t('aiworkshop.intro.text')}
          <br /><br />
          <span style={{ color: '#0b99cc', fontWeight: '700' }}>
            {t('aiworkshop.intro.cta')}
          </span>
          <br /><br />
          <span style={{ opacity: 0.6, fontSize: '24px', fontWeight: '500' }}>
            {t('aiworkshop.dates.title')}: {t('aiworkshop.dates.text')}
          </span>
        </StaticText>

        {/* Meet the Experts Section */}
        <AnimatedSection
          id="experts-section"
          className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
          animationType="fadeInUp"
          duration={0}
        >
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <h2
                className="mobile-h2-title"
                style={{
                  background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '32px',
                  fontWeight: '700',
                  lineHeight: '110%',
                  marginBottom: '3rem'
                }}
              >
                {t('aiworkshop.experts.title')}
              </h2>

              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                style={{ justifyItems: 'center' }}
              >
                {experts.map((expert) => (
                  <div key={expert.initials} className="flex flex-col items-center text-center">
                    {/* Circular placeholder with initials */}
                    <div
                      style={{
                        width: 'clamp(100px, 15vw, 140px)',
                        height: 'clamp(100px, 15vw, 140px)',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(11, 153, 204, 0.3) 0%, rgba(1, 35, 50, 0.8) 100%)',
                        border: '2px solid rgba(11, 153, 204, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--gray-white)',
                          fontSize: 'clamp(24px, 4vw, 36px)',
                          fontWeight: '600',
                          opacity: 0.7
                        }}
                      >
                        {expert.initials}
                      </span>
                    </div>
                    <p
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}
                    >
                      {expert.name}
                    </p>
                    <p
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '140%'
                      }}
                    >
                      {t(expert.role)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Application Form Section */}
        <section
          id="form-section"
          className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
          style={{ backgroundColor: '#012332' }}
        >
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto">
              <h2
                className="mobile-h2-title"
                style={{
                  background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '32px',
                  fontWeight: '700',
                  lineHeight: '110%',
                  marginBottom: '1rem'
                }}
              >
                {t('aiworkshop.form.title')}
              </h2>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: '18px',
                  lineHeight: '170%',
                  marginBottom: '3rem'
                }}
              >
                {t('aiworkshop.form.subtitle')}
              </p>

              <form
                name="ai-workshop"
                id="ai-workshop"
                method="POST"
                data-netlify="true"
                action="/danke"
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="ai-workshop" />

                <div>
                  <label
                    className="block mb-2"
                    htmlFor="workshop-name"
                  >
                    {t('aiworkshop.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="workshop-name"
                    required
                    className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                    style={{ width: '100%', color: 'white' }}
                  />
                </div>

                <div>
                  <label className="block mb-2" htmlFor="workshop-email">
                    {t('aiworkshop.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="workshop-email"
                    required
                    className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                    style={{ width: '100%', color: 'white' }}
                  />
                </div>

                <div>
                  <label className="block mb-2" htmlFor="workshop-phone">
                    {t('aiworkshop.form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="workshop-phone"
                    className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                    style={{ width: '100%', color: 'white' }}
                  />
                </div>

                <div>
                  <label className="block mb-2" htmlFor="workshop-position">
                    {t('aiworkshop.form.position')} *
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="workshop-position"
                    required
                    className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                    style={{ width: '100%', color: 'white' }}
                  />
                </div>

                <div>
                  <label className="block mb-2" htmlFor="workshop-company">
                    {t('aiworkshop.form.company')} *
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="workshop-company"
                    required
                    className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                    style={{ width: '100%', color: 'white' }}
                  />
                </div>

                <div style={{ marginBottom: '8px' }} data-netlify-recaptcha="true"></div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#0b99cc] hover:bg-[#0b99cc]/80 transition-colors rounded font-bold cursor-pointer"
                >
                  {t('aiworkshop.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div ref={footerRef}>
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
                  onClick={() => scrollToSection('form-section')}
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
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
            .mobile-footer-tagline {
              font-size: 40px !important;
            }

            .mobile-h2-title {
              font-size: 28px !important;
            }

            .mobile-cta-text {
              font-size: 24px !important;
            }

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

          input::placeholder,
          textarea::placeholder {
            color: var(--gray-light);
            opacity: 0.5;
          }
        `}</style>
      </div>
    </>
  );
}

export default function AIWorkshopPage() {
  return (
    <LanguageProvider>
      <AIWorkshopPageContent />
    </LanguageProvider>
  );
}
