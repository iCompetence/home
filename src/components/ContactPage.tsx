'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from './LanguageSwitcher';
import BurgerMenu from './BurgerMenu';
import AuroraFooter from './AuroraFooter';
import { AnimatedSection } from './ScrollAnimations';
import Script from 'next/script';

const logoImage = '/d7c679fa2e863e2732ac2061e38e77091bef6fdd.png';

function ContactPageContent() {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeMenuRef = useRef<(() => void) | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to Netlify Forms
      const formBody = new URLSearchParams({
        'form-name': 'contact',
        'name': formData.name,
        'email': formData.email,
        'message': formData.message,
      }).toString();

      const response = await fetch('/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        console.error('Form submission failed:', response.status, response.statusText);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                {t('contact.hero.title')}
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
              {t('contact.hero.title')}
            </h1>
          </div>
        </div>
      </section>

      <div
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 cursor-pointer"
        style={{
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
          className="h-16 sm:h-16 lg:h-20"
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

      <BurgerMenu
        showHeroText={true}
        scrollY={scrollY}
        onMenuStateChange={setIsBurgerMenuOpen}
        onCloseMenuRef={(closeFunc) => { closeMenuRef.current = closeFunc; }}
      />

      <section id="content-section" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#012332' }}>
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div
              style={{
                color: 'var(--gray-white)',
                fontSize: '16px',
                lineHeight: '180%'
              }}
            >
              {submitStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <h2
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '1rem',
                      color: '#0b99cc'
                    }}
                  >
                    {t('contact.success.title')}
                  </h2>
                  <p style={{ color: 'var(--gray-light)' }}>
                    {t('contact.success.message')}
                  </p>
                </div>
              ) : (
                <>
                  {/* Hidden form for Netlify to detect at build time */}
                  <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
                    <input type="text" name="name" />
                    <input type="email" name="email" />
                    <textarea name="message" />
                  </form>

                  <form onSubmit={handleSubmit} name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
                    <input type="hidden" name="form-name" value="contact" />

                    {/* Honeypot field - hidden from users */}
                    <div style={{ display: 'none' }}>
                      <label htmlFor="bot-field">Don&apos;t fill this out</label>
                    <input
                      type="text"
                      id="bot-field"
                      name="bot-field"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      htmlFor="name"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--gray-white)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {t('contact.form.name')} <sup style={{ color: '#0b99cc' }}>*</sup>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'var(--gray-white)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0b99cc'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--gray-white)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {t('contact.form.email')} <sup style={{ color: '#0b99cc' }}>*</sup>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'var(--gray-white)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0b99cc'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: 'var(--gray-white)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'var(--gray-white)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0b99cc'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div
                      className="g-recaptcha"
                      data-sitekey="6Lf7QtQUAAAAAIiRzogVjs0CgkXXwC3mwhcBWVW-"
                      data-theme="dark"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: '8px' }}>
                      <p style={{ color: '#ff6b6b', fontSize: '14px' }}>
                        {t('contact.error.message')}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: isSubmitting ? 'rgba(11, 153, 204, 0.5)' : '#0b99cc',
                      border: 'none',
                      borderRadius: '9999px',
                      color: 'var(--gray-white)',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#0a88b8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#0b99cc';
                      }
                    }}
                  >
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </button>
                </form>
                </>
              )}
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

      {/* reCAPTCHA Script */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
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

        input::placeholder,
        textarea::placeholder {
          color: var(--gray-light);
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactPageContent />
    </LanguageProvider>
  );
}
