'use client'

import { AnimatedSection } from './ScrollAnimations';

interface Metric {
  /** The metric value (e.g., "40%", "< 6 weeks") */
  value: string;
  /** Description of the metric */
  label: string;
}

interface MetricsDisplayProps {
  /** Section ID for scrolling */
  id?: string;
  /** Section title */
  title: string;
  /** Array of metrics to display */
  metrics: Metric[];
  /** Custom container classes */
  className?: string;
}

export const MetricsDisplay = ({
  id = "metrics-section",
  title,
  metrics,
  className = ""
}: MetricsDisplayProps) => {
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

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="border border-white/10 rounded-none p-8 hover:bg-white/[0.02] transition-colors duration-200 text-center"
              >
                {/* Metric Value */}
                <div 
                  style={{ 
                    background: 'linear-gradient(135deg, var(--brand-primary-light) 0%, var(--brand-accent-1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '48px',
                    fontWeight: '700',
                    lineHeight: '110%',
                    marginBottom: '1rem'
                  }}
                >
                  {metric.value}
                </div>

                {/* Metric Label */}
                <p 
                  style={{ 
                    color: 'var(--gray-light)',
                    fontSize: '18px',
                    lineHeight: '160%'
                  }}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
