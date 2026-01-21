'use client'

import { AnimatedSection } from './ScrollAnimations';

interface StatementProps {
  /** Main statement text */
  text: string;
  /** Section ID for scrolling */
  id?: string;
  /** Custom styling for the text */
  textStyle?: React.CSSProperties;
  /** Additional content above the statement */
  headerContent?: React.ReactNode;
  /** Additional content below the statement */
  footerContent?: React.ReactNode;
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
}

export const Statement = ({
  text,
  id = "statement-section",
  textStyle,
  headerContent,
  footerContent,
  className = "",
  animationType = "fadeInUp"
}: StatementProps) => {
  const defaultTextStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '32px',
    lineHeight: '120%',
    fontWeight: '600',
    maxWidth: '900px',
    margin: '0 auto',
    letterSpacing: '-0.02em',
    ...textStyle
  };

  return (
    <AnimatedSection 
      id={id}
      className={`min-h-screen relative z-10 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto pt-24 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          {headerContent && (
            <div className="text-center mb-16">
              {headerContent}
            </div>
          )}

          {/* Statement Content */}
          <div>
            <div className="py-8 px-0">
              <div className="flex items-start gap-8">
                <div className="flex-1">
                  <p 
                    id={`${id}-text`}
                    className="text-left sm:text-center"
                    style={defaultTextStyle}
                  >
                    {text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          {footerContent && (
            <div className="mt-16">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};