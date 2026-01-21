'use client'

import { AnimatedSection } from './ScrollAnimations';
import { CheckCircle, LucideIcon } from 'lucide-react';

interface FeatureListProps {
  /** Section ID for scrolling */
  id?: string;
  /** Section title */
  title: string;
  /** Array of feature items (strings) */
  items: string[];
  /** Icon component to use */
  icon?: LucideIcon;
  /** Custom container classes */
  className?: string;
}

export const FeatureList = ({
  id = "feature-list-section",
  title,
  items,
  icon: IconComponent = CheckCircle,
  className = ""
}: FeatureListProps) => {
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

          {/* Feature Items */}
          <div className="max-w-3xl mx-auto space-y-6">
            {items.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 border border-white/10 rounded-none p-6 hover:bg-white/[0.02] transition-colors duration-200"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <IconComponent 
                    size={24} 
                    style={{ color: 'var(--brand-primary-light)' }} 
                  />
                </div>

                {/* Text */}
                <p 
                  style={{ 
                    color: 'var(--gray-light)',
                    fontSize: '18px',
                    lineHeight: '160%',
                    flex: 1
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
