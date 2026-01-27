'use client'

import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedSection } from './ScrollAnimations';
const privacyImage = '/ddf0d19828db3a9bf12976f08e6ab6c523c84c0c.png';

interface ImageTextProps {
  /** Section ID for scrolling */
  id?: string;
  /** Badge text (optional) */
  badge?: string;
  /** Main title */
  title: string;
  /** Copy text between title and description (optional) */
  copyText?: string;
  /** Description text or array of bullet points */
  description: string | string[];
  /** Image source */
  image?: string;
  /** Video source (alternative to image) */
  video?: string;
  /** Alt text for image */
  imageAlt?: string;
  /** Layout direction */
  layout?: 'image-left' | 'image-right';
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  /** CTA button configuration */
  cta?: {
    text: string;
    url: string;
  };
}

export const ImageText = ({
  id = "image-text-section",
  badge,
  title,
  copyText,
  description,
  image,
  video,
  imageAlt = "Section image",
  layout = "image-right",
  className = "",
  animationType = "fadeInUp",
  cta
}: ImageTextProps) => {
  const isBulletList = Array.isArray(description);
  // On mobile: video/image always first (order-1), text second (order-2)
  // On desktop: respect layout prop
  const contentOrder = layout === 'image-left' ? 'order-2 lg:order-2' : 'order-2 lg:order-1';
  const imageOrder = layout === 'image-left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2';

  return (
    <AnimatedSection 
      id={id}
      className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Text Column */}
            <div className={contentOrder}>
              {badge && (
                <div className="mb-6">
                  <span 
                    className="inline-block px-4 py-2 rounded-full border border-white/10"
                    style={{ 
                      color: 'var(--gray-white)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {badge}
                  </span>
                </div>
              )}
              
              <h3
                style={{
                  color: 'var(--gray-white)',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '110%',
                  marginBottom: '1.5rem'
                }}
                className="mobile-image-text-h3"
              >
                {title}
              </h3>
              
              {copyText && (
                <p 
                  className="mobile-copy-text"
                  style={{ 
                    color: 'var(--gray-light)',
                    fontSize: '18px',
                    lineHeight: '160%',
                    maxWidth: '500px',
                    marginBottom: '16px'
                  }}
                >
                  {copyText}
                </p>
              )}
              
              {isBulletList ? (
                <ul className="space-y-4 mobile-bullet-list">
                  {description.map((item, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span 
                        style={{ 
                          color: 'var(--gray-light)',
                          fontSize: '18px',
                          marginTop: '2px'
                        }}
                      >
                        •
                      </span>
                      <span 
                        style={{ 
                          color: 'var(--gray-light)',
                          fontSize: '18px',
                          lineHeight: '160%',
                          flex: 1
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p 
                  style={{ 
                    color: 'var(--gray-light)',
                    fontSize: '18px',
                    lineHeight: '160%',
                    maxWidth: '500px'
                  }}
                >
                  {description}
                </p>
              )}
              
              {cta && (
                <a
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all duration-200"
                  style={{
                    color: 'var(--gray-white)',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  {cta.text}
                </a>
              )}
            </div>

            {/* Image/Video Column */}
            <div className={imageOrder}>
              <div
                className="border border-white/10 rounded-[16px] overflow-hidden hover:bg-white/[0.02] transition-colors duration-200"
              >
                {video ? (
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                  />
                ) : image ? (
                  <ImageWithFallback
                    src={image}
                    alt={imageAlt}
                    className="w-full h-auto"
                  />
                ) : null}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Add inline styles for mobile
if (typeof document !== 'undefined') {
  const styleId = 'image-text-mobile-styles';
  if (!document.getElementById(styleId)) {
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.textContent = `
      @media (max-width: 768px) {
        .mobile-image-text-h3 {
          font-size: 20px !important;
        }
        .mobile-copy-text {
          font-size: 16px !important;
        }
        .mobile-bullet-list li span {
          font-size: 16px !important;
        }
      }
    `;
    document.head.appendChild(styleTag);
  }
}