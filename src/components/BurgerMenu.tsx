'use client'

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BurgerMenuProps {
  showHeroText: boolean;
  scrollY: number;
  onMenuStateChange?: (isOpen: boolean) => void;
  onCloseMenuRef?: (closeFunc: () => void) => void;
}

const BurgerMenu = ({ showHeroText, scrollY, onMenuStateChange, onCloseMenuRef }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuStateChange?.(newState);
  };

  const closeMenu = () => {
    setIsOpen(false);
    onMenuStateChange?.(false);
  };

  const handleHomeClick = () => {
    window.location.href = '/';
    closeMenu();
  };

  // Expose closeMenu function to parent
  useEffect(() => {
    if (onCloseMenuRef) {
      onCloseMenuRef(closeMenu);
    }
  }, [onCloseMenuRef]);

  // Listen for desktop burger trigger
  useEffect(() => {
    const handleDesktopTrigger = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-burger-trigger-desktop]')) {
        toggleMenu();
      }
    };

    document.addEventListener('click', handleDesktopTrigger);
    return () => document.removeEventListener('click', handleDesktopTrigger);
  }, []);

  return (
    <>
      {/* Mobile Header Bar - Shows dark background when scrolled */}
      <div
        className="fixed top-0 left-0 right-0 h-20 md:hidden z-40 transition-colors duration-300"
        style={{
          backgroundColor: scrollY > 0 ? '#012332' : 'transparent',
          pointerEvents: 'none'
        }}
      />

      {/* Burger Menu Button - Mobile only */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="fixed top-8 sm:top-10 md:hidden z-50 rounded-full transition-all duration-300 hover:bg-white/20 cursor-pointer flex items-center justify-center"
          style={{
            right: '24px',
            background: 'transparent',
            border: 'none',
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out 0.6s forwards',
            padding: '10px',
            width: '44px',
            height: '44px'
          }}
          data-burger-menu
        >
          <svg
            width="24"
            height="14"
            viewBox="0 0 28 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-[28px] sm:h-[16px]"
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
      )}

      {/* Close Button - Mobile only, desktop uses header close button */}
      {isOpen && (
        <button
          onClick={closeMenu}
          className="fixed top-8 sm:top-10 md:hidden rounded-full transition-all duration-300 hover:bg-white/10 cursor-pointer flex items-center justify-center"
          style={{
            right: '24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            zIndex: 60,
            padding: '10px',
            width: '44px',
            height: '44px'
          }}
        >
          <X size={20} style={{ color: 'var(--gray-white)' }} />
        </button>
      )}

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(1, 35, 50, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={closeMenu}
      >
        {/* Menu Content */}
        <div
          className={`fixed inset-0 h-full w-full transition-transform duration-300 flex flex-col justify-center items-center px-8 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'rgba(1, 35, 50, 0.98)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="space-y-8 text-center">
            <button
              onClick={handleHomeClick}
              className="block w-full text-center mobile-burger-menu-item"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--gray-white)',
                fontSize: '64px',
                fontWeight: '700',
                lineHeight: '110%',
                padding: '0',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0B99CC'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-white)'}
            >
              {t('burgerMenu.home')}
            </button>

            <button
              onClick={() => window.open('/blog', '_blank')}
              className="block w-full text-center mobile-burger-menu-item"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--gray-white)',
                fontSize: '64px',
                fontWeight: '700',
                lineHeight: '110%',
                padding: '0',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0B99CC'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-white)'}
            >
              {t('burgerMenu.blog')}
            </button>
          </nav>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-burger-menu-item {
            font-size: 40px !important;
          }
        }
      `}</style>
    </>
  );
};

export default BurgerMenu;