'use client'

import { TrendingUp, TrendingDown } from 'lucide-react';
import { AnimatedSection } from './ScrollAnimations';

interface Statistic {
  /** Main value to display */
  value: string;
  /** Label for the statistic */
  label: string;
  /** Percentage change (e.g., "+20.1%" or "-2%") */
  change?: string;
  /** Whether the change is positive (true) or negative (false) */
  isPositive?: boolean;
}

interface StatisticsGridProps {
  /** Section ID for scrolling */
  id?: string;
  /** Badge text (optional) */
  badge?: string;
  /** Main title */
  title: string;
  /** Description text */
  description: string;
  /** Array of statistics */
  statistics: Statistic[];
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
}

export const StatisticsGrid = ({
  id = "statistics-section",
  badge,
  title,
  description,
  statistics,
  className = "",
  animationType = "fadeInUp"
}: StatisticsGridProps) => {
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
            {/* Left Column - Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-none p-6 hover:bg-white/[0.02] transition-colors duration-200"
                  style={{ minHeight: '180px' }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    {/* {stat.isPositive ? (
                      <TrendingUp
                        size={20}
                        style={{ color: 'var(--gray-light)' }}
                      />
                    ) : (
                      <TrendingDown
                        size={20}
                        style={{ color: 'var(--gray-light)' }}
                      />
                    )} */}
                  </div>

                  {/* Value and Change */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-3">
                      <span
                        style={{
                          color: 'var(--gray-white)',
                          fontSize: '32px',
                          fontWeight: '700',
                          lineHeight: '110%'
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          color: stat.isPositive ? '#10b981' : '#ef4444',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>

                  {/* Label */}
                  <p
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '16px',
                      lineHeight: '160%'
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column - Text Content */}
            <div>
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

              <h2
                className="mobile-stats-h2"
                style={{
                  background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '36px',
                  fontWeight: '700',
                  lineHeight: '110%',
                  marginBottom: '1.5rem'
                }}
              >
                {title}
              </h2>

              <p
                className="mobile-stats-desc"
                style={{
                  color: 'var(--gray-light)',
                  fontSize: '18px',
                  lineHeight: '160%',
                  maxWidth: '500px'
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .mobile-stats-h2 {
            font-size: 28px !important;
          }
          .mobile-stats-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};