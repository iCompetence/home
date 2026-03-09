'use client'

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BurgerMenuProps {
  showHeroText: boolean;
  scrollY: number;
  onMenuStateChange?: (isOpen: boolean) => void;
  onCloseMenuRef?: (closeFunc: () => void) => void;
}

const landingPages = [
  { titleKey: 'burgerMenu.analyticsAgent', href: '/analytics-agent/' },
  { titleKey: 'burgerMenu.iknow', href: '/iknow/' },
  { titleKey: 'burgerMenu.intelligenticSearch', href: '/intelligentic-search/' },
  { titleKey: 'burgerMenu.privacyLedAi', href: '/privacy-led-ai/' },
  { titleKey: 'burgerMenu.aiWorkshop', href: '/ai-workshop/' },
  { titleKey: 'burgerMenu.campaignTool', href: '/campaign-parameter-tool/' },
  { titleKey: 'burgerMenu.userJourney', href: '/icu-user-journey-explorer/' },
] as const;

type MenuItemId = 'home' | 'products' | 'contact';

const BurgerMenu = ({ showHeroText, scrollY, onMenuStateChange, onCloseMenuRef }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItemId | null>(null);
  const { t } = useLanguage();

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onMenuStateChange?.(newState);
    if (newState) setActiveItem(null);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveItem(null);
    onMenuStateChange?.(false);
  };

  const handleNavigate = (href: string) => {
    window.location.href = href;
    closeMenu();
  };

  useEffect(() => {
    if (onCloseMenuRef) {
      onCloseMenuRef(closeMenu);
    }
  }, [onCloseMenuRef]);


  const mainMenuItemStyle = (id: MenuItemId): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: activeItem === id ? '#0B99CC' : 'var(--gray-white)',
    fontSize: '64px',
    fontWeight: '700',
    lineHeight: '110%',
    padding: '0',
    transition: 'color 0.3s ease',
    textAlign: 'left',
  });

  return (
    <>
      {/* Mobile Header Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-20 md:hidden z-40 transition-colors duration-300"
        style={{
          backgroundColor: scrollY > 0 ? '#012332' : 'transparent',
          pointerEvents: 'none'
        }}
      />

      {/* Burger / Close Button - same element, animates between states */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 sm:top-10 md:hidden rounded-full transition-all duration-300 hover:bg-white/20 cursor-pointer flex items-center justify-center"
        style={{
          right: '24px',
          background: 'transparent',
          border: 'none',
          opacity: 0,
          animation: 'fadeIn 0.8s ease-out 0.6s forwards',
          padding: '10px',
          width: '44px',
          height: '44px',
          zIndex: 60,
        }}
        data-burger-menu
      >
        <div style={{ width: '24px', height: '16px', position: 'relative' }} className="sm:w-[28px] sm:h-[16px]">
          <span
            className="burger-line"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2.5px',
              backgroundColor: 'var(--gray-white)',
              borderRadius: '2px',
              transition: 'transform 0.3s ease, top 0.3s ease',
              top: isOpen ? '50%' : '0',
              transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="burger-line"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2.5px',
              backgroundColor: 'var(--gray-white)',
              borderRadius: '2px',
              transition: 'transform 0.3s ease, bottom 0.3s ease',
              bottom: isOpen ? '50%' : '0',
              transform: isOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
            }}
          />
        </div>
      </button>

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
        {/* Menu Content — two-column layout */}
        <div
          className={`fixed inset-0 h-full w-full transition-transform duration-300 flex items-center ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ background: 'rgba(1, 35, 50, 0.98)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full px-8 sm:px-16 md:px-20">
            <nav className="flex flex-col gap-3 sm:gap-4">
              <button
                onClick={() => handleNavigate('/')}
                onMouseEnter={() => setActiveItem('home')}
                className="mobile-burger-menu-item"
                style={mainMenuItemStyle('home')}
              >
                {t('burgerMenu.home')}
              </button>

              {/* Products row — main item + sub-items share one hover zone */}
              <div
                className="burger-products-row"
                onMouseEnter={() => setActiveItem('products')}
                onMouseLeave={() => setActiveItem(null)}
              >
                <button
                  onClick={() => setActiveItem(activeItem === 'products' ? null : 'products')}
                  className="mobile-burger-menu-item"
                  style={mainMenuItemStyle('products')}
                >
                  {t('burgerMenu.products')}
                </button>

                <div
                  className="burger-menu-right"
                  style={{
                    opacity: activeItem === 'products' ? 1 : 0,
                    transform: activeItem === 'products' ? 'translateX(0)' : 'translateX(12px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: activeItem === 'products' ? 'auto' : 'none',
                  }}
                >
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {landingPages.map((page) => (
                      <button
                        key={page.href}
                        onClick={() => handleNavigate(page.href)}
                        className="text-left"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(255, 255, 255, 0.55)',
                          fontSize: '20px',
                          fontWeight: '500',
                          lineHeight: '130%',
                          padding: '0',
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0B99CC'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)'}
                      >
                        {t(page.titleKey)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </nav>
          </div>
        </div>
      </div>

      <style>{`
        .burger-products-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 80px;
        }
        .burger-menu-right {
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .mobile-burger-menu-item {
            font-size: 40px !important;
          }
          .burger-products-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .burger-menu-right {
            padding-left: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default BurgerMenu;
