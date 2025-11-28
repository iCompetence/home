'use client'

import { AnimatedSection } from './ScrollAnimations';

interface ProcessStep {
  /** Step label/title */
  label: string;
  /** Step description */
  description: string;
}

interface ProcessListProps {
  /** Section ID for scrolling */
  id?: string;
  /** Section title */
  title: string;
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
  steps,
  layout = "vertical",
  className = "",
  animationType = "fadeInUp"
}: ProcessListProps) => {
  return (
    <AnimatedSection 
      id={id}
      className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="mobile-process-h2" style={{ 
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem', 
              fontSize: '32px', 
              fontWeight: '700', 
              lineHeight: '110%' 
            }}>
              {title}
            </h2>
          </div>
          
          {/* Process Steps List */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-b border-white/10 last:border-b-0"
              >
                <div className="py-6 sm:py-8 px-0 hover:bg-white/[0.02] transition-colors duration-200">
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
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .mobile-process-h2 {
            font-size: 28px !important;
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