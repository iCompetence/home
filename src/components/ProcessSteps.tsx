'use client'

import { AnimatedSection } from './ScrollAnimations';

interface ProcessStep {
  /** Step label/title */
  label: string;
  /** Step description */
  description: string;
}

interface ProcessStepsProps {
  /** Section ID for scrolling */
  id?: string;
  /** Section title */
  title: string;
  /** Array of process steps */
  steps: ProcessStep[];
  /** Layout orientation */
  layout?: 'horizontal' | 'vertical';
  /** Custom container classes */
  className?: string;
}

export const ProcessSteps = ({
  id = "process-steps-section",
  title,
  steps,
  layout = 'vertical',
  className = ""
}: ProcessStepsProps) => {
  return (
    <AnimatedSection 
      id={id}
      className={`min-h-screen relative z-10 px-4 sm:px-6 lg:px-8 flex items-center ${className}`}
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 
            style={{ 
              color: 'var(--gray-white)', 
              marginBottom: '4rem', 
              fontSize: '32px', 
              fontWeight: '700', 
              lineHeight: '110%',
              textAlign: 'center'
            }}
          >
            {title}
          </h2>

          {/* Steps */}
          <div className={`grid grid-cols-1 ${layout === 'horizontal' ? 'md:grid-cols-2 lg:grid-cols-4' : ''} gap-8`}>
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative"
              >
                {/* Step Card */}
                <div 
                  className="border border-white/10 rounded-none px-6 py-8 hover:bg-white/[0.02] transition-colors duration-200"
                  style={{ minHeight: '180px' }}
                >
                  {/* Step Number */}
                  <div 
                    className="mb-4"
                    style={{ 
                      color: 'var(--brand-primary-light)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    ({String(index + 1).padStart(2, '0')})
                  </div>

                  {/* Step Label */}
                  <h3 
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
                    style={{ 
                      color: 'var(--gray-light)',
                      fontSize: '16px',
                      lineHeight: '160%'
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
