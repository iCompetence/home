'use client'
import { trackCtaClick, submitNetlifyForm } from '@/lib/tracking';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import Aurora1 from '../imports/Aurora1';
import { LanguageSwitcher } from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';
import AuroraFooter from './AuroraFooter';
import { AnimatedSection } from './ScrollAnimations';
import { Accordion } from './Accordion';
import Script from 'next/script';

const logoImage = '/iCompetence_logo.svg';

function EmpCoAuditPageContent() {
  const { t, language } = useLanguage();
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

  // Submit the JS-rendered Netlify form via AJAX (shared helper). The submit
  // event only fires after HTML5 validation passes (required email/url/consent).
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitNetlifyForm(e.currentTarget, {
      formId: 'empco-audit',
      language,
      recaptchaErrorMessage: t('form.recaptchaError'),
      submitErrorMessage: t('form.submitError'),
    });
  };

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
    if (mounted) {
      const initRecaptcha = () => {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.render) {
          const container = document.querySelector('[data-netlify-recaptcha="true"]');
          if (container && container.innerHTML === '') {
            // @ts-ignore
            window.grecaptcha.render(container, {
              sitekey: '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61',
              theme: 'light',
            });
          }
        }
      };
      const timer = setTimeout(initRecaptcha, 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const handleScrollForActiveSection = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('section') },
        { id: 'why-section', element: document.getElementById('why-section') },
        { id: 'what-section', element: document.getElementById('what-section') },
        { id: 'features-section', element: document.getElementById('features-section') },
        { id: 'test-section', element: document.getElementById('test-section') },
        { id: 'form-section', element: document.getElementById('form-section') },
        { id: 'empco-info-section', element: document.getElementById('empco-info-section') },
        { id: 'faq-section', element: document.getElementById('faq-section') },
        { id: 'cta-footer-section', element: document.getElementById('cta-footer-section') },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop;
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

  const anchorItems = [
    { id: 'hero', label: t('empco.anchor.intro'), number: '01' },
    { id: 'why-section', label: t('empco.anchor.why'), number: '02' },
    { id: 'what-section', label: t('empco.anchor.what'), number: '03' },
    { id: 'features-section', label: t('empco.anchor.features'), number: '04' },
    { id: 'test-section', label: t('empco.anchor.test'), number: '05' },
    { id: 'form-section', label: t('empco.anchor.form'), number: '06' },
    { id: 'empco-info-section', label: t('empco.anchor.directive'), number: '07' },
    { id: 'faq-section', label: t('empco.anchor.faq'), number: '08' },
    { id: 'cta-footer-section', label: t('empco.anchor.contact'), number: '09' },
  ];

  // SEO / knowledge section content — kept in i18n. These arrays are flattened
  // into plain-text Accordion items below (empcoDirectiveItems).
  const empcoFacts = [
    { value: t('empco.seo.fact1.value'), label: t('empco.seo.fact1.label') },
    { value: t('empco.seo.fact2.value'), label: t('empco.seo.fact2.label') },
    { value: t('empco.seo.fact3.value'), label: t('empco.seo.fact3.label') },
    { value: t('empco.seo.fact4.value'), label: t('empco.seo.fact4.label') },
    { value: t('empco.seo.fact5.value'), label: t('empco.seo.fact5.label') },
    { value: t('empco.seo.fact6.value'), label: t('empco.seo.fact6.label') },
  ];
  const empcoBanned = [
    t('empco.seo.banned.item1'),
    t('empco.seo.banned.item2'),
    t('empco.seo.banned.item3'),
    t('empco.seo.banned.item4'),
  ];
  const empcoSteps = [
    { label: t('empco.seo.step1.label'), description: t('empco.seo.step1.desc') },
    { label: t('empco.seo.step2.label'), description: t('empco.seo.step2.desc') },
    { label: t('empco.seo.step3.label'), description: t('empco.seo.step3.desc') },
    { label: t('empco.seo.step4.label'), description: t('empco.seo.step4.desc') },
    { label: t('empco.seo.step5.label'), description: t('empco.seo.step5.desc') },
  ];
  const empcoCompareRows = [
    { feature: t('empco.seo.compare.r1.aspect'), primary: t('empco.seo.compare.r1.empco'), secondary: t('empco.seo.compare.r1.gcd') },
    { feature: t('empco.seo.compare.r2.aspect'), primary: t('empco.seo.compare.r2.empco'), secondary: t('empco.seo.compare.r2.gcd') },
    { feature: t('empco.seo.compare.r3.aspect'), primary: t('empco.seo.compare.r3.empco'), secondary: t('empco.seo.compare.r3.gcd') },
  ];
  // SEO knowledge block rendered as a single Accordion (each heading = one
  // collapsible item). Content is plain text using the Accordion's conventions:
  // "\n\n" splits paragraphs, a line starting with "- " becomes a bullet.
  const empcoCompareColEmpco = t('empco.seo.compare.colEmpco');
  const empcoCompareColGcd = t('empco.seo.compare.colGcd');
  const empcoDirectiveItems = [
    {
      title: t('empco.seo.explainer.title'),
      content:
        t('empco.seo.explainer.lead') +
        empcoFacts.map((f) => `\n- ${f.label}: ${f.value}`).join(''),
    },
    {
      title: t('empco.seo.banned.title'),
      content: empcoBanned.map((item) => `\n- ${item}`).join(''),
    },
    {
      title: t('empco.seo.steps.title'),
      content: empcoSteps.map((s) => `\n- ${s.label}: ${s.description}`).join(''),
    },
    {
      title: t('empco.seo.compare.title'),
      content: empcoCompareRows
        .map(
          (r) =>
            `${r.feature}\n- ${empcoCompareColEmpco}: ${r.primary}\n- ${empcoCompareColGcd}: ${r.secondary}`
        )
        .join('\n\n'),
    },
  ];
  const empcoFaq = Array.from({ length: 13 }, (_, i) => ({
    title: t(`empco.seo.faq.q${i + 1}`),
    content: t(`empco.seo.faq.a${i + 1}`),
  }));
  // NOTE: FAQPage + HowTo JSON-LD is rendered server-side in app/empco-audit/page.tsx
  // (German, the SEO-target language) so it lands in the crawlable static HTML — the
  // rich content here only renders client-side after mount.

  if (!mounted) {
    return (
      <div
        className="relative"
        style={{
          backgroundColor: '#012332',
          minHeight: '100vh',
          overflowX: 'clip',
          width: '100%',
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
              zIndex: 0,
            }}
          >
            <Aurora1 />
          </div>
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="text-center max-w-4xl mx-auto">
              <h1
                className="hero-headline"
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(48px, 8vw, 96px)',
                  fontWeight: '700',
                  lineHeight: '110%',
                  marginBottom: '1.5rem',
                }}
              >
                EmpCo Audit
              </h1>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(24px, 4vw, 48px)',
                  fontWeight: '500',
                  lineHeight: '130%',
                }}
              >
                {t('empco.hero.headline')}
              </p>
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
        width: '100%',
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
          zIndex: 0,
        }}
      >
        <Aurora1 />
      </div>

      {/* Hero + Anchor Nav Container */}
      <div className="relative">
        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center"
          style={{ minHeight: '90vh', zIndex: 1, paddingTop: '120px', paddingBottom: '60px' }}
        >
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            style={{
              position: 'relative',
              zIndex: 1,
              opacity: 0,
              animation: 'fadeInUp 1s ease-out 0.3s forwards',
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
                  marginBottom: '1.5rem',
                }}
              >
                EmpCo Audit
              </h1>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(24px, 4vw, 48px)',
                  fontWeight: '500',
                  lineHeight: '130%',
                  marginBottom: '1.5rem',
                }}
              >
                {t('empco.hero.headline')}
              </p>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: '500',
                  lineHeight: '150%',
                  marginBottom: '2.5rem',
                  opacity: 0.9,
                }}
              >
                {t('empco.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  data-cta='empco_hero_probeseite'
                  onClick={() => {
                    trackCtaClick('empco_hero_probeseite', t('empco.hero.ctaPrimary'));
                    scrollToSection('form-section');
                  }}
                  className="px-6 sm:px-8 py-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer text-sm sm:text-base"
                  style={{
                    color: 'var(--gray-white)',
                    fontWeight: '500',
                  }}
                >
                  {t('empco.hero.ctaPrimary')}
                </button>

                <button
                  onClick={() => scrollToSection('what-section')}
                  className="px-6 sm:px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer text-sm sm:text-base"
                  style={{
                    color: 'var(--gray-white)',
                    fontWeight: '500',
                    background: 'transparent',
                  }}
                >
                  {t('empco.hero.ctaSecondary')}
                </button>
              </div>
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
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Logo */}
        <div
          className="fixed z-50 cursor-pointer"
          style={{
            top: '40px',
            left: '36px',
            opacity: scrollY < 100 || isFooterVisible ? 1 : 0,
            transform: scrollY < 100 || isFooterVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
          onClick={() => {
            window.location.href = `/${language}/`;
          }}
        >
          <ImageWithFallback src={logoImage} alt="Logo" className="h-6" style={{ width: 'auto' }} />
        </div>

        {/* Anchor Dropdown */}
        {showAnchorDropdown && (
          <div
            className="fixed z-40"
            style={{
              top: isMobile ? '80px' : isFooterVisible ? '100px' : '40px',
              left: '36px',
              transition: 'top 0.4s ease-out',
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
                  fontWeight: '500',
                }}
              >
                <span>{anchorItems.find((item) => item.id === activeSection)?.label || 'Intro'}</span>
                <ChevronDown
                  size={16}
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: isAnchorDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {isAnchorDropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-[#012332] border border-white/20 overflow-hidden"
                  style={{
                    minWidth: '200px',
                    animation: 'fadeIn 0.2s ease-out forwards',
                  }}
                >
                  {anchorItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'form-section') {
                          trackCtaClick('empco_nav_probeseite', item.label);
                        }
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
                        cursor: 'pointer',
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
              transform: 'scale(0.9)',
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
              animation: 'fadeIn 0.8s ease-out 0.6s forwards',
            }}
          >
            <button
              data-cta='empco_header_contact'
              onClick={() => {
                trackCtaClick('empco_header_contact', t('header.contact'));
                window.open(`/${language}/contact/`, '_blank');
              }}
              className="px-6 py-2.5 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer"
              style={{
                color: 'var(--gray-white)',
                fontSize: '14px',
                fontWeight: '500',
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
                  border: 'none',
                }}
                data-burger-trigger-desktop
              >
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  height: '44px',
                }}
              >
                <X size={20} style={{ color: 'var(--gray-white)' }} />
              </button>
            )}
          </div>
        )}

        {/* CTA Button - Floating - Mobile only */}
        {isMobile && (
          <button
            data-cta='empco_header_contact'
            onClick={() => {
              trackCtaClick('empco_header_contact', t('header.contact'));
              window.open(`/${language}/contact/`, '_blank');
            }}
            className="fixed right-4 z-50 p-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer flex items-center justify-center"
            style={{
              bottom: '84px',
              opacity: 0,
              animation: 'fadeIn 0.8s ease-out 0.6s forwards',
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
          onCloseMenuRef={(closeFunc) => {
            closeMenuRef.current = closeFunc;
          }}
        />

        {/* Anchor Navigation Section */}
        <section className="relative anchor-nav-section" style={{ zIndex: 1 }}>
          <div className="py-16 relative">
            <div
              className="border-t border-white/10 pt-8 anchor-nav-border-container"
              style={{
                maxWidth: 'calc(1152px + 36px + 24px)',
                margin: '0 auto',
              }}
            >
              <div
                className="anchor-nav-scroll-container"
                style={{
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <nav
                  className="flex flex-row flex-nowrap items-start gap-0 anchor-nav-container"
                  style={{
                    width: 'max-content',
                    minWidth: '100%',
                  }}
                >
                  {anchorItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'form-section') {
                          trackCtaClick('empco_nav_probeseite', item.label);
                        }
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
                        paddingRight: index === anchorItems.length - 1 ? '24px' : '32px',
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
                            minWidth: '32px',
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
                            whiteSpace: 'nowrap',
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
      </div>
      {/* End of Hero + Anchor Nav Container */}

      {/* Section 2: Why now */}
      <AnimatedSection
        id="why-section"
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
                marginBottom: '2rem',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%',
              }}
            >
              {t('empco.why.title')}
            </h2>

            <div className="space-y-6 max-w-4xl">
              <p style={{ color: 'var(--gray-white)', fontSize: '18px', lineHeight: '170%' }}>
                {t('empco.why.p1')}
              </p>
              <p style={{ color: 'var(--gray-white)', fontSize: '18px', lineHeight: '170%' }}>
                {t('empco.why.p2')}
              </p>
              <p style={{ color: 'var(--gray-white)', fontSize: '18px', lineHeight: '170%' }}>
                {t('empco.why.p3')}
              </p>
              <p
                style={{
                  color: 'var(--gray-white)',
                  fontSize: '18px',
                  lineHeight: '170%',
                  fontWeight: '600',
                }}
              >
                {t('empco.why.p4')}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3: What it is */}
      <AnimatedSection
        id="what-section"
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
                marginBottom: '2rem',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%',
              }}
            >
              {t('empco.what.title')}
            </h2>

            <div className="space-y-6 max-w-4xl">
              <p style={{ color: 'var(--gray-white)', fontSize: '18px', lineHeight: '170%' }}>
                {t('empco.what.p1')}
              </p>
              <p style={{ color: 'var(--gray-white)', fontSize: '18px', lineHeight: '170%' }}>
                {t('empco.what.p2')}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 3b: EmpCo tool preview — same framed-image module as the other
          product pages (16px rounded corners, thin border, no shadow). */}
      <AnimatedSection
        className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
        animationType="fadeInUp"
        duration={0}
      >
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src="/assets/empco/EmpCo-Tool-UI.png"
                alt="EmpCo Audit Tool"
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4: Features */}
      <Accordion
        id="features-section"
        title={t('empco.features.title')}
        items={[
          { title: t('empco.feature1.title'), content: t('empco.feature1.desc') },
          { title: t('empco.feature2.title'), content: t('empco.feature2.desc') },
          { title: t('empco.feature3.title'), content: t('empco.feature3.desc') },
          { title: t('empco.feature4.title'), content: t('empco.feature4.desc') },
          { title: t('empco.feature5.title'), content: t('empco.feature5.desc') },
          { title: t('empco.feature6.title'), content: t('empco.feature6.desc') },
        ]}
      />

      {/* Section 5a: Test first */}
      <Accordion
        id="test-section"
        title={t('empco.test.title')}
        items={[
          { title: t('empco.test.step1.title'), content: t('empco.test.step1.desc') },
          { title: t('empco.test.step2.title'), content: t('empco.test.step2.desc') },
          { title: t('empco.test.step3.title'), content: t('empco.test.step3.desc') },
        ]}
      />

      {/* Section 5a closing + CTA */}
      <AnimatedSection
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        animationType="fadeInUp"
        duration={0}
      >
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <p
              style={{
                color: 'var(--gray-white)',
                fontSize: '20px',
                lineHeight: '160%',
                fontStyle: 'italic',
                fontWeight: '500',
                marginBottom: '2rem',
                maxWidth: '720px',
              }}
            >
              {t('empco.test.closing')}
            </p>

            <button
              data-cta='empco_form_probeseite'
              onClick={() => {
                trackCtaClick('empco_form_probeseite', t('empco.test.cta'));
                scrollToSection('form-section');
              }}
              className="px-6 sm:px-8 py-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer text-sm sm:text-base"
              style={{
                color: 'var(--gray-white)',
                fontWeight: '500',
              }}
            >
              {t('empco.test.cta')}
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 5b: Audit request form */}
      <AnimatedSection
        id="form-section"
        className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
        animationType="fadeInUp"
        duration={0}
      >
        <div className="container mx-auto">
          {/* max-w-6xl wrapper keeps the form block left-flush with the other
              EmpCo sections; the inner max-w-2xl keeps the form itself narrow. */}
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl">
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
                lineHeight: '110%',
              }}
            >
              {t('empco.form.title')}
            </h2>

            <p
              className="mobile-subline"
              style={{
                color: 'var(--gray-light)',
                fontSize: '18px',
                lineHeight: '170%',
                marginBottom: '1.5rem',
              }}
            >
              {t('empco.form.intro')}
            </p>

            <p
              style={{
                color: 'var(--gray-light)',
                fontSize: '15px',
                lineHeight: '160%',
                fontStyle: 'italic',
                borderLeft: '2px solid rgba(225, 155, 116, 0.5)',
                paddingLeft: '16px',
                marginBottom: '2.5rem',
              }}
            >
              {t('empco.form.disclaimer')}
            </p>

            <form
              name="empco-audit"
              id="empco-audit"
              method="POST"
              data-netlify="true"
              onSubmit={handleFormSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="empco-audit" />

              <div>
                <label
                  className="block mb-2"
                  htmlFor="empco-name"
                  style={{ color: 'var(--gray-white)', fontSize: '16px', fontWeight: '500' }}
                >
                  {t('empco.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  id="empco-name"
                  className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                  style={{ width: '100%', color: 'white' }}
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  htmlFor="empco-company"
                  style={{ color: 'var(--gray-white)', fontSize: '16px', fontWeight: '500' }}
                >
                  {t('empco.form.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  id="empco-company"
                  className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                  style={{ width: '100%', color: 'white' }}
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  htmlFor="empco-email"
                  style={{ color: 'var(--gray-white)', fontSize: '16px', fontWeight: '500' }}
                >
                  {t('empco.form.email')} <span style={{ color: '#E19B74' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="empco-email"
                  required
                  className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                  style={{ width: '100%', color: 'white' }}
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  htmlFor="empco-url"
                  style={{ color: 'var(--gray-white)', fontSize: '16px', fontWeight: '500' }}
                >
                  {t('empco.form.url')} <span style={{ color: '#E19B74' }}>*</span>
                </label>
                <input
                  type="url"
                  name="url"
                  id="empco-url"
                  required
                  placeholder="https://"
                  className="w-100 p-3 bg-white/10 border border-white/20 rounded"
                  style={{ width: '100%', color: 'white' }}
                />
                <p
                  style={{
                    color: 'var(--gray-light)',
                    fontSize: '14px',
                    lineHeight: '150%',
                    marginTop: '8px',
                  }}
                >
                  {t('empco.form.urlHint')}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  id="empco-consent"
                  required
                  style={{
                    marginTop: '4px',
                    width: '18px',
                    height: '18px',
                    flexShrink: 0,
                    accentColor: '#0b99cc',
                    cursor: 'pointer',
                  }}
                />
                <label
                  htmlFor="empco-consent"
                  style={{
                    color: 'var(--gray-white)',
                    fontSize: '15px',
                    lineHeight: '160%',
                    cursor: 'pointer',
                  }}
                >
                  {t('empco.form.consent')} <span style={{ color: '#E19B74' }}>*</span>
                </label>
              </div>

              <div style={{ marginBottom: '8px' }} data-netlify-recaptcha="true"></div>

              <button
                type="submit"
                className="px-8 py-3 bg-[#0b99cc] hover:bg-[#0b99cc]/80 transition-colors rounded font-bold"
                style={{ color: 'var(--gray-white)' }}
              >
                {t('empco.form.submit')}
              </button>

              <p
                style={{
                  color: 'var(--gray-light)',
                  fontSize: '13px',
                  lineHeight: '160%',
                  marginTop: '16px',
                  opacity: 0.8,
                }}
              >
                {t('empco.form.privacyNotice')}{' '}
                <a
                  href={`/${language}/imprint/`}
                  style={{
                    color: 'var(--gray-light)',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#0B99CC')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray-light)')}
                >
                  → {t('empco.form.privacyLink')}
                </a>
              </p>
            </form>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 6: SEO / knowledge — EmpCo directive explained.
          Rendered as a single Accordion (the component that best fits the page
          design); each heading becomes one collapsible item. */}
      <Accordion
        id="empco-info-section"
        title={t('empco.anchor.directive')}
        items={empcoDirectiveItems}
        allowMultiple
        contentMaxHeightClass="max-h-[900px]"
      />

      {/* Section 7: FAQ accordion */}
      <Accordion
        id="faq-section"
        title={t('empco.seo.faq.title')}
        items={empcoFaq}
        contentMaxHeightClass="max-h-[600px]"
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
              overflow: 'hidden',
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
                  letterSpacing: '-0.01em',
                }}
              >
                {t('cta.headline')}
              </p>

              <button
                onClick={() => {
                  window.open(`/${language}/contact/`, '_blank');
                }}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer text-sm sm:text-base"
                style={{
                  color: 'var(--gray-white)',
                  fontWeight: '500',
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
                    <p
                      className="mobile-footer-tagline"
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '64px',
                        fontWeight: '700',
                        lineHeight: '110%',
                      }}
                    >
                      {t('footer.tagline')}
                    </p>
                  </div>

                  {/* Right Side - Contact & Social */}
                  <div className="lg:text-right">
                    <div className="flex gap-4 lg:justify-end mb-8">
                      <button
                        onClick={() =>
                          window.open(
                            'https://www.linkedin.com/company/icompetence/posts/?feedView=all',
                            '_blank'
                          )
                        }
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
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{ color: 'var(--gray-white)', transition: 'color 0.3s ease' }}
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p
                          style={{
                            color: 'var(--gray-light)',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '4px',
                          }}
                        >
                          {t('footer.inquiries')}
                        </p>
                        <button
                          data-cta='mail'
                          onClick={() => { trackCtaClick('footer_mail', 'info@icompetence.de'); window.open('mailto:info@icompetence.de', '_blank'); }}
                          style={{
                            color: 'var(--gray-white)',
                            fontSize: '18px',
                            fontWeight: '500',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'right',
                            padding: '0',
                            transition: 'color 0.3s ease',
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = '#0B99CC')
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-white)')
                          }
                        >
                          info@icompetence.de
                        </button>
                      </div>
                      <div>
                        <p
                          style={{
                            color: 'var(--gray-light)',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '4px',
                          }}
                        >
                          {t('footer.phone')}
                        </p>
                        <button
                          data-cta='fon'
                          onClick={() => { trackCtaClick('footer_phone', '+49 40 22636380'); window.open('tel:+494022636380', '_blank'); }}
                          style={{
                            color: 'var(--gray-white)',
                            fontSize: '18px',
                            fontWeight: '500',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'right',
                            padding: '0',
                            transition: 'color 0.3s ease',
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = '#0B99CC')
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-white)')
                          }
                        >
                          +49 40 22636380
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
                  <div className="flex gap-8 mb-4 sm:mb-0">
                    <button
                      onClick={() => window.open(`/${language}/imprint/`, '_blank')}
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '16px',
                        fontWeight: '500',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#FCFCFC')}
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-light)')
                      }
                    >
                      {t('footer.imprint')}
                    </button>
                    <button
                      onClick={() => window.open(`/${language}/imprint/`, '_blank')}
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '16px',
                        fontWeight: '500',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#FCFCFC')}
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.color = 'var(--gray-light)')
                      }
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
                      transition: 'color 0.3s ease',
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

          .mobile-h2-title {
            font-size: 28px !important;
          }

          .mobile-subline {
            font-size: 16px !important;
          }

          .mobile-cta-text {
            font-size: 24px !important;
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

export default function EmpCoAuditPage({ initialLanguage }: { initialLanguage?: "en" | "de" }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <EmpCoAuditPageContent />
    </LanguageProvider>
  );
}
