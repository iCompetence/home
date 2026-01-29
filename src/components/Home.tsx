'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Aurora2 from "../imports/Aurora2-130-1167";
import Aurora1 from "../imports/Aurora1";
import BurgerMenu from "./BurgerMenu";
import Frame69 from "../imports/Frame69";
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HomeProps {
  /** Logo image source */
  logoImage: string;
  /** Main headline text */
  headline: string;
  /** Scroll indicator text */
  scrollText?: string;
  /** Callback when scroll indicator is clicked */
  onScrollClick?: () => void;
  /** Callback when scroll to principles */
  onScrollToPrinciples?: () => void;
  /** Callback when scroll to tools/services */
  onScrollToToolsServices?: () => void;
  /** Custom entrance timing (ms) */
  entranceTiming?: {
    logoDelay?: number;
    heroDelay?: number;
  };
  /** Whether the footer is visible */
  isFooterVisible?: boolean;
}

export const Home = ({
  logoImage,
  headline,
  scrollText = "Learn more about us",
  onScrollClick,
  onScrollToPrinciples,
  onScrollToToolsServices,
  entranceTiming = { logoDelay: 300, heroDelay: 1800 },
  isFooterVisible = false
}: HomeProps) => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showIntroLogo, setShowIntroLogo] = useState(true);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const closeMenuRef = useRef<(() => void) | null>(null);

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

  // Hide intro logo after hero delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroLogo(false);
    }, entranceTiming.heroDelay);

    return () => clearTimeout(timer);
  }, [entranceTiming]);

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

  // Aurora opacity - only show after intro logo disappears, hide on scroll
  const auroraOpacity = !showIntroLogo && !hasScrolled ? 1 : 0;

  return (
    <div
      className="relative h-screen"
      style={{
        background: 'linear-gradient(180deg, #012332 0%, #012332 100%)'
      }}
    >
      {/* Aurora Background */}
      <div
        id="aurora-container"
        className="fixed inset-0 w-full h-full aurora-background"
        style={{
          opacity: auroraOpacity,
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
      <section className="h-screen relative" style={{ background: 'transparent', zIndex: 10 }}>
        {/* Intro Logo */}
        {showIntroLogo && (
          <div
            className="relative z-20 h-screen flex items-center justify-center"
            style={{
              opacity: 0,
              animation: 'fadeInUp 1s ease-out 0.3s forwards'
            }}
          >
            <Frame69 />
          </div>
        )}

        {/* Hero Text */}
        {!showIntroLogo && (
          <div
            key={t('hero.headline')} // Re-trigger animation on language change
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{
              opacity: 0,
              animation: 'fadeInUp 1s ease-out 0.3s forwards'
            }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <h1
                  className="hero-headline text-left sm:text-center"
                  style={{ color: 'var(--gray-white)' }}
                >
                  {t('hero.headline')}
                </h1>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Logo - Top Left */}
      {!showIntroLogo && (
        <div
          className="fixed z-50 cursor-pointer"
          style={{
            top: '40px',
            left: '36px',
            opacity: scrollY < 100 ? 1 : 0,
            transform: scrollY < 100 ? 'translateY(0)' : 'translateY(-20px)',
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
      )}

      {/* Language Switcher - Mobile only */}
      {!showIntroLogo && isMobile && scrollY < 50 && (
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
      {!showIntroLogo && !isMobile && (
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
      {!showIntroLogo && isMobile && (
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

      {/* Burger Menu */}
      {!showIntroLogo && (
        <BurgerMenu
          showHeroText={true}
          scrollY={scrollY}
          onMenuStateChange={setIsBurgerMenuOpen}
          onCloseMenuRef={(closeFunc) => { closeMenuRef.current = closeFunc; }}
        />
      )}

      {/* Scroll Indicator */}
      {!showIntroLogo && scrollY < 50 && onScrollClick && (
        <div
          className="fixed bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer group"
          onClick={onScrollClick}
          style={{
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards'
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <p
              className="transition-opacity duration-300 text-sm sm:text-base"
              style={{
                color: 'var(--gray-white)',
                fontWeight: '500',
                textAlign: 'center'
              }}
            >
              {t('hero.learnMore')}
            </p>
            <ChevronDown
              size={24}
              className="sm:w-8 sm:h-8"
              style={{
                color: 'var(--gray-white)',
                animation: 'bounce 2s infinite'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};