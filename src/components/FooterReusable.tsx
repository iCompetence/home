'use client'

import { ChevronDown } from 'lucide-react';
import { AnimatedSection } from './ScrollAnimations';

interface NavigationItem {
  label: string;
  onClick: () => void;
}

interface ContactInfo {
  label: string;
  value: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  hoverColor?: string;
}

interface FooterReusableProps {
  /** Navigation items for the footer */
  navigationItems: NavigationItem[];
  /** Contact information */
  contactInfo: ContactInfo[];
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Bottom legal links */
  legalLinks?: NavigationItem[];
  /** Back to top text */
  backToTopText?: string;
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
}

export const FooterReusable = ({
  navigationItems,
  contactInfo,
  socialLinks = [],
  legalLinks = [],
  backToTopText = "Back to top",
  className = "",
  animationType = "fadeInUp"
}: FooterReusableProps) => {
  return (
    <AnimatedSection 
      className={`relative z-10 px-4 sm:px-6 lg:px-8 py-24 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <footer>
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              {/* Left Side - Navigation */}
              <div>
                <nav className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <div key={index}>
                      <button 
                        onClick={item.onClick}
                        style={{ 
                          color: 'var(--gray-white)', 
                          fontSize: '64px', 
                          fontWeight: '700', 
                          lineHeight: '110%',
                          marginBottom: '0',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          padding: '0',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0B99CC'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-white)'}
                      >
                        {item.label}
                      </button>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Right Side - Contact & Social */}
              <div className="lg:text-right">
                {/* Social Media Icons */}
                {socialLinks.length > 0 && (
                  <div className="flex gap-4 lg:justify-end mb-8">
                    {socialLinks.map((social, index) => (
                      <button 
                        key={index}
                        onClick={() => window.open(social.href, '_blank')}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                        style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none' }}
                        onMouseEnter={(e) => {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon && social.hoverColor) {
                            icon.style.color = social.hoverColor;
                          }
                        }}
                        onMouseLeave={(e) => {
                          const icon = e.currentTarget.querySelector('svg');
                          if (icon) {
                            icon.style.color = 'var(--gray-white)';
                          }
                        }}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <div key={index}>
                      <p style={{ 
                        color: 'var(--gray-light)', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>
                        {contact.label}
                      </p>
                      <p style={{ 
                        color: 'var(--gray-white)', 
                        fontSize: '18px', 
                        fontWeight: '500'
                      }}>
                        {contact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
              {legalLinks.length > 0 && (
                <div className="flex gap-8 mb-4 sm:mb-0">
                  {legalLinks.map((link, index) => (
                    <button 
                      key={index}
                      onClick={link.onClick}
                      style={{ 
                        color: 'var(--gray-light)', 
                        fontSize: '16px', 
                        fontWeight: '500',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FCFCFC'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-light)'}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}

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
                  e.currentTarget.style.color = '#FCFCFC';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = '#FCFCFC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--gray-light)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = 'var(--gray-light)';
                }}
              >
                {backToTopText}
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
  );
};