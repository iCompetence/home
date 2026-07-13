'use client'
import { trackCtaClick } from '@/lib/tracking';

import { useState, useEffect, useRef, Fragment } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import Aurora1 from '../imports/Aurora1';
import BurgerMenu from './BurgerMenu';
import AuroraFooter from './AuroraFooter';
import { AnimatedSection } from './ScrollAnimations';
import { Accordion } from './Accordion';
import { ComparisonTable } from './ComparisonTable';

const logoImage = '/iCompetence_logo.svg';

// ---------------------------------------------------------------------------
// Content model for EmpCo cluster (hub-and-spoke) article pages.
// One cluster page answers exactly one search question exhaustively and links
// back to the pillar page (/de/empco-audit/) and to related cluster pages.
// The route's page.tsx owns the content (incl. the German FAQPage JSON-LD,
// which must mirror `faq` below 1:1) and passes it in as props — same pattern
// as the server-rendered FAQ on the pillar page.
// ---------------------------------------------------------------------------

export interface ClusterSubsection {
  /** H3 heading */
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ClusterTable {
  primaryHeader: string;
  secondaryHeader: string;
  rows: { feature: string; primary: string; secondary: string }[];
}

export interface ClusterSection {
  id: string;
  /** H2 heading */
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: ClusterSubsection[];
  /** Optional comparison table rendered after the text (e.g. erlaubt vs. verboten) */
  table?: ClusterTable;
}

export interface EmpCoClusterContent {
  /** H1 */
  title: string;
  /** Lead paragraphs under the H1 */
  intro: string[];
  /** Real Reddit quote/question used as the hook (differentiation point of the strategy) */
  quote?: { text: string; source: string };
  sections: ClusterSection[];
  /** "People also ask" block — must match the FAQPage JSON-LD in the route's page.tsx */
  faq: { q: string; a: string }[];
  faqTitle: string;
  /** Internal links to the pillar page and related cluster pages */
  related: { label: string; href: string }[];
  relatedTitle: string;
  /** Conversion module: "kostenlose Probeseite anfordern" */
  cta: { headline: string; button: string };
  /** Stable prefix for CTA tracking ids, e.g. 'empco_abmahnung' */
  ctaIdPrefix: string;
}

// Renders plain text with inline [label](/path/) links so body copy can carry
// keyword anchor texts to the pillar/cluster pages.
function TextWithLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          return (
            <a
              key={i}
              href={match[2]}
              style={{
                color: 'var(--gray-white)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#0B99CC')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray-white)')}
            >
              {match[1]}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

// Spacing note: src/index.css is a precompiled Tailwind snapshot — utilities
// that no existing component uses (e.g. space-y-6, py-12) are NOT in the CSS.
// All vertical rhythm here therefore uses inline margins.
function ClusterParagraphs({ paragraphs }: { paragraphs?: string[] }) {
  if (!paragraphs?.length) return null;
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{ color: 'var(--gray-white)', fontSize: '18px', lineHeight: '170%', margin: '0 0 1.5rem 0' }}
        >
          <TextWithLinks text={p} />
        </p>
      ))}
    </>
  );
}

function ClusterBullets({ bullets }: { bullets?: string[] }) {
  if (!bullets?.length) return null;
  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0, margin: '0 0 1.5rem 0' }}>
      {bullets.map((item, i) => (
        <li
          key={i}
          style={{
            color: 'var(--gray-white)',
            fontSize: '18px',
            lineHeight: '170%',
            paddingLeft: '24px',
            position: 'relative',
            marginBottom: '0.75rem',
          }}
        >
          <span style={{ position: 'absolute', left: 0, color: '#E19B74' }}>•</span>
          <TextWithLinks text={item} />
        </li>
      ))}
    </ul>
  );
}

