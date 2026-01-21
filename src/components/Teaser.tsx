'use client'

import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedSection } from './ScrollAnimations';

interface TeaserProps {
  /** Product/service name */
  title: string;
  /** Logo/icon image source */
  logoImage: string;
  /** Subtitle text */
  subtitle: string;
  /** Main description text */
  description: string;
  /** App screenshot or hero image */
  heroImage: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button action */
  onCtaClick?: () => void;
  /** Section ID for scrolling */
  id?: string;
  /** Custom background gradient */
  backgroundGradient?: string;
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  /** Layout direction */
  layout?: 'left-right' | 'right-left';
}

export const Teaser = ({
  title,
  logoImage,
  subtitle,
  description,
  heroImage,
  ctaText,
  onCtaClick,
  id = "teaser-section",
  backgroundGradient = "linear-gradient(135deg, #1a365d 0%, #2d3748 25%, #553c9a 50%, #d53f8c 75%, #ff8a65 100%)",
  className = "",
  animationType = "fadeInUp",
  layout = "left-right"
}: TeaserProps) => {
  const contentOrder = layout === 'left-right' ? 'order-1 lg:order-1' : 'order-2 lg:order-2';
  const imageOrder = layout === 'left-right' ? 'order-2 lg:order-2' : 'order-1 lg:order-1';
  const textAlign = layout === 'left-right' ? 'text-center lg:text-left' : 'text-center lg:text-right';
  const justifyContent = layout === 'left-right' ? 'justify-center lg:justify-start' : 'justify-center lg:justify-end';

  return (
    <AnimatedSection 
      id={id}
      className={`relative z-10 px-4 sm:px-6 lg:px-8 py-24 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div 
            className="rounded-2xl p-12 lg:p-16"
            style={{
              background: backgroundGradient,
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Content Side */}
              <div className={`${textAlign} ${contentOrder}`}>
                {/* Logo and Title */}
                <div className={`flex items-center gap-4 mb-8 ${justifyContent}`}>
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                    <ImageWithFallback 
                      src={logoImage}
                      alt={`${title} Logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 
                    style={{ 
                      color: 'var(--gray-white)',
                      fontSize: '24px',
                      fontWeight: '600',
                      margin: '0'
                    }}
                  >
                    {title}
                  </h2>
                </div>
                
                {/* Subtitle */}
                <p 
                  style={{ 
                    color: 'var(--gray-white)',
                    fontSize: '18px',
                    fontWeight: '500',
                    marginBottom: '2rem'
                  }}
                >
                  {subtitle}
                </p>
                
                {/* Description */}
                <p 
                  style={{ 
                    color: 'var(--gray-white)',
                    fontSize: '32px',
                    fontWeight: '600',
                    lineHeight: '120%',
                    marginBottom: '2rem'
                  }}
                >
                  {description}
                </p>

                {/* CTA Button */}
                {ctaText && onCtaClick && (
                  <div className={`flex ${justifyContent}`}>
                    <button
                      className="px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        background: '#EC6F95',
                        color: 'var(--gray-white)',
                        fontSize: '16px',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={onCtaClick}
                    >
                      {ctaText}
                    </button>
                  </div>
                )}
              </div>

              {/* Image Side */}
              <div className={`flex ${layout === 'left-right' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'} ${imageOrder}`}>
                <div className="relative">
                  <div 
                    className="relative rounded-xl overflow-hidden shadow-2xl inline-block"
                    style={{
                      border: '8px solid #000',
                      borderRadius: '20px'
                    }}
                  >
                    <ImageWithFallback 
                      src={heroImage}
                      alt={`${title} Interface`}
                      className="block"
                    />
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(49, 164, 175, 0.1) 0%, rgba(225, 155, 116, 0.1) 50%, rgba(212, 118, 205, 0.1) 100%)',
                      filter: 'blur(20px)',
                      zIndex: -1,
                      transform: 'scale(1.1)'
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};