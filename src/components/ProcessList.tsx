'use client'

import { useState, useRef, useEffect } from 'react';
import { AnimatedSection } from './ScrollAnimations';

interface ProcessStep {
  /** Step label/title */
  label: string;
  /** Step description */
  description: string;
  /** Optional video URL to show on hover */
  video?: string;
}

interface ProcessListProps {
  /** Section ID for scrolling */
  id?: string;
  /** Section title */
  title: string;
  /** Optional subline/description below title */
  subline?: string | string[];
  /** Array of process steps */
  steps: ProcessStep[];
  /** Layout direction */
  layout?: 'horizontal' | 'vertical';
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
}

export const ProcessList = ({
  id = "process-list-section",
  title,
  subline,
  steps,
  layout = "vertical",
  className = "",
  animationType = "fadeInUp"
}: ProcessListProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile, { passive: true });
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!isMobile && steps[index]?.video) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left + 20,
          y: e.clientY - rect.top - 100
        });
      }
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isMobile && steps[index]?.video) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <AnimatedSection
      id={id}
      className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto" ref={containerRef}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="mobile-process-h2" style={{
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: subline ? '2rem' : '1.5rem',
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '110%'
            }}>
              {title}
            </h2>
            {subline && (
              <div className="space-y-6 max-w-4xl">
                {(Array.isArray(subline) ? subline : [subline]).map((paragraph, index) => (
                  <p
                    key={index}
                    className="mobile-process-subline"
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '18px',
                      lineHeight: '170%'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Process Steps List */}
          <div className="space-y-0 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-b border-white/10 last:border-b-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                <div
                  className="py-6 sm:py-8 px-0 hover:bg-white/[0.02] transition-colors duration-200"
                  style={{ cursor: !isMobile && step.video ? 'pointer' : 'default' }}
                >
                  <div className="flex items-start gap-4 sm:gap-8">
                    {/* Step Number */}
                    <span
                      className="mobile-step-number"
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '40px',
                        paddingTop: '2px'
                      }}
                    >
                      ({String(index + 1).padStart(2, '0')})
                    </span>

                    {/* Step Content */}
                    <div className="flex-1">
                      {/* Step Label */}
                      <h3
                        className="mobile-step-label"
                        style={{
                          color: 'var(--gray-white)',
                          fontSize: '24px',
                          fontWeight: '600',
                          lineHeight: '110%',
                          marginBottom: '0.75rem'
                        }}
                      >
                        {step.label}
                      </h3>

                      {/* Step Description */}
                      <p
                        className="mobile-step-desc"
                        style={{
                          color: 'var(--gray-light)',
                          fontSize: '18px',
                          lineHeight: '160%',
                          maxWidth: '600px'
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Video Preview on Hover - Desktop only */}
            {!isMobile && hoveredIndex !== null && steps[hoveredIndex]?.video && (
              <div
                className="fixed pointer-events-none z-50"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  transform: 'translate(0, 0)',
                }}
              >
                <video
                  src={steps[hoveredIndex].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="shadow-2xl"
                  style={{
                    width: '600px',
                    height: 'auto',
                    maxHeight: '450px',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-process-h2 {
            font-size: 28px !important;
          }
          .mobile-process-subline {
            font-size: 16px !important;
          }
          .mobile-step-number {
            min-width: 40px !important;
            font-size: 12px !important;
          }
          .mobile-step-label {
            font-size: 20px !important;
          }
          .mobile-step-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