function EmpCoClusterPageContent({ content }: { content: EmpCoClusterContent }) {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const closeMenuRef = useRef<(() => void) | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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
  }, []);

  const goToProbeseite = (ctaId: string, label: string) => {
    trackCtaClick(ctaId, label);
    window.location.href = `/${language}/empco-audit/#form-section`;
  };

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
            data-cta={`${content.ctaIdPrefix}_header_contact`}
            onClick={() => {
              trackCtaClick(`${content.ctaIdPrefix}_header_contact`, t('header.contact'));
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
          data-cta={`${content.ctaIdPrefix}_header_contact`}
          onClick={() => {
            trackCtaClick(`${content.ctaIdPrefix}_header_contact`, t('header.contact'));
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

      {/* Hero: H1 + lead + Reddit hook */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '70vh', zIndex: 1, paddingTop: '160px', paddingBottom: '60px' }}
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
          <div className="max-w-4xl mx-auto">
            <p
              style={{
                color: 'var(--gray-light)',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              <a
                href={`/${language}/empco-audit/`}
                style={{ color: 'var(--gray-light)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#0B99CC')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray-light)')}
              >
                EmpCo Audit
              </a>
              {' · EmpCo Wissen'}
            </p>
            <h1
              className="cluster-headline"
              style={{
                color: 'var(--gray-white)',
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                fontWeight: '700',
                lineHeight: '115%',
                marginBottom: '2rem',
              }}
            >
              {content.title}
            </h1>

            {content.quote && (
              <p
                style={{
                  color: 'var(--gray-light)',
                  fontSize: '18px',
                  lineHeight: '160%',
                  fontStyle: 'italic',
                  borderLeft: '2px solid rgba(225, 155, 116, 0.5)',
                  paddingLeft: '16px',
                  marginBottom: '2rem',
                }}
              >
                {content.quote.text}
                <span style={{ display: 'block', fontStyle: 'normal', fontSize: '14px', marginTop: '8px', opacity: 0.8 }}>
                  — {content.quote.source}
                </span>
              </p>
            )}

            <div>
              <ClusterParagraphs paragraphs={content.intro} />
            </div>
          </div>
        </div>
      </section>

      {/* Article sections */}
      {content.sections.map((section) => (
        <Fragment key={section.id}>
          <AnimatedSection
            id={section.id}
            className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
            animationType="fadeInUp"
            duration={0}
          >
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
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
                  {section.heading}
                </h2>

                <div>
                  <ClusterParagraphs paragraphs={section.paragraphs} />
                  <ClusterBullets bullets={section.bullets} />

                  {section.subsections?.map((sub, i) => (
                    <div key={i} style={{ marginTop: '2.5rem' }}>
                      <h3
                        style={{
                          color: 'var(--gray-white)',
                          fontSize: '22px',
                          fontWeight: '600',
                          lineHeight: '130%',
                          margin: '0 0 1rem 0',
                        }}
                      >
                        {sub.heading}
                      </h3>
                      <ClusterParagraphs paragraphs={sub.paragraphs} />
                      <ClusterBullets bullets={sub.bullets} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ComparisonTable is a standalone section module (own padding/width,
              like on the Intelligentic Search page) — render it as a sibling,
              not nested inside the article column. */}
          {section.table && (
            <ComparisonTable
              id={`${section.id}-table`}
              primaryHeader={section.table.primaryHeader}
              secondaryHeader={section.table.secondaryHeader}
              rows={section.table.rows}
            />
          )}
        </Fragment>
      ))}

      {/* People also ask / FAQ — JSON-LD for this block is rendered server-side
          in the route's page.tsx and must stay 1:1 with these items. */}
      <Accordion
        id="faq-section"
        title={content.faqTitle}
        items={content.faq.map((f) => ({ title: f.q, content: f.a }))}
        contentMaxHeightClass="max-h-[600px]"
      />

      {/* Related reading: pillar + cluster cross-links */}
      <AnimatedSection
        id="related-section"
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        animationType="fadeInUp"
        duration={0}
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
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
              {content.relatedTitle}
            </h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }} className="space-y-4">
              {content.related.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '18px',
                      lineHeight: '160%',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#0B99CC')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray-white)')}
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Conversion module + Footer */}
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

          {/* Conversion module: kostenlose Probeseite anfordern */}
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
                {content.cta.headline}
              </p>

              <button
                data-cta={`${content.ctaIdPrefix}_probeseite`}
                onClick={() => goToProbeseite(`${content.ctaIdPrefix}_probeseite`, content.cta.button)}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#0b99cc] border border-[#0b99cc] hover:bg-[#0a88b8] hover:border-[#0a88b8] transition-all duration-300 cursor-pointer text-sm sm:text-base"
                style={{
                  color: 'var(--gray-white)',
                  fontWeight: '500',
                }}
              >
                {content.cta.button}
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

        @media (max-width: 768px) {
          .cluster-headline {
            font-size: 32px !important;
          }

          .mobile-h2-title {
            font-size: 28px !important;
          }

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

export default function EmpCoClusterPage({
  content,
  initialLanguage,
}: {
  content: EmpCoClusterContent;
  initialLanguage?: 'en' | 'de';
}) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <EmpCoClusterPageContent content={content} />
    </LanguageProvider>
  );
}
